import "./App.css";

import { useEffect, useState, useCallback } from "react";

function App() {
   const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/jobs"
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to load jobs");
    }

    setJobs(result.data);
  } catch (error) {
    setMessage(error.message);
  }
}, []);

useEffect(() => {
  fetchJobs();
}, [fetchJobs]);

   async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            role,
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save job");
      }

      setMessage("Job saved successfully!");
      setCompany("");
      setRole("");
      setStatus("Applied");

      await fetchJobs();  
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header>
        <h1>AI Job Tracker</h1>
        <p>Track your applications. Plan your next move.</p>
      </header>

      <section className="dashboard">
        <h2>My Applications</h2>
        <p>Manage all your job applications in one place.</p>
      <form onSubmit={handleSubmit} >
        <input type="text" 
        placeholder="Company name"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        required
        />
        <input type="text" placeholder="Job role"
          value={role}
            onChange={(event) => setRole(event.target.value)}
            required
        />
        <select  value={status}
            onChange={(event) => setStatus(event.target.value)}>
             <option value="Interested">Interested</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Offer">Offer</option>
        </select>
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Application"}</button>
      </form>
       {message && <p>{message}</p>}

<h2>Saved Applications</h2>

{jobs.length === 0 ? (
  <p>No applications added yet.</p>
) : (
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {jobs.map((job) => (
        <tr key={job._id}>
          <td>{job.company}</td>
          <td>{job.role}</td>
          <td>{job.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </section>
    </main>
  );
}

export default App;