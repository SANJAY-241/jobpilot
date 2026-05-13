import api from './api';

const jobService = {
  getJobs: () => api.get('/jobs'),
  createJob: (jobData) => {
    const token = localStorage.getItem('token');
    return fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    }).then(res => res.json());
  },
  updateJob: (id, jobData) => {
    const token = localStorage.getItem('token');
    return fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    }).then(res => res.json());
  },
  deleteJob: (id) => {
    const token = localStorage.getItem('token');
    return fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json());
  }
};

export default jobService;