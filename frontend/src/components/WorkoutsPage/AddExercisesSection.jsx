/* eslint-disable react/prop-types */
import SearchBar from "../WorkoutsPage/SearchBar";
import ExerciseCard from "../WorkoutsPage/ExerciseCard";
import PulseLoader from "react-spinners/PulseLoader";

const AddExercisesSection = ({
  handleSearch,
  exercises,
  loading,
  setExercises,
  selectedExercises,
  setSelectedExercises,
}) => {
  return (
    <div className="flex flex-col items-center m-10 relative">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Exercises
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 mb-6">
        Add exercises to your workout.
      </p>
      <SearchBar
        handleSearch={handleSearch}
        exercises={exercises}
        setExercises={setExercises}
      />
      <div className="flex flex-row flex-wrap justify-center mt-16 size-min:max-w-full">
        <PulseLoader color="#2563EB" loading={loading} />
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
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
          />
        ))}

        {exercises.length === 0 &&
          selectedExercises.length != 0 &&
          !loading &&
          selectedExercises.map((exercise) => (
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
              selectedExercises={selectedExercises}
              setSelectedExercises={setSelectedExercises}
            />
          ))}
      </div>
    </div>
  );
};

export default AddExercisesSection;
