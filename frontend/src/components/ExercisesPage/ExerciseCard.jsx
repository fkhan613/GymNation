/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import InstructionsModal from "./InstructionsModal";
import { useState } from "react";

const ExerciseCard = ({
  bodyPart,
  equipment,
  gifUrl,
  id,
  name,
  target,
  secondaryMuscles,
  instructions,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className=" m-10 max-w-96">
        <img className="w-auto" src={gifUrl} alt={name} />

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
          <div className="flex gap-4">
            <Button
              className=" bg-gray-900 hover:bg-blue-gray-700"
              onClick={() => setOpen(true)}
            >
              View Instructions
            </Button>
            <Button className=" bg-indigo-500 hover:bg-indigo-600">
              Add to a Workout
            </Button>
          </div>
        </CardFooter>
      </Card>

      {open && (
        <InstructionsModal
          gifUrl={gifUrl}
          name={name}
          instructions={instructions}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default ExerciseCard;
