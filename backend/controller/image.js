const client = require("../config/db");
const cloudinary = require("cloudinary").v2; 
// get all images
const getAllImages = async (req, res) => {
  try {
    const images = await client.query("select * from images");
    return res.status(200).json(images.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// get images related to a specific project
const getImagesByProject = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await client.query(
      "select url from images where id_project=$1",
      [id]
    );
    return res.status(200).json(images.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await client.query("delete from images where id =$1", [id]);
    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).json({ error:error.message });
  }
};
const uploadImages = async (req, res) => {
  try {
      const { id } = req.params;

      // Pour chaque fichier téléchargé
      const imagesPromises = req.files.map(async (file) => {
          const { secure_url } = await cloudinary.uploader.upload(file.path);
          // Insérer chaque image dans la base de données
          const newImage = await client.query(
              "INSERT INTO images (url, id_project) VALUES ($1, $2) RETURNING *",
              [secure_url, id]
          );
          return newImage.rows[0];
      });

      const images = await Promise.all(imagesPromises);

      res.json({success:true});
  } catch (error) {
      console.log(error.message);
      res.status(500).json({
          error: error.message,
      });
  }
};
module.exports = { getAllImages, getImagesByProject, deleteImage ,uploadImages};
