
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, ArrowRight, MapPin, Users, Star, Zap, Shield, Leaf, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsSection from '@/components/NewsSection';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Progression du projet (exemple)
  const projectProgress = {
    current: 3,
    total: 5,
    percentage: 60,
    currentPhase: "Développement de la plateforme",
    phases: [
      { name: "Étude de marché", status: "completed", date: "Jan 2024" },
      { name: "Conception", status: "completed", date: "Fév 2024" },
      { name: "Développement", status: "current", date: "Mars 2024" },
      { name: "Tests pilotes", status: "upcoming", date: "Avr 2024" },
      { name: "Lancement", status: "upcoming", date: "Mai 2024" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
      {/* Navigation Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#145587] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HW</span>
              </div>
              <span className="text-xl font-bold text-[#145587]">Hello Wash</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-600 hover:text-[#145587] transition-colors">À propos</a>
              <a href="#progress" className="text-gray-600 hover:text-[#145587] transition-colors">Avancement</a>
              <a href="#news" className="text-gray-600 hover:text-[#145587] transition-colors">Actualités</a>
              <Link to="/auth" className="bg-[#145587] text-white px-4 py-2 rounded-lg hover:bg-[#145587]/90 transition-colors">
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-[#145587] text-white">
            Bientôt disponible
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-[#145587]">Hello Wash</span><br />
            révolutionne le linge<br />
            pour les gîtes
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            La première solution de lavage de linge dédiée aux propriétaires de gîtes et locations saisonnières.
            Service premium, écologique et sur-mesure.
          </p>

          {/* Compteur de membres */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#145587]">500+</div>
              <div className="text-sm text-gray-600">Membres inscrits</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#145587]">15</div>
              <div className="text-sm text-gray-600">Villes couvertes</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#145587]">Mai 2024</div>
              <div className="text-sm text-gray-600">Lancement prévu</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white px-8">
                Rejoindre la liste d'attente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-[#145587] text-[#145587] hover:bg-[#145587] hover:text-white">
              En savoir plus
            </Button>
          </div>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Votre email pour rester informé"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isSubmitted}>
              {isSubmitted ? <CheckCircle className="h-4 w-4" /> : 'Notifier'}
            </Button>
          </form>
          
          {isSubmitted && (
            <p className="text-green-600 text-sm mt-2">
              ✓ Merci ! Nous vous tiendrons informé.
            </p>
          )}
        </div>
      </section>

      {/* Section Avancement */}
      <section id="progress" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Où en est le projet ?
            </h2>
            <p className="text-xl text-gray-600">
              Suivez l'avancement de Hello Wash en temps réel
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-[#145587]" />
                <span>Phase actuelle : {projectProgress.currentPhase}</span>
              </CardTitle>
              <CardDescription>
                Progression globale du projet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Avancement</span>
                  <span>{projectProgress.percentage}%</span>
                </div>
                <Progress value={projectProgress.percentage} className="h-3" />
              </div>
              
              <div className="space-y-3">
                {projectProgress.phases.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      phase.status === 'completed' 
                        ? 'bg-green-500 border-green-500' 
                        : phase.status === 'current'
                        ? 'bg-[#145587] border-[#145587]'
                        : 'bg-white border-gray-300'
                    }`}>
                      {phase.status === 'completed' && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                      {phase.status === 'current' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className={`font-medium ${
                        phase.status === 'current' ? 'text-[#145587]' : 'text-gray-900'
                      }`}>
                        {phase.name}
                      </span>
                      <span className="text-sm text-gray-500">{phase.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section Actualités */}
      <section id="news">
        <NewsSection />
      </section>

      {/* Comment ça marche ? */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Un service simple et efficace en 3 étapes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#145587] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <CardTitle>Collecte</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nous récupérons votre linge sale directement chez vous selon le planning convenu.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#145587] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <CardTitle>Lavage Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Lavage professionnel avec des produits écologiques dans nos installations modernes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#145587] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <CardTitle>Livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Retour de votre linge propre, plié et prêt pour vos prochains voyageurs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos avantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Hello Wash ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-8 w-8 text-[#F97316] mx-auto mb-2" />
                <CardTitle className="text-lg">Gain de temps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Plus de lavage, plus de pliage. Concentrez-vous sur vos hôtes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-8 w-8 text-[#F97316] mx-auto mb-2" />
                <CardTitle className="text-lg">Qualité garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Linge impeccable à chaque livraison avec notre garantie qualité.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-8 w-8 text-[#F97316] mx-auto mb-2" />
                <CardTitle className="text-lg">Éco-responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Produits écologiques et process optimisé pour l'environnement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-8 w-8 text-[#F97316] mx-auto mb-2" />
                <CardTitle className="text-lg">Service premium</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Un service haut de gamme adapté aux exigences des locations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#145587] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Inscrivez-vous dès maintenant sur notre liste d'attente et bénéficiez d'un tarif préférentiel au lancement.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white px-8">
              Je m'inscris maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#145587] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HW</span>
              </div>
              <span className="text-xl font-bold text-[#145587]">Hello Wash</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Hello Wash. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
