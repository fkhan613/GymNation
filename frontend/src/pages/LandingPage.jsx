import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import logo from "../assets/gymnation-logo.png";
import {motion} from "framer-motion";

const LandingPage = () => {
  useTitle("GymNation | Connecting Fitness Enthusiasts");

  return (
    <div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="bg">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(255, 255, 255, 0.8)" }}
            ></stop>
            <stop
              offset="50%"
              style={{ stopColor: "rgba(255, 255, 255, 0.8)" }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: "rgba(255, 255, 255, 0.8)" }}
            ></stop>
          </linearGradient>
          <path
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
    s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>
        <g>
          <use xlinkHref="#wave" opacity=".3">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".4">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity="0.56">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>

      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center flex flex-col gap-3">
        <div className="mb-4">
          <motion.img
            src={logo}
            alt="GymNation Logo"
            className="w-32 h-32 mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </div>
        <motion.h1
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to GymNation
        </motion.h1>
        <motion.p
          className="text-lg text-white mt-4 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Connecting Fitness Enthusiasts & Reaching New Limits
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            to="/login"
            className="bg-indigo-600 text-white hover:bg-indigo-800 px-6 py-3 rounded-md text-lg font-medium transition duration-300"
          >
            Enter
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
