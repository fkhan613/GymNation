import useTitle from "../../hooks/useTitle";
import { Typography } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME);

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);


  return (
    <div className="flex flex-col items-center m-10 relative">
      <Typography variant="h2" color="blue-gray" className="mb-10">
        Your Workouts
      </Typography>

      <div className="flex flex-row flex-wrap justify-center mt-16"></div>

      <PulseLoader
        color="#2563EB"
        className=" mt-16"
        loading={loading}
        size={15}
      />
    </div>
  );
};

export default WorkoutsPage;
