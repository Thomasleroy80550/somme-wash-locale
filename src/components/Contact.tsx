
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'Linge de lit',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success('Votre demande a été envoyée avec succès !');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        service: 'Linge de lit',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Demander un devis</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service souhaité</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent"
                  >
                    <option value="Linge de lit">Linge de lit</option>
                    <option value="Linge de toilette">Linge de toilette</option>
                    <option value="Linge de table">Linge de table</option>
                    <option value="Tous les services">Tous les services</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent"
                    placeholder="Décrivez vos besoins..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#145587] text-white py-4 rounded-lg hover:bg-[#145587]/90 transition-colors font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
