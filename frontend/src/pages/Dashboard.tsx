import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskModal, { type Task } from '../components/TaskModal'
import { createTask, getTasks, type ApiTask } from '../services/api'

const statusColors: Record<string, string> = {
    open: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    in_progress: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    done: 'bg-green-500/20 text-green-300 border border-green-500/30',
}

const statusLabels: Record<string, string> = {
    open: 'Offen',
    in_progress: 'In Arbeit',
    done: 'Erledigt',
}

function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState<ApiTask[]>([])
    const [error, setError] = useState('')

    // Beim Öffnen: alle Aufgaben vom Backend laden
    useEffect(() => {
        getTasks()
            .then(setTasks)
            .catch(() => setError('Aufgaben konnten nicht geladen werden. Bitte neu einloggen.'))
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    // Neue Aufgabe im Backend speichern (vorerst nur der Titel)
    async function handleSaveTask(task: Task) {
        try {
            const newTask = await createTask(task.title)
            setTasks((prev) => [newTask, ...prev])
            setShowModal(false)
        } catch {
            setError('Aufgabe konnte nicht gespeichert werden.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <Link
                    to="/"
                    className="inline-block mb-8 text-gray-300 hover:text-white text-sm font-medium transition-colors">
                    ← Back
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                    {tasks.length > 0 && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-2xl transition-all duration-200">                        
                        Neue Aufgabe erstellen
                    </button> 
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl transition-all duration-200">
                        Logout
                    </button>
                </div>

                {error && <p className="text-red-400 font-medium mb-6">{error}</p>}

                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <p className="text-gray-500 text-lg mb-4">Noch keine Aufgaben vorhanden.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-2xl transition-all duration-200"
                        >
                            + Erste Aufgabe erstellen
                        </button>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {tasks.map((task) => (
                            <li
                                key={task.task_id}
                                className="bg-gray-900 rounded-2xl px-6 py-4 flex items-start justify-between gap-4 shadow shadow-black/20"
                            >
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-gray-500 text-sm">#{task.task_id}</span>
                                    <span className="text-white font-semibold truncate">{task.title}</span>
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusColors[task.status]}`}>
                                    {statusLabels[task.status] ?? task.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showModal && (
                <TaskModal onClose={() => setShowModal(false)} onSave={handleSaveTask} />
            )}
        </div>
    )
}

export default Dashboard