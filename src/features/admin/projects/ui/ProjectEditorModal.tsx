import { useEffect, useState } from 'react'
import type { Project } from '@/entities/project/model/Project'
import { ProjectStatus } from '@/entities/project/model/ProjectStatus'
import { X, Plus, Minus, Globe, Github } from 'lucide-react'

interface Props {
  project: Project | null
  onSave: (project: Project) => Promise<void>
  onClose: () => void
}

export function ProjectEditorModal({ project, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Project | null>(null)
  const [techInput, setTechInput] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (project) {
      setDraft(project)
    }
  }, [project])

  if (!draft) return null

  const update = <K extends keyof Project>(key: K, value: Project[K]) => {
    setDraft(prev => (prev ? { ...prev, [key]: value } : prev))
  }

  const addUnique = (list: string[], value: string) =>
    list.includes(value) ? list : [...list, value]

  const removeItem = (list: string[], value: string) =>
    list.filter(item => item !== value)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(draft)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {project ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">

            {/* Title + Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                className="input"
                placeholder="Sarlavha"
                value={draft.title}
                onChange={e => update('title', e.target.value)}
                required
              />

              <select
                className="input"
                value={draft.status}
                onChange={e => update('status', e.target.value as ProjectStatus)}
              >
                {Object.values(ProjectStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <textarea
              className="input"
              rows={3}
              placeholder="Qisqa tavsif"
              value={draft.description}
              onChange={e => update('description', e.target.value)}
              required
            />

            {/* Content */}
            <textarea
              className="input font-mono text-sm"
              rows={8}
              placeholder="Markdown kontent"
              value={draft.content ?? ''}
              onChange={e => update('content', e.target.value)}
            />

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-2 items-center">
                <Github className="w-5 h-5 text-gray-400" />
                <input
                  className="input flex-1"
                  placeholder="GitHub URL"
                  value={draft.githubUrl ?? ''}
                  onChange={e => update('githubUrl', e.target.value)}
                />
              </div>

              <div className="flex gap-2 items-center">
                <Globe className="w-5 h-5 text-gray-400" />
                <input
                  className="input flex-1"
                  placeholder="Live URL"
                  value={draft.liveUrl ?? ''}
                  onChange={e => update('liveUrl', e.target.value)}
                />
              </div>
            </div>

            {/* Technologies */}
            <TagEditor
              label="Texnologiyalar"
              items={draft.technologies ?? []}
              input={techInput}
              setInput={setTechInput}
              onAdd={value => update('technologies', addUnique(draft.technologies ?? [], value))}
              onRemove={value => update('technologies', removeItem(draft.technologies ?? [], value))}
            />

            {/* Tags */}
            <TagEditor
              label="Teglar"
              items={draft.tags ?? []}
              input={tagInput}
              setInput={setTagInput}
              onAdd={value => update('tags', addUnique(draft.tags ?? [], value))}
              onRemove={value => update('tags', removeItem(draft.tags ?? [], value))}
            />

            {/* Featured */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={e => update('featured', e.target.checked)}
              />
              Featured loyiha
            </label>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Bekor qilish
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saqlanmoqda…' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Small UI helper ---------- */

function TagEditor({
  label,
  items,
  input,
  setInput,
  onAdd,
  onRemove
}: {
  label: string
  items: string[]
  input: string
  setInput: (v: string) => void
  onAdd: (v: string) => void
  onRemove: (v: string) => void
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex gap-2 mb-2">
        <input
          className="input flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              input && onAdd(input)
              setInput('')
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            input && onAdd(input)
            setInput('')
          }}
          className="btn-icon"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="tag">
            {item}
            <button type="button" onClick={() => onRemove(item)}>
              <Minus className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
