import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { User, Building, MapPin, Mail, Phone, Map, Globe, FileText, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app we would call updateProfile context method here
    // For this mock we just save it to local state to simulate
    setSuccess('Profile updated successfully!');
    setIsEditing(false);
    
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  if (!user) return <Container className="py-5 text-center">Please login to view profile.</Container>;

  const isJobSeeker = user.role === 'jobseeker';

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">My Profile</h2>
        {!isEditing && (
          <Button variant="outline-primary" onClick={() => setIsEditing(true)} className="rounded-pill px-4">
            Edit Profile
          </Button>
        )}
      </div>

      {success && (
        <Alert variant="success" className="d-flex align-items-center gap-2 border-0 shadow-sm rounded-3">
          <CheckCircle size={20} /> {success}
        </Alert>
      )}

      <Row className="gy-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 text-center">
            <Card.Body className="p-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : <User size={40} />}
              </div>
              <h4 className="fw-bold mb-1">{user.fullName}</h4>
              <p className="text-secondary mb-3 text-capitalize">{user.role}</p>
              
              <div className="d-flex flex-column gap-2 text-start mt-4">
                <div className="d-flex align-items-center gap-3 text-secondary p-2 bg-light rounded">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <span className="text-truncate">{user.email}</span>
                </div>
                <div className="d-flex align-items-center gap-3 text-secondary p-2 bg-light rounded">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="d-flex align-items-center gap-3 text-secondary p-2 bg-light rounded">
                  <MapPin size={18} className="text-primary flex-shrink-0" />
                  <span>{user.location}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 p-md-5">
              <h5 className="fw-bold mb-4 border-bottom pb-3">
                {isJobSeeker ? 'Professional Details' : 'Company Details'}
              </h5>

              <Form onSubmit={handleSubmit}>
                <Row className="gy-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium text-secondary small">Full Name</Form.Label>
                      <Form.Control 
                        name="fullName" value={formData.fullName || ''} onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-light shadow-none border-0 pt-2 pb-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium text-secondary small">Phone Number</Form.Label>
                      <Form.Control 
                        name="phone" value={formData.phone || ''} onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-light shadow-none border-0 pt-2 pb-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-medium text-secondary small">Location</Form.Label>
                      <Form.Control 
                        name="location" value={formData.location || ''} onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-light shadow-none border-0 pt-2 pb-2"
                      />
                    </Form.Group>
                  </Col>

                  {isJobSeeker ? (
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="fw-medium text-secondary small">Resume Link (Portfolio, Google Drive)</Form.Label>
                        <div className="position-relative">
                          <FileText size={18} className="position-absolute text-muted" style={{ left: '12px', top: '12px' }} />
                          <Form.Control 
                            name="resumeLink" value={formData.resumeLink || ''} onChange={handleChange}
                            disabled={!isEditing}
                            className="bg-light shadow-none border-0 py-2 ps-5"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  ) : (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-secondary small">Company Name</Form.Label>
                          <div className="position-relative">
                            <Building size={18} className="position-absolute text-muted" style={{ left: '12px', top: '12px' }} />
                            <Form.Control 
                              name="companyName" value={formData.companyName || ''} onChange={handleChange}
                              disabled={!isEditing}
                              className="bg-light shadow-none border-0 py-2 ps-5"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-secondary small">Company Website</Form.Label>
                          <div className="position-relative">
                            <Globe size={18} className="position-absolute text-muted" style={{ left: '12px', top: '12px' }} />
                            <Form.Control 
                              name="companyWebsite" value={formData.companyWebsite || ''} onChange={handleChange}
                              disabled={!isEditing}
                              className="bg-light shadow-none border-0 py-2 ps-5"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-secondary small">Company Description</Form.Label>
                          <Form.Control 
                            as="textarea" rows={4}
                            name="companyDescription" value={formData.companyDescription || ''} onChange={handleChange}
                            disabled={!isEditing}
                            className="bg-light shadow-none border-0"
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}
                </Row>

                {isEditing && (
                  <div className="d-flex gap-3 mt-4 pt-3 border-top">
                    <Button variant="outline-secondary" onClick={() => {
                        setIsEditing(false);
                        setFormData(user); // Reset
                      }} 
                      className="px-4 fw-medium"
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="px-4 fw-medium">
                      Save Changes
                    </Button>
                  </div>
                )}
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
