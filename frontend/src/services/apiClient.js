import { API_BASE_URL } from '@/constants/config'
import { authStorage } from '@/utils/storage'

function buildUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = API_BASE_URL.replace(/\/$/, '')
  return base ? `${base}${normalized}` : normalized
}

function parseBody(text) {
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}

/**
 * JSON API helper. Sends Authorization when a token exists in storage.
 * @param {string} path e.g. "/api/users/login"
 * @param {RequestInit & { body?: object }} options
 */
export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, ...rest } = options
  const token = authStorage.getToken()

  const res = await fetch(buildUrl(path), {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const text = await res.text()
  const data = parseBody(text)

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && data.message) || res.statusText
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}
