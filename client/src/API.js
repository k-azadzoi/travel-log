const API_URL = 'http://localhost:1337'

export const listLogEntries = async () => {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export const createLogEntry = async (entry) => {
    const apiKey = entry.apiKey
    delete entry.apiKey
    const response = await fetch(`${API_URL}/api/logs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: JSON.stringify(entry)
        });
    const json = await response.json()
    if (response.ok) {
        return json
    } else {
        let errorMessage = `(${response.statusText})`,
        error = new Error(errorMessage)
        throw(error)
    }
}