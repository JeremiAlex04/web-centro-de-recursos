import { useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, Copy } from 'lucide-react'
import { copyText } from '../utils.js'
import { categoryIcons } from '../iconMap.jsx'

function CommandBox({ command }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (await copyText(command)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-lg border border-line bg-[#0a0e15] px-3 py-2 font-mono text-xs">
      <code className="whitespace-nowrap text-cyan-300">{command}</code>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
          copied
            ? 'border-green-400 text-green-400'
            : 'border-line bg-card text-mute hover:border-green-400 hover:text-green-400'
        }`}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

export default function ResourceCard({
  resource,
  view = 'grid',
  category,
  typeLabels,
  activeTags = [],
  onTag,
  onOpen,
}) {
  const clickable = Boolean(resource.steps || resource.file)
  const listMode = view === 'list'
  const CategoryIcon = categoryIcons[category?.id]

  return (
    <article
      onClick={() => clickable && onOpen(resource)}
      style={{ '--cat': category?.color || '#8b9bb4' }}
      className={`h-full rounded-2xl border border-line bg-card transition-all duration-200 hover:bg-cardh hover:border-[var(--cat)]/60 ${
        listMode ? 'flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6' : 'flex flex-col gap-3 p-5'
      } ${clickable ? '-translate-y-px cursor-pointer hover:-translate-y-1' : ''}`}
    >
      <div className="flex min-w-0 grow flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cat)]/40 bg-[var(--cat)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--cat)]">
            {CategoryIcon && <CategoryIcon size={13} />}
            {category?.name}
          </span>
          <span className="rounded-full border border-line bg-mute/10 px-2.5 py-1 text-xs font-semibold text-mute">
            {typeLabels[resource.type]}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold">{resource.name}</h3>
          <p
            className={`mt-1 text-sm leading-relaxed text-mute ${
              listMode ? 'line-clamp-2' : ''
            }`}
          >
            {resource.description}
          </p>
        </div>

        {resource.command && (
          <div onClick={(e) => e.stopPropagation()}>
            <CommandBox command={resource.command} />
          </div>
        )}

        {resource.tags?.length > 0 && (
          <div onClick={(e) => e.stopPropagation()} className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => {
              const active = activeTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  title={`Filtrar por "${tag}"`}
                  onClick={() => onTag?.(tag)}
                  className={`cursor-pointer font-mono text-xs transition ${
                    active
                      ? 'text-cyan-300 underline underline-offset-4'
                      : 'text-cyan-300/70 hover:text-cyan-300 hover:underline hover:underline-offset-4'
                  }`}
                >
                  #{tag}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div
        className={`flex shrink-0 gap-2.5 ${listMode ? 'sm:w-44 sm:flex-col' : 'mt-1 flex-wrap'}`}
      >
        {resource.url && (
          <a
            className={`inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-accent to-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 ${
              listMode ? 'w-full' : ''
            }`}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {resource.urlLabel || 'Visitar sitio'}
            <ArrowUpRight size={15} />
          </a>
        )}
        {clickable && (
          <button
            type="button"
            className={`inline-flex items-center justify-center gap-1 rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent ${
              listMode ? 'w-full' : ''
            }`}
            onClick={() => onOpen(resource)}
          >
            Ver detalles
            <ChevronRight size={15} />
          </button>
        )}
      </div>
    </article>
  )
}
