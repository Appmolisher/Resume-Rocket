import React, { useState } from 'react';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateResume = async () => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('❌ Failed to fetch:', error);
      setResult('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>🧠 AI Resume Bullet Generator</h2>

      <textarea
        placeholder="Enter Job Title or Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <textarea
        placeholder="Paste your resume or experience here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={generateResume} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>

      <h3>🔍 AI Output:</h3>
      <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: 10 }}>
        {result}
      </pre>
    </div>
  );
}

export default App;
