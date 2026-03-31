import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  WHATSAPP_LINK,
  PHONE,
  PHONE_DISPLAY,
  EMAIL,
  COMPANY_ADDRESS,
  GOOGLE_MAPS_ADDRESS_QUERY,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  COMPANY_HOURS,
} from "@/lib/constants";
import {
  leadSchema,
  type LeadFormValues,
  serviceOptions,
  getUtmParamsFromLocation,
} from "@/lib/lead-schema";
import { trackEvent, trackFormStart, trackFormSubmit, trackWhatsAppClick } from "@/lib/analytics";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasStartedForm = useRef(false);

  const utmDefaults = getUtmParamsFromLocation();
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${GOOGLE_MAPS_ADDRESS_QUERY}`;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      cidade: "",
      telefone: "",
      email: "",
      servico: "AVCB_CLCB",
      mensagem: "",
      aceite_lgpd: false,
      ...utmDefaults,
    },
  });

  const onFirstInteraction = () => {
    if (!hasStartedForm.current) {
      hasStartedForm.current = true;
      trackFormStart("contato");
    }
  };

  const onSubmit = async (values: LeadFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseBody = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        const apiError = responseBody?.error?.trim();
        throw new Error(apiError || "Não foi possível enviar sua solicitação agora.");
      }

      trackFormSubmit("success", values.servico);

      toast({
        title: "Solicitação enviada",
        description: "Recebemos seus dados e vamos retornar em breve.",
      });

      reset({
        nome: "",
        empresa: "",
        cidade: "",
        telefone: "",
        email: "",
        servico: "AVCB_CLCB",
        mensagem: "",
        aceite_lgpd: false,
        ...utmDefaults,
      });

      hasStartedForm.current = false;
    } catch (error) {
      trackFormSubmit("error", values.servico);
      toast({
        variant: "destructive",
        title: "Falha ao enviar",
        description: error instanceof Error ? error.message : "Tente novamente em alguns instantes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contato"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(236,227,218,0.78)_0%,rgba(230,220,210,0.72)_100%)]"
      aria-label="Entre em contato"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(133,35,24,0.11),transparent_33%),radial-gradient(circle_at_88%_84%,rgba(90,54,38,0.1),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Contato</span>
          <h2 className="section-title">Fale com a Star Fire</h2>
          <p className="section-subtitle max-w-xl">Envie o cenário da sua unidade e receba o direcionamento inicial.</p>
        </div>

        <div className="section-shell mx-auto grid max-w-6xl gap-6 p-4 sm:p-6 md:grid-cols-[0.92fr_1.08fr] md:gap-8 md:p-8 lg:p-10">
          <div className="order-2 space-y-4 md:order-1">
            <div className="premium-panel p-5 sm:p-6" data-reveal="slide-left" data-reveal-order="0">
              <div className="relative">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Canal prioritário para atendimento</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">WhatsApp para resposta rápida e formulário para briefing objetivo.</p>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("contato", "contato_whatsapp_card")}
              className="card-base flex items-center gap-4 border-2 border-whatsapp/20 p-4 sm:p-5"
              aria-label="Contato pelo WhatsApp"
              data-reveal="slide-left"
              data-reveal-order="1"
            >
              <div className="contact-icon whatsapp-badge bg-whatsapp text-white">
                <WhatsAppIcon size={24} className="whatsapp-icon-float" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold">WhatsApp comercial</p>
                <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
              </div>
            </a>

            <div className="grid gap-3 sm:grid-cols-2" data-reveal="blur" data-reveal-order="2">
              <a href={`tel:+${PHONE}`} className="card-base flex items-center gap-4 p-4 sm:p-5" aria-label="Ligar para Star Fire">
                <div className="contact-icon bg-primary text-primary-foreground">
                  <Phone size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold">Telefone</p>
                  <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className="card-base flex items-center gap-4 p-4 sm:p-5" aria-label="Enviar e-mail para Star Fire">
                <div className="contact-icon bg-foreground text-background">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold">E-mail</p>
                  <p className="break-all text-sm text-muted-foreground">{EMAIL}</p>
                </div>
              </a>
            </div>

            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta_secondary", { section: "contato", cta_label: "contato_endereco_mapa" })}
              className="card-base flex items-center gap-4 p-4 sm:p-5"
              aria-label="Abrir endereço da Star Fire no Google Maps"
              data-reveal="blur"
              data-reveal-order="3"
            >
              <div className="contact-icon bg-accent text-accent-foreground">
                <MapPin size={22} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold">Endereço</p>
                <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-3" data-reveal="blur" data-reveal-order="4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta_secondary", { section: "contato", cta_label: "contato_instagram" })}
                className="premium-panel inline-flex items-center justify-center gap-2 p-3 text-sm font-semibold"
                aria-label="Visitar Instagram da Star Fire"
              >
                <Instagram size={16} aria-hidden="true" />
                Instagram
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta_secondary", { section: "contato", cta_label: "contato_linkedin" })}
                className="premium-panel inline-flex items-center justify-center gap-2 p-3 text-sm font-semibold"
                aria-label="Visitar LinkedIn da Star Fire"
              >
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </a>
            </div>

            <p className="pt-1 text-sm text-muted-foreground" data-reveal="blur" data-reveal-order="5">
              <strong>Horário de atendimento:</strong> {COMPANY_HOURS}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="premium-panel order-1 space-y-4 p-5 sm:p-6 md:order-2 lg:p-7"
            aria-label="Formulário de contato"
            data-reveal="slide-right"
            data-reveal-order="1"
          >
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Briefing técnico</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Preencha os dados para receber o retorno inicial.</p>
            </div>

            <div>
              <label htmlFor="contact-nome" className="sr-only">
                Seu nome
              </label>
              <input id="contact-nome" type="text" placeholder="Seu nome" className="input-field" {...register("nome")} onFocus={onFirstInteraction} />
              {errors.nome ? <p className="form-error">{errors.nome.message}</p> : null}
            </div>

            <div>
              <label htmlFor="contact-empresa" className="sr-only">
                Empresa
              </label>
              <input id="contact-empresa" type="text" placeholder="Empresa" className="input-field" {...register("empresa")} onFocus={onFirstInteraction} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-cidade" className="sr-only">
                  Cidade
                </label>
                <input id="contact-cidade" type="text" placeholder="Cidade" className="input-field" {...register("cidade")} onFocus={onFirstInteraction} />
                {errors.cidade ? <p className="form-error">{errors.cidade.message}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-telefone" className="sr-only">
                  Telefone
                </label>
                <input id="contact-telefone" type="tel" placeholder="Telefone" className="input-field" {...register("telefone")} onFocus={onFirstInteraction} />
                {errors.telefone ? <p className="form-error">{errors.telefone.message}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">
                E-mail
              </label>
              <input id="contact-email" type="email" placeholder="E-mail" className="input-field" {...register("email")} onFocus={onFirstInteraction} />
              {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="contact-servico" className="sr-only">
                Serviço desejado
              </label>
              <select id="contact-servico" className="input-field" {...register("servico")} onFocus={onFirstInteraction}>
                {serviceOptions.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.servico ? <p className="form-error">{errors.servico.message}</p> : null}
            </div>

            <div>
              <label htmlFor="contact-mensagem" className="sr-only">
                Mensagem
              </label>
              <textarea
                id="contact-mensagem"
                placeholder="Descreva rapidamente seu cenário"
                rows={4}
                className="input-field resize-none"
                {...register("mensagem")}
                onFocus={onFirstInteraction}
              />
              {errors.mensagem ? <p className="form-error">{errors.mensagem.message}</p> : null}
            </div>

            <div className="rounded-[1.15rem] border border-[var(--line-soft)] bg-white/54 p-4">
              <input type="hidden" {...register("aceite_lgpd")} />
              <label className="flex cursor-pointer items-start gap-3">
                <Checkbox
                  checked={watch("aceite_lgpd")}
                  onCheckedChange={(checked) => {
                    onFirstInteraction();
                    setValue("aceite_lgpd", checked === true, { shouldValidate: true });
                  }}
                  className="mt-0.5"
                  aria-label="Aceito a política de privacidade"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  Li e aceito a Política de Privacidade e autorizo o contato da Star Fire para fins comerciais.
                </span>
              </label>
              {errors.aceite_lgpd ? <p className="form-error">{errors.aceite_lgpd.message}</p> : null}
            </div>

            <button type="submit" className="cta-whatsapp-lg w-full justify-center" disabled={isSubmitting}>
              <MessageCircle size={18} aria-hidden="true" />
              {isSubmitting ? "Enviando..." : "Enviar solicitação"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
