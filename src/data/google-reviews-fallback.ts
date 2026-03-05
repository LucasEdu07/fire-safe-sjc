export type GoogleReviewItem = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
  author_url: string;
};

export const GOOGLE_REVIEWS_FALLBACK_META = {
  source: "scrape_local",
  collected_at: "2026-03-05",
  place_name: "Star Fire",
  rating: 5,
  user_ratings_total: 14,
};

export const GOOGLE_REVIEWS_FALLBACK: GoogleReviewItem[] = [
  {
    author_name: "Fernanda Jesus",
    rating: 5,
    relative_time_description: "2 meses atrás",
    text: "Excelente trabalho, profissionais atenciosos, serviços de qualidade, extintores de ótima qualidade, atendimento ótimo. Recomendo.",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocK81S8niVM3QG1mmq3tHSA5LqgM0V7TETKH5qnTXLjaOReMMw=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Siméa Farias",
    rating: 5,
    relative_time_description: "um ano atrás",
    text: "Ótimo serviço, ótimo atendimento. Sua vida, sua empresa e seu patrimônio sendo tratados com respeito e seriedade. Super recomendo.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjV5MrJ9wiR61VR-8NZ9W5raY3FqbzZzCiJ4yPe4duhbRrA4E00Vmg=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Aline Boff da Silva",
    rating: 5,
    relative_time_description: "um ano atrás",
    text: "Ótimo atendimento e preços justos. Me ajudou em tudo que eu precisava. Muito profissional.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXLefx0pdl2HKEMjjeh9bHOzYc6ELsg6O_qo68SHvzqHVpKAh4T=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Maéli Farias",
    rating: 5,
    relative_time_description: "um ano atrás",
    text: "Com certeza os melhores da região. Excelente trabalho, super indico.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjUb68mWbiNHj0NSHQpOUqDjWW26o2fD7J-eRVCyRnDOd3Ui5CCU=w36-h36-p-rp-mo-ba3-br100",
    author_url: "",
  },
  {
    author_name: "Marcos Balbino",
    rating: 5,
    relative_time_description: "um ano atrás",
    text: "Excelente, profissionais responsáveis e atenciosos.",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocJfbPbyfmo7S5a1E5GCKsdQ2112ElBGz21aUePWdBoCRFIrSOQ=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Greice Kelly",
    rating: 5,
    relative_time_description: "um ano atrás",
    text: "Excelente atendimento, ótima localização. Super recomendo.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXh6Awpp6tIA7aS6pAn-uco4CzwSv5k7XGZaLU35nSKw6kq5DK6=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Fabio Ribeiro",
    rating: 5,
    relative_time_description: "4 anos atrás",
    text: "Muito bom o atendimento, pontual nas entregas. Preço justo e excelente serviço na aquisição de alvará de bombeiro.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXTODEOtvu11xOLt5RyOO-vNXViBFKdcXsGJSG95vsDruQyPUDJKw=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
  {
    author_name: "Daniela Santiago",
    rating: 5,
    relative_time_description: "4 anos atrás",
    text: "Fácil acesso, excelente atendimento, preço justo e assessoria exemplar.",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocKFsIQ1dI0SYlbLyKEWYnpR5KOVUNTBKhs5AViEE2FBxqNsHA=w36-h36-p-rp-mo-br100",
    author_url: "",
  },
];
