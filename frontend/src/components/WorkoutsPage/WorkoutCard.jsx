/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useState } from "react";


const WorkoutCard = ({ name, description, exercises, coverPhoto }) => {

  return (
    <Card className=" m-10 max-w-72">
      <img className=" max-w-60 mx-auto" src={coverPhoto} alt={name} />

      <CardBody classNameName="">
        <Typography variant="h5" color="blue-gray" classNameName="mb-2">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Typography variant="h5" color="blue-gray" classNameName="mb-2">
          {description}
        </Typography>
      </CardBody>
      <CardFooter classNameName="pt-0">
        <div className="flex gap-4">
          <Button className=" bg-indigo-500 hover:bg-indigo-600">
            Edit Workout
          </Button>
          <Button className=" bg-deep-orange-800 hover:bg-deep-orange-900">
            Delete Workout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
