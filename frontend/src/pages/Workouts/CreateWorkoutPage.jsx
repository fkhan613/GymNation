import useTitle from "../../hooks/useTitle"
import CreateWorkoutForm from "../../components/WorkoutsPage/CreateWorkoutForm";
import { Typography } from "@material-tailwind/react";

const CreateWorkoutPage = () => {
  useTitle("Create a Workout | " + import.meta.env.VITE_APP_NAME)

  return (
    <div className="flex flex-col items-center m-8 relative">
      <Typography variant="h2" color="blue-gray" className="mb-12">
        Create a Workout
      </Typography>
      <CreateWorkoutForm />
    </div>
  );
}

export default CreateWorkoutPage