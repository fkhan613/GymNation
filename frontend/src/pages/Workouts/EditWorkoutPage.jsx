import useTitle from "../../hooks/useTitle";
import EditWorkoutForm from "../../components/WorkoutsPage/EditWorkoutForm";
import { Typography } from "@material-tailwind/react";

const EditWorkoutPage = () => {
  useTitle("Edit a Workout | " + import.meta.env.VITE_APP_NAME);

  return (
    <div className="flex flex-col items-center m-8 relative">
      <Typography variant="h2" color="blue-gray" className="mb-12">
        Edit a Workout
      </Typography>
      <EditWorkoutForm />
    </div>
  );
};

export default EditWorkoutPage;
