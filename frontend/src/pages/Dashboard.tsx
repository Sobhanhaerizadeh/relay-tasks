import { useState } from 'react'
import { Link } from 'react-router-dom'
import TaskModal, { type Task } from '../components/TaskModal'

const priorityColors: Record<string, string> = {
    low: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    high: 'bg-red-500/20 text-red-300 border border-red-500/30',
}

const priorityLabels: Record<string, string> = {
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
}

function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([])

    function handleLogout() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    function handleSaveTask(task: Task) {
        setTasks((prev) => [task, ...prev])
        setShowModal(false)
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
                                key={task.id}
                                className="bg-gray-900 rounded-2xl px-6 py-4 flex items-start justify-between gap-4 shadow shadow-black/20"
                            >
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-white truncate"> Id: {task.id} </span>
                                    <span className="text-white font-semibold truncate"> Title: {task.title}</span>
                                    {task.description && (
                                        <span className="text-gray-400 text-sm line-clamp-2"> Desc: {task.description}</span>
                                    )}
                                    {task.dueDate && (
                                        <span className="text-gray-500 text-xs mt-1">
                                            Fällig: {new Date(task.dueDate).toLocaleDateString('de-DE')}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${priorityColors[task.priority]}`}>
                                    {priorityLabels[task.priority]}
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