import useTitle from "../../hooks/useTitle";
import { Typography } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";
import { getUserWorkouts, deleteWorkoutById } from "../../services/workout";
import WorkoutCard from "../../components/WorkoutsPage/WorkoutCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

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
  };

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

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen ">
          <PulseLoader color="#2563EB" className=" mt-24" size={15} />
        </div>
      );
    }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-20 shadow-md rounded p-6">
        <Typography
          variant="h2"
          color="blue-gray"
          className="text-3xl font-bold"
        >
          Your Workouts
        </Typography>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          onClick={() => navigate("/dashboard/workouts/create-workout")}
        >
        <PlusCircleIcon className="w-5 h-5"/>
          Create A Workout
        </button>
      </div>

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
    </div>
  );
};

export default WorkoutsPage;
