import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
/**
 * * import from react-icons
 */
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
function Profile() {
  const { t } = useTranslation();
  const {user} = useSelector(state=>state.auth)
  const navigate = useNavigate();
  const langue = localStorage.getItem("lan");
  useEffect(() => {
    if (langue === "ar") {
      window.document.dir = "rtl";
    } else {
      window.document.dir = "ltr";
    }
  }, []);
  return (
    <div>
      <div
        className="bg-gray-800 w-full flex justify-center items-center"
        style={{ height: 250 }}
      >
        <div className="text-white  flex">
          <span class="py-4 text-1xl text-gray-400 font-bold">
            {" "}
            {t("welcome")}
          </span>{" "}
          <p class="px-3 text-4xl">{user.firstname}</p>
          <p class="px-3 text-4xl">{user.lastname}</p>
        </div>
      </div>
      <div className="flex justify-end py-2 px-4">
        {" "}
        <FaPlusCircle class="text-4xl p-1" />{" "}
        <button
          class="  rounded-3xl border-2 px-2 text-sm font-semibold  py-1"
          onClick={() => navigate("/create/project")}
        >
          {t("addProject")}
        </button>
      </div>
      <div className="bg-white py-10 flex justify-center gap-10">
        <button class="bg-gray-950  text-white py-2 px-3 text-sm font-medium rounded-3xl btn-width" onClick={()=>navigate("/update/profile")}>
          {t("editProfile")}
        </button>
        <button class="bg-gray-950  text-white py-2 px-3 text-sm font-medium rounded-3xl  btn-width" onClick={()=>navigate("/update/password")}>
          {t("editPassword")}
        </button>
       {user && user.user_role!=="Admin" &&
        <button
        class="bg-gray-950 rounded-3xl text-white py-2 px-3 text-sm font-medium btn-width"
        onClick={() => navigate("/projects")}
      >
        {t("projects")}
      </button> }
      </div>
    </div>
  );
}

export default Profile;
