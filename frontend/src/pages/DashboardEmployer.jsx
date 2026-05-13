import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Briefcase, Eye, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardEmployer() {
  const { user } = useAuth();
  const { jobs, applications, getJobsByEmployer, getApplicationsByEmployer, deleteJob } = useJob();
  const navigate = useNavigate();

  const employerJobs = getJobsByEmployer(user.id);
  const employerApps = getApplicationsByEmployer(user.id);

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      deleteJob(id);
    }
  };

  return (
    <Row className="gy-4">
      <Col md={4}>
        <Card className="border-0 shadow-sm rounded-4 text-center h-100">
          <Card.Body className="p-4 d-flex flex-column justify-content-center">
            <div className="text-primary mb-2"><Briefcase size={36} className="mx-auto" /></div>
            <h2 className="fw-bold mb-0">{employerJobs.length}</h2>
            <div className="text-muted fw-medium">Active Jobs</div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="border-0 shadow-sm rounded-4 text-center h-100">
          <Card.Body className="p-4 d-flex flex-column justify-content-center">
            <div className="text-success mb-2"><Eye size={36} className="mx-auto" /></div>
            <h2 className="fw-bold mb-0">{employerApps.length}</h2>
            <div className="text-muted fw-medium">Total Applications</div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} className="mt-5">
        <h4 className="fw-bold mb-3">Manage Your Postings</h4>
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          {employerJobs.length > 0 ? (
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 border-bottom-0">Job Title</th>
                  <th className="py-3 px-4 border-bottom-0">Location</th>
                  <th className="py-3 px-4 border-bottom-0">Posted Date</th>
                  <th className="py-3 px-4 border-bottom-0">Applicants</th>
                  <th className="py-3 px-4 border-bottom-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employerJobs.map(job => {
                  const appsForThisJob = applications.filter(a => a.jobId === job.id);
                  return (
                    <tr key={job.id}>
                      <td className="py-3 px-4 align-middle fw-medium">
                        <Link to={`/jobs/${job.id}`} className="text-dark text-decoration-none hover-primary">
                          {job.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 align-middle text-muted">{job.location}</td>
                      <td className="py-3 px-4 align-middle text-muted">{new Date(job.postedAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 align-middle">
                        <Badge bg="info" className="px-3 rounded-pill fw-medium">{appsForThisJob.length}</Badge>
                      </td>
                      <td className="py-3 px-4 align-middle text-end d-flex justify-content-end gap-2">
                        <Button variant="light" size="sm" className="text-primary"><Edit size={16} /></Button>
                        <Button variant="light" size="sm" className="text-danger" onClick={() => handleDeleteJob(job.id)}><Trash2 size={16} /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5 text-muted">
              <div className="mb-3"><Briefcase size={40} className="mx-auto opacity-50" /></div>
              <h5>No active job postings</h5>
              <p>Create a job to start receiving applications.</p>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}
