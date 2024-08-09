import useTitle from "../../hooks/useTitle";
import { Typography } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";
import { getUserWorkouts} from "../../services/workout";
import WorkoutCard from "../../components/WorkoutsPage/WorkoutCard";

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME);

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      
      try {
        const data = await getUserWorkouts(user._id);
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);


  return (
    <div className="flex flex-col items-center m-8 relative">
      <Typography variant="h2" color="blue-gray" className="mb-10">
        Your Workouts
      </Typography>

      <div className="flex flex-row flex-wrap justify-center mt-6">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              name={workout.name}
              description={workout.description}
              exercises={workout.exercises}
              coverPhoto={workout.coverPhoto}
            />
          ))
        ) : (
          <Typography variant="h5" color="blue-gray" className="mb-10">
            No Workouts Found
          </Typography>
        )}
      </div>

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
