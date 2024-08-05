import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/gymnation-logo.png";

const HeroText = () => {
  return (
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
  );
}

export default HeroText