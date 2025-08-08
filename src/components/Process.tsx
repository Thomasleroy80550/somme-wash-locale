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

        {/* Connexions pointillées animées */}
        <div className="relative">
          {/* SVG pour les connexions */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
            {/* Ligne horizontale entre étapes 1-2 */}
            <line
              x1="33%" y1="25%" x2="67%" y2="25%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-300"
              opacity="0.6"
            />
            {/* Ligne horizontale entre étapes 3-4 */}
            <line
              x1="33%" y1="50%" x2="67%" y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-700"
              opacity="0.6"
            />
            {/* Ligne horizontale entre étapes 5-6 */}
            <line
              x1="33%" y1="75%" x2="67%" y2="75%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-1100"
              opacity="0.6"
            />
            {/* Lignes verticales de connexion */}
            <line
              x1="17%" y1="25%" x2="17%" y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-500"
              opacity="0.4"
            />
            <line
              x1="83%" y1="25%" x2="83%" y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-900"
              opacity="0.4"
            />
            <line
              x1="17%" y1="50%" x2="17%" y2="75%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeDashoffset={isVisible ? "0" : "100"}
              className="transition-all duration-1000 delay-1300"
              opacity="0.4"
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
