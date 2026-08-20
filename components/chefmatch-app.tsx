'use client'

import { useState } from 'react'
import { RecipeForm, type SearchFilters } from '@/components/recipe-form'
import { type RecipeMock } from '@/components/recipe-result'
import { ResultsSection } from '@/components/results-section'

export function ChefMatchApp() {
  const [searched, setSearched] = useState(false)
  const [recipes, setRecipes] = useState<RecipeMock[]>([]) // Cambiamos a un array
  const [loading, setLoading] = useState(false)

  async function handleSearch(filters: SearchFilters) {
    setLoading(true)
    setSearched(true)

    try {
      // Llamamos a tu webhook usando las variables de entorno
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-ChefMatch-Key': process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({
          ingredientes: filters.ingredients,
          tiempoMaxMin: filters.time,
          caloriasMax: filters.calories,
          restricciones: filters.restrictions,
          nivel: filters.level,
        }),
      })

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

      const data = await response.json()
      
      // El JSON que devuelve tu n8n está dentro de un array, agarramos el primer elemento
      const resultadosAPI = data.resultados || data[0]?.resultados || []
      
      // Traducimos el formato de n8n al formato que esperan tus componentes visuales
      const mappedRecipes: RecipeMock[] = resultadosAPI.map((res: any) => ({
        recetaId: res.recetaId,
        title: res.titulo,
        summary: `Especialidad de cocina ${res.cocina} para ${res.porcionesReceta} porciones.`,
        time: res.tiempoMin,
        calories: res.caloriasEstimadas,
        level: res.dificultadDeclarada,
        score: res.puntaje,
        pros: res.fortalezas,
        // Unificamos las consideraciones y los ingredientes que faltan
        cons: [...res.consideraciones, ...res.faltantes.map((f: string) => `Falta: ${f}`)],
        explanation: res.reasoning,
      }))

      setRecipes(mappedRecipes)
    } catch (error) {
      console.error("Error conectando con ChefMatch AI:", error)
      setRecipes([]) // Si se rompe, mostramos la pantalla de "no hay recetas"
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <RecipeForm onSearch={handleSearch} />
      
      {loading ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center animate-pulse">
          <p className="font-display text-lg font-bold text-muted-foreground">
            Cocinando resultados...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            La IA está evaluando las mejores opciones para vos.
          </p>
        </div>
      ) : (
        <ResultsSection searched={searched} recipes={recipes} />
      )}
    </div>
  )
}