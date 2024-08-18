/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useState } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { updateWorkoutExercisesById } from "../../services/workout";

import { toast } from "react-toastify";

const ShortenedWorkoutCard = ({ workout, selectedExercise }) => {
  const [showFullExercises, setShowFullExercises] = useState(false);

  const toggleExercises = () => {
    setShowFullExercises(!showFullExercises);
  };

  const reducedExercises =
    workout.exercises.length > 4
      ? workout.exercises.slice(0, 4)
      : workout.exercises;

  const handleAddExercise = async () => {
    const updatedExercises = [...workout.exercises, selectedExercise];

    console.log("Selected Exercise", selectedExercise);
    console.log("Old Exercises", workout.exercises);
    console.log("Updated Exercises", updatedExercises);

    const updatedWorkout = await updateWorkoutExercisesById(
      workout._id,
      updatedExercises,
    );

    if (updatedWorkout) {
      console.log("Updated Workout", updatedWorkout);
      toast.success("Exercise added to workout successfully");
    } else {
      toast.error("Error adding exercise to workout");
    }
  };

  return (
    <>
      <Card className=" max-w-90 h-auto" key={workout._id}>
        <img
          className=" max-w-32 mx-auto pt-4"
          src={workout.coverPhoto}
          alt={workout.name}
        />

        <CardBody className="overflow-auto">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {workout.name.charAt(0).toUpperCase() + workout.name.slice(1)}
          </Typography>

          <Typography variant="h6" color="blue-gray" className="mt-4">
            Exercises:
          </Typography>

          {showFullExercises ? (
            <ul className="list-disc pl-5">
              {workout.exercises.map((exercise) => (
                <li
                  key={exercise._id}
                  className="hover:cursor-pointer hover:text-gray-900"
                >
                  {exercise.name.charAt(0).toUpperCase() +
                    exercise.name.slice(1)}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc pl-5">
              {reducedExercises.map((exercise) => (
                <li
                  key={exercise._id}
                  className="hover:cursor-pointer hover:text-gray-900"
                >
                  {exercise.name.charAt(0).toUpperCase() +
                    exercise.name.slice(1)}
                </li>
              ))}
            </ul>
          )}
          {workout.exercises.length > 4 && (
            <button
              onClick={toggleExercises}
              className=" bg-transparent text-black mt-1 font-semibold"
            >
              {showFullExercises ? "Show less" : "Show more"}
            </button>
          )}
        </CardBody>
        <CardFooter className="pt-0 self-center">
          <div className="flex gap-x-4">
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 flex gap-3"
              onClick={handleAddExercise}
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add Here
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ShortenedWorkoutCard;
