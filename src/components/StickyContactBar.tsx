import { Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function StickyContactBar() {
  return (
    <aside aria-label="Barre de contact" className="fixed inset-x-0 bottom-4 z-50">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl border bg-background/90 backdrop-blur shadow-lg p-3 sm:p-4">
          <a
            href="tel:+33374475836"
            className="flex items-center gap-2 text-sm sm:text-base hover:underline"
            aria-label="Appeler le service"
          >
            <Phone className="h-4 w-4" /> +33 3 74 47 58 36
          </a>
          <span className="hidden sm:inline text-muted-foreground">•</span>
          <a
            href="mailto:contact@hellowash.fr"
            className="flex items-center gap-2 text-sm sm:text-base hover:underline"
            aria-label="Envoyer un email"
          >
            <Mail className="h-4 w-4" /> contact@hellowash.fr
          </a>
          <div className="flex-1" />
          <Button asChild size="sm">
            <a href="#contact" aria-label="Demander un devis">Demander un devis</a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
