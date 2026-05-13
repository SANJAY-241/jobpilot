import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardJobSeeker() {
  const { user } = useAuth();
  const { jobs, getApplicationsByApplicant } = useJob();
  const navigate = useNavigate();

  const seekerApps = getApplicationsByApplicant(user.id);

  return (
    <Row className="gy-4">
      <Col lg={12}>
        <h4 className="fw-bold mb-3">My Applications</h4>
        <Card className="border-0 shadow-sm rounded-4">
          {seekerApps.length > 0 ? (
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 border-bottom-0">Company</th>
                  <th className="py-3 px-4 border-bottom-0">Job Title</th>
                  <th className="py-3 px-4 border-bottom-0">Applied On</th>
                  <th className="py-3 px-4 border-bottom-0">Status</th>
                  <th className="py-3 px-4 border-bottom-0 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {seekerApps.map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  if (!job) return null;
                  
                  return (
                    <tr key={app.id}>
                      <td className="py-3 px-4 align-middle">
                        <div className="d-flex align-items-center gap-2">
                          {job.company}
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle fw-medium">{job.title}</td>
                      <td className="py-3 px-4 align-middle text-muted">{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 align-middle">
                        <Badge 
                          bg={app.status === 'Pending' ? 'warning' : app.status === 'Accepted' ? 'success' : 'danger'} 
                          className="px-3 py-2 rounded-pill fw-medium"
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 align-middle text-end">
                         <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-3">
                           View Job
                         </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5 text-muted">
              <div className="mb-3"><Search size={40} className="mx-auto opacity-50" /></div>
              <h5>You haven't applied to any jobs yet.</h5>
              <Button onClick={() => navigate('/jobs')} variant="outline-primary" className="mt-2">Browse Jobs</Button>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}
