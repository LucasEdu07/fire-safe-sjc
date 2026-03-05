export const SITE_NAME = "Star Fire";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.starfiresjc.com.br";

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5512996874762";
export const PHONE = WHATSAPP_NUMBER;
export const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY || "(12) 99687-4762";
export const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "contato@starfiresjc.com.br";

export const COMPANY_CNPJ = import.meta.env.VITE_COMPANY_CNPJ || "12.345.678/0001-90";
export const COMPANY_CITY = "São José dos Campos";
export const COMPANY_STATE = "SP";
export const COMPANY_POSTAL_CODE = "12233-000";
export const COMPANY_ADDRESS = "Avenida Andrômeda, 2969 - Bosque dos Eucaliptos, São José dos Campos - SP, 12233-000";
export const GOOGLE_MAPS_ADDRESS_QUERY = encodeURIComponent(COMPANY_ADDRESS);
export const COMPANY_HOURS = "Seg. a Sex., 8h às 18h | Sáb., 8h às 12h";

export const INSTAGRAM_URL = "https://www.instagram.com/starfirebombeiros/";
export const LINKEDIN_URL = "https://br.linkedin.com/company/starfirebombeiros";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=star+fire+são+josé+dos+campos#lrd=0x94cc4f8344485293:0x474f5609f4b6a3d8,1,,,,";

export const DEFAULT_WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um orçamento para segurança contra incêndio.";

export const buildWhatsAppMessage = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_LINK = buildWhatsAppMessage(DEFAULT_WHATSAPP_MESSAGE);
