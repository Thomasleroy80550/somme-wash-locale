
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
          <p className="text-xl text-gray-600">
            Une question ? Un devis ? Notre équipe est à votre écoute !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos informations</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-[#145587]/10 rounded-lg mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#145587]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                  <p className="text-gray-600">06 68 12 40 26</p>
                  <p className="text-sm text-gray-500">Du lundi au vendredi</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">contact@hellowash.fr</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                  <p className="text-gray-600">38 Route du Crotoy</p>
                  <p className="text-sm text-gray-500">80120 Rue</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Horaires</h4>
                  <p className="text-gray-600">Lun - Ven : 8h - 18h</p>
                  <p className="text-gray-600">Sam : 9h - 16h</p>
                  <p className="text-sm text-gray-500">Fermé le dimanche</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
