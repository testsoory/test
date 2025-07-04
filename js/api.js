const API_URL = 'https://your-render-app.onrender.com';

export async function saveSettings(data) {
    const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_SECRET_KEY'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function loadSettings() {
    const response = await fetch(`${API_URL}/load`, {
        headers: { 'Authorization': 'Bearer YOUR_SECRET_KEY' }
    });
    return await response.json();
}