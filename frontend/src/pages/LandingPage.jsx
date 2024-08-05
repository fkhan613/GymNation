import useTitle from "../hooks/useTitle";
import Background from "../components/LandingPage/Background";
import HeroText from "../components/LandingPage/HeroText";

const LandingPage = () => {
  useTitle("GymNation | Connecting Fitness Enthusiasts");

  return (
    <div>
      <Background />
      <HeroText />

    </div>
  );
};

export default LandingPage;
