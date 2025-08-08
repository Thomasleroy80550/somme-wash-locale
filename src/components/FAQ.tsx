import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels types de textiles prenez-vous en charge ?",
    a: "Nous traitons le linge plat (draps, housses), éponge, tenues professionnelles, nappage et textiles techniques selon protocoles adaptés.",
  },
  {
    q: "Quels sont vos délais moyens ?",
    a: "Selon le volume et la saison, de 24 à 72h. Nous proposons un service d'urgence sur demande.",
  },
  {
    q: "Proposez-vous un interlocuteur dédié ?",
    a: "Oui, un responsable vous suit du devis à la livraison pour une communication simple et efficace.",
  },
  {
    q: "Comment gérez-vous les taches difficiles ?",
    a: "Elles sont relevées puis prétraitées manuellement. En cas d'imperfection, nous réitérons le cycle ciblé.",
  },
  {
    q: "Avez-vous un engagement environnemental ?",
    a: "Optimisation eau/énergie, produits maîtrisés et circuits courts. Aucun tunnel de lavage : préservation des fibres.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <p className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-3">
            Questions fréquentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Les réponses aux questions les plus courantes de nos clients professionnels.
          </p>
        </header>

        <Accordion type="multiple" className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
