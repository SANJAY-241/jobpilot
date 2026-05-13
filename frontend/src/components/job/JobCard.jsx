import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Building } from 'lucide-react';

export default function JobCard({ job, variant = 'list' }) {
  if (variant === 'grid') {
    return (
      <Card className="h-100 border-0 shadow-sm job-card">
        <Card.Body className="d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="bg-light rounded p-2 text-primary">
              <Building size={24} />
            </div>
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
              {job.type}
            </span>
          </div>
          
          <h5 className="fw-bold mb-1 text-truncate" title={job.title}>{job.title}</h5>
          <p className="text-muted mb-3">{job.company}</p>
          
          <div className="d-flex flex-wrap gap-2 mb-4 mt-auto">
            <span className="text-secondary small d-flex align-items-center gap-1">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="text-secondary small d-flex align-items-center gap-1">
              <Briefcase size={14} /> {job.salary || 'Salary undisclosed'}
            </span>
          </div>

          <Link to={`/jobs/${job.id}`} className="btn btn-light w-100 fw-medium">
            View Details
          </Link>
        </Card.Body>
      </Card>
    );
  }

  // List layout used in Jobs.jsx
  return (
    <Card className="border-0 shadow-sm job-card p-2 p-md-3">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
        <div className="bg-light p-3 rounded d-none d-md-block text-primary">
          <Briefcase size={32} />
        </div>
        <div className="flex-grow-1">
          <Link to={`/jobs/${job.id}`} className="text-dark text-decoration-none">
            <h5 className="fw-bold mb-1 hover-primary">{job.title}</h5>
          </Link>
          <div className="text-muted small mb-2">{job.company}</div>
          <div className="d-flex flex-wrap gap-2 text-secondary small">
            <span className="d-flex align-items-center gap-1"><MapPin size={14}/> {job.location}</span>
            <span>•</span>
            <span>{job.salary}</span>
            <span>•</span>
            <span>{new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end gap-2 mt-3 mt-md-0 w-100 w-md-auto">
          <Badge bg="primary" bgOpacity={10} className="text-primary px-3 py-2 rounded-pill fw-medium border border-primary border-opacity-25 w-100 text-center w-md-auto">
            {job.type}
          </Badge>
          <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2">
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
}
