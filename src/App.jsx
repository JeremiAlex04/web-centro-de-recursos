import { useMemo, useState } from 'react'
import { ArrowUpDown, LayoutGrid, List, Wrench, SearchX, X } from 'lucide-react'
import { categories, types, typeLabels, resources } from './data/resources.js'
import { categoryIcons, typeIcons } from './iconMap.jsx'
import ResourceCard from './components/ResourceCard.jsx'
import GuideModal from './components/GuideModal.jsx'
import Reveal from './components/Reveal.jsx'

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const chipBase =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all duration-150 hover:-translate-y-px'
const chipOff = 'border-line bg-card text-mute hover:text-ink'
const typeChipBase =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-150 hover:-translate-y-px'
const typeChipOff = 'border-line bg-card text-mute hover:border-accent hover:text-ink'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todos')
  const [type, setType] = useState('todos')
  const [activeTags, setActiveTags] = useState([])
  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('default')
  const [selected, setSelected] = useState(null)

  const toggleTag = (tag) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return resources.filter((r) => {
      if (category !== 'todos' && r.category !== category) return false
      if (type !== 'todos' && r.type !== type) return false
      if (activeTags.length > 0 && !activeTags.every((t) => r.tags?.includes(t))) return false
      if (!q) return true
      const haystack = normalize(
        [r.name, r.description, r.source, ...(r.tags || [])].join(' '),
      )
      return q.split(/\s+/).every((word) => haystack.includes(word))
    })
  }, [query, category, type, activeTags])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    if (sort === 'asc') arr.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    if (sort === 'desc') arr.sort((a, b) => b.name.localeCompare(a.name, 'es'))
    return arr
  }, [filtered, sort])

  const countByCategory = useMemo(() => {
    const counts = { todos: resources.length }
    for (const c of categories) {
      if (c.id === 'todos') continue
      counts[c.id] = resources.filter((r) => r.category === c.id).length
    }
    return counts
  }, [])

  const activeCategory = categories.find((c) => c.id === category)
  const isAllCategories = activeCategory?.id === 'todos'
  const HeroIcon = categoryIcons[activeCategory?.id] ?? categoryIcons.todos

  const clearAll = () => {
    setQuery('')
    setCategory('todos')
    setType('todos')
    setActiveTags([])
    setSort('default')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-line bg-night/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-card shadow-[0_0_18px_rgba(6,182,212,0.3)]">
              <Wrench size={22} className="text-accent" />
            </span>
            <div>
              <h1 className="text-lg tracking-wide">Centro de Recursos Tecnológicos</h1>
              <p className="text-sm text-mute">Repositorio de herramientas, guías y utilidades</p>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-mute sm:flex">
            <span>
              <strong className="font-semibold text-ink">{resources.length}</strong> recursos
            </span>
            <span>
              <strong className="font-semibold text-ink">{categories.length - 1}</strong> categorías
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5">
        <section className="py-12 pb-6 text-center">
          <h2
            className={`inline-flex items-center justify-center gap-3 text-3xl font-bold md:text-4xl${
              isAllCategories ? '' : ' text-[var(--cat)]'
            }`}
            style={isAllCategories ? undefined : { '--cat': activeCategory?.color }}
          >
            <HeroIcon size={30} strokeWidth={1.8} />
            {activeCategory?.name}
          </h2>
          <p className="mx-auto mt-2 mb-7 max-w-xl leading-relaxed text-mute">
            {activeCategory?.description}
          </p>

          <input
            type="search"
            className="w-full max-w-xl rounded-full border border-line bg-card px-5 py-3.5 outline-none transition placeholder:text-mute/70 focus:border-accent focus:ring-4 focus:ring-accent/20"
            placeholder="Buscar recurso, herramienta o guía…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar recursos"
          />

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id]
              const active = category === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  style={{ '--cat': c.color || '#06b6d4' }}
                  onClick={() => setCategory(c.id)}
                  className={`${chipBase} ${
                    active
                      ? 'border-[var(--cat)] bg-[var(--cat)]/15 font-medium text-white'
                      : `${chipOff} hover:border-[var(--cat)]`
                  }`}
                >
                  <Icon size={15} />
                  {c.name}
                  <span className="rounded-full bg-white/10 px-2 py-px text-xs">
                    {countByCategory[c.id]}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-2.5 flex flex-wrap justify-center gap-2">
            {types.map((t) => {
              const Icon = typeIcons[t.id]
              const active = type === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`${typeChipBase} ${
                    active ? 'border-accent bg-accent/15 font-medium text-white' : typeChipOff
                  }`}
                >
                  <Icon size={14} />
                  {t.name}
                </button>
              )
            })}
          </div>

          {activeTags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-wider text-mute">Etiquetas:</span>
              {activeTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-cyan-300 transition hover:bg-accent/20"
                >
                  #{t}
                  <X size={12} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="cursor-pointer text-xs text-mute underline underline-offset-2 hover:text-ink"
              >
                Limpiar
              </button>
            </div>
          )}
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="text-sm text-mute">
            <strong className="font-semibold text-ink">{sorted.length}</strong>{' '}
            {sorted.length === 1 ? 'recurso' : 'recursos'}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-line">
              {[
                ['grid', LayoutGrid, 'Vista cuadrícula'],
                ['list', List, 'Vista lista'],
              ].map(([mode, Icon, label]) => (
                <button
                  key={mode}
                  type="button"
                  title={label}
                  aria-label={label}
                  onClick={() => setView(mode)}
                  className={`cursor-pointer px-2.5 py-1.5 transition ${
                    view === mode ? 'bg-cardh text-ink' : 'bg-card text-mute hover:text-ink'
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <label className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm text-mute">
              <ArrowUpDown size={14} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer bg-transparent pr-1 text-sm outline-none"
                aria-label="Ordenar recursos"
              >
                <option value="default" className="bg-panel">Predeterminado</option>
                <option value="asc" className="bg-panel">Nombre A-Z</option>
                <option value="desc" className="bg-panel">Nombre Z-A</option>
              </select>
            </label>
          </div>
        </div>

        <section
          className={
            view === 'grid'
              ? 'grid grid-cols-1 gap-4 py-6 pb-14 sm:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col gap-3 py-6 pb-14'
          }
        >
          {sorted.map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i, 8) * 60}>
              <ResourceCard
                resource={r}
                view={view}
                category={categories.find((c) => c.id === r.category)}
                typeLabels={typeLabels}
                activeTags={activeTags}
                onTag={toggleTag}
                onOpen={setSelected}
              />
            </Reveal>
          ))}
        </section>

        {sorted.length === 0 && (
          <div className="pb-16 pt-4 text-center text-mute">
            <SearchX size={44} strokeWidth={1.5} className="mx-auto mb-3" />
            <p>No se encontraron recursos para tu búsqueda.</p>
            <button
              type="button"
              className="mt-4 cursor-pointer rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent"
              onClick={clearAll}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-line bg-panel/55">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-2 px-5 py-4 text-sm text-mute">
          <span className="inline-flex items-center gap-1.5">
            <Wrench size={15} className="text-accent" />
            Centro de Recursos Tecnológicos
          </span>
          <span>Catálogo estático · Mantenimiento y soporte técnico</span>
        </div>
      </footer>

      {selected && (
        <GuideModal
          resource={selected}
          category={categories.find((c) => c.id === selected.category)}
          typeLabels={typeLabels}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
