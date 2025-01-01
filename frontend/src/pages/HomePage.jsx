import useTitle from "../hooks/useTitle"
import Default from "../components/HomePage/Default";

const HomePage = () => {

  useTitle("Home | " + import.meta.env.VITE_APP_NAME)

  return (
    <div>
      <Default />
    </div>
  );
}

export default HomePage