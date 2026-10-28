'use client';
import { useState } from 'react';

const sampleRecipes = [
  {
    title: 'Krämig Kycklingpasta 🍗',
    offer: 'Kycklingfilé 59:90 kr/kg (Coop)',
    description: 'En snabb och god pasta med stekta kycklingstrimlor, grädde och vitlök.',
    price: 'Ca 25 kr/portion'
  },
  {
    title: 'Lax i ugn med citronsås 🐟',
    offer: 'Laxfilé 4-pack 49:90 kr (ICA)',
    description: 'Ugnstekt laxfilé som serveras med kokt potatis och en fräsch citronsås.',
    price: 'Ca 30 kr/portion'
  },
  {
    title: 'Vegetarisk Köttfärssås 🍝',
    offer: 'Krossade tomater 3 för 20 kr (Willys)',
    description: 'En fyllig linssoppa/sås med krossade tomater, morötter och italienska kryddor.',
    price: 'Ca 15 kr/portion'
  }
];

export default function Home() {
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto font-sans">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">Veckans Rea-Middag 🛒🛒</h1>
        <p className="text-gray-600">Hitta recept baserade på veckans erbjudanden!</p>
      </header>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowRecipes(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all cursor-pointer"
        >
          Hämta veckans rea-middagar
        </button>
      </div>

      {showRecipes && (
        <div className="grid md:grid-cols-2 gap-6">
          {sampleRecipes.map((recipe, index) => (
            <div key={index} className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition-all">
              <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full mb-2 inline-block">
                {recipe.offer}
              </span>
              <h2 className="text-xl font-bold my-2">{recipe.title}</h2>
              <p className="text-gray-700 text-sm mb-4">{recipe.description}</p>
              <p className="text-sm font-bold text-gray-900">{recipe.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}