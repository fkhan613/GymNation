/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useState } from "react";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import InstructionsModal from "../ExercisesPage/InstructionsModal";

const WorkoutCard = ({
  id,
  name,
  description,
  exercises,
  coverPhoto,
  visbility,
  deleteWorkout,
  editWorkout,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullExercises, setShowFullExercises] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleExercises = () => {
    setShowFullExercises(!showFullExercises);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
    console.log(exercise);
  };

  const reducedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const reducedExercises =
    exercises.length > 4 ? exercises.slice(0, 4) : exercises;

  return (
    <>
      <Card className="max-w-80" key={id}>
        <img className=" max-w-60 mx-auto" src={coverPhoto} alt={name} />

        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>

          <Typography variant="paragraph" color="blue-gray" className="mb-2">
            {showFullDescription ? description : reducedDescription}
          </Typography>
          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className=" bg-transparent text-black mt-1 font-semibold"
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
          <Typography variant="h6" color="blue-gray" className="mt-4">
            Exercises:
          </Typography>

          {showFullExercises ? (
            <ul className="list-disc pl-5">
              {exercises.map((exercise) => (
                <li
                  key={exercise._id}
                  onClick={() => handleExerciseClick(exercise)}
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
                  onClick={() => handleExerciseClick(exercise)}
                  className="hover:cursor-pointer hover:text-gray-900"
                >
                  {exercise.name.charAt(0).toUpperCase() +
                    exercise.name.slice(1)}
                </li>
              ))}
            </ul>
          )}
          {exercises.length > 4 && (
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
              onClick={() =>
                editWorkout(
                  id,
                  name,
                  description,
                  exercises,
                  coverPhoto,
                  visbility
                )
              }
            >
              <PencilSquareIcon className="h-4 w-4" />
              Edit
            </Button>
            <Button
              className=" bg-deep-orange-800 hover:bg-deep-orange-900  flex gap-3"
              onClick={() => deleteWorkout(id)}
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
      {selectedExercise && (
        <InstructionsModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          name={selectedExercise.name}
          instructions={selectedExercise.instructions}
          gifUrl={selectedExercise.gifUrl}
        />
      )}
    </>
  );
};

export default WorkoutCard;
