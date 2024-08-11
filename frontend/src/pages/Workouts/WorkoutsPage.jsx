import useTitle from "../../hooks/useTitle";
import { Typography } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";
import { getUserWorkouts, deleteWorkoutById } from "../../services/workout";
import WorkoutCard from "../../components/WorkoutsPage/WorkoutCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME);

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

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

  const handleDeleteWorkout = (workoutId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    deleteWorkoutById(workoutId, user._id)
      .then(() => {
        setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
        toast.success("Workout Deleted Successfully");

      })
      .catch((error) => {
        toast.error("Error Deleting Workout");
        console.error(error);
      });
  }

  const handleEditWorkout = (
    workoutId,
    name,
    description,
    exercises,
    coverPhoto,
    visibility
  ) => {
    localStorage.setItem("tempExercises", JSON.stringify({ exercises }));

    // Redirect to the Edit Workout Page
    navigate(
      `/dashboard/workouts/edit/${workoutId}?name=${name}&description=${description}&coverPhoto=${coverPhoto}&visibility=${visibility}`
    );
  };

  return (
    <div className="flex flex-col items-center m-8 relative">
      <Typography variant="h2" color="blue-gray" className="mb-10 text-center">
        Your Workouts
      </Typography>

      <div className="flex flex-row flex-wrap justify-center mt-6 gap-8">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              id={workout._id}
              name={workout.name}
              description={workout.description}
              exercises={workout.exercises}
              coverPhoto={workout.coverPhoto}
              visibility={workout.visibility}
              deleteWorkout={handleDeleteWorkout}
              editWorkout={handleEditWorkout}
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
