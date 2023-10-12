import React, { useState } from 'react';
import { useProjectContext } from '../hooks/useProjectContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectForm = () => {
  const { dispatch } = useProjectContext();
  const {user} = useAuthContext
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [employeeId, setEmployeeId] = useState(''); // Store the employee ID

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){

      setError('YOU MUST BE LOGGED IN ')
      return
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('employeeId', employeeId); // Append the employee ID to the form data

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: formData, 
      headers:{
        'Content-Type':`application/json`,
        'Authorization':`Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setDescription('');
      setFile(null); // Reset the file input field
      setEmployeeId(''); // Reset the employee ID input field
      setError(null);
      setEmptyFields([]);
      console.log('New project added', json);
      dispatch({ type: 'CREATE_PROJECT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Project</h3>

      <label htmlFor="employeeId">Employee ID:</label>
      <input
        type="text"
        onChange={(e) => setEmployeeId(e.target.value)}
        value={employeeId}
        className={emptyFields.includes('employeeId') ? 'error' : ''}
      />

      <label>Project Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>File:</label>
      <input
        type="file"
        onChange={handleFileChange}
        className={emptyFields.includes('file') ? 'error' : ''}
      />

      <button>Add Project</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProjectForm;
