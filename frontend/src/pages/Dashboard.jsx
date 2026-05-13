import { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardEmployer from './DashboardEmployer';
import DashboardJobSeeker from './DashboardJobSeeker';
import PostJob from './PostJob';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddJob, setShowAddJob] = useState(false);

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h3>Please log in to view your dashboard.</h3>
        <Button onClick={() => navigate('/login')} className="mt-3">Return to Login</Button>
      </Container>
    );
  }

  const isEmployer = user.role === 'employer';

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user.fullName.split(' ')[0]}</p>
        </div>
        {isEmployer && (
          <Button variant="primary" onClick={() => setShowAddJob(true)} className="d-flex align-items-center gap-2 rounded-pill shadow-sm">
            <Plus size={18} /> Post New Job
          </Button>
        )}
      </div>

      {isEmployer ? <DashboardEmployer /> : <DashboardJobSeeker />}

      {/* Add Job Modal */}
      <Modal show={showAddJob} onHide={() => setShowAddJob(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Create New Job Posting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3">
          <PostJob onCancel={() => setShowAddJob(false)} onSuccess={() => setShowAddJob(false)} />
        </Modal.Body>
      </Modal>

    </Container>
  );
}
