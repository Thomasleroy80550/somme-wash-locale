import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, UtensilsCrossed, Heart, Building2, GraduationCap, Briefcase } from "lucide-react";

const caseStudies = {
  hotel: {
    icon: Hotel,
    title: "Hôtellerie",
    subtitle: "Excellence & Réactivité",
    cases: [
      {
        name: "Hôtel Les Mouettes ****",
        location: "Perros-Guirec",
        challenge: "Gestion de 120 chambres en haute saison avec des standards élevés",
        solution: "Service quotidien avec tri textile, traitement antitaches et pliage professionnel",
        results: [
          "Réduction de 40% du temps de traitement",
          "Satisfaction client 98%",
          "Économie de 2h/jour pour le personnel"
        ],
        quote: "Grâce à Hello Wash, nous gardons notre standing 4 étoiles même en pleine saison.",
        author: "Claire D., Responsable hébergement"
      },
      {
        name: "Résidence Le Grand Large",
        location: "Trégastel",
        challenge: "Rotation intensive d'appartements touristiques",
        solution: "Collecte programmée et livraison express 24h",
        results: [
          "Disponibilité immédiate des logements",
          "Zéro retard de livraison",
          "Textile impeccable garanti"
        ],
        quote: "Un partenaire fiable qui nous fait gagner en efficacité.",
        author: "M. Le Goff, Gérant"
      }
    ]
  },
  restaurant: {
    icon: UtensilsCrossed,
    title: "Restauration",
    subtitle: "Hygiène & Praticité",
    cases: [
      {
        name: "Restaurant La Baie",
        location: "Ploumanac'h",
        challenge: "Linge de table et vêtements professionnels très sollicités",
        solution: "Traitement spécialisé anti-taches et entretien quotidien",
        results: [
          "Élimination de 95% des taches tenaces",
          "Durée de vie textile prolongée",
          "Service continu 7j/7"
        ],
        quote: "Plus de stress avec les taches de sauce ! Service irréprochable.",
        author: "Y. Martin, Chef propriétaire"
      },
      {
        name: "Brasserie du Port",
        location: "Perros-Guirec",
        challenge: "Volume important et contraintes d'horaires",
        solution: "Collecte nocturne et livraison matinale",
        results: [
          "Optimisation des flux de travail",
          "Stock textile réduit de 30%",
          "Coûts maîtrisés"
        ],
        quote: "Ils s'adaptent parfaitement à nos contraintes horaires.",
        author: "Sophie L., Responsable"
      }
    ]
  },
  medical: {
    icon: Heart,
    title: "Médical",
    subtitle: "Hygiène & Conformité",
    cases: [
      {
        name: "Maison Santé Baie",
        location: "Perros-Guirec",
        challenge: "Respect strict des normes d'hygiène médicale",
        solution: "Traitement haute température et désinfection certifiée",
        results: [
          "Conformité 100% aux normes",
          "Traçabilité complète",
          "Livraison sécurisée"
        ],
        quote: "La qualité constante et les délais tenus changent tout.",
        author: "Dr. L. Bernard"
      }
    ]
  },
  office: {
    icon: Building2,
    title: "Bureaux",
    subtitle: "Efficacité & Image",
    cases: [
      {
        name: "Cabinet d'Architectes ADL",
        location: "Lannion",
        challenge: "Image professionnelle et uniforme impeccable",
        solution: "Entretien hebdomadaire avec pressing intégré",
        results: [
          "Image de marque valorisée",
          "Satisfaction équipe 100%",
          "Simplicité administrative"
        ],
        quote: "Notre équipe est toujours impeccable sans effort.",
        author: "A. Dubois, Directeur"
      }
    ]
  },
  education: {
    icon: GraduationCap,
    title: "Éducation",
    subtitle: "Volume & Économie",
    cases: [
      {
        name: "Lycée Technologique",
        location: "Tréguier",
        challenge: "Gestion de l'internat et des ateliers techniques",
        solution: "Contrat annuel avec tarifs préférentiels",
        results: [
          "Économie de 25% vs prestataires précédents",
          "Gestion simplifiée",
          "Qualité constante"
        ],
        quote: "Un partenariat qui allège notre gestion quotidienne.",
        author: "M. Rousseau, Intendant"
      }
    ]
  },
  services: {
    icon: Briefcase,
    title: "Services",
    subtitle: "Flexibilité & Proximité",
    cases: [
      {
        name: "Entreprise de Nettoyage ProNet",
        location: "Lannion",
        challenge: "Équipements et vêtements de travail très sollicités",
        solution: "Service express et traitement renforcé",
        results: [
          "Rotation optimisée des équipements",
          "Durabilité textile améliorée",
          "Réactivité exceptionnelle"
        ],
        quote: "Ils comprennent nos contraintes terrain.",
        author: "C. Morvan, Chef d'équipe"
      }
    ]
  }
};

export default function CaseStudies() {
  return (
    <section aria-labelledby="etudes-cas-title" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Études de cas
          </Badge>
          <h2 id="etudes-cas-title" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Des solutions sur mesure par secteur
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Découvrez comment Hello Wash s'adapte aux spécificités de chaque secteur d'activité 
            avec des solutions personnalisées et des résultats mesurables.
          </p>
        </header>

        <Tabs defaultValue="hotel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
            {Object.entries(caseStudies).map(([key, sector]) => {
              const Icon = sector.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex flex-col gap-2 p-4 h-auto">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{sector.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(caseStudies).map(([key, sector]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <sector.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{sector.title}</h3>
                    <p className="text-muted-foreground">{sector.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {sector.cases.map((caseStudy, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{caseStudy.name}</CardTitle>
                          <CardDescription className="text-sm font-medium text-primary">
                            📍 {caseStudy.location}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-destructive mb-2">
                          Défi
                        </h4>
                        <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                          Solution
                        </h4>
                        <p className="text-sm">{caseStudy.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-green-600 mb-3">
                          Résultats
                        </h4>
                        <ul className="space-y-2">
                          {caseStudy.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-green-500 font-bold">✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/20 rounded-r">
                        <p className="text-sm italic mb-2">"{caseStudy.quote}"</p>
                        <cite className="text-xs text-muted-foreground font-medium">
                          — {caseStudy.author}
                        </cite>
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Votre secteur n'est pas listé ?</h3>
            <p className="text-muted-foreground mb-6">
              Nous nous adaptons à tous les métiers. Contactez-nous pour une étude personnalisée 
              de vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Étude personnalisée
              </a>
              <a 
                href="tel:0296231234" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors duration-200"
              >
                02 96 23 12 34
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}