

// import React from 'react';
// import { useProjectContext } from '../hooks/useProjectContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// const ProjectDetails = ({ project }) => {
//   const { dispatch } = useProjectContext();

//   const handleClick = async () => {
//     const response = await fetch('/api/projects/' + project._id, {
//       method: 'DELETE',
//     });

//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'DELETE_PROJECT', payload: json });
//     }
//   };

//   return (
//     <div className="workout-details">
//       <h4>{project.title}</h4>
//       <p>
//         <strong>Description: </strong>
//         {project.description}
//       </p>
//       <p>
//         <strong>File: </strong>
//         {project.file && (
//           <a href={`http://localhost:4000/${project.file}`} target="_blank" rel="noopener noreferrer"
//           download >
//           dsdssd
//           </a>
//         )}
//       </p>
//       <p>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</p>
//       <span className="material-symbols-outlined" onClick={handleClick}>
//         delete
//       </span>
//     </div>
//   );
// };

// export default ProjectDetails;

import React from 'react';
import { useProjectContext } from '../hooks/useProjectContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectContext();
  const {user} = useAuthContext()

  const handleClick = async () => {
    if(!user){
      return 
    }
    const response = await fetch('/api/projects/' + project._id, {
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PROJECT', payload: json });
    }
  };

  const downloadLink = project.file && (
    <a
      href={`http://localhost:4000/${project.file}`}
      target="_blank"
      rel="noopener noreferrer"
      download // This attribute makes the file downloadable
    >
      Download File
    </a>
  );

  return (
    <div className="workout-details">
      <h4>{project.title}</h4>
      <p>
        <strong>Description: </strong>
        {project.description}
      </p>
      <p>
        <strong>File: </strong>
        {downloadLink}
      </p>
      <p>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ProjectDetails;
