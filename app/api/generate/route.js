import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { storeId, rawText } = await req.json();

    const prompt = `
      Analysera följande text från ett veckoblad för en matbutik:
      "${rawText}"

      Returnera STRIKT ren JSON i följande format (inga andra tecken eller markdown):
      {
        "offers": [
          {"product_name": "Nötfärs 500g", "category": "Kött", "price": "59:90", "unit": "kr/st"}
        ],
        "recipes": [
          {
            "title": "Krämig Köttfärssås",
            "description": "Klassisk middag på veckans rea-köttfärs.",
            "cooking_time": 25,
            "servings": 4,
            "diet_type": "Alla",
            "ingredients": {
              "sale_items": ["Nötfärs 500g (59:90 kr)"],
              "pantry_items": ["Lök", "Krossade tomater", "Pasta", "Salt"]
            },
            "instructions": ["Hacka löken.", "Bryn färsen.", "Tillsätt tomater och koka pasta."]
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const data = JSON.parse(response.choices[0].message.content);

    // Rensa gamla erbjudanden för butiken innan nya läggs till
    await supabase.from('offers').delete().eq('store_id', storeId);
    await supabase.from('recipes').delete().eq('store_id', storeId);

    // Spara alla nya reavaror
    for (let offer of data.offers) {
      await supabase.from('offers').insert({ ...offer, store_id: storeId });
    }

    // Spara alla nya recept
    for (let recipe of data.recipes) {
      await supabase.from('recipes').insert({ ...recipe, store_id: storeId });
    }

    return NextResponse.json({ success: true, totalOffers: data.offers.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}