import useTitle from "../../hooks/useTitle"
import CreateWorkoutForm from "../../components/WorkoutsPage/CreateWorkoutForm";

const CreateWorkoutPage = () => {
  useTitle("Create a Workout | " + import.meta.env.VITE_APP_NAME)

  return (
    <div className="flex flex-col items-center m-8 relative">
      <CreateWorkoutForm/>
    </div>
  )
}

export default CreateWorkoutPage