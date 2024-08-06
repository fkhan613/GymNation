import useTitle from "../hooks/useTitle";
import Background from "../components/LandingPage/Background";
import HeroText from "../components/LandingPage/HeroText";

const LandingPage = () => {
  useTitle(import.meta.env.VITE_APP_NAME + " | Connecting Fitness Enthusiasts");

  return (
    <div>
      <Background />
      <HeroText />

    </div>
  );
};

export default LandingPage;
