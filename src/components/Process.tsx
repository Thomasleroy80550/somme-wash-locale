import { CheckCircle2, Eraser, Droplets, Recycle, SearchCheck, PackageCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Prise en charge & tri initial",
    description: "Chaque lot est identifié, trié par type de textile et par niveau de soin.",
    icon: <CheckCircle2 className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Pré-traitement des taches",
    description: "Traitement ciblé et manuel avant lavage pour un résultat impeccable.",
    icon: <Eraser className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Lavage artisanal",
    description: "Paramètres adaptés au textile, sans tunnel de lavage, pour préserver la fibre.",
    icon: <Droplets className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Contrôle qualité",
    description: "Vérification manuelle pièce par pièce avec double tri.",
    icon: <SearchCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Finition & conditionnement",
    description: "Pliage soigné, conditionnement sécurisé et traçabilité claire.",
    icon: <PackageCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Développement durable",
    description: "Optimisation eau/énergie et réutilisation responsable des consommables.",
    icon: <Recycle className="h-6 w-6" aria-hidden="true" />,
  },
];

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="processus" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <p className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-3">
            Parcours qualité
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Notre méthode artisanale, étape par étape
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Transparence totale sur notre processus pour garantir une hygiène et une qualité irréprochables.
          </p>
        </header>

        {/* Parcours linéaire simple */}
        <div className="relative">
          {/* Ligne de parcours principale */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
            {/* Parcours en Z : 1→2→3→4→5→6 */}
            <path
              d="M 17% 25% L 83% 25% L 83% 50% L 17% 50% L 17% 75% L 83% 75%"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="10,5"
              fill="none"
              strokeDashoffset={isVisible ? "0" : "500"}
              className="transition-all duration-2000 ease-in-out"
              opacity="0.7"
            />
            {/* Flèches de direction */}
            <polygon
              points="81%,25% 85%,25% 83%,23% 83%,27%"
              fill="hsl(var(--primary))"
              opacity={isVisible ? "0.8" : "0"}
              className="transition-opacity duration-1000 delay-500"
            />
            <polygon
              points="15%,50% 19%,50% 17%,48% 17%,52%"
              fill="hsl(var(--primary))"
              opacity={isVisible ? "0.8" : "0"}
              className="transition-opacity duration-1000 delay-1000"
            />
            <polygon
              points="81%,75% 85%,75% 83%,73% 83%,77%"
              fill="hsl(var(--primary))"
              opacity={isVisible ? "0.8" : "0"}
              className="transition-opacity duration-1000 delay-1500"
            />
          </svg>

          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ zIndex: 2 }}>
          {steps.map((s, i) => (
            <li
              key={i}
              className="relative rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Point de connexion */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm" />
              
              <div className="flex items-center gap-3 mb-4 text-primary">
                <span className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {s.icon}
                </span>
                <div>
                  <span className="text-xs font-semibold opacity-70 block">Étape {i + 1}</span>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{s.description}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
