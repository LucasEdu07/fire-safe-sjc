const SERVICE_VALUES = new Set([
  "AVCB_CLCB",
  "EXTINTORES",
  "BRIGADA",
  "PROJETOS_LAUDOS",
  "SINALIZACAO",
  "OUTRO",
]);

const asObject = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
};

const isEmail = (value) => /.+@.+\..+/.test(value || "");
const isPhone = (value) => /^\+?[\d\s().-]{10,20}$/.test(value || "");

const sanitize = (value) => (typeof value === "string" ? value.trim() : "");

const getValidationError = (payload) => {
  if (!sanitize(payload.nome) || sanitize(payload.nome).length < 2) {
    return "Nome inválido";
  }

  if (!sanitize(payload.cidade) || sanitize(payload.cidade).length < 2) {
    return "Cidade inválida";
  }

  if (!isPhone(sanitize(payload.telefone))) {
    return "Telefone inválido";
  }

  if (!isEmail(sanitize(payload.email))) {
    return "E-mail invalido";
  }

  if (!SERVICE_VALUES.has(payload.servico)) {
    return "Serviço inválido";
  }

  if (payload.aceite_lgpd !== true) {
    return "Consentimento LGPD obrigatório";
  }

  return null;
};

const formatEmailHtml = (lead) => {
  const fields = [
    ["Nome", sanitize(lead.nome)],
    ["Empresa", sanitize(lead.empresa) || "Nao informado"],
    ["Cidade", sanitize(lead.cidade)],
    ["Telefone", sanitize(lead.telefone)],
    ["E-mail", sanitize(lead.email)],
    ["Servico", sanitize(lead.servico)],
    ["Mensagem", sanitize(lead.mensagem) || "Nao informada"],
    ["UTM source", sanitize(lead.utm_source) || "Nao informado"],
    ["UTM medium", sanitize(lead.utm_medium) || "Nao informado"],
    ["UTM campaign", sanitize(lead.utm_campaign) || "Nao informado"],
    ["Origem", "landing_starfire"],
    ["Data", new Date().toISOString()],
  ];

  return `
    <h2>Novo lead - Star Fire</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #ddd;">
      <tbody>
        ${fields.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  const payload = asObject(req.body);
  const validationError = getValidationError(payload);

  if (validationError) {
    return res.status(400).json({ ok: false, error: validationError });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.LEAD_EMAIL_TO;
  const emailFrom = process.env.LEAD_EMAIL_FROM;

  if (!resendKey || !emailTo || !emailFrom) {
    return res.status(500).json({
      ok: false,
      error: "Configuração de e-mail não encontrada no servidor (RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM).",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject: `Novo lead Star Fire: ${sanitize(payload.nome)}`,
        html: formatEmailHtml(payload),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ ok: false, error: `Erro no provedor de e-mail: ${text}` });
    }

    const data = await response.json();
    return res.status(200).json({ ok: true, leadId: data.id || `lead_${Date.now()}` });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : "Erro interno no servidor" });
  }
}
