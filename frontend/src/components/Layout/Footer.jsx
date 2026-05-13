import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        <Row className="gy-4">
          <Col lg={4}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0284c7" />
                <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" fill="#FFF" />
              </svg>
              <span className="fs-5 fw-bold text-primary">JobPilot</span>
            </div>
            <p className="text-secondary mb-0">
              Connecting top talent with great companies. Your journey starts here.
            </p>
          </Col>
          <Col lg={2} md={4} xs={6}>
            <h5 className="mb-3 text-white">For Candidates</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/jobs" className="text-secondary text-decoration-none hover-white">Find Jobs</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none hover-white">Register</Link></li>
              <li><Link to="/dashboard" className="text-secondary text-decoration-none hover-white">Dashboard</Link></li>
            </ul>
          </Col>
          <Col lg={2} md={4} xs={6}>
            <h5 className="mb-3 text-white">For Employers</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/register" className="text-secondary text-decoration-none hover-white">Register Company</Link></li>
              <li><Link to="/dashboard" className="text-secondary text-decoration-none hover-white">Post a Job</Link></li>
              <li><Link to="/dashboard" className="text-secondary text-decoration-none hover-white">View Applicants</Link></li>
            </ul>
          </Col>
          <Col lg={4} md={4}>
            <h5 className="mb-3 text-white">Contact Us</h5>
            <p className="text-secondary mb-1">Email: support@jobpilot.com</p>
            <p className="text-secondary">Phone: +1 (555) 123-4567</p>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-secondary">
          <small>&copy; {new Date().getFullYear()} JobPilot. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
}
