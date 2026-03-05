import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Quote, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import {
  GOOGLE_REVIEWS_FALLBACK,
  GOOGLE_REVIEWS_FALLBACK_META,
  type GoogleReviewItem,
} from "@/data/google-reviews-fallback";
import MobileCarouselControls from "@/components/MobileCarouselControls";

type GoogleReviewsResponse = {
  ok: boolean;
  place_name?: string;
  place_url?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReviewItem[];
  error?: string;
};

type ViewState = {
  source: "api" | "fallback";
  place_name: string;
  place_url: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReviewItem[];
};

const fallbackState: ViewState = {
  source: "fallback",
  place_name: GOOGLE_REVIEWS_FALLBACK_META.place_name,
  place_url: GOOGLE_REVIEWS_URL,
  rating: GOOGLE_REVIEWS_FALLBACK_META.rating,
  user_ratings_total: GOOGLE_REVIEWS_FALLBACK_META.user_ratings_total,
  reviews: GOOGLE_REVIEWS_FALLBACK,
};

const formatUtcDate = (date: Date): string =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const getUtcDateFromRelativeDescription = (description: string, now: Date): Date | null => {
  const raw = normalize(description);

  if (!raw) {
    return null;
  }

  if (raw.includes("agora") || raw.includes("hoje")) {
    return now;
  }

  if (raw.includes("ontem")) {
    const date = new Date(now);
    date.setUTCDate(now.getUTCDate() - 1);
    return date;
  }

  const match = raw.match(/(\d+|um|uma)\s+(minuto|minutos|hora|horas|dia|dias|semana|semanas|mes|meses|ano|anos)/);
  if (!match) {
    return null;
  }

  const valueToken = match[1];
  const unit = match[2];
  const amount = valueToken === "um" || valueToken === "uma" ? 1 : Number.parseInt(valueToken, 10);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  const date = new Date(now);

  if (unit.startsWith("minuto")) {
    date.setUTCMinutes(date.getUTCMinutes() - amount);
    return date;
  }

  if (unit.startsWith("hora")) {
    date.setUTCHours(date.getUTCHours() - amount);
    return date;
  }

  if (unit.startsWith("dia")) {
    date.setUTCDate(date.getUTCDate() - amount);
    return date;
  }

  if (unit.startsWith("semana")) {
    date.setUTCDate(date.getUTCDate() - amount * 7);
    return date;
  }

  if (unit.startsWith("mes")) {
    date.setUTCMonth(date.getUTCMonth() - amount);
    return date;
  }

  if (unit.startsWith("ano")) {
    date.setUTCFullYear(date.getUTCFullYear() - amount);
    return date;
  }

  return null;
};

const renderStars = (value: number) => {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`Nota ${rounded} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill={index < rounded ? "currentColor" : "none"} />
      ))}
    </div>
  );
};

const GoogleReviewsSection = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<ViewState>(fallbackState);
  const [utcNow, setUtcNow] = useState(() => new Date());
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setUtcNow(new Date());
    }, 60000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/google-reviews");
        const payload = (await response.json()) as GoogleReviewsResponse;

        if (!isMounted) {
          return;
        }

        if (response.ok && payload.ok && payload.reviews && payload.reviews.length > 0) {
          setState({
            source: "api",
            place_name: payload.place_name || fallbackState.place_name,
            place_url: payload.place_url || fallbackState.place_url,
            rating: payload.rating || fallbackState.rating,
            user_ratings_total: payload.user_ratings_total || fallbackState.user_ratings_total,
            reviews: payload.reviews,
          });
          return;
        }

        setState(fallbackState);
      } catch {
        if (isMounted) {
          setState(fallbackState);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const reviews = useMemo(() => state.reviews.slice(0, 6), [state.reviews]);

  return (
    <section
      id="depoimentos-clientes"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(238,230,222,0.76)_0%,rgba(232,222,211,0.66)_100%)]"
      aria-label="Depoimentos de clientes"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/18 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_16%,rgba(133,35,24,0.1),transparent_32%),radial-gradient(circle_at_14%_84%,rgba(90,54,38,0.1),transparent_32%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Confiança validada por clientes</span>
          <h2 className="section-title">Depoimentos de clientes</h2>
          <p className="section-subtitle">
            Comentários reais de quem já contou com a Star Fire para regularizar e proteger sua operação.
          </p>
        </div>

        <div className="premium-surface mx-auto max-w-6xl bg-gradient-to-b from-card/95 via-card/88 to-secondary/60 p-4 sm:p-6 md:p-10">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Experiência comprovada</p>
              <h3 className="text-2xl font-display font-bold md:text-3xl">{state.place_name}</h3>
            </div>

            <div className="rounded-xl border bg-card/90 px-4 py-3 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                {renderStars(state.rating)}
                <span className="text-sm font-semibold">{state.rating ? state.rating.toFixed(1) : "-"}</span>
              </div>
            </div>
          </div>

          <div className="card-base mb-6 flex flex-col items-start gap-3 p-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {state.source === "api"
                ? "Depoimentos retirados do perfil público da empresa."
                : "Depoimentos selecionados do perfil público da empresa."}
            </p>
            <a
              href={state.place_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta_secondary", { section: "reviews", cta_label: "reviews_google_link" })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline sm:shrink-0"
            >
              Ver todos
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {!loading && reviews.length > 1 ? (
            <MobileCarouselControls targetRef={reviewsCarouselRef} label="Navegar depoimentos" hideAboveClass="md:hidden" />
          ) : null}

          {loading ? (
            <div
              ref={reviewsCarouselRef}
              className="flex gap-3 overflow-x-hidden scroll-smooth pb-1 md:grid md:gap-4 md:overflow-visible md:pb-0 md:grid-cols-2 xl:grid-cols-3"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-40 min-w-full animate-pulse rounded-2xl border bg-card/64 md:h-44 md:min-w-0" />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div
              ref={reviewsCarouselRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 md:grid md:gap-4 md:overflow-visible md:pb-0 md:grid-cols-2 xl:grid-cols-3"
            >
              {reviews.map((review, index) => {
                const parsedDate = getUtcDateFromRelativeDescription(review.relative_time_description, utcNow);
                const reviewDateLabel = `Publicado em ${formatUtcDate(parsedDate || utcNow)}`;

                return (
                  <article key={`${review.author_name}-${index}`} className="card-base group h-full min-w-full snap-start bg-card/92 p-4 md:min-w-0 md:p-5">
                    <div className="mb-3 flex items-start justify-between gap-2.5 md:mb-4 md:gap-3">
                      <div className="flex items-center gap-3">
                        {review.profile_photo_url ? (
                          <img
                            src={review.profile_photo_url}
                            alt={`Foto de ${review.author_name}`}
                            className="h-9 w-9 rounded-full border object-cover md:h-10 md:w-10"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full border bg-primary/10 md:h-10 md:w-10" />
                        )}
                        <div>
                          <p className="text-sm font-semibold leading-tight">{review.author_name || "Cliente"}</p>
                          <p className="text-[11px] text-muted-foreground">{reviewDateLabel}</p>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <Quote size={16} className="mb-2 text-primary/60 transition-colors duration-300 group-hover:text-primary" aria-hidden="true" />
                    <p className="line-clamp-5 text-sm leading-relaxed text-muted-foreground">{review.text || "Comentário indisponível."}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border bg-secondary/40 p-6 text-center">
              <p className="text-sm text-muted-foreground">Ainda não foi possível carregar os depoimentos no momento.</p>
            </div>
          )}

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-xl border border-border/70 bg-card/82 p-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">Compromisso</p>
              <p className="text-sm font-bold text-primary">Atendimento consultivo</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/82 p-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">Foco</p>
              <p className="text-sm font-bold text-primary">Regularização previsível</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/82 p-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">Resultado</p>
              <p className="text-sm font-bold text-primary">Operação protegida</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;