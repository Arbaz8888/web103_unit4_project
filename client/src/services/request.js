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
