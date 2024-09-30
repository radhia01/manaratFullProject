import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import Message from "../../components/Message/Message";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
function Project() {
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth)
  const userId = user.id;
  const [title, settitle] = useState("");
  const [msg, setmsg] = useState(null);
  const [files, setfiles] = useState([]);
  const [description, setdescription] = useState("");
  const langue = localStorage.getItem("lan");
  const { t } = useTranslation();
  const handleSelectFile = async (e) => {

    setfiles([...e.target.files]);
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { userId, title, description };
      const form = new FormData();
      files.forEach((file) => {
        form.append("image", file);
      });
      const response = await axios.post(
        `https://manarat-api.vercel.app/api/projects/users/${userId}`,
        data,
        
      );
      const id = response.data.project.id;
      const response2=await axios.post(
        `https://manarat-api.vercel.app/api/upload/image/projects/${id}`,
        form
      );
   
    if(response2.data.success && response.data.success){
      setmsg(t("addProjectSuccessMessage"));
    }
    
      settitle("");
      setdescription("");
      navigate("/projects")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (langue === "ar") {
      window.document.dir = "rtl";
    } else {
      window.document.dir = "ltr";
    }
  }, [langue]);
  const goToProfil = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className=" relative  bg-white border-2 p-10  shadow">
        <button
          class="bg-blue-500 rounded-3xl py-1 px-2 text-white text-sm font-bold absolute right-1 top-1 "
          onClick={goToProfil}
        >
          {t("back")}
        </button>
        <div className=" flex justify-center text-4xl  text-gray-500 p-10 lemon-regular">
          {t("addProjectTitle1")}
        </div>
        <div>
          <div className="flex justify-center gap-7">
            <div className="w-60 flex justify-center">
              <label class="m-3">{t("titre")}</label>
            </div>
            <input
              class="border w-80 h-12"
              type="text"
              onChange={(e) => settitle(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-center gap-7 m-8">
            <div className="w-60 flex justify-center">
              <label class="m-3">{t("description")}</label>
            </div>
            <textarea
              placeholder={t("keyWords")}
              class="border w-80 px-2 "
              rows="5"
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center w-100"></div>

          <div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleSelectFile}
              multiple // permet la sélection de plusieurs fichiers
            />
            <button
              class="rounded-2xl bg-blue-400 py-2 px-3 text-white font-semibold"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {t("import")}
            </button>
          </div>
          {files.length > 0 && (
  <div className="flex justify-center gap-5 m-2">
    {files.map((file, index) => (
      <img
        key={index}
        src={URL.createObjectURL(file)} 
        alt={`image-${index}`}
        className="h-32 w-auto"
      />
    ))}
  </div>
)}
          <div className="flex justify-center m-10">
            <button
              onClick={(e) => handleSubmit(e)}
              class="bg-green-700 py-3 px-4 rounded-3xl w-40 text-white"
            >
              {t("create")}
            </button>
          </div>
        </div>
        
        {msg && <Message message={msg} />}
      </div>
    </div>
  );
}

export default Project;
