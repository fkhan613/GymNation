import useTitle from "../../hooks/useTitle"

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME)
  return (
    <div>WorkoutsPage</div>
  )
}

export default WorkoutsPage