import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';


export default function UserAutomations({user}) {
    const [projects, setProjects] = useState([]);
    const [credits, setCredits] = useState('0');
    const [activeCredits, setactiveCredits] = useState('0');
    const [activeProjects, setActiveProjects] = useState([]);

  useEffect(() => {
    if(user.subscription){
        setCredits(user.subscription.credits);
        setactiveCredits(user.subscription.credits_in_use);
        setActiveProjects(user.subscription.active_projects);
    }

  },[user])

  useEffect(() => {
    socket.emit('get-projects');

    socket.on('projects',(data)=>{
        setProjects(data)
    })

    return () => {
      socket.off('get-projects');
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  
  const handleToggleProject = (projectId) => {
    const updatedActiveProjects = activeProjects.includes(projectId)
      ? activeProjects.filter((id) => id !== projectId)
      : [...activeProjects, projectId];

    if (updatedActiveProjects.length <= user.subscription.credits_in_use) {
      setActiveProjects(updatedActiveProjects);
    } else {
      alert('You have reached the maximum number of active projects.');
    }
  };
  
  return (
    <div className="App">
        <header className="App-header">
            <h1>Automation Managment</h1>
        </header>
        <div className="App-body">
          <h3>Total Credits: {credits}</h3>
          <h3>Avaialble Credits: {parseInt(credits-activeCredits)}</h3>
            <table className="project-table">
                <thead>
                    <tr>
                    <th>Active</th>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Contract Address</th>
                    <th>Project Website</th>
                    <th>Project Type</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                    <tr key={project.id}>
                        <td>
                        <input
                            type="radio"
                            name={`project-${project.id}`}
                            checked={activeProjects.includes(project.id)}
                            onChange={() => handleToggleProject(project.id)}
                        />
                        </td>
                        <td>{project.id}</td>
                        <td>{project.project_name}</td>
                        <td>{project.contract_address}</td>
                        <td>{project.project_website}</td>
                        <td>{project.type}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
