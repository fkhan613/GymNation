/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import logo from "../../assets/gymnation-logo.png";
import { useState, useEffect } from "react";
import { getExercisesByWorkout } from "../../services/workout";
import { useNavigate } from "react-router-dom";

export default function ProgressLogModal({ progressLog, open, setOpen }) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      if (progressLog.workoutId) {
        const exercises = await getExercisesByWorkout(progressLog.workoutId);
        setExercises(exercises);
      }
    };

    fetchExercises();
  }, [progressLog.workoutId]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <img
              className="w-36 mx-auto max-h-52 mt-4"
              src={logo}
              alt="GymNation"
            />
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                  <DialogTitle
                    as="h2"
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  >
                    {new Date(progressLog.date).toLocaleDateString()}
                  </DialogTitle>
                  <DialogTitle
                    as="h2"
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  >
                    {new Date(progressLog.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(progressLog.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </DialogTitle>
                </div>
              </div>
              <div className="mt-2">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                  <DialogTitle
                    as="h2"
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  >
                    {progressLog.workoutName}
                  </DialogTitle>
                </div>
                <div>
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          Exercise
                        </th>
                        <th className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          Sets
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercises?.map((exercise) => {
                        const metric = progressLog.metrics.find(
                          (m) => m.exerciseId === exercise._id
                        );
                        return (
                          <tr key={exercise._id}>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              {exercise.name[0].toUpperCase() +
                                exercise.name.slice(1)}
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              {metric?.sets?.map((set, index) => (
                                <div key={index} className="flex gap-10">
                                  <span>{set?.weight} lbs</span>
                                  <span>{set?.reps} reps</span>
                                </div>
                              )) || <span>No sets available</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
              <button
                type="button"
                onClick={() =>
                  navigate(`/dashboard/progress-logs/edit/${progressLog._id}`)
                }
                className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-900 sm:mt-0 sm:w-auto transition duration-300"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
