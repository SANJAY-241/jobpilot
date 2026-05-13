import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useJob } from '../context/JobContext';

export default function PostJob({ onCancel, onSuccess }) {
  const { user } = useAuth();
  const { addJob } = useJob();

  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    qualifications: '',
    responsibilities: ''
  });

  const handleAddJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    addJob({
      ...newJob,
      company: user.companyName || 'Your Company'
    }, user.id);
    
    setNewJob({
      title: '', location: '', type: 'Full-time', salary: '',
      description: '', qualifications: '', responsibilities: ''
    });
    if (onSuccess) onSuccess();
  };

  return (
    <Form onSubmit={handleCreateJob}>
      <Row className="gy-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-medium">Job Title</Form.Label>
            <Form.Control 
              name="title" required value={newJob.title} onChange={handleAddJobChange}
              placeholder="e.g. Senior React Developer" className="bg-light"
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-medium">Location</Form.Label>
            <Form.Control 
              name="location" required value={newJob.location} onChange={handleAddJobChange}
              placeholder="e.g. Remote, or New York, NY" className="bg-light"
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-medium">Job Type</Form.Label>
            <Form.Select 
              name="type" value={newJob.type} onChange={handleAddJobChange}
              className="bg-light"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-medium">Salary Range</Form.Label>
            <Form.Control 
              name="salary" value={newJob.salary} onChange={handleAddJobChange}
              placeholder="e.g. $80k - $100k" className="bg-light"
            />
          </Form.Group>
        </Col>
        
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-medium">Job Description</Form.Label>
            <Form.Control 
              as="textarea" rows={3} name="description" required 
              value={newJob.description} onChange={handleAddJobChange}
              className="bg-light"
            />
          </Form.Group>
        </Col>
        
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-medium">Qualifications</Form.Label>
            <Form.Control 
              as="textarea" rows={3} name="qualifications" required 
              value={newJob.qualifications} onChange={handleAddJobChange}
              placeholder="List required skills and experience" className="bg-light"
            />
          </Form.Group>
        </Col>
        
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-medium">Responsibilities</Form.Label>
            <Form.Control 
              as="textarea" rows={3} name="responsibilities" required 
              value={newJob.responsibilities} onChange={handleAddJobChange}
              placeholder="List the day to day responsibilities" className="bg-light"
            />
          </Form.Group>
        </Col>
      </Row>
      
      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        <Button variant="outline-secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit" className="px-4">Post Job</Button>
      </div>
    </Form>
  );
}
