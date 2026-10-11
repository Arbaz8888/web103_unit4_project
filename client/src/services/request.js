// Thin fetch wrapper shared by every API service. Resolves with parsed JSON
// and throws an Error carrying the server's message (and details) on failure.
const request = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const error = new Error(data.error || `Request failed with status ${response.status}`)
        error.status = response.status
        error.details = data
        throw error
    }

    return data
}

export default request
