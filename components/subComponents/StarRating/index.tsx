'use client'

import React, { useId } from 'react'

type Props = {
  value?: number
  defaultValue?: number
  onChange?: (v: number) => void
  readOnly?: boolean
  name?: string
  size?: number
}

export default function StarRating({
  value,
  defaultValue = 0,
  onChange,
  readOnly = false,
  name,
  size = 24
}: Props) {
  const id = useId()
  const current = value ?? defaultValue

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Classificação</legend>
      <div
        className="flex items-center"
        role="radiogroup"
        aria-label="Classificação"
      >
        {[1, 2, 3, 4, 5].map(v => {
          const inputName = name ?? `star-${id}`
          const checked = current === v
          const filled = v <= current
          return (
            <label
              key={v}
              className="inline-flex items-center cursor-pointer"
              aria-label={`${v} estrelas`}
            >
              <input
                type="radio"
                name={inputName}
                value={String(v)}
                checked={checked}
                onChange={() => !readOnly && onChange?.(v)}
                disabled={readOnly}
                className="sr-only"
                aria-hidden="true"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  filled ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }
                aria-hidden="true"
              >
                <path d="M12 .587l3.668 7.431L23.5 9.75l-5.5 5.36L19.335 24 12 20.013 4.665 24l1.335-8.89L.5 9.75l7.832-1.732z" />
              </svg>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
