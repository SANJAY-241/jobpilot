import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useJob } from '../context/JobContext';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Applications() {
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus } = useJob();
  const navigate = useNavigate();

  if (!user || user.role !== 'employer') {
    return (
      <Container className="py-5 text-center">
        <h3>You must be logged in as an employer to view this page.</h3>
        <Button onClick={() => navigate('/login')} className="mt-3">Return to Login</Button>
      </Container>
    );
  }

  const apps = applications;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Applications Overview</h2>
          <p className="text-muted mb-0">Review candidates who applied to your jobs</p>
        </div>
      </div>

      <Row className="gy-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            {apps.length > 0 ? (
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 px-4 border-bottom-0">Job Title</th>
                    <th className="py-3 px-4 border-bottom-0">Location</th>
                    <th className="py-3 px-4 border-bottom-0">Salary</th>
                    <th className="py-3 px-4 border-bottom-0">Candidate Info</th>
                    <th className="py-3 px-4 border-bottom-0">Applied On</th>
                    <th className="py-3 px-4 border-bottom-0">Status</th>
                    <th className="py-3 px-4 border-bottom-0 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!job) return null;
                    
                    return (
                      <tr key={app.id}>
                        <td className="py-3 px-4 align-middle fw-medium">
                          <Link to={`/jobs/${job.id}`} className="text-dark text-decoration-none hover-primary">
                            {job.title}
                          </Link>
                        </td>
                        <td className="py-3 px-4 align-middle">{job.location}</td>
                        <td className="py-3 px-4 align-middle">{job.salary}</td>
                        <td className="py-3 px-4 align-middle">
                          Applicant ID: {app.applicantId.substring(0, 6)}...
                        </td>
                        <td className="py-3 px-4 align-middle text-muted">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 align-middle">
                          <Badge 
                            bg={app.status === 'Pending' ? 'warning' : app.status === 'Accepted' ? 'success' : 'danger'} 
                            className="px-3 py-2 rounded-pill fw-medium"
                          >
                            {app.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 align-middle text-end d-flex justify-content-end gap-2">
                           {app.status === 'Pending' && (
                             <>
                              <Button 
                                size="sm" variant="success" 
                                onClick={() => updateApplicationStatus(app.id, 'Accepted')}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" variant="danger" 
                                onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                              >
                                Reject
                              </Button>
                             </>
                           )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div className="text-center py-5 text-muted">
                <div className="mb-3"><Search size={40} className="mx-auto opacity-50" /></div>
                <h5>No applications received yet.</h5>
                <Button onClick={() => navigate('/dashboard')} variant="outline-primary" className="mt-3">Back to Dashboard</Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
