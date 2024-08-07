import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import {
  fetchExercises,
  fetchExerciseByBodyPart,
  fetchExerciseByEquipment,
  fetchExerciseByName,
  fetchExerciseByTargetMuscle,
} from "../../services/exercise";
import SearchBar from "../../components/WorkoutsPage/SearchBar";
import ExerciseCard from "../../components/WorkoutsPage/ExerciseCard";
import { useLocation } from "react-router-dom";

const WorkoutsPage = () => {
  useTitle("Workouts | " + import.meta.env.VITE_APP_NAME);

  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
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
    };

    getExercises();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center m-10 relative">
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
            gifUrl={exercise.gifUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;
