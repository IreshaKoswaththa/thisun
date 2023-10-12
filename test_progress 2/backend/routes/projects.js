const express = require('express')
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  getProjectById,
} = require('../controllers/projectController')
const requireAuth =require("../middleware/requireAuth")

const upload = require('../middleware/upload')


const router = express.Router()

//require auth for all project routes
router.use(requireAuth)

//get all projects
router.get('/',getProjects)

//GET a single project

router.get('/:id',getProject)

//POST a new project

router.post('/',upload.single('file'),createProject)

//Delete a project
router.delete('/:id',deleteProject)

//Update a workout
router.patch('/:id',updateProject)

// Get a single project by ID
router.get('/:id', getProjectById);


module.exports = router