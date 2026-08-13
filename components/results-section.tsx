import { UtensilsCrossed } from 'lucide-react'
import { RecipeResult, type RecipeMock } from '@/components/recipe-result'

export function ResultsSection({
  searched,
  recipe,
}: {
  searched: boolean
  recipe: RecipeMock | null
}) {
  return (
    <section aria-live="polite" className="mt-8">
      <h2 className="mb-4 font-display text-lg font-bold text-foreground">
        Resultados
      </h2>

      {searched && recipe ? (
        <RecipeResult recipe={recipe} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <span
            className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground"
            aria-hidden="true"
          >
            <UtensilsCrossed className="size-7" />
          </span>
          <p className="mt-4 font-display text-base font-bold text-foreground">
            Todavía no hay recetas
          </p>
          <p className="mt-1 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            Completá el formulario con tus ingredientes y tocá{' '}
            <span className="font-semibold text-primary">Buscar recetas</span>{' '}
            para ver aquí tus coincidencias.
          </p>
        </div>
      )}
    </section>
  )
}
