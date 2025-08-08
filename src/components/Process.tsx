import { CheckCircle2, Eraser, Droplets, Recycle, SearchCheck, PackageCheck } from "lucide-react";

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
  return (
    <section id="processus" className="py-24">
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

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <li key={i} className="group relative rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <span className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10">
                  {s.icon}
                </span>
                <span className="text-xs font-semibold opacity-80">Étape {i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
