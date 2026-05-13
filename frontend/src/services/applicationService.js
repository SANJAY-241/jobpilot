import api from './api';

const applicationService = {
  applyForJob: (applicationData) => {
    const token = localStorage.getItem('token');
    return fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(applicationData)
    }).then(res => res.json());
  },
  getApplications: () => {
    const token = localStorage.getItem('token');
    return fetch('/api/applications', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json());
  },
  updateApplicationStatus: (id, status) => {
    const token = localStorage.getItem('token');
    return fetch(`/api/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    }).then(res => res.json());
  }
};

export default applicationService;