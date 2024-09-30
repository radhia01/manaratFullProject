const client = require("../config/db");
// add new project
const createProject = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const today=new Date()
  try {
    const newProject = await client.query(
      "insert into projects (title,description,id_user,created_at,approved) values ($1,$2,$3,$4)  returning *",
      [title, description, id,today,false]
    );
    return res.status(201).json({
      success:true,
      project: newProject.rows[0],
    });
  } catch (error) {
 
    return res.status(500).json({ error:error.message });
  }
};
// get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await client.query(
      "select p.title as project_title , p.description as project_description , p.id_user as user , p.id as projectid , array_agg(i.url)  as images,created_at , approved  from projects p  inner join images i  on p.id=i.id_project  group by (p.id)   "
    );
    return res.status(200).json(projects.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message});
  }
};
// get project by id
const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await client.query("select * from projects where id=$1", [
      id,
    ]);
    return res.status(200).json(project.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message});
  }
};
// get all projects by user
const getAllProjectsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await client.query(
      "SELECT p.id AS project_id,p.title AS project_title, p.description AS project_description,array_agg(i.url) AS images FROM projects p INNER JOIN images i ON p.id = i.id_project WHERE p.id_user = $1  GROUP BY p.id",
      [id]
    );
    return res.status(200).json(projects.rows);
  } catch (error) {
    return res.status(500).json({ error:error.message});
  }
};
// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await client.query("delete from images where id_project=$1",[id])
    await client.query("delete from projects where id =$1", [id]);
    return res.status(200).json({ idProject: id });
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};
// update Project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProject = await client.query(
      "update  projects  set title=$1 , description=$2 where id =$3 returning *",
      [title, description, id]
    );
    return res.status(200).json(updatedProject.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// approuve project 

const acceptProject = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
     await client.query(
      "update  projects  set approved=true where id=$1  ",
      [ id]
    );
    return res.status(200).json({id});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createProject,
  getAllProjects,
  getProject,
  getAllProjectsByUser,
  deleteProject,
  updateProject,
  acceptProject
};
