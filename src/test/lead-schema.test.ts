import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead-schema";

describe("leadSchema", () => {
  it("accepts a valid payload", () => {
    const result = leadSchema.safeParse({
      nome: "Lucas Silva",
      empresa: "Star Fire",
      cidade: "Sao Jose dos Campos",
      telefone: "(12) 98888-0000",
      email: "contato@starfiresjc.com.br",
      servico: "AVCB_CLCB",
      mensagem: "Preciso renovar meu AVCB",
      aceite_lgpd: true,
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "campanha_avcb",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email and missing consent", () => {
    const result = leadSchema.safeParse({
      nome: "A",
      cidade: "SJ",
      telefone: "123",
      email: "invalido",
      servico: "AVCB_CLCB",
      aceite_lgpd: false,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues.map((issue) => issue.path.join("."));
      expect(issues).toContain("nome");
      expect(issues).toContain("telefone");
      expect(issues).toContain("email");
      expect(issues).toContain("aceite_lgpd");
    }
  });
});
