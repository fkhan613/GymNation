/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import ExercisesModal from "./ExercisesModal";

const WorkoutCard = ({name, description, exercises, coverPhoto}) => {
  return (
    <Card className=" m-10 max-w-72">
      <img className=" max-w-60 mx-auto" src={coverPhoto} alt={name} />

      <CardBody className="">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex gap-4">
          <Button
            className="select-none rounded-lg bg-gray-900 hover:bg-blue-gray-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-dialog-target="sign-in-dialog"
          >
             View Exercises
          </Button>
          <Button className=" bg-indigo-500 hover:bg-indigo-600">
            Edit Workout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
