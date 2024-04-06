import Logo from "../../components/Logo";
import myImage from "../../assets/hero.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkMode from "./../../components/DarkMode";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { userToken } = useContext(userContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    console.log({ userToken });
    if (userToken) {
      navigate("/home");
    }
  }, [userToken]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <>
      <div className="lg:container-navbar sm:w-100">
        <div className="navbar flex flex-row justify-evenly gap-80 items-center">
          <div>
            <div className=" lg:ms-6 sm:ms-0">
              {" "}
              <Logo></Logo>
            </div>
          </div>
          <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="flex-none gap-2">
            <Link to="/login">
              <button className="text-cyan-800 bg-white border-2 border-cyan-800 border-solid rounded-md w-32 h-12  font-medium hover:bg-cyan-800 hover:text-white mx-4 bg">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md w-32 h-12 font-medium hover:bg-white hover:text-cyan-800 mx-4">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-between ">
        <div className="ms-16">
          <Logo></Logo>
        </div>
        <div className="w-1/40 mr-44">
          <Link to="/login">
            <button className="text-cyan-800 bg-white border-2 border-cyan-800 border-solid rounded-md w-32 h-12  font-medium hover:bg-cyan-800 hover:text-white mx-4">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md w-32 h-12 font-medium hover:bg-white hover:text-cyan-800 mx-4">
              Register
            </button>
          </Link>
        </div>
      </div> */}

      <div className="flex items-center justify-around mt-20">
        <div className="flex flex-col w-1/3 ">
          <h1 className="text-5xl font-bold leading-relaxed">
            Connect friends easily <span className="text-cyan-800 dark">&</span>{" "}
            Quickly
          </h1>
          <p className=" text-xl text-gray-500 mt-6 mb-10 w-3/4 leading-relaxed color">
            Our chat app is the perfect way to stay connected with friends and
            family.
          </p>
          <Link to="/register">
            <button className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md  h-12 font-medium hover:bg-white hover:text-cyan-800 lg:w-40 md:w-36  ">
              Register Now
            </button>
          </Link>
        </div>
        <img src={myImage} alt="" width="550px" />
      </div>
    </>
  );
}
