import { UtensilsCrossed } from 'lucide-react'
import { RecipeResult, type RecipeMock } from '@/components/recipe-result'

export function ResultsSection({
  searched,
  recipes, // ¡Acá está el cambio clave! Pasó de singular a plural
}: {
  searched: boolean
  recipes: RecipeMock[] // Y acá le decimos a TypeScript que es un Array
}) {
  return (
    <section aria-live="polite" className="mt-8">
      <h2 className="mb-4 font-display text-lg font-bold text-foreground">
        Resultados
      </h2>

      {searched && recipes.length > 0 ? (
        <div className="flex flex-col gap-6">
          {recipes.map((recipe) => (
            <RecipeResult key={recipe.recetaId} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <span
            className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground"
            aria-hidden="true"
          >
            <UtensilsCrossed className="size-7" />
          </span>
          <p className="mt-4 font-display text-base font-bold text-foreground">
            {searched && recipes.length === 0 
              ? 'No encontramos recetas con esos filtros' 
              : 'Todavía no hay recetas'}
          </p>
          <p className="mt-1 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            {searched && recipes.length === 0 
              ? 'Intentá sacar alguna restricción o agregar más ingredientes.'
              : 'Completá el formulario con tus ingredientes y tocá Buscar recetas para ver aquí tus coincidencias.'}
          </p>
        </div>
      )}
    </section>
  )
}