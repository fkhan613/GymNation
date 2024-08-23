import { PlusCircleIcon, EyeIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { getUserProgressLogs } from "../../services/progressLog";
import { getWorkoutById } from "../../services/workout";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";

const ProgressLogPage = () => {
  useTitle("Progress Logs | " + import.meta.env.VITE_APP_NAME);
  const [progressLogs, setProgressLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressLogs = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const logs = await getUserProgressLogs(userId);

        if (!Array.isArray(logs.progressLogs)) {
          throw new Error("Unexpected response format");
        }

        const logsWithWorkoutNames = await Promise.all(
          logs.progressLogs.map(async (log) => {
            console.log(log.workoutId);
            const workout = await getWorkoutById(log.workoutId);
            console.log(workout);
            return { ...log, workoutName: workout.name };
          })
        );

        setProgressLogs(logsWithWorkoutNames);
      } catch (error) {
        console.error("Failed to fetch progress logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressLogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-12">Progress Logs</h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
          onClick={() => navigate("/dashboard/progress-logs/create-log")}
        >
          <PlusCircleIcon className="w-5 h-5" />
          Create Log
        </button>
      </div>

      {loading ? (
        <PulseLoader />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Workout
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {progressLogs.map((log) => (
                <tr key={log._id}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {log.workoutName}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm flex gap-3">
                    <button className=" bg-gray-900 hover:bg-blue-gray-700 text-white px-4 py-2 rounded-md transition duration-300 flex">
                      <EyeIcon className="w-5 h-5 mr-3" />
                      View
                    </button>
                    <button className="bg-indigo-500 hover:bg-indigo-900 text-white px-4 py-2 rounded-md transition duration-300 flex">
                      <PencilSquareIcon className="w-5 h-5 mr-3" />
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded-md transition duration-300 flex">
                      <TrashIcon className="w-5 h-5 mr-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgressLogPage;
