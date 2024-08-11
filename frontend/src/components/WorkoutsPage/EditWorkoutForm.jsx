/* eslint-disable react/prop-types */
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import SearchBar from "../WorkoutsPage/SearchBar";
import ExerciseCard from "../WorkoutsPage/ExerciseCard";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import {
  fetchExerciseByBodyPart,
  fetchExerciseByEquipment,
  fetchExerciseByName,
  fetchExerciseByTargetMuscle,
} from "..//../services/exercise";
import { updateWorkoutById } from "../../services/workout";
import { useLocation, useNavigate } from "react-router-dom";

const EditWorkoutForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [visibility, setVisibility] = useState("");
  const [exercises, setExercises] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const workoutName = queryParams.get("name");
    const workoutDescription = queryParams.get("description");
    const workoutVisibility = queryParams.get("visibility");
    const workoutCoverPhoto = queryParams.get("coverPhoto");
    const workoutExercises = JSON.parse(
      localStorage.getItem("tempExercises")
    ).exercises;

    console.log(workoutExercises);

    if (workoutName) setName(workoutName);
    if (workoutDescription) setDescription(workoutDescription);
    if (workoutVisibility) setVisibility(workoutVisibility);
    if (workoutExercises.length > 0) setSelectedExercises(workoutExercises);
    if (workoutCoverPhoto) setCoverPhoto(workoutCoverPhoto);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!name) {
      toast.error("Name is required");
      return;
    }

    if (selectedExercises.length === 0) {
      toast.error("Add at least one exercise to your workout");
      return;
    }

    if (!visibility) {
      toast.error("Visibility is required");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const workoutId = location.pathname.split("/").pop();

    console.log(workoutId);

    const result = await updateWorkoutById(
      workoutId,
      userId,
      name,
      description,
      selectedExercises,
      visibility,
      coverPhoto
    );

    console.log(result);

    if (result) {
      toast.success("Workout updated successfully");
      localStorage.removeItem("tempExercises");
      navigate("/dashboard/workouts");
    }
  };

  const handleSearch = async (e, searchTerm, select, selectCategory) => {
    e.preventDefault();
    setLoading(true);

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
          response = [];
      }
    }

    setExercises(response);
    setLoading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCoverPhoto(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  return (
    <form className=" shadow-md p-8 justify-center size-min: max-w-full">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Workout Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add details about your workout.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Push Day"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Give your workout a name!
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Briefly describe your workout, what it targets, and any other
                important details.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div
                  className={`text-center ${dragActive ? "bg-gray-100" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="coverPhoto"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="coverPhoto"
                        name="coverPhoto"
                        type="file"
                        className="sr-only"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {coverPhoto && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {coverPhoto.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Workout Visibility
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose who can see your workouts.
          </p>

          <div className="mt-3 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="public"
                      name="visibility"
                      value="public"
                      onChange={() => setVisibility("public")}
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="public"
                      className="font-medium text-gray-900"
                    >
                      Public
                    </label>
                    <p className="text-gray-500">
                      Allow anyone in the world to see your workouts.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="private"
                      name="visibility"
                      value="private"
                      type="radio"
                      onChange={() => setVisibility("private")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="private"
                      className="font-medium text-gray-900"
                    >
                      Private
                    </label>
                    <p className="text-gray-500">
                      Only you and those you approve can see your workouts.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

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
      </div>

      <div className="mt-8 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditWorkoutForm;
