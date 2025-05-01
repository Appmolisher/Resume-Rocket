import React, { useState } from 'react';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState('');

  const generateResume = async () => {
    const response = await fetch('https://rrbes.onrender.com/api/generate/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobTitle: jobTitle,
        jobDescription: jobDesc,
        resumeText: resume,
      }),
    });
    const data = await response.json();
    setResult(data.output);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Resume Generator</h2>
      <textarea
        placeholder="Job Title / Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <textarea
        placeholder="Your Experience / Resume"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={generateResume}>Generate Resume</button>
      <h3>Output:</h3>
      <pre>{result}</pre>
    </div>
  );
}

export default App;

git add .
git commit -m "Fix CORS to allow Vercel frontend"
git push
