const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = {
  get: (url) => fetch(`${API_BASE_URL}${url}`).then(res => res.json()),
  post: (url, data) => fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  put: (url, data) => fetch(`${API_BASE_URL}${url}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (url) => fetch(`${API_BASE_URL}${url}`, { method: 'DELETE' }).then(res => res.json())
};

export default api;