'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const generateRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', { method: 'POST' });
      const data = await res.json();
      if (data.recipes) {
        setRecipes(data.recipes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto font-sans">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">Veckans Rea-Middag 🛒🛒</h1>
        <p className="text-gray-600">Hitta recept baserade på veckans erbjduanden!</p>
      </header>

      <div className="flex justify-center mb-8">
        <button
          onClick={generateRecipes}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all disabled:opacity-50"
        >
          {loading ? 'Hämtar erbjudanden...' : 'Hämta veckans rea-middagar'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recipes.map((recipe, index) => (
          <div key={index} className="border rounded-xl p-6 shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-2">{recipe.title || recipe.name}</h2>
            <p className="text-gray-700 text-sm mb-4">{recipe.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}