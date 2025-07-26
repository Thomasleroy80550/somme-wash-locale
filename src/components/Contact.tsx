import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Parlons de vos besoins
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre équipe d'experts est prête à vous accompagner pour tous vos projets de blanchisserie professionnelle
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Informations principales */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Email professionnel</h3>
                  <p className="text-gray-600">Réponse garantie sous 24h</p>
                </div>
              </div>
              <a 
                href="mailto:contact@hellowash.fr" 
                className="group flex items-center justify-between bg-gray-50 hover:bg-blue-50 rounded-xl p-4 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
              >
                <span className="text-xl font-semibold text-gray-900">contact@hellowash.fr</span>
                <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Assistance téléphonique</h3>
                  <p className="text-gray-600">Du lundi au vendredi</p>
                </div>
              </div>
              <a 
                href="tel:+33374475836" 
                className="group flex items-center justify-between bg-gray-50 hover:bg-green-50 rounded-xl p-4 transition-all duration-300 border-2 border-transparent hover:border-green-200"
              >
                <span className="text-xl font-semibold text-gray-900">+33 3 74 47 58 36</span>
                <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Adresse</h4>
                  <p className="text-gray-700 font-medium">38 Route du Crotoy</p>
                  <p className="text-gray-600">80120 Rue</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Horaires d'ouverture</h4>
                  <div className="space-y-1">
                    <p className="text-gray-700 font-medium">Lundi - Vendredi : 8h - 18h</p>
                    <p className="text-gray-700 font-medium">Samedi : 9h - 16h</p>
                    <p className="text-gray-600 text-sm">Fermé le dimanche</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-xl mb-3">Service client premium</h4>
              <p className="text-blue-100 mb-4">
                Bénéficiez d'un accompagnement personnalisé pour tous vos projets de blanchisserie
              </p>
              <div className="flex items-center text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Équipe disponible maintenant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;