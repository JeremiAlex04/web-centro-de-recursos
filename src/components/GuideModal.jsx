import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Paperclip, TriangleAlert, X } from 'lucide-react'
import { copyText } from '../utils.js'
import { categoryIcons } from '../iconMap.jsx'

function Step({ index, text, cmd }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (await copyText(cmd)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <li className="flex items-start gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-sky-600 text-xs font-bold text-white">
        {index}
      </span>
      <div className="flex flex-col gap-1.5 pt-0.5 text-sm leading-relaxed">
        <span>{text}</span>
        {cmd && (
          <button
            type="button"
            onClick={handleCopy}
            title="Clic para copiar"
            className={`inline-flex w-fit cursor-copy items-center gap-1.5 rounded-md border border-dashed bg-[#0a0e15] px-3 py-1.5 font-mono text-xs transition ${
              copied ? 'border-green-400 text-green-400' : 'border-line text-cyan-300 hover:border-accent'
            }`}
          >
            {copied ? <Check size={13} /> : null}
            {copied ? 'Copiado' : cmd}
          </button>
        )}
      </div>
    </li>
  )
}

export default function GuideModal({ resource, category, typeLabels, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const CategoryIcon = categoryIcons[category?.id]

  return (
    <div
      className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl animate-slide-up flex-col gap-3.5 overflow-y-auto rounded-3xl border border-line bg-panel p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line bg-card text-mute transition hover:border-accent hover:text-white"
        >
          <X size={17} />
        </button>

        <div className="flex flex-wrap items-center justify-between gap-2 pr-12">
          <span
            style={{ '--cat': category?.color || '#8b9bb4' }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cat)]/40 bg-[var(--cat)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--cat)]"
          >
            {CategoryIcon && <CategoryIcon size={13} />}
            {category?.name}
          </span>
          <span className="rounded-full border border-line bg-mute/10 px-2.5 py-1 text-xs font-semibold text-mute">
            {typeLabels[resource.type]}
          </span>
        </div>

        <h2 className="pr-12 text-2xl font-bold">{resource.name}</h2>
        <p className="leading-relaxed text-mute">{resource.description}</p>

        {resource.requirement && (
          <p className="inline-flex items-center gap-1.5 self-start rounded-lg bg-amber-400/10 px-3 py-1.5 text-sm text-amber-400">
            <TriangleAlert size={15} />
            Requiere: {resource.requirement}
          </p>
        )}

        {resource.command && (
          <div className="overflow-x-auto rounded-lg border border-line bg-[#0a0e15] px-3 py-2 font-mono text-xs">
            <code className="whitespace-nowrap text-cyan-300">{resource.command}</code>
          </div>
        )}

        {resource.steps && (
          <ol className="flex flex-col gap-3.5">
            {resource.steps.map((s, i) => (
              <Step key={i} index={i + 1} text={s.text} cmd={s.cmd} />
            ))}
          </ol>
        )}

        {resource.file && (
          <div className="break-all rounded-lg border border-dashed border-line bg-card px-3.5 py-2.5 text-sm text-mute">
            <Paperclip size={15} className="mr-1.5 inline align-[-2px]" />
            Archivo en el repositorio: <code className="text-cyan-300">{resource.file}</code>
          </div>
        )}

        {resource.url && (
          <a
            className="inline-flex w-fit items-center gap-1 self-start rounded-lg bg-gradient-to-br from-accent to-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resource.urlLabel || 'Visitar sitio'}
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </div>
  )
}
