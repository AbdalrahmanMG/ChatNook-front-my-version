import SignWithGmailBtn from "../../components/SigninWithGoogle";
import SectionBreak from "../../components/SectionBreak";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userValidationSchema } from "../../schema/shemaValidation";
import { registration } from "../../api/auth";
import DarkMode from "./../../components/DarkMode";
import { useState, useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
const Registration = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await registration(values);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <section className="py-14 h-screen">
      <div className="xl:grid  gap-4 lg:grid grid-cols-2">
        <div className="left-sec  flex flex-col items-center">
          <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <img
            className="w-4/6"
            src="login img/Speech bubbles-amico 1.png"
            alt="signup"
          />
        </div>
        <div className="right-sec">
          <div className="header-text text-cyan-700 font-bold text-3xl m-auto text-center mb-5 ">
            Hello, Welcome Back!
          </div>
          <p className="sub-heading text-gray-400 text-sm text-center block mb-7 color font-medium">
            Help you to contact everyone with just easy way
          </p>
          <SignWithGmailBtn />
          <div className="form-sec mb-10 flex flex-col items-center">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
              <div className=" flex justify-center">
                <div className="lg:w-full md:w-full w-3/4">
                  <SectionBreak />
                </div>
              </div>
              <div className="flex m-auto justify-center">
                {errorMessage ? (
                  <div className="alert  w-11/12 flex flex-col justify-center mb-4 text-white  bg-red-600 h-8">
                    {errorMessage}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex m-auto justify-center ">
                <div className=" w-11/12 mb-6">
                  <label
                    htmlFor="fullName"
                    className="block text-sm ml-3 font-medium leading-6 text-gray-900 color"
                  >
                    full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="input w-full text-gray-900 focus:outline-none grow focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 focus:bg-gray-10 bg"
                  />
                  {formik.errors.fullName && formik.touched.fullName ? (
                    <div className=" w-11/12 text-red-600">
                      {formik.errors.fullName}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex m-auto justify-center">
                <div className="w-11/12 mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm ml-3 font-medium leading-6 text-gray-900 color"
                  >
                    {" "}
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="name"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="input w-full text-gray-900 focus:outline-none bg grow focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 focus:bg-gray-100"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="w-11/12 text-red-600">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex m-auto justify-center">
                <div className="w-11/12 mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm ml-3 font-medium leading-6 color text-gray-900"
                  >
                    {" "}
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="input w-full text-gray-900 focus:outline-none bg grow focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 focus:bg-gray-100"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className=" w-11/12 text-red-600">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex m-auto justify-center">
                <div className="w-11/12 flex justify-center">
                  {loading ? (
                    <button className="text-white bg-cyan-800 border-2 m-auto border-cyan-800 border-solid rounded-md btn w-2/3  font-medium hover:bg-white hover:text-cyan-800 ">
                      <TbFidgetSpinner className="animate-spin w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                      className="text-white bg-cyan-800 border-2 m-auto border-cyan-800 border-solid rounded-md btn w-2/3 font-medium hover:bg-white hover:text-cyan-800 "
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="m-auto w-72 text-center">
            <p className="text-base text-gray-700 mt-2">
              Already a member?
              <Link
                className=" cursor-pointer font-bold text-[#1e7887]"
                to="/login"
              >
                LOG IN
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
