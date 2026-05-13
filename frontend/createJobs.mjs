import fs from 'fs';

const titles = [
  'Senior React Developer', 'Frontend Engineer', 'Full Stack Developer',
  'Software Engineer', 'Backend Engineer', 'Data Scientist',
  'Product Manager', 'UX/UI Designer', 'DevOps Engineer',
  'Cloud Architect', 'Machine Learning Engineer', 'Systems Administrator',
  'Quality Assurance Automation Engineer', 'Cybersecurity Analyst',
  'Mobile App Developer (React Native)', 'Data Engineer', 'AI Specialist'
];

const companies = [
  'TechCorp', 'DataSys', 'Innovatech', 'Global Solutions', 'CloudNet',
  'FinTech Systems', 'HealthTech', 'EduPlatform', 'CyberSoft', 'AppWorks',
  'MetaDev', 'NextGen Solutions', 'AgileSoft', 'DevStudio'
];

const types = ['Full-time', 'Contract', 'Part-time'];

const salaries = [
  '$80k - $120k', '$100k - $140k', '$120k - $160k', '$130k - $180k',
  '$90k - $110k', '$150k - $200k', '$110k - $150k'
];

const descriptions = [
  'We are looking for an experienced developer proficient in modern frameworks to join our dynamic team.',
  'Join our team to build scalable APIs and microservices handling millions of requests.',
  'Help us revolutionize our industry with cutting-edge software solutions.',
  'Work with a talented team of engineers to deliver high-quality scalable applications.',
  'We need a passionate technologist to architect and deploy cloud-native infrastructure.',
  'Design user-centric interfaces and improve our product adoption rates.',
  'Protect our company by implementing robust security protocols and monitoring systems.',
];

const skillsList = [
  'React.js, Node.js, SQL, AWS',
  'Python, Django, PostgreSQL, Docker',
  'Java, Spring Boot, Microservices, Kubernetes',
  'JavaScript, TypeScript, React, Redux',
  'Go, gRPC, Redis, Kafka',
  'AWS, Terraform, CI/CD, Linux',
  'Figma, User Research, Prototyping',
  'Machine Learning, TensorFlow, PyTorch'
];

const jobs = [];

for (let i = 0; i < 55; i++) {
  jobs.push({
    id: String(1000 + i),
    title: titles[Math.floor(Math.random() * titles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: 'Remote',
    type: types[Math.floor(Math.random() * types.length)],
    salary: salaries[Math.floor(Math.random() * salaries.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    qualifications: '3+ years of experience. ' + skillsList[Math.floor(Math.random() * skillsList.length)],
    responsibilities: 'Develop new features, collaborate with the team, write clean scalable code, and participate in code reviews.',
    employerId: `emp${Math.floor(Math.random() * 5)}`,
    postedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString()
  });
}

const jobsString = JSON.stringify(jobs, null, 2);

const filePath = 'c:/Users/DELL/OneDrive/Desktop/job/Jobpilot/frontend/src/context/JobContext.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the initial mock jobs array
const startStr = 'const initialJobs = [';
const endStr = '        setJobs(initialJobs);';

const startIndex = content.indexOf(startStr);
// Find the exact closing brace/bracket of the initial jobs array logic
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + `const initialJobs = ${jobsString};\n` + content.slice(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added 55 remote jobs.');
} else {
  console.error('Could not find the target strings to replace.');
}
