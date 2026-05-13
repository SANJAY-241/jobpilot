import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { useJob } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, Building, Clock, ChevronLeft, Send, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, applyForJob, getApplicationsByApplicant } = useJob();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === id);
    if (foundJob) {
      setJob(foundJob);
      
      // Check if user has already applied
      if (user && user.role === 'jobseeker') {
        const apps = getApplicationsByApplicant(user.id);
        const alreadyApplied = apps.some(app => app.jobId === foundJob.id);
        setHasApplied(alreadyApplied);
      }
    }
  }, [id, jobs, user, getApplicationsByApplicant]);

  if (!job) {
    return (
      <Container className="py-5 text-center">
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary mt-3">Back to Jobs</Link>
      </Container>
    );
  }

  const handleApply = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    applyForJob(job.id, user.id, coverLetter);
    setHasApplied(true);
    setShowApplyModal(false);
  };

  return (
    <Container className="py-5">
      <Link to="/jobs" className="text-decoration-none text-muted mb-4 d-inline-flex align-items-center hover-primary">
        <ChevronLeft size={20} /> Back to jobs
      </Link>

      <Row className="gy-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light p-3 rounded text-primary d-none d-sm-block">
                    <Building size={40} />
                  </div>
                  <div>
                    <h2 className="fw-bold mb-1">{job.title}</h2>
                    <h5 className="text-muted mb-0">{job.company}</h5>
                  </div>
                </div>
                
                {(!user || user.role === 'jobseeker') && (
                  hasApplied ? (
                    <Button variant="success" size="lg" disabled className="d-flex align-items-center gap-2 rounded-pill px-4 whitespace-nowrap">
                      <CheckCircle size={20} /> Applied
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={() => user ? setShowApplyModal(true) : navigate('/login')}
                      className="d-flex align-items-center gap-2 rounded-pill px-4 text-nowrap"
                    >
                      <Send size={18} /> Apply Now
                    </Button>
                  )
                )}
              </div>

              <div className="d-flex flex-wrap gap-2 gap-md-4 mb-5 pb-4 border-bottom">
                <div className="d-flex align-items-center gap-2 text-secondary">
                  <MapPin size={18} className="text-primary" /> {job.location}
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary">
                  <Briefcase size={18} className="text-primary" /> {job.type}
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary">
                  <span className="fw-medium text-primary">$</span> {job.salary}
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary">
                  <Clock size={18} className="text-primary" /> Posted {new Date(job.postedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold mb-3">Job Description</h4>
                <p className="text-secondary lh-lg">{job.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold mb-3">Qualifications</h4>
                <p className="text-secondary lh-lg">{job.qualifications}</p>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold mb-3">Responsibilities</h4>
                <p className="text-secondary lh-lg">{job.responsibilities}</p>
              </div>

            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 mb-4 bg-light">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">About the Company</h5>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-white p-2 rounded text-primary border">
                  <Building size={24} />
                </div>
                <h5 className="mb-0 fw-bold">{job.company}</h5>
              </div>
              <p className="text-secondary mb-0">
                 This is a placeholder description for {job.company}. They are an innovative company looking for top talent.
              </p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 bg-primary text-white rounded-4">
              <h5 className="fw-bold mb-3">Share this Job</h5>
              <p className="mb-4 opacity-75">Know someone who would be a perfect fit? Share this opportunity with them.</p>
              <div className="d-flex gap-2">
                <Button variant="light" className="text-primary flex-fill fw-medium">Copy Link</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Apply Modal */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted mb-4">You are applying to {job.company}. Your profile information and resume link will be shared with the employer.</p>
          <Form onSubmit={handleApply}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Cover Letter (Optional)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Why are you a great fit for this role?"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="bg-light"
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)}>Cancel</Button>
              <Button variant="primary" type="submit" className="px-4">Submit Application</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}
