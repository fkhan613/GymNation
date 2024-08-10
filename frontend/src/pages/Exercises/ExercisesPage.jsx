import {
  fetchExercises,
  fetchExerciseByBodyPart,
  fetchExerciseByEquipment,
  fetchExerciseByName,
  fetchExerciseByTargetMuscle,
} from "../../services/exercise";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import ExerciseCard from "../../components/ExercisesPage/ExerciseCard";
import SearchBar from "../../components/ExercisesPage/SearchBar";
import { Typography } from "@material-tailwind/react";
import PulseLoader from "react-spinners/PulseLoader";

const ExercisesPage = () => {
  useTitle("Exercises | " + import.meta.env.VITE_APP_NAME);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getExercises = async () => {
      const params = new URLSearchParams(location.search);
      const searchTerm = params.get("search-term");
      const select = params.get("select");
      const selectCategory = params.get("select-category");

      console.log(searchTerm, select, selectCategory);

      let response;
      if (select && (searchTerm || selectCategory)) {
        switch (select) {
          case "name":
            response = await fetchExerciseByName(searchTerm);
            break;
          case "body-part":
            response = await fetchExerciseByBodyPart(selectCategory);
            console.log(response);
            break;
          case "machine":
            response = await fetchExerciseByEquipment(selectCategory);
            console.log(response);
            break;
          case "target-muscle":
            response = await fetchExerciseByTargetMuscle(selectCategory);
            console.log(response);
            break;
          default:
            response = await fetchExercises(1);
        }
      } else {
        response = await fetchExercises(1);
      }

      setExercises(response);
      setLoading(false);
    };

    getExercises();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center m-10 relative">
      <Typography variant="h2" color="blue-gray" className="mb-10">
        Explore Exercises
      </Typography>
      <SearchBar />

      <div className="flex flex-row flex-wrap justify-center mt-16">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            bodyPart={exercise.bodyPart}
            equipment={exercise.equipment}
            target={exercise.target}
            secondaryMuscles={exercise.secondaryMuscles}
            instructions={exercise.instructions}
            gifUrl={exercise.gifUrl}
          />
        ))}
      </div>

      <PulseLoader
        color="#2563EB"
        className=" mt-24"
        loading={loading}
        size={15}
      />
    </div>
  );
};

export default ExercisesPage;
