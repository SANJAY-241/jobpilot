import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJob } from '../context/JobContext';
import JobCard from '../components/job/JobCard';
import { Search, Briefcase, MapPin, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { jobs } = useJob();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  // Show only 3 recent jobs
  const recentJobs = jobs.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-center position-relative overflow-hidden">
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold mb-4">Find Your Dream Job Today</h1>
          <p className="lead mb-5 bg-opacity-75" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Browse thousands of job openings from top companies and start your next career adventure.
          </p>

          <Card className="p-2 p-md-3 shadow border-0 mx-auto rounded-pill" style={{ maxWidth: '900px' }}>
            <form onSubmit={handleSearch} className="d-flex flex-column flex-md-row gap-3">
              <div className="flex-grow-1 position-relative d-flex align-items-center bg-light rounded-pill px-3">
                <Search className="text-muted flex-shrink-0" size={20} />
                <input 
                  type="text" 
                  className="form-control border-0 bg-transparent shadow-none" 
                  placeholder="Job title, keyword, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-grow-1 position-relative d-flex align-items-center bg-light rounded-pill px-3">
                <MapPin className="text-muted flex-shrink-0" size={20} />
                <input 
                  type="text" 
                  className="form-control border-0 bg-transparent shadow-none" 
                  placeholder="City, state, or 'Remote'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="rounded-pill px-5 fw-bold ms-md-2">
                Search Jobs
              </Button>
            </form>
          </Card>
        </Container>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Recent Job Openings</h2>
              <p className="text-muted mb-0">Discover the latest opportunities added to our platform</p>
            </div>
            <Link to="/jobs" className="btn btn-outline-primary d-none d-md-flex align-items-center gap-2">
              View All Jobs <ChevronRight size={16} />
            </Link>
          </div>

          <Row className="gy-4">
            {recentJobs.map(job => (
              <Col xs={12} md={6} lg={4} key={job.id}>
                <JobCard job={job} variant="grid" />
              </Col>
            ))}
            
            {recentJobs.length === 0 && (
              <Col xs={12}>
                <div className="text-center py-5 bg-white rounded shadow-sm">
                  <Briefcase size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold">No jobs posted yet</h4>
                  <p className="text-muted mb-0">Be the first to post a job on our platform!</p>
                </div>
              </Col>
            )}
          </Row>

          <div className="text-center mt-4 d-md-none">
            <Link to="/jobs" className="btn btn-outline-primary w-100 py-2">View All Jobs</Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-5 text-center">
          <Container className="py-4">
            <h2 className="fw-bold mb-3">Ready to accelerate your career?</h2>
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
              Create an account today to apply for jobs faster, track your applications, and receive personalized alerts.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/register" className="btn btn-primary btn-lg px-5 rounded-pill shadow">
                Join as Job Seeker
              </Link>
              <Link to="/register" className="btn btn-outline-dark btn-lg px-5 rounded-pill">
                Post a Job
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
