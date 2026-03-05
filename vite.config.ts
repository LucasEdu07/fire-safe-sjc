import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

type DevApiRequest = {
  url?: string;
  method?: string;
  body?: unknown;
  query?: Record<string, string>;
  on: (event: "data" | "end" | "error", listener: (...args: unknown[]) => void) => void;
};

type DevApiResponse = {
  statusCode: number;
  headersSent: boolean;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
  status?: (code: number) => DevApiResponse;
  json?: (payload: unknown) => void;
};

const readBody = (req: DevApiRequest): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += typeof chunk === "string" ? chunk : chunk.toString();
    });
    req.on("end", () => resolve(data));
    req.on("error", (error) => reject(error));
  });

const localApiPlugin = (): Plugin => ({
  name: "local-api-plugin",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const request = req as DevApiRequest;
      const response = res as DevApiResponse;
      const requestUrl = request.url || "";
      const pathname = requestUrl.split("?")[0];

      const modulePath =
        pathname === "/api/leads" ? "/api/leads.ts" : pathname === "/api/google-reviews" ? "/api/google-reviews.ts" : null;

      if (!modulePath) {
        next();
        return;
      }

      try {
        const mod = await server.ssrLoadModule(modulePath);
        const handler = mod.default;

        if (typeof handler !== "function") {
          throw new Error(`Invalid API handler for ${modulePath}`);
        }

        if (request.method && ["POST", "PUT", "PATCH"].includes(request.method.toUpperCase())) {
          if (typeof request.body === "undefined") {
            const rawBody = await readBody(request);

            if (rawBody) {
              try {
                request.body = JSON.parse(rawBody);
              } catch {
                request.body = rawBody;
              }
            }
          }

          if (typeof request.body === "undefined") {
            request.body = {};
          }
        }

        const queryParams = new URL(requestUrl, "http://localhost").searchParams;
        request.query = Object.fromEntries(queryParams.entries());

        response.status = (code: number) => {
          response.statusCode = code;
          return response;
        };

        response.json = (payload: unknown) => {
          if (!response.headersSent) {
            response.setHeader("Content-Type", "application/json; charset=utf-8");
          }
          response.end(JSON.stringify(payload));
        };

        await handler(request, response);
      } catch (error) {
        if (!response.headersSent) {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
        }
        response.end(
          JSON.stringify({
            ok: false,
            error: error instanceof Error ? error.message : "Erro interno local",
          }),
        );
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    server: {
      host: env.VITE_DEV_HOST || "127.0.0.1",
      port: Number(env.VITE_DEV_PORT || 5173),
      strictPort: true,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), localApiPlugin(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
