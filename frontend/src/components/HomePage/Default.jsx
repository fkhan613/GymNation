import { motion } from "framer-motion";
import logo from "../../assets/gymnation-logo.png";

const Default = () => {
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
        className="text-4xl font-bold text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to GymNation
      </motion.h1>
      <motion.p
        className="text-lg text-black mt-4 font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        This is the homepage, it is under development and will be available soon. <br></br>
        In the meantime, you can checkout the other features by navigating to the sidebar.
      </motion.p>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
      </motion.div>
    </div>
  );
};

export default Default;
