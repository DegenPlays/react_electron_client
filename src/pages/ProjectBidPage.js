import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';


export default function ProjectBidPage() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Smart Contract');
  const [bidAmount, setBidAmount] = useState(''); // Added state for bid amount


  useEffect(() => {
    console.log('socket:',socket)
    if (socket){
        socket.emit('get-project-bids')
        socket.on('project-bids', (data) => {
            setProjects(data)
        });
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
}
        return () => {
            // socket.off('project-bids')
        };
  }, []); // Empty dependency array means this effect runs once after the initial render

  
  const handleBidSubmit = (e) => {
    e.preventDefault();
    // Validate that project name and bid amount are not empty
    if (projectName.trim() !== '' && bidAmount.trim() !== '') {
      // Emit a 'submit-bid' event to the server
      socket.emit('submit-bid', {
        name: projectName,
        bid: bidAmount,
        type: projectType,
      });

      // Clear the input fields after submitting
      setProjectName('');
      setBidAmount('');
      setProjectType('Smart Contract'); // Reset project type to default
    }
  };

  return (
    <div className="App">
        <header className="App-header">
            <p> Is there a project you want us to automate? </p>
            <p> Add it to the list or increase the bid to show us what we should work on next.</p>
        </header>
        <div className="App-body">
            <p>Current Projects in Queue</p>
            <table className="project-table">
                <thead>
                    <tr>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Project Type</th>
                    <th>Current Bid</th>
                    {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.project_name}</td>
                        <td>{project.type}</td>
                        <td>{project.current_bid}</td>
                        {/* Add more columns as needed */}
                    </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <p>Submit a new project</p>
            <form onSubmit={handleBidSubmit}>
                <label>
                    Project Name:
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </label>
                <br />
                <label>
                    Project Type:
                    <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                    <option value="Smart Contract">Smart Contract</option>
                    <option value="Clicker">Clicker</option>
                    </select>
                </label>
                <br />
                <label>
                    Bid Amount:
                    <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit Bid</button>
            </form>
            
            <br />
            <p>Notes:</p>
            <ul>
                <li>
                    <p>Projects will be looked at in order of highest bid.</p>
                </li>
                <li>
                    <p>There is no guarantee a project will be automated before it ends/rugs.</p>
                </li>
                <li>
                    <p>Not all projects can be efficiently automated.</p>
                </li>
            </ul>
        </div>
    </div>
  );
}
