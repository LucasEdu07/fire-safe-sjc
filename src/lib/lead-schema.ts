import { z } from "zod";

export const SERVICE_VALUES = [
  "AVCB_CLCB",
  "EXTINTORES",
  "BRIGADA",
  "PROJETOS_LAUDOS",
  "SINALIZACAO",
  "OUTRO",
] as const;

export type ServiceType = (typeof SERVICE_VALUES)[number];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  AVCB_CLCB: "AVCB / CLCB",
  EXTINTORES: "Extintores",
  BRIGADA: "Brigada de Incêndio",
  PROJETOS_LAUDOS: "Projetos e Laudos",
  SINALIZACAO: "Sinalização e Segurança",
  OUTRO: "Outro",
};

export const serviceOptions = SERVICE_VALUES.map((value) => ({
  value,
  label: SERVICE_LABELS[value],
}));

const phoneRegex = /^\+?[\d\s().-]{10,20}$/;

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  empresa: z.string().trim().optional(),
  cidade: z.string().trim().min(2, "Informe sua cidade"),
  telefone: z.string().trim().regex(phoneRegex, "Informe um telefone válido"),
  email: z.string().trim().email("Informe um e-mail válido"),
  servico: z.enum(SERVICE_VALUES, {
    errorMap: () => ({ message: "Selecione o serviço desejado" }),
  }),
  mensagem: z.string().trim().max(500, "Mensagem muito longa").optional(),
  aceite_lgpd: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar a política de privacidade" }),
  }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const formatServiceLabel = (service: ServiceType): string => SERVICE_LABELS[service] || SERVICE_LABELS.OUTRO;

export const getUtmParamsFromLocation = (): Pick<LeadFormValues, "utm_source" | "utm_medium" | "utm_campaign"> => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
};
