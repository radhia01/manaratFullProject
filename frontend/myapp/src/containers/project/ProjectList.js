import React from "react";
import { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "./style.css";
import { getProjectsByUser } from "../../redux/actions/project";
import { getLikes } from "../../redux/actions/like";
function ProjectList({ sethandleshow, handleshow }) {
  const dispatch = useDispatch();
  const userid = useSelector(state=>state.auth.user).id;
  const [showDarkModal, setshowDarkModal] = useState(false);
  const [show, setshow] = useState(false);
  const [project, setproject] = useState("");
  const [showDeleteBtn, setshowDeleteBtn] = useState(true)
  const [showDeleteModal, setshowDeleteModal] = useState(false)
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.userProjects);
  const { t } = useTranslation();
  const langue = localStorage.getItem("lan");
  const handleClick = (element) => {
    setshow(true);
    sethandleshow(false);
    setshowDarkModal(true);
    setproject(element);
  };
  const goToProfil = () => {
    navigate("/profile");
  };
  useEffect(() => {
    dispatch(getProjectsByUser({id:userid}));
    dispatch(getLikes())
  }, [dispatch]);
  useEffect(() => {
    if (langue === "ar") {
      window.document.dir = "rtl";
    } else {
      window.document.dir = "ltr";
    }
  }, [langue]);
  
  return (
    <div>
      <div
      className=" projects flex justify-center   py-8  items-center lemon-regular bg-white"
    >
      <div
        className={` relative border-2 p-10 shadow list  m-10 rounded-lg ${
          showDarkModal ? " bg-gray-100" : "bg-white "
        }
        }`}
      >
        <button
          class="bg-blue-500 rounded-3xl py-1 px-2 text-white text-sm font-bold absolute right-1 top-1 "
          onClick={goToProfil}
        >
          {t("back")}
        </button>
        <div className=" flex justify-center text-5xl  text-gray-600 p-5">
          {t("list")}
        </div>
        <div className="flex justify-content-center felw-wrap py-4">
          {projects.map((element) => {
            return (
              <div
                key={element.id}
                class={`relative m-2 h-28 ${
                  showDarkModal ? "bg-gray-200" : "bg-white"
                }`}
              >
                <img
                  src={element.images[1]}
                  alt=""
                  class="shadow bg-white-500 rounded-xl "
                  width={300}
                  onClick={() => handleClick(element)}
                  style={{ height: 250, width: 380 }}
                />

                <div className="fixe top-40 left-100"></div>
                
              </div>
            );
          })}
        </div>
      </div>
    
    </div>
    {show && (
        <ProjectItem
          project={project}
          show={show}
          setshow={setshow}
          handleshow={handleshow}
          showDeleteBtn={showDeleteBtn}
          showDeleteModal={showDeleteModal}
          setshowDeleteModal={setshowDeleteModal}
        />
      )}
    </div>
    
  );
}

export default ProjectList;
