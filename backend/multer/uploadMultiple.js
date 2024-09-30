const cloudinary=require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });



  const uploadMultiple=async(req,res)=>{
 try {
  const {id}=req.params
  console.log(req.files);
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

  res.json(images);



return res.status(200).json({success:true})
           
    
 } catch (error) {
    
 }
}
module.exports=uploadMultiple