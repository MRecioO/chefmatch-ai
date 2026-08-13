'use client'

import { useState } from 'react'
import { RecipeForm, type SearchFilters } from '@/components/recipe-form'
import { type RecipeMock } from '@/components/recipe-result'
import { ResultsSection } from '@/components/results-section'

function buildMockRecipe(filters: SearchFilters): RecipeMock {
  const [first, second] = filters.ingredients
  return {
    title: 'Salteado de vegetales con arroz integral',
    summary: `Un plato colorido y equilibrado que aprovecha ${
      first ?? 'tus ingredientes'
    }${second ? ` y ${second}` : ''}.`,
    time: Math.min(filters.time, 30),
    calories: Math.min(filters.calories, 520),
    level: filters.level,
    score: 87,
    pros: [
      'Usa la mayoría de los ingredientes que cargaste',
      'Se prepara dentro de tu tiempo disponible',
      'Aporta fibra y vegetales de estación',
      'Apto para las restricciones seleccionadas',
    ],
    cons: [
      'Requiere un wok o sartén grande para mejor cocción',
      'El arroz integral suma unos minutos de cocción previa',
    ],
    explanation:
      'Elegimos esta receta porque combina casi todos los ingredientes que tenés en tu heladera y se ajusta muy bien a tu tiempo y objetivo de calorías. El salteado rápido conserva los nutrientes de los vegetales y respeta tus restricciones alimentarias, mientras que el arroz integral aporta saciedad sin excederse en calorías. Es una opción ideal para tu nivel, con pasos simples y un resultado sabroso.',
  }
}

export function ChefMatchApp() {
  const [searched, setSearched] = useState(false)
  const [recipe, setRecipe] = useState<RecipeMock | null>(null)

  function handleSearch(filters: SearchFilters) {
    setRecipe(buildMockRecipe(filters))
    setSearched(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <RecipeForm onSearch={handleSearch} />
      <ResultsSection searched={searched} recipe={recipe} />
    </div>
  )
}
