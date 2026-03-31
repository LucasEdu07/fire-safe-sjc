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

const renderStars = (value: number, size = 16) => {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`Nota ${rounded} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={size} fill={index < rounded ? "currentColor" : "none"} />
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

  const reviews = useMemo(() => state.reviews.slice(0, 4), [state.reviews]);
  const featuredReview = reviews[0];
  const secondaryReviews = reviews.slice(1, 4);

  return (
    <section
      id="depoimentos-clientes"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(238,230,222,0.8)_0%,rgba(230,219,208,0.72)_100%)]"
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
          <p className="section-subtitle">Leituras reais de quem já confiou na Star Fire.</p>
        </div>

        <div className="section-shell review-shell mx-auto max-w-6xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="section-spotlight" />

          <div className="review-intro" data-reveal="slide-left" data-reveal-order="0">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Experiência comprovada</p>
              <h3 className="mt-2 text-[1.8rem] font-display font-bold sm:text-[2.2rem]">{state.place_name}</h3>
            </div>

            <div className="review-summary-row" data-reveal="slide-right" data-reveal-order="1">
              <div className="review-meta-card">
                {renderStars(state.rating, 15)}
                <div className="review-meta-copy">
                  <p className="review-meta-value">{state.rating ? state.rating.toFixed(1) : "-"}</p>
                  <p className="review-meta-label">{state.user_ratings_total} avaliações públicas</p>
                </div>
              </div>

              <a
                href={state.place_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta_secondary", { section: "reviews", cta_label: "reviews_google_link" })}
                className="review-link-card"
              >
                <span className="review-link-copy">Ver perfil completo no Google</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 lg:grid-cols-[1.14fr_0.86fr]">
              <div className="h-[24rem] animate-pulse rounded-[1.6rem] border bg-card/60" />
              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-40 animate-pulse rounded-[1.35rem] border bg-card/60" />
                ))}
              </div>
            </div>
          ) : featuredReview ? (
            <div className="review-layout">
              <article className="review-feature-card" data-reveal="quote" data-reveal-order="2">
                <div className="premium-grid-overlay" />
                <div className="relative">
                  <div className="review-feature-header">
                    <div className="review-author-block">
                      {featuredReview.profile_photo_url ? (
                        <img
                          src={featuredReview.profile_photo_url}
                          alt={`Foto de ${featuredReview.author_name}`}
                          className="review-author-avatar"
                          loading="lazy"
                        />
                      ) : (
                        <div className="review-author-avatar bg-white/10" />
                      )}
                      <div>
                        <p className="review-author-name">{featuredReview.author_name || "Cliente"}</p>
                        <p className="review-author-date">
                          Publicado em {formatUtcDate(getUtcDateFromRelativeDescription(featuredReview.relative_time_description, utcNow) || utcNow)}
                        </p>
                      </div>
                    </div>
                    {renderStars(featuredReview.rating, 15)}
                  </div>

                  <Quote size={26} className="mb-5 text-[#f8ddcf]" aria-hidden="true" />
                  <p className="review-feature-text">{featuredReview.text || "Comentário indisponível."}</p>
                </div>
              </article>

              <div className="review-secondary-column" data-reveal="slide-right" data-reveal-order="3">
                {secondaryReviews.length > 1 ? (
                  <MobileCarouselControls targetRef={reviewsCarouselRef} label="Navegar depoimentos" hideAboveClass="lg:hidden" className="relative z-10 mb-3" />
                ) : null}

                <div ref={reviewsCarouselRef} className="review-secondary-grid">
                  {secondaryReviews.length > 0 ? (
                    secondaryReviews.map((review, index) => {
                      const parsedDate = getUtcDateFromRelativeDescription(review.relative_time_description, utcNow);
                      const reviewDateLabel = `Publicado em ${formatUtcDate(parsedDate || utcNow)}`;

                      return (
                        <article
                          key={`${review.author_name}-${index}`}
                          className="review-secondary-card"
                          data-reveal={index % 2 === 0 ? "quote" : "blur"}
                          data-reveal-order={index + 4}
                        >
                          <div className="review-secondary-header">
                            <div className="review-author-block review-author-block-compact">
                              {review.profile_photo_url ? (
                                <img
                                  src={review.profile_photo_url}
                                  alt={`Foto de ${review.author_name}`}
                                  className="review-author-avatar review-author-avatar-compact"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="review-author-avatar review-author-avatar-compact bg-primary/10" />
                              )}
                              <div>
                                <p className="review-author-name review-author-name-compact">{review.author_name || "Cliente"}</p>
                                <p className="review-author-date review-author-date-compact">{reviewDateLabel}</p>
                              </div>
                            </div>
                            {renderStars(review.rating, 13)}
                          </div>

                          <Quote size={15} className="mb-2 text-primary/60" aria-hidden="true" />
                          <p className="review-secondary-text">{review.text || "Comentário indisponível."}</p>
                        </article>
                      );
                    })
                  ) : (
                    <div className="review-empty-card">
                      <p className="text-sm text-muted-foreground">Outros depoimentos não puderam ser exibidos agora.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="review-empty-card">
              <p className="text-sm text-muted-foreground">Os depoimentos não puderam ser carregados no momento.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
