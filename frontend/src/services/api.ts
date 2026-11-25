const BASE_URL = 'http://localhost:8000'

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response
}

export async function registerUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response
}

// So sieht eine Aufgabe aus, die das Backend schickt
export type ApiTask = {
  task_id: number
  title: string
  status: string
  owner_id: number
}

// Token aus dem localStorage mitschicken
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

export async function getTasks(): Promise<ApiTask[]> {
  const response = await fetch(`${BASE_URL}/tasks/`, { headers: authHeaders() })
  if (!response.ok) throw new Error(`Fehler ${response.status}`)
  return response.json()
}

export async function createTask(title: string): Promise<ApiTask> {
  const response = await fetch(`${BASE_URL}/tasks/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ title })
  })
  if (!response.ok) throw new Error(`Fehler ${response.status}`)
  return response.json()
}