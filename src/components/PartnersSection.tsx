
import { Star, MapPin, Building2, Heart, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PartnersSection = () => {
  const partners = [
    {
      name: "Office de Tourisme Baie de Somme",
      logo: "/placeholder.svg",
      type: "Partenaire institutionnel",
      description: "Promotion du territoire et accompagnement touristique"
    },
    {
      name: "Réseau Gîtes de France",
      logo: "/placeholder.svg", 
      type: "Réseau d'hébergements",
      description: "Label qualité pour les hébergements ruraux"
    },
    {
      name: "Chambres d'Hôtes 80",
      logo: "/placeholder.svg",
      type: "Association locale",
      description: "Regroupement des professionnels de l'hébergement"
    },
    {
      name: "Mairie de Saint-Valery-sur-Somme",
      logo: "/placeholder.svg",
      type: "Collectivité locale",
      description: "Soutien au développement économique local"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Propriétaire de 3 gîtes à Fort-Mahon",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "Hello Wash va révolutionner notre façon de gérer le linge. L'automatisation nous fera gagner un temps précieux entre chaque location.",
      property: "Les Gîtes du Phare"
    },
    {
      name: "Jean-Paul Martin", 
      role: "Gérant Chambre d'hôtes Le Crotoy",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "Enfin une solution locale qui comprend nos contraintes. La qualité hôtelière avec la simplicité d'une gestion automatisée.",
      property: "Maison d'Hôtes Vista Mare"
    },
    {
      name: "Sophie Leclerc",
      role: "Responsable Résidence de Tourisme",
      avatar: "/placeholder.svg", 
      rating: 5,
      content: "Pour nos 25 appartements, avoir un partenaire local fiable pour le linge est essentiel. Hello Wash répond parfaitement à nos besoins.",
      property: "Résidence Les Dunes Bleues"
    }
  ];

  const stats = [
    {
      icon: Building2,
      value: "50+",
      label: "Hébergements partenaires",
      description: "Déjà inscrits sur liste d'attente"
    },
    {
      icon: Users,
      value: "200+",
      label: "Professionnels intéressés", 
      description: "Dans la Baie de Somme"
    },
    {
      icon: Heart,
      value: "100%",
      label: "Satisfaction attendue",
      description: "Basée sur nos études"
    }
  ];

  return (
    <>
      {/* Section Partenaires */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos partenaires</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hello Wash s'associe avec les acteurs locaux pour offrir le meilleur service aux professionnels de l'hébergement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {partners.map((partner, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-[#145587]/20">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {partner.name}
                  </CardTitle>
                  <CardDescription className="text-[#145587] font-medium">
                    {partner.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm text-center">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-[#145587]/10 rounded-2xl mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-[#145587]" />
                </div>
                <div className="text-3xl font-bold text-[#145587] mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos futurs clients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les professionnels de l'hébergement de la Baie de Somme nous font déjà confiance
            </p>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mt-4">
              <Star className="h-4 w-4 mr-2 fill-current" />
              Témoignages authentiques de notre liste d'attente
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#145587]/20">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                    />
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-[#145587] font-medium">
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-medium">{testimonial.property}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#145587] to-[#145587]/90 rounded-3xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Rejoignez nos partenaires</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Découvrez comment Hello Wash peut transformer la gestion de votre hébergement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#145587] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Rejoindre la liste d'attente
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Devenir partenaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersSection;
