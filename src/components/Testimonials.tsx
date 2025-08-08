import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "Service irréprochable : les draps arrivent toujours impeccables et pliés avec soin. La réactivité fait vraiment la différence.",
    author: "Claire D.",
    role: "Responsable hébergement",
    company: "Hôtel Les Mouettes",
  },
  {
    quote:
      "Fini les surprises : un interlocuteur unique, un suivi clair. On sent l'approche artisanale et locale.",
    author: "Y. Martin",
    role: "Gérant",
    company: "Restaurant La Baie",
  },
  {
    quote:
      "La qualité est constante et les délais sont tenus. Le tri et le prétraitement des taches changent tout.",
    author: "Dr. L. Bernard",
    role: "Cabinet médical",
    company: "Maison Santé Baie",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="temoignages-title" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <p className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-3">
            Avis clients
          </p>
          <h2 id="temoignages-title" className="text-3xl md:text-4xl font-bold tracking-tight">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Des professionnels locaux témoignent de leur expérience avec notre service.
          </p>
        </header>

        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <article className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                  <p className="text-base leading-relaxed">“{t.quote}”</p>
                  <footer className="mt-6 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.author}</span> — {t.role}, {t.company}
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious aria-label="Précédent" />
            <CarouselNext aria-label="Suivant" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
