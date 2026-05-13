import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "jobseeker",
  location: "",
  phone: "",
  resumeLink: "",
  companyName: "",
  companyWebsite: "",
  companyDescription: "",
  agreeToTerms: false,
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (formData.password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.location.trim()) nextErrors.location = "Location is required.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!formData.agreeToTerms) nextErrors.agreeToTerms = "You must accept terms and privacy policy.";

    if (formData.role === "jobseeker" && !formData.resumeLink.trim()) {
      nextErrors.resumeLink = "Resume link is required for job seekers.";
    }

    if (formData.role === "employer") {
      if (!formData.companyName.trim()) nextErrors.companyName = "Company name is required.";
      if (!formData.companyWebsite.trim()) nextErrors.companyWebsite = "Company website is required.";
      if (!formData.companyDescription.trim()) {
        nextErrors.companyDescription = "Company description is required.";
      }
    }
    return nextErrors;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // Storing plaintext for mock, normally hash it
        role: formData.role,
        location: formData.location,
        phone: formData.phone,
        resumeLink: formData.role === 'jobseeker' ? formData.resumeLink : '',
        companyName: formData.role === 'employer' ? formData.companyName : '',
        companyWebsite: formData.role === 'employer' ? formData.companyWebsite : '',
        companyDescription: formData.role === 'employer' ? formData.companyDescription : ''
      });
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-1">Create an Account</h2>
                <p className="text-muted">Join JobPilot to {formData.role === 'jobseeker' ? 'find your dream job' : 'hire top talent'}</p>
              </div>

              {serverError && <Alert variant="danger" className="border-0">{serverError}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <div className="d-flex gap-3 mb-4 p-2 bg-light rounded-3">
                  <Form.Check 
                    type="radio"
                    id="role-jobseeker"
                    name="role"
                    value="jobseeker"
                    label={<span className="fw-medium">I'm a Job Seeker</span>}
                    checked={formData.role === 'jobseeker'}
                    onChange={onChange}
                    className="flex-fill ps-4 py-2"
                  />
                  <Form.Check 
                    type="radio"
                    id="role-employer"
                    name="role"
                    value="employer"
                    label={<span className="fw-medium">I'm an Employer</span>}
                    checked={formData.role === 'employer'}
                    onChange={onChange}
                    className="flex-fill ps-4 py-2 border-start"
                  />
                </div>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Full Name</Form.Label>
                      <Form.Control 
                        name="fullName" value={formData.fullName} onChange={onChange}
                        isInvalid={!!errors.fullName}
                        placeholder="John Doe"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Email</Form.Label>
                      <Form.Control 
                        type="email" name="email" value={formData.email} onChange={onChange}
                        isInvalid={!!errors.email}
                        placeholder="john@example.com"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Phone</Form.Label>
                      <Form.Control 
                        name="phone" value={formData.phone} onChange={onChange}
                        isInvalid={!!errors.phone}
                        placeholder="+1 (555) 000-0000"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Password</Form.Label>
                      <Form.Control 
                        type="password" name="password" value={formData.password} onChange={onChange}
                        isInvalid={!!errors.password}
                        placeholder="Min 8 characters"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Confirm Password</Form.Label>
                      <Form.Control 
                        type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange}
                        isInvalid={!!errors.confirmPassword}
                        placeholder="Re-enter password"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Location</Form.Label>
                      <Form.Control 
                        name="location" value={formData.location} onChange={onChange}
                        isInvalid={!!errors.location}
                        placeholder="City, State, Country"
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4 text-muted" />

                {formData.role === 'jobseeker' ? (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">Resume Link</Form.Label>
                    <Form.Control 
                      name="resumeLink" value={formData.resumeLink} onChange={onChange}
                      isInvalid={!!errors.resumeLink}
                      placeholder="Google Drive, Dropbox, or Portfolio URL"
                      className="bg-light"
                    />
                    <Form.Control.Feedback type="invalid">{errors.resumeLink}</Form.Control.Feedback>
                    <Form.Text className="text-muted">Please provide a publically accessible link to your resume.</Form.Text>
                  </Form.Group>
                ) : (
                  <>
                    <h5 className="mb-3">Company Details</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Company Name</Form.Label>
                          <Form.Control 
                            name="companyName" value={formData.companyName} onChange={onChange}
                            isInvalid={!!errors.companyName}
                            placeholder="Acme Corp"
                            className="bg-light"
                          />
                          <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Website</Form.Label>
                          <Form.Control 
                            name="companyWebsite" value={formData.companyWebsite} onChange={onChange}
                            isInvalid={!!errors.companyWebsite}
                            placeholder="https://acme.com"
                            className="bg-light"
                          />
                          <Form.Control.Feedback type="invalid">{errors.companyWebsite}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-medium">Company Description</Form.Label>
                          <Form.Control 
                            as="textarea" rows={3}
                            name="companyDescription" value={formData.companyDescription} onChange={onChange}
                            isInvalid={!!errors.companyDescription}
                            placeholder="What does your company do?"
                            className="bg-light"
                          />
                          <Form.Control.Feedback type="invalid">{errors.companyDescription}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group className="mb-4">
                  <Form.Check 
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    label={<>I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a></>}
                    checked={formData.agreeToTerms}
                    onChange={onChange}
                    isInvalid={!!errors.agreeToTerms}
                  />
                  <Form.Control.Feedback type="invalid">{errors.agreeToTerms}</Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg" 
                  className="w-100 fw-bold mb-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-primary text-decoration-none fw-medium">
                    Log in
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
