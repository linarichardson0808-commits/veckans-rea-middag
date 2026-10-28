'use client';
import { useState } from 'react';

// Samtliga erbjudanden från din Willys-lista uppdelade i kategorier
const willysOffers = [
  { category: '🥩 Kött & Chark', items: ['Svensk blandfärs Garant 500g – 49:90 kr/kg (Gäller till ons 28/10)', 'Högrev Prime ca 1,2kg – 119:00 kr/kg', 'Högrev i bit Scan/Dalsjöfors – 169:00 kr/kg', 'Kokt helgskinka Nybergs Deli – 49:90 kr/kg', 'Lammstek benfri Farmers – 179:00 kr/kg', 'Lammrostbiff Farmers – 199:00 kr/kg', 'Kalvhögrev Prime – 149:00 kr/kg', 'Spareribs Tulip 500g – 3 för 100:00 kr', 'Falukorv Scan 800g – 32:90 kr/st', 'Grillkorv Scan – 34:90 kr/st', 'Skivat stekfläsk Garant 375g – 32:90 kr/st', 'Strimlad rökt skinka Garant 180g – 2 för 35:00 kr'] },
  { category: '🍗 Fågel', items: ['Kycklinglårfilé Eldorado 700g – 49:90 kr/st', 'Färsk kycklingbröstfilé Garant ca 850g – 109:00 kr/kg', 'Majskyckling Guldfågeln 1kg – 115:00 kr/st', 'Kycklingburgare Eldorado 900g – 49:90 kr/st', 'Minikalkon Ingelstakalkon – 59:90 kr/kg'] },
  { category: '🐟 Fisk & Skaldjur', items: ['Kallrökt/Gravad lax Falkenberg 300g – 69:90 kr/st', 'Vildfångad pinklax 4-pack 400g – 59:90 kr/st', 'Sprödbakad firre Garant 360g – 2 för 65:00 kr', 'Kolja ryggfilé Findus 360g – 99:00 kr/st'] },
  { category: '🥬 Frukt & Grönt', items: ['Satsumas I lösvikt – 19:90 kr/kg', 'Lime Brasilien – 1:00 kr/st', 'Butternutpumpa – 19:90 kr/kg (delad) / 14:90 kr/kg (hel)', 'Champinjoner 250g – 9:90 kr/st', 'Vitkål & Rödkål – 9:90 kr/kg', 'Sötpotatis – 14:90 kr/kg', 'Röda plommon – 29:90 kr/kg', 'Purjolök – 14:90 kr/kg', 'Avokado Klass 1 – 9:90 kr/st', 'Aubergine – 9:90 kr/st', 'Färska kryddor 15-50g – 9:90 kr/st'] },
  { category: '🧀 Mejeri, Ost & Bröd', items: ['Quattrocento Granarolo 150g – 24:90 kr/st', 'Salladsost Olympus 100g – 9:90 kr/st', 'Gräddost Arla 400g – 39:90 kr/st', 'Präst / Herrgård / Grevé Allerum 670g – 89:90 kr/st', 'Laktosfri vispgrädde Valio 5dl – 24:90 kr/st', 'Jarlsberg / Norvegia Tine – 99:00 kr/kg / 39:90 kr/st', 'Skogaholmslimpa 775g – 19:90 kr/st', 'Pane Napoletano Garant 250g – 14:90 kr/st', 'Vetekaka / Rågkaka Garant 900g – 19:90 kr/st'] },
  { category: '🍝 Skafferi & Övrigt', items: ['Barilla pasta 500g – 2 för 15:00 kr', 'La Molisana pasta 500g – 2 för 32:00 kr', 'Garant Eko Jasminris / Basmatiris 1kg – 34:90 kr - 39:90 kr', 'Barilla pastasås 400g – 2 för 35:00 kr', 'Knorr buljong – 2 för 20:00 kr', 'Schysst Käk Kebab / Kebabsås / Tillbehör – Från 19:90 kr'] }
];

// 5 Middagsrecept baserade på din lista
const willysRecipes = [
  {
    title: 'Klassisk Husmans-Blandfärsbiffar 🧆',
    offersUsed: ['Svensk blandfärs (49:90 kr/kg)', 'Champinjoner (9:90 kr)', 'Gräddost (39:90 kr)'],
    description: 'Saftiga pannbiffar gjorda på färs, serveras med en krämig svampsås på champinjoner och kokt potatis.',
    price: 'Ca 18 kr/portion'
  },
  {
    title: 'Krämig Teriyakikyckling med Jasminris 🍗',
    offersUsed: ['Kycklinglårfilé (49:90 kr)', 'Eko Jasminris (34:90 kr)', 'Purjolök (14:90 kr/kg)'],
    description: 'Mör kycklinglårfilé som steks med purjolök och soyasås, serverad över doftande jasminris.',
    price: 'Ca 20 kr/portion'
  },
  {
    title: 'Ugnstekt Lax med Dill & Citronsås 🐟',
    offersUsed: ['Vildfångad pinklax (59:90 kr)', 'Laktosfri vispgrädde (24:90 kr)', 'Färska kryddor (9:90 kr)'],
    description: 'Ugnsbakade laxfiléer med en mjuk gräddsås smaksatt med färsk dill och citronsaft.',
    price: 'Ca 25 kr/portion'
  },
  {
    title: 'Sprödbakad Fisk med Rostad Sötpotatis 🐠',
    offersUsed: ['Sprödbakad firre (2 för 65 kr)', 'Sötpotatis (14:90 kr/kg)', 'Avokado (9:90 kr)'],
    description: 'Frasig sprödbakad fisk som serveras tillsammans med krispiga sötpotatiswhiskers och en kall avokadoröra.',
    price: 'Ca 22 kr/portion'
  },
  {
    title: 'Långkokt Högrevsgryta med Höstgrönsaker 🍲',
    offersUsed: ['Högrev Prime (119:00 kr/kg)', 'Vitkål (9:90 kr/kg)', 'Knorr buljong (2 för 20 kr)'],
    description: 'En värmande och smakrik höstgryta med mörstekt högrev, vitkål, lök och en fyllig buljonggrund.',
    price: 'Ca 28 kr/portion'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('recipes');

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto font-sans bg-gray-50">
      <header className="text-center my-6">
        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Willys Erbjudanden
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2 text-gray-900">Veckans Rea-Middag 🛒</h1>
        <p className="text-gray-600 text-sm md:text-base">Recept och veckans alla fyndvaror samlade på ett ställe!</p>
      </header>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`py-2.5 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'recipes'
              ? 'bg-red-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          🍽️ 5 Rea-Middagar
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`py-2.5 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'offers'
              ? 'bg-red-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          🏷️ Alla Erbjudanden
        </button>
      </div>

      {activeTab === 'recipes' && (
        <div className="grid md:grid-cols-2 gap-6">
          {willysRecipes.map((recipe, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {recipe.offersUsed.map((offer, i) => (
                    <span key={i} className="text-xs font-semibold bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-md">
                      {offer}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{recipe.description}</p>
              </div>
              <div className="border-t pt-3 flex justify-between items-center text-sm font-bold text-gray-900">
                <span>{recipe.price}</span>
                <button className="bg-gray-900 hover:bg-gray-800 text-white text-xs px-3.5 py-2 rounded-lg transition-all">
                  Visa recept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'offers' && (
        <div className="space-y-6">
          {willysOffers.map((group, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-bold text-red-800 mb-3 border-b pb-2">{group.category}</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}