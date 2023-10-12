// EmployeePage.js
import React, { useState, useEffect } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import { formatDistanceToNow } from 'date-fns';

const EmployeePage = () => {
  const { projects, dispatch } = useProjectContext();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch the list of projects that the employee has been assigned to
    async function fetchProjects() {
      const response = await fetch("/api/projects");
      const projects = await response.json();

      dispatch({ type: "SET_PROJECTS", payload: projects });
    }

    fetchProjects();
  }, [dispatch]);

  // Fetch the project details when the employee clicks on the button
  const viewProject = async (projectId) => {
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();

    setProjectDetails(project);
  };

  // Display the project details on the page
  const renderProjectDetails = () => {
    if (!projectDetails) {
      return null;
    }
     
    return (
      <div>
        <h4>{projectDetails.title}</h4>
        <p>
          <strong>Description: </strong>
          {projectDetails.description}
        </p>
        <p>
          <strong>File: </strong>
          {projectDetails.file && (
            <a href={`http://localhost:4000/${projectDetails.file}`} target="_blank" rel="noopener noreferrer" download>
              Download File
            </a>
          )}
        </p>
        <p>{formatDistanceToNow(new Date(projectDetails.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={() => dispatch({ type: "DELETE_PROJECT", payload: projectDetails })}>
          delete
        </span>
      </div>
    );
  };

  return (
    <div>
      <h1>Employee Page</h1>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.title}
            <button onClick={() => viewProject(project._id)}>View Project</button>
          </li>
        ))}
      </ul>

      {renderProjectDetails()}
    </div>
  );
};

export default EmployeePage;
