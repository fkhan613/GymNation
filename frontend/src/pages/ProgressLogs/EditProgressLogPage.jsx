import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExercisesByWorkout, getWorkoutById } from "../../services/workout";
import {
  getProgressLogById,
  updateProgressLog,
} from "../../services/progressLog";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import { Button } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";

const EditProgressLogPage = () => {
  useTitle("Edit Progress Log | " + import.meta.env.VITE_APP_NAME);
  const [workout, setWorkout] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [exercises, setExercises] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logId } = useParams();

  useEffect(() => {
    const fetchProgressLog = async () => {
      setLoading(true);
      try {
        const { progressLog } = await getProgressLogById(logId);
        const workout = await getWorkoutById(progressLog.workoutId);
        setWorkout(workout);
        setStartTime(progressLog.startTime);
        setEndTime(progressLog.endTime);
        setSelectedWorkout(progressLog.workoutId);
        setMetrics(progressLog.metrics);
      } catch (error) {
        console.error("Error fetching progress log:", error);
        toast.error("Progress log not found.");
      } finally {
        setLoading(false);
      }
    };

    if (logId) {
      fetchProgressLog();
    }
  }, [logId]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedWorkout) {
        const exercises = await getExercisesByWorkout(selectedWorkout);
        setExercises(exercises);
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

    try {
      const response = await updateProgressLog(
        logId,
        selectedWorkout,
        metrics,
        startTime,
        endTime
      );
      if (response) {
        toast.success("Progress log updated successfully.");
        navigate("/dashboard/progress-logs");
      } else {
        toast.error("An error occurred while updating the progress log.");
      }
    } catch (err) {
      toast.error("An error occurred while updating the progress log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <Button size="sm" onClick={() => navigate("/dashboard/progress-logs")}>
        Back
      </Button>

      <h1 className="text-2xl font-bold text-center mb-6">Edit Progress Log</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 border-b-2 pb-10">
          <h1 className="text-lg font-semibold text-black">{workout.name}</h1>
          <div className="flex mt-6 flex-col align-middle gap-8">
            <div>
              <label
                htmlFor="start-time"
                className="block text-sm text-gray-700"
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="end-time" className="block text-sm text-gray-700">
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {exercises.map((exercise, exerciseIndex) => (
            <div key={exercise._id} className="mb-4 border-b-2 py-2">
              <h2 className="text-md font-medium text-gray-700">
                {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
              </h2>
              {metrics[exerciseIndex].sets?.map((set, setIndex) => (
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
            "Updating..."
          ) : (
            <p className="flex justify-center">
              <PlusCircleIcon className="w-5 h-5 mr-4" /> Update Progress Log
            </p>
          )}
        </button>
      </form>

      <PulseLoader
        color="#2563EB"
        className=" mt-24"
        loading={loading}
        size={15}
      />
    </div>
  );
};

export default EditProgressLogPage;
