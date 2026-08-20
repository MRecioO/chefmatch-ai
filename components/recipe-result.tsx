import { Clock, Flame, Signal, ThumbsDown, ThumbsUp } from 'lucide-react'
import { ScoreRing } from '@/components/score-ring'

export type RecipeMock = {
  recetaId: number
  title: string
  summary: string
  time: number
  calories: number
  level: string
  score: number
  pros: string[]
  cons: string[]
  explanation: string
}

export function RecipeResult({ recipe }: { recipe: RecipeMock }) {
  const meta = [
    { icon: Clock, label: `${recipe.time} min` },
    { icon: Flame, label: `${recipe.calories} kcal` },
    { icon: Signal, label: recipe.level },
  ]

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-6 border-b border-border bg-accent/40 p-6 sm:flex-row sm:items-center">
        <ScoreRing score={recipe.score} />
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            Mejor coincidencia
          </span>
          <h3 className="mt-3 text-balance font-display text-2xl font-extrabold tracking-tight text-foreground">
            {recipe.title}
          </h3>
          <p className="mt-1 text-pretty leading-relaxed text-muted-foreground">
            {recipe.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold capitalize text-foreground"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-secondary/25 bg-secondary/10 p-4">
          <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-secondary">
            <ThumbsUp className="size-4" />
            A favor
          </h4>
          <ul className="mt-3 space-y-2">
            {recipe.pros.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-destructive">
            <ThumbsDown className="size-4" />
            En contra
          </h4>
          <ul className="mt-3 space-y-2">
            {recipe.cons.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 pb-6">
        <h4 className="pt-4 font-display text-sm font-bold uppercase tracking-wide text-foreground">
          Por qué te la recomendamos
        </h4>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {recipe.explanation}
        </p>
      </div>
    </article>
  )
}
