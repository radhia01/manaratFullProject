import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { signUp, verifyEmailAndPassword } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetError, resetMessage } from "../../redux/reducers/authSlice";
import { useTranslation } from "react-i18next";
function SignUp() {
  const { t } = useTranslation();
  const [showpart2, setshowpart2] = useState(false);
  const { successRegister, successVerifyPassword, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    job: "",
    adress: "",
    phone: "",
  });
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
   
    e.preventDefault();
    dispatch(signUp(user));
    navigate("/")
  };
  const handlePassword = (e) => {
    e.preventDefault();
   const {password,email}=user
   dispatch(verifyEmailAndPassword({password,email}))
  };
  useEffect(() => {
    if (successVerifyPassword) {
      setshowpart2(true);
    }
  }, [successVerifyPassword]);
  useEffect(() => {
    if (successRegister) {
      setshowpart2(false)
      navigate("/");
    }
  }, [successRegister]);
  useEffect(() => {
   dispatch(resetError())
   dispatch(resetMessage())
  }, [dispatch])
  
  return (
    <div className="register flex justify-between ">
      <div className="text-gray-100 text-3xl  lemon-regular flex items-center justify-center w-1/2 ">
        Manarat
      </div>
      <div className=" mx-auto   w-1/2  flex justify-center items-center">
        <form className="form_contact p-5 rounded-lg shodow">
          {!showpart2 && (
            <div className="">
              <div className=" font-bold mt-4">
                {" "}
                <p className=" text-gray-500 text-sm">{t("step1")}</p>
                <p className="text-3xl">{t("createAccount")} </p> <br />
                <p className=" text-gray-700 font-semibold text-sm py-3">
                  {t("Signuptext1")}
                </p>
                <p className="text-gray-700 text-sm font-semibold">
                  {t("Signuptext2")}
                  <a
                    href="/"
                    className="text-blue-500 font-semi-bold hover:text-blue-700"
                  >
                    {t("connect")}
                  </a>
                </p>
              </div>
              <div className=" " style={{ marginTop: 70 }}>
                <div className="flex justify-start">
                  <label className="  block text-gray-700 text-sm font-semibold mb-2">
                    {t("email")}
                  </label>
                </div>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-start ">
                  <label className=" block text-gray-700  text-sm font-semibold mb-2">
                    {t("password")}
                  </label>
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end text-white w-full px-4">
                <button
                  className="rounded-md bg-blue-600 text-sm px-4  next_btn font-semibold "
                  onClick={handlePassword}
                >
                  {t("suivant")}
                </button>
              </div>
            </div>
          )}

          {showpart2 && (
            <div className="text-gray-500 text-sm">
              <p>Etape 2 sur 2</p>
              <div className=" " style={{ marginTop: 60 }}>
                <div className="flex justify-start">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nom
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className=" mt-2">
                <div className="flex justify-start">
                  <label className="  block text-gray-700 text-sm font-semibold mb-2">
                    Prénom
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className=" mt-2">
                <div className="flex justify-start">
                  <label className="  block text-gray-700 text-sm font-semibold mb-2">
                    Adresse
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="adress"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-start">
                  <label className="  block text-gray-700 text-sm font-semibold mb-2">
                    Télephone
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-start">
                  <label className="  block text-gray-700 text-sm font-semibold mb-2">
                    Profession
                  </label>
                </div>
                <div className="">
                  <input
                    type="text"
                    name="job"
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className=" flex justify-end mt-4 ">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-600 rounded-md next_btn text-white  text-1xl font-semibold py-1 px-2"
                >
                  Terminer
                </button>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-700 my-10 rounded text-red-100 py-2">
              <p>{error}</p>{" "}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
