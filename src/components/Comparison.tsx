import { Check, X, Target, ShieldCheck, HandHeart, Zap } from 'lucide-react';

const Comparison = () => {
  const comparisons = [
    {
      feature: "Traitement des taches",
      ourService: "Chaque tache est relevée et traitée individuellement",
      industrial: "Aucun prétraitement, lavage standard uniquement",
      ourAdvantage: true
    },
    {
      feature: "Méthode de lavage",
      ourService: "Lavage artisanal soigné, linge trié en amont ET après",
      industrial: "Tunnel de lavage industriel automatisé sans tri post-lavage",
      ourAdvantage: true
    },
    {
      feature: "Contrôle qualité",
      ourService: "Vérification manuelle de chaque pièce",
      industrial: "Contrôle automatisé, qualité variable selon les lots",
      ourAdvantage: true
    },
    {
      feature: "Flexibilité des commandes",
      ourService: "Commandes personnalisées selon vos besoins",
      industrial: "Packages standardisés, peu de flexibilité",
      ourAdvantage: true
    },
    {
      feature: "Relation client",
      ourService: "Contact direct, service personnalisé local",
      industrial: "Centre d'appels, interlocuteurs multiples",
      ourAdvantage: true
    },
    {
      feature: "Réactivité",
      ourService: "Adaptation rapide, gestion des urgences",
      industrial: "Processus rigides, délais fixes",
      ourAdvantage: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#145587]/10 text-[#145587] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Comparatif qualité
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hello Wash vs <span className="text-gray-600">Géants industriels</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi choisir un service local et artisanal plutôt qu'une multinationale de location de linge
          </p>
        </div>

        {/* Main comparison */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Our service column */}
            <div className="text-center">
              <div className="bg-[#145587] text-white p-4 rounded-2xl mb-4 mx-auto w-fit">
                <HandHeart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#145587] mb-2">Hello Wash</h3>
              <p className="text-gray-600">Service artisanal premium</p>
            </div>

            {/* VS */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-[#145587] to-[#145587]/70 text-white px-6 py-3 rounded-full font-bold text-lg">
                VS
              </div>
            </div>

            {/* Industrial column */}
            <div className="text-center">
              <div className="bg-gray-400 text-white p-4 rounded-2xl mb-4 mx-auto w-fit">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Multinationales</h3>
              <p className="text-gray-600">de location de linge</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                {/* Our service */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.ourService}</p>
                  </div>
                </div>

                {/* Feature name (mobile) */}
                <div className="md:hidden text-center">
                  <h4 className="font-bold text-[#145587] text-lg">{item.feature}</h4>
                </div>

                {/* Feature name (desktop) */}
                <div className="hidden md:block text-center">
                  <h4 className="font-bold text-[#145587] text-lg">{item.feature}</h4>
                </div>

                {/* Industrial service */}
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-1 rounded-full flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">{item.industrial}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality guarantee */}
        <div className="bg-gradient-to-r from-[#145587] to-[#145587]/90 text-white rounded-3xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              Garantie qualité
            </div>
            <h3 className="text-3xl font-bold mb-4">
              L'avantage du service local et artisanal
            </h3>
            <p className="text-xl text-blue-100 mb-6">
              Face aux tunnels de lavage des géants industriels, nous privilégions l'approche humaine : chaque tache relevée, double tri du linge, et un service personnalisé que les multinationales ne peuvent pas offrir.
            </p>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Taches relevées</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2x</div>
                <div className="text-blue-100">Tri du linge</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1</div>
                <div className="text-blue-100">Interlocuteur dédié</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-blue-100">Tunnel de lavage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;