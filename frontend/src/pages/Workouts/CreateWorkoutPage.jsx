import useTitle from "../../hooks/useTitle"

const CreateWorkoutPage = () => {
  useTitle("Create a Workout | " + import.meta.env.VITE_APP_NAME);
  return (
    <div>CreateWorkoutPage</div>
  )
}

export default CreateWorkoutPage