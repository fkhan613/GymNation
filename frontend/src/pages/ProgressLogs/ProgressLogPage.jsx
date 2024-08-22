import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {useNavigate} from 'react-router-dom';

const ProgressLogPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Progress Logs</h1>

      <div className="flex justify-end mb-4">
        <button 
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md  transition duration-300 flex items-center gap-2" 
        onClick={() => navigate("/dashboard/progress-logs/create-log")}>
          <PlusCircleIcon className="w-5 h-5" />
          Create Log
        </button>
      </div>

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
            {/* Example log entry */}
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">2023-10-01</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Leg Day</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>

            {/* Add more log entries here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressLogPage;
