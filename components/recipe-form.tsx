'use client'

import {
  Carrot,
  Clock,
  Flame,
  Leaf,
  MilkOff,
  Plus,
  Search,
  Signal,
  Sprout,
  WheatOff,
  X,
} from 'lucide-react'
import { useMemo, useState, type KeyboardEvent } from 'react'

export type SearchFilters = {
  ingredients: string[]
  time: number
  calories: number
  restrictions: string[]
  level: string
}

const RESTRICTIONS = [
  { id: 'sin_gluten', label: 'Sin gluten', icon: WheatOff },
  { id: 'sin_lactosa', label: 'Sin lactosa', icon: MilkOff },
  { id: 'vegetariano', label: 'Vegetariano', icon: Carrot },
  { id: 'vegano', label: 'Vegano', icon: Leaf },
  { id: 'sin_frutos_secos', label: 'Sin frutos secos', icon: Sprout },
] as const

const LEVELS = [
  { id: 'principiante', label: 'Principiante' },
  { id: 'intermedio', label: 'Intermedio' },
  { id: 'avanzado', label: 'Avanzado' },
] as const

export function RecipeForm({
  onSearch,
}: {
  onSearch: (filters: SearchFilters) => void
}) {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [time, setTime] = useState(45)
  const [calories, setCalories] = useState(600)
  const [restrictions, setRestrictions] = useState<string[]>([])
  const [level, setLevel] = useState<string>('principiante')

  const isValid = useMemo(() => ingredients.length > 0, [ingredients])

  function addIngredient() {
    const value = draft.trim().toLowerCase()
    if (!value) return
    if (!ingredients.includes(value)) {
      setIngredients((prev) => [...prev, value])
    }
    setDraft('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Respetar composición de IMEs (CJK) y Safari (keyCode 229).
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    } else if (e.key === 'Backspace' && !draft && ingredients.length) {
      setIngredients((prev) => prev.slice(0, -1))
    }
  }

  function removeIngredient(item: string) {
    setIngredients((prev) => prev.filter((i) => i !== item))
  }

  function toggleRestriction(id: string) {
    setRestrictions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onSearch({ ingredients, time, calories, restrictions, level })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Ingredientes */}
      <div>
        <label
          htmlFor="ingredient-input"
          className="flex items-center gap-2 font-display text-sm font-bold text-foreground"
        >
          <Carrot className="size-4 text-primary" />
          Ingredientes
          <span className="font-sans text-xs font-normal text-muted-foreground">
            (Enter para agregar)
          </span>
        </label>

        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl border border-input bg-background p-2 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
          {ingredients.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full bg-primary/12 py-1 pl-3 pr-1 text-sm font-semibold capitalize text-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIngredient(item)}
                className="flex size-5 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/20 hover:text-primary"
                aria-label={`Quitar ${item}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
          <div className="flex min-w-[8rem] flex-1 items-center gap-1">
            <input
              id="ingredient-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addIngredient}
              placeholder={
                ingredients.length ? 'Agregar otro…' : 'Ej: tomate, huevo, arroz…'
              }
              className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={addIngredient}
              disabled={!draft.trim()}
              className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label="Agregar ingrediente"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        {!isValid && (
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Agregá al menos un ingrediente para buscar recetas.
          </p>
        )}
      </div>

      {/* Sliders */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <SliderField
          id="time"
          icon={Clock}
          label="Tiempo máximo"
          value={time}
          min={5}
          max={240}
          step={5}
          suffix="min"
          onChange={setTime}
        />
        <SliderField
          id="calories"
          icon={Flame}
          label="Calorías máximo"
          value={calories}
          min={100}
          max={2000}
          step={50}
          suffix="kcal"
          onChange={setCalories}
        />
      </div>

      {/* Restricciones */}
      <fieldset className="mt-6">
        <legend className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
          <Leaf className="size-4 text-secondary" />
          Restricciones
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {RESTRICTIONS.map(({ id, label, icon: Icon }) => {
            const active = restrictions.includes(id)
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleRestriction(id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-secondary bg-secondary text-secondary-foreground'
                    : 'border-border bg-background text-foreground hover:border-secondary/50 hover:bg-accent'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Nivel */}
      <fieldset className="mt-6">
        <legend className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
          <Signal className="size-4 text-primary" />
          Nivel
        </legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {LEVELS.map(({ id, label }) => {
            const active = level === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setLevel(id)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-accent'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-display text-base font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <Search className="size-5" />
        Buscar recetas
      </button>
    </form>
  )
}

function SliderField({
  id,
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  id: string
  icon: typeof Clock
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="flex items-center gap-2 font-display text-sm font-bold text-foreground"
        >
          <Icon className="size-4 text-primary" />
          {label}
        </label>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm font-bold tabular-nums text-foreground">
          {value} {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {suffix}
        </span>
        <span>
          {max} {suffix}
        </span>
      </div>
    </div>
  )
}
