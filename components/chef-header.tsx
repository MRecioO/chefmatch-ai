import { ChefHat, Sparkles } from 'lucide-react'

export function ChefHeader() {
  return (
    <header className="border-b border-border bg-card/60">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 py-10 text-center">
        <div className="flex items-center gap-3">
          <span
            className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"
            aria-hidden="true"
          >
            <ChefHat className="size-7" />
          </span>
          <div className="text-left">
            <p className="font-display text-xl font-extrabold leading-none tracking-tight text-foreground">
              ChefMatch
              <span className="ml-1 text-primary">AI</span>
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-secondary">
              <Sparkles className="size-3" />
              Recetas hechas a tu medida
            </p>
          </div>
        </div>

        <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {'¿Qué hay en tu heladera?'}
        </h1>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          Cargá los ingredientes que tenés a mano y dejá que ChefMatch te
          sugiera la receta ideal según tu tiempo, calorías y preferencias.
        </p>
      </div>
    </header>
  )
}
