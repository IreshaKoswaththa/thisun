const Project = require('../models/projectModel')
const mongoose = require('mongoose')
const multer = require('multer');
const upload = multer({dest:'uploads/'});

//get all projects
const getProjects = async(req,res) =>{

  const projects = await Project.find({}).sort({createdAt: -1})

  res.status(200).json(projects)
}

const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' });
  }

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'No such project' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get a single project
const getProject = async(req,res) =>{

  const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error:'No such project'})
}

const project = await  Project.findById(id)

if(!project){
  return res.status(404).json({error:'No such project'})
}

res.status(200).json(project)
}

//create a new project

const createProject = async (req, res) => {
  const { title, description, employeeId } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!employeeId) {
    emptyFields.push('employeeId');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    // Add the 6 default tasks to the new project
    const defaultTasks = [
      { title: 'Task 1', description: 'Requirements Gathering', status: 'To Do' },
      { title: 'Task 2', description: 'Design and Architecture.', status: 'To Do' },
      { title: 'Task 3', description: 'Coding and Development.', status: 'To Do' },
      { title: 'Task 4', description: 'Testing and Quality Assurance.', status: 'To Do' },
      { title: 'Task 5', description: 'Documentation.', status: 'To Do' },
      { title: 'Task 6', description: 'Deployment.', status: 'To Do' },
    ];

    const project = await Project.create({ title, description, employeeId: employeeId, file: req.file ? req.file.path : null, defaultTasks });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete a project
const deleteProject = async(req,res)=>{

  const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error:'No such project'})
}
  
const project = await Project.findOneAndDelete({_id: id})


if(!project){
  return res.status(404).json({error:'No such project'})
}

res.status(200).json(project)


}

//update workout

const updateProject = async(req,res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such project'})
  }

  const project = await Project.findOneAndUpdate({_id:id},{
    ...req.body
  })

  if(!project){
    return res.status(404).json({error:'No such project'})
  }

  res.status(200).json(project)
}


module.exports={
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  getProjectById
}
