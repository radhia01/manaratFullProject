import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
function Navbar({ color, setcolor, sethandleshow }) {
  const {user} = useSelector(state=>state.auth);
  console.log(user)
  const dispatch=useDispatch()
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setShow(true);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTimeout(() => {
      if (!hovered) {
        setShow(false);
      }
    }, 100);
  };
  const handleProfile = () => {
    navigate("/profile");
    setcolor(false);
  };
  const handleHome = () => {
    setcolor(true);
    navigate("/home");
    sethandleshow(true);
  };
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lan", e.target.value);
  };
  const langue = localStorage.getItem("lan");
  useEffect(() => {
    if (langue === "ar") {
      window.document.dir = "rtl";
    } else {
      window.document.dir = "ltr";
    }
  }, [langue]);
  const Disconnect = () => {
    const data={navigate}
    dispatch(logout(data));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);
    return () => clearInterval(timer);
  }, [show]);
  useEffect(() => {
    if (!user ){
      navigate("/")
    }
  }, [user])
  
  return (
    <div
      className={`py-1 px-5 fixed w-full z-40 top-0 ${
        color ? "bg-white   text-gray-950" : "bg-gray-800 border-g text-white"
      }`}
    >
      <div className="mx-auto flex justify-between items-center">
        <div className="text-2xl lemon-regular flex justify-center items-center">
          <button onClick={handleHome}>
            Manarat <span className="lemon-regular mt-2 ml-2">منارات</span>{" "}
          </button>
        </div>
        <ul
          className={`flex gap-5 items-center justify-center ${
            color ? "text-gray-950" : "text-white"
          }`}
        >
          {user && (
            <>
              <li>
                <Link className="link text-xl font-semibold" to="/home">
                  {t("discover")}
                </Link>
              </li>
            {user && user.user_role==="Admin" && <li> <Link className="link text-xl font-semibold" to="/dashboard">
                  {t("adminSpace")}
                </Link>
              </li>}
              <li>
                {user&& user.user_role!=="Admin" && <Link className="link text-sm font-semibold" to="/messages">
                  {t("boite")}
                </Link>}
              </li>
            </>
          )}
       
          {user && (
            <li className="relative mt-1">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={user.profile_img}
                  className="rounded-full h-8 w-9"
                 
                  alt=""
                />
              </button>
    
              {show && (
                <div
                  className="absolute text-gray-400 bg-white shadow rounded py-4 px-1 mt-2 z-10"
                  style={{ width: 200, right: 0 }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <div className="flex justify-center">
                    <img
                      className="rounded-full h-10 w-10"
                      src={user.profile_img}
                      height={20}
                      width={50}
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center">
                    <p className="flex text-gray-900 text-md">
                      {user && user.firstname} {user && user.lastname}
                    </p>
                  </div>
                  <div className="flex justify-center text-gray-500 text-sm font-semibold">
                    <p>{user.email}</p>
                  </div>
                  <hr className="bg-gray-900 my-3" />
                  <ul className="text-gray-900 text-sm font-semibold text-start flex flex-col">
                    <li className="py-2">
                      <button onClick={handleProfile}>{t("profile")}</button>
                    </li>
                    <li>
                      <button class="py-3" onClick={() => Disconnect()}>
                        {t("deconnect")}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
          <li>
            {" "}
            <select
              class="text-gray-900 text-sm font-bold rounded-md"
              onChange={changeLanguage}
              defaultValue={i18n.language}
            >
              <option value="ar">عربي </option>
              <option value="fr">français</option>
              <option value="en">English</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
