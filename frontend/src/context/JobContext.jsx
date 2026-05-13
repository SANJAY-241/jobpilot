import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
    if (user) {
      if (user.role === 'jobseeker') {
        fetchMyApplications();
      } else if (user.role === 'employer') {
        fetchEmployerApplications();
      }
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data.map(j => ({ ...j, id: j._id })));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await fetch('/api/applications', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchEmployerApplications = async () => {
    try {
      const res = await fetch('/api/applications/employer', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching employer applications:', error);
    }
  };

  const addJob = async (jobData) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(jobData)
    });
    const newJob = await res.json();
    newJob.id = newJob._id;
    setJobs([newJob, ...jobs]);
    return newJob;
  };

  const updateJob = async (id, updatedData) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedData)
    });
    const updatedJob = await res.json();
    updatedJob.id = updatedJob._id;
    setJobs(jobs.map(job => (job.id === id ? updatedJob : job)));
  };

  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setJobs(jobs.filter(job => job.id !== id));
  };

  const applyForJob = async (jobId, applicantId, coverLetter = '') => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({ jobId, coverLetter })
    });
    const newApp = await res.json();
    newApp.id = newApp._id;
    setApplications([newApp, ...applications]);
    return newApp;
  };

  const updateApplicationStatus = async (appId, status) => {
    const res = await fetch(`/api/applications/${appId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({ status })
    });
    const updatedApp = await res.json();
    updatedApp.id = updatedApp._id;
    setApplications(applications.map(app => ((app.id || app._id) === appId ? updatedApp : app)));
  };

  const getJobsByEmployer = (employerId) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const value = {
    jobs,
    applications,
    addJob,
    updateJob,
    deleteJob,
    applyForJob,
    updateApplicationStatus,
    getJobsByEmployer
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  return useContext(JobContext);
}
