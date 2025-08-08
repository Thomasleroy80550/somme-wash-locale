import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, UtensilsCrossed, Home, Briefcase } from "lucide-react";

const sectors = {
  hotel: {
    icon: Hotel,
    title: "Hôtellerie",
    subtitle: "Excellence & Réactivité",
    description: "Pour les hôtels, chambres d'hôtes et résidences de tourisme, nous proposons un service adapté aux standards élevés de l'hébergement touristique.",
    specificities: [
      "Rotation rapide des draps et serviettes",
      "Qualité constante pour maintenir les standards",
      "Flexibilité selon l'occupation saisonnière",
      "Livraison express en haute saison"
    ],
    services: [
      "Linge de lit et de bain",
      "Rideaux et voilages",
      "Tapis et moquettes",
      "Uniformes du personnel"
    ],
    advantages: [
      "Gain de temps pour vos équipes",
      "Qualité hôtelière garantie",
      "Gestion des pics saisonniers",
      "Image de marque préservée"
    ]
  },
  restaurant: {
    icon: UtensilsCrossed,
    title: "Restauration",
    subtitle: "Hygiène & Praticité",
    description: "Restaurants, brasseries, bars et cafés bénéficient de notre expertise dans le traitement du linge professionnel et de table.",
    specificities: [
      "Traitement anti-taches spécialisé",
      "Résistance aux lavages intensifs",
      "Horaires adaptés aux contraintes",
      "Volume important géré facilement"
    ],
    services: [
      "Linge de table (nappes, serviettes)",
      "Vêtements de cuisine",
      "Torchons et essuis professionnels",
      "Tabliers et uniformes"
    ],
    advantages: [
      "Élimination des taches tenaces",
      "Hygiène irréprochable",
      "Durée de vie prolongée",
      "Coûts maîtrisés"
    ]
  },
  gite: {
    icon: Home,
    title: "Gîtes & Locations",
    subtitle: "Confort & Simplicité",
    description: "Pour les propriétaires de gîtes, locations saisonnières et meublés de tourisme, nous facilitons la gestion du linge entre les séjours.",
    specificities: [
      "Service de rotation entre locataires",
      "Collecte et livraison à domicile",
      "Traitement personnalisé par logement",
      "Disponibilité 7j/7 en saison"
    ],
    services: [
      "Linge de lit complet",
      "Linge de toilette",
      "Linge de cuisine",
      "Couvertures et plaids"
    ],
    advantages: [
      "Rotation optimisée",
      "Disponibilité immédiate",
      "Qualité touristique",
      "Gestion simplifiée"
    ]
  },
  conciergerie: {
    icon: Briefcase,
    title: "Conciergerie",
    subtitle: "Service Premium",
    description: "Services de conciergerie privée et d'entreprise : nous prenons en charge le linge de vos clients avec la discrétion et l'excellence requises.",
    specificities: [
      "Service white-glove",
      "Confidentialité absolue",
      "Horaires sur mesure",
      "Traçabilité complète"
    ],
    services: [
      "Pressing haute qualité",
      "Entretien textile délicat",
      "Service express",
      "Livraison personnalisée"
    ],
    advantages: [
      "Expertise haut de gamme",
      "Flexibilité totale",
      "Relation privilégiée",
      "Résultats irréprochables"
    ]
  }
};

export default function SectorExpertise() {
  return (
    <section aria-labelledby="secteurs-title" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Nos secteurs
          </Badge>
          <h2 id="secteurs-title" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Expertise par secteur d'activité
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Chaque secteur a ses spécificités. Découvrez comment nous nous adaptons 
            aux besoins uniques de votre domaine d'activité.
          </p>
        </header>

        <Tabs defaultValue="hotel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
            {Object.entries(sectors).map(([key, sector]) => {
              const Icon = sector.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex flex-col gap-2 p-4 h-auto">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{sector.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(sectors).map(([key, sector]) => (
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

              <div className="grid gap-8 lg:grid-cols-3">
                <Card className="col-span-full lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Spécificités du secteur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{sector.description}</p>
                    <ul className="space-y-2">
                      {sector.specificities.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Services proposés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {sector.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Avantages clés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {sector.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Votre secteur nécessite une approche spécifique ?</h3>
            <p className="text-muted-foreground mb-6">
              Nous nous adaptons à tous les métiers et contraintes. Contactez-nous pour discuter 
              de vos besoins particuliers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Consultation gratuite
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