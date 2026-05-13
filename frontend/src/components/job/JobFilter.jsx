import { Form } from 'react-bootstrap';
import { Search, MapPin } from 'lucide-react';

export default function JobFilter({ query, location, jobType, setJobType, onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSearch({
      q: formData.get('q') || '',
      location: formData.get('location') || ''
    });
  };

  return (
    <div className="bg-light p-4 rounded-3 shadow-sm border border-secondary border-opacity-10 mb-4">
      <h4 className="fw-bold mb-3">Find Jobs</h4>
      <Form onSubmit={handleSearch} className="d-flex flex-column flex-md-row gap-3">
        <div className="flex-grow-1 position-relative d-flex align-items-center bg-white rounded-pill px-3 border">
          <Search className="text-muted flex-shrink-0" size={18} />
          <Form.Control 
            name="q" defaultValue={query} 
            className="border-0 shadow-none bg-transparent" 
            placeholder="Job title or company"
          />
        </div>
        <div className="flex-grow-1 position-relative d-flex align-items-center bg-white rounded-pill px-3 border">
          <MapPin className="text-muted flex-shrink-0" size={18} />
          <Form.Control 
            name="location" defaultValue={location} 
            className="border-0 shadow-none bg-transparent" 
            placeholder="Location or 'Remote'"
          />
        </div>
        <Form.Select 
          className="w-auto rounded-pill border" 
          value={jobType} 
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </Form.Select>
        <button className="btn btn-primary rounded-pill px-4" type="submit">Search</button>
      </Form>
    </div>
  );
}
