import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// IN-MEMORY DATABASES
let users = [
  {
    _id: '1',
    name: 'TechCorp Inc.',
    email: 'employer@techcorp.com',
    password: '$2a$10$exampleHashedPassword', // hashed 'password123'
    role: 'employer'
  }
];
let jobs = [
  {
    _id: '1000',
    title: 'Software Engineer',
    description: 'Develop and maintain web applications using React and Node.js.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '1001',
    title: 'Frontend Developer',
    description: 'Build responsive user interfaces with modern JavaScript frameworks.',
    location: 'New York, NY',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    _id: '1002',
    title: 'Backend Developer',
    description: 'Design and implement server-side logic and databases.',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-03T00:00:00.000Z'
  },
  {
    _id: '1003',
    title: 'Data Scientist',
    description: 'Analyze data and build machine learning models.',
    location: 'Seattle, WA',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    _id: '1004',
    title: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines.',
    location: 'Remote',
    salary: '$115,000 - $145,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-05T00:00:00.000Z'
  },
  {
    _id: '1005',
    title: 'Product Manager',
    description: 'Lead product development and strategy.',
    location: 'Boston, MA',
    salary: '$125,000 - $155,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-06T00:00:00.000Z'
  },
  {
    _id: '1006',
    title: 'UX Designer',
    description: 'Design user experiences for web and mobile applications.',
    location: 'Los Angeles, CA',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-07T00:00:00.000Z'
  },
  {
    _id: '1007',
    title: 'Mobile App Developer',
    description: 'Develop iOS and Android applications.',
    location: 'Chicago, IL',
    salary: '$105,000 - $135,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-08T00:00:00.000Z'
  },
  {
    _id: '1008',
    title: 'QA Engineer',
    description: 'Test software and ensure quality standards.',
    location: 'Denver, CO',
    salary: '$85,000 - $115,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-09T00:00:00.000Z'
  },
  {
    _id: '1009',
    title: 'Security Analyst',
    description: 'Monitor and protect systems from cyber threats.',
    location: 'Washington, DC',
    salary: '$95,000 - $125,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-10T00:00:00.000Z'
  },
  {
    _id: '1010',
    title: 'Marketing Specialist',
    description: 'Develop marketing strategies and campaigns.',
    location: 'Miami, FL',
    salary: '$70,000 - $100,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-11T00:00:00.000Z'
  },
  {
    _id: '1011',
    title: 'Sales Representative',
    description: 'Sell products and services to clients.',
    location: 'Phoenix, AZ',
    salary: '$60,000 - $90,000 + Commission',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-12T00:00:00.000Z'
  },
  {
    _id: '1012',
    title: 'HR Manager',
    description: 'Manage human resources and recruitment.',
    location: 'Atlanta, GA',
    salary: '$80,000 - $110,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-13T00:00:00.000Z'
  },
  {
    _id: '1013',
    title: 'Graphic Designer',
    description: 'Create visual content for marketing and branding.',
    location: 'Portland, OR',
    salary: '$65,000 - $95,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-14T00:00:00.000Z'
  },
  {
    _id: '1014',
    title: 'Content Writer',
    description: 'Write articles, blogs, and marketing copy.',
    location: 'Remote',
    salary: '$50,000 - $80,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-15T00:00:00.000Z'
  },
  {
    _id: '1015',
    title: 'Customer Support Specialist',
    description: 'Assist customers with inquiries and issues.',
    location: 'Dallas, TX',
    salary: '$45,000 - $65,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-16T00:00:00.000Z'
  },
  {
    _id: '1016',
    title: 'Financial Analyst',
    description: 'Analyze financial data and prepare reports.',
    location: 'New York, NY',
    salary: '$75,000 - $105,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-17T00:00:00.000Z'
  },
  {
    _id: '1017',
    title: 'Operations Manager',
    description: 'Oversee daily operations and improve efficiency.',
    location: 'San Diego, CA',
    salary: '$85,000 - $115,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-18T00:00:00.000Z'
  },
  {
    _id: '1018',
    title: 'Research Scientist',
    description: 'Conduct research and develop new technologies.',
    location: 'Cambridge, MA',
    salary: '$140,000 - $170,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-19T00:00:00.000Z'
  },
  {
    _id: '1019',
    title: 'Project Coordinator',
    description: 'Coordinate projects and ensure timely delivery.',
    location: 'Remote',
    salary: '$55,000 - $75,000',
    type: 'Full-time',
    employerId: '1',
    createdAt: '2024-01-20T00:00:00.000Z'
  }
];
let applications = [];
let nextUserId = 2; // since we added user 1
let nextJobId = 1020; // next available id
let nextAppId = 1;

// MIDDLEWARE
const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, fullName, email, password, role } = req.body;
    const actualName = name || fullName;

    if (!actualName || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      _id: String(nextUserId++),
      name: actualName,
      email,
      password: hashedPassword,
      role
    };
    users.push(user);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// JOB ROUTES
app.get('/api/jobs', (req, res) => res.json(jobs));

app.post('/api/jobs', protect, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Not authorized' });
  const newJob = { ...req.body, _id: String(nextJobId++), employerId: req.user.id, createdAt: new Date().toISOString() };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', protect, (req, res) => {
  const index = jobs.findIndex(j => j._id === req.params.id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...req.body };
    res.json(jobs[index]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

app.delete('/api/jobs/:id', protect, (req, res) => {
  jobs = jobs.filter(j => j._id !== req.params.id);
  res.json({ message: 'Job removed' });
});

// APP ROUTES
app.post('/api/applications', protect, (req, res) => {
  const { jobId, coverLetter } = req.body;
  const newApp = { _id: String(nextAppId++), jobId, applicantId: req.user.id, coverLetter, status: 'Pending', createdAt: new Date().toISOString() };
  applications.push(newApp);
  res.status(201).json(newApp);
});

app.get('/api/applications', protect, (req, res) => {
  res.json(applications.filter(a => a.applicantId === req.user.id));
});

app.get('/api/applications/employer', protect, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Not authorized' });
  const employerApps = applications.filter(app => {
    const job = jobs.find(j => j._id === app.jobId);
    return job && job.employerId === req.user.id;
  });
  res.json(employerApps);
});

app.put('/api/applications/:id/status', protect, (req, res) => {
  const app = applications.find(a => a._id === req.params.id);
  if (app) {
    app.status = req.body.status;
    res.json(app);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
});

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (In-Memory)`));
