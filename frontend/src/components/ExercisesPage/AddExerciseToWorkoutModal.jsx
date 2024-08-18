/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import logo from "../../assets/gymnation-logo.png";
import { getUserWorkouts } from "../../services/workout";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ShortenedWorkoutCard from "./ShortenedWorkoutCard";

export default function AddExerciseToWorkoutModal({
  exercise,
  openAddWorkoutModal,
  setOpenAddWorkoutModal,
}) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

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

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  const reducedInstructions =
    exercise.instructions.length > 3
      ? exercise.instructions.slice(0, 3)
      : exercise.instructions;

  return (
    <Dialog
      open={openAddWorkoutModal}
      onClose={setOpenAddWorkoutModal}
      className="relative z-10"
    >
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
              className="w-auto mx-auto max-h-52"
              src={exercise.gifUrl || logo}
              alt={exercise.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logo;
              }}
            />
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 mb-3"
                  >
                    {exercise.name
                      ? exercise.name.charAt(0).toUpperCase() +
                        exercise.name.slice(1)
                      : "Exercise Instructions"}
                  </DialogTitle>
                  <div className="mt-2">
                    <ol className="text-sm text-gray-500 text-left">
                      {showFullInstructions
                        ? exercise.instructions.map((instruction, index) => (
                            <li key={index} className="mb-2">
                              {index + 1}. {instruction}
                            </li>
                          ))
                        : reducedInstructions.map((instruction, index) => (
                            <li key={index} className="mb-2">
                              {index + 1}. {instruction}
                            </li>
                          ))}
                    </ol>
                    {exercise.instructions.length > 3 && (
                      <button
                        onClick={toggleInstructions}
                        className="bg-transparent text-black mt-2 mb-3 font-semibold text-sm"
                      >
                        {showFullInstructions ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 flex-col p-4">
                    {workouts.length > 0 ? (
                      workouts.map((workout) => (
                        <ShortenedWorkoutCard
                          key={workout._id}
                          workout={workout}
                          selectedExercise={exercise}
                        />
                      ))
                    ) : (
                      <p>No workouts available</p>
                    )}
                  </div>
                  <PulseLoader
                    color="#2563EB"
                    loading={loading}
                    className="mt-10"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpenAddWorkoutModal(false)}
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
