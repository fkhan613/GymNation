import useTitle from "../../hooks/useTitle";

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME);
  {
    /* Check if the user has workouts */
  }
  {
    /* Display the workouts in cards if they do, if not display no workouts found */
  }
  return <div>Workouts Page</div>;
};

export default WorkoutsPage;
