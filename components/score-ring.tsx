'use client'

import { useEffect, useRef, useState } from 'react'

type ScoreRingProps = {
  score: number
  label?: string
  size?: number
}

export function ScoreRing({
  score,
  label = 'de compatibilidad',
  size = 132,
}: ScoreRingProps) {
  const target = Math.max(0, Math.min(100, score))
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // Animate on mount / when entering view.
  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1200

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div
      ref={ref}
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Puntaje ${target} sobre 100 ${label}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 60ms linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-extrabold tabular-nums text-foreground">
          {progress}
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
          puntos
        </span>
      </div>
    </div>
  )
}
