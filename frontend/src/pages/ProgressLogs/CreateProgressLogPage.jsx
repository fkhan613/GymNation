import { useState, useEffect } from "react";
import { getUserWorkouts, getExercisesByWorkout } from "../../services/workout";
import { createProgressLog } from "../../services/progressLog";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";


const CreateProgressLogPage = () => {
  useTitle("Create Progress Log | " + import.meta.env.VITE_APP_NAME);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [exercises, setExercises] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const workouts = await getUserWorkouts(userId);
      setWorkouts(workouts);
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedWorkout) {
        const exercises = await getExercisesByWorkout(selectedWorkout);
        setExercises(exercises);
        setMetrics(
          exercises.map((exercise) => ({
            exerciseId: exercise._id,
            sets: [{ weight: "", reps: "" }],
          }))
        );
      }
    };

    fetchExercises();
  }, [selectedWorkout]);

  const handleMetricChange = (exerciseIndex, setIndex, field, value) => {
    const newMetrics = [...metrics];
    newMetrics[exerciseIndex].sets[setIndex][field] = value;
    setMetrics(newMetrics);
  };

  const addSet = (exerciseIndex) => {
    const newMetrics = [...metrics];
    newMetrics[exerciseIndex].sets.push({ weight: "", reps: "" });
    setMetrics(newMetrics);
  };

  const removeSet = (exerciseIndex) => {
    const newMetrics = [...metrics];
    newMetrics[exerciseIndex].sets.pop();
    setMetrics(newMetrics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const response = await createProgressLog(
        userId,
        selectedWorkout,
        metrics
      );
      if (response) {
        toast.success("Progress log created successfully.");
        navigate("/dashboard/progress-logs");

      } else {
        toast.error("An error occurred while creating the progress log.");
      }
    } catch (err) {
      toast.error("An error occurred while creating the progress log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Progress Log
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 border-b-2 pb-10">
          <label
            htmlFor="workout"
            className="block text-lg font-medium text-gray-700"
          >
            Workout
          </label>
          <select
            id="workout"
            value={selectedWorkout}
            onChange={(e) => setSelectedWorkout(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a workout</option>
            {workouts.map((workout) => (
              <option key={workout._id} value={workout._id}>
                {workout.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-6">
          {exercises.map((exercise, exerciseIndex) => (
            <div key={exercise._id} className="mb-4 border-b-2 py-2">
              <h2 className="text-md font-medium text-gray-700">
                {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
              </h2>
              {metrics[exerciseIndex].sets.map((set, setIndex) => (
                <div key={setIndex} className="flex space-x-4 mb-2">
                  <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={set.weight}
                    min={0}
                    onChange={(e) =>
                      handleMetricChange(
                        exerciseIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={set.reps}
                    min={0}
                    onChange={(e) =>
                      handleMetricChange(
                        exerciseIndex,
                        setIndex,
                        "reps",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSet(exerciseIndex)}
                className="text-indigo-600 hover:text-indigo-900 text-sm"
              >
                Add Set
              </button>
              <button
                type="button"
                onClick={() => removeSet(exerciseIndex)}
                className="text-red-600 hover:text-red-900 text-sm ml-4"
              >
                Remove Set
              </button>
            </div>
          ))}{" "}
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
          disabled={loading}
        >
          {loading ? (
            "Creating..."
          ) : (
            <p className="flex justify-center">
              <PlusCircleIcon className="w-5 h-5 mr-4" /> Create a Progress Log
            </p>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProgressLogPage;
