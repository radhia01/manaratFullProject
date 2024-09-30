import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/actions/auth";
import { useTranslation } from "react-i18next";
import { resetError } from "../../redux/reducers/authSlice";
import { Link } from "react-router-dom";
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error,user } = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData)
    dispatch(signIn(userData));
  };
  
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);
  useEffect(() => {
   dispatch(resetError())
  }, [dispatch])
  
  return (
    <div className="register flex">
      <div className="text-gray-100 text-3xl  lemon-regular flex items-center justify-center w-1/2 ">
        Manarat منارات
      </div>
      <div className=" mx-auto   w-1/2  flex justify-center items-center ">
        <form
          className="form_contact p-5 rounded-lg shodow"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className=" font-bold mt-4">
              <div className="">
                <p className="text-3xl">{t("loginTitle1")}</p> <br />
              </div>
              <div className="">
                <p className=" text-gray-700  text-sm font-semibold">
                  {t("loginTitle2")}
                </p>
              </div>
              <div className="">
              <p className="text-gray-700 text-sm font-semibold text-md">
  {t("loginTitle3")}
  <Link
    to="/signup"
    className="text-blue-500 text-sm font-semi-bold hover:text-blue-700"
  >
    {t("subscribe")}
  </Link>
</p>
              </div>
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
                  onChange={(e) => setemail(e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-start ">
                <label className=" block text-gray-700 font-semibold mb-2">
                  {t("password")}
                </label>
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end text-white w-full px-4">
              <button
                type="submit"
                className="rounded-md bg-blue-600 text-sm px-4  next_btn font-semibold "
              >
                {t("finish")}
              </button>
            </div>
          </div>
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

export default SignIn;
