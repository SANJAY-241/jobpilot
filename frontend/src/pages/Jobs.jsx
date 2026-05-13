import { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import JobCard from '../components/job/JobCard';
import JobFilter from '../components/job/JobFilter';

export default function Jobs() {
  const { jobs } = useJob();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const [jobType, setJobType] = useState('All');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchQuery = job.title.toLowerCase().includes(query.toLowerCase()) || 
                         job.company.toLowerCase().includes(query.toLowerCase());
      const matchLoc = job.location.toLowerCase().includes(location.toLowerCase());
      const matchType = jobType === 'All' || job.type === jobType;
      return matchQuery && matchLoc && matchType;
    });
  }, [jobs, query, location, jobType]);

  const handleSearch = (filterData) => {
    setSearchParams(filterData);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <JobFilter 
             query={query} 
             location={location} 
             jobType={jobType} 
             setJobType={setJobType} 
             onSearch={handleSearch} 
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">Showing {filteredJobs.length} results</h5>
          </div>

          <Row className="gy-3">
            {filteredJobs.length > 0 ? filteredJobs.map(job => (
              <Col xs={12} key={job.id}>
                <JobCard job={job} variant="list" />
              </Col>
            )) : (
              <Col xs={12}>
                <div className="text-center py-5">
                  <h5 className="text-muted">No jobs found matching your criteria.</h5>
                  <button 
                    className="btn btn-link text-primary mt-2"
                    onClick={() => {
                      setSearchParams({});
                      setJobType('All');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
