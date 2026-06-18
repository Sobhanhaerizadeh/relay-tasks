import { useState } from 'react'

export type Priority = 'low' | 'medium' | 'high'

export interface Task {
    id: string,
    title: string
    description: string
    priority: Priority
    dueDate: string
    createdAt: string
}

interface TaskModalProps {
    onClose: () => void
    onSave: (task: Task) => void
}

const priorityLabels: Record<Priority, string> = {
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
}

function TaskModal({ onClose, onSave }: TaskModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<Priority>('medium')
    const [dueDate, setDueDate] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newErrors: string[] = []
        if (!title.trim()) newErrors.push('Titel darf nicht leer sein.')
        if (newErrors.length > 0) {
            setErrors(newErrors)
            return
        }
        onSave({
            id: crypto.randomUUID(),
            title: title.trim(),
            description: description.trim(),
            priority,
            dueDate: dueDate || new Date().toISOString(),
            createdAt: new Date().toISOString(),
        })
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-gray-900 rounded-3xl shadow-2xl shadow-black/40 w-full max-w-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-2xl font-bold">Neue Aufgabe</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
                        aria-label="Schließen"
                    >
                        ✕
                    </button>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Titel *
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                            placeholder="Aufgabentitel"
                            autoFocus
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Beschreibung
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none resize-none h-24"
                            placeholder="Optionale Beschreibung"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Priorität
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                        >
                            {(Object.keys(priorityLabels) as Priority[]).map((p) => (
                                <option key={p} value={p}>{priorityLabels[p]}</option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Fälligkeitsdatum
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                        />
                    </label>

                    {errors.length > 0 && (
                        <div className="text-red-400 text-sm font-medium">
                            {errors.map((err, i) => <p key={i}>{err}</p>)}
                        </div>
                    )}

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-2xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-semibold transition-all duration-200"
                        >
                            Abbrechen
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-200"
                        >
                            Erstellen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal
