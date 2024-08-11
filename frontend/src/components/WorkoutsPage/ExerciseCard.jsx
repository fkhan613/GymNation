/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import logo from "../../assets/gymnation-logo.png";

const ExerciseCard = ({
  bodyPart,
  equipment,
  gifUrl,
  id,
  name,
  target,
  secondaryMuscles,
  instructions,
  selectedExercises,
  setSelectedExercises,
}) => {
  //check if the id is in the selected exercises
  const isSelected = selectedExercises?.some((element) => element.id === id);

  const handleAddExercise = () => {
    const newExercise = {
      id,
      name,
      bodyPart,
      equipment,
      gifUrl, 
      target,
      secondaryMuscles,
      instructions,
    };
    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const handleRemoveExercise = () => {
    const updatedExercises = selectedExercises.filter(
      (exercise) => exercise.id !== id
    );
    setSelectedExercises(updatedExercises);
  };

  return (
    <Card className=" m-10 max-w-80 max-h-26">
      <img
        className="w-auto h-40 mx-auto"
        src={gifUrl || logo}
        alt={name}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = logo;
        }}
      />

      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name.toUpperCase()}
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex gap-4 flex-wrap">
          <Button className=" bg-gray-900 hover:bg-blue-gray-700">
            Instructions
          </Button>

          {isSelected ? (
            <Button
              className=" bg-deep-orange-800 hover:bg-deep-orange-900"
              onClick={handleRemoveExercise}
            >
              Remove
            </Button>
          ) : (
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600"
              onClick={handleAddExercise}
            >
              Add
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
