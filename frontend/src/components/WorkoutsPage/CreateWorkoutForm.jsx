/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  fetchExerciseByBodyPart,
  fetchExerciseByEquipment,
  fetchExerciseByName,
  fetchExerciseByTargetMuscle,
} from "..//../services/exercise";
import { createWorkout, uploadWorkoutCoverPhoto } from "../../services/workout";
import { useNavigate } from "react-router-dom";
import AddExercisesSection from "./AddExercisesSection";
import WorkoutInformationSection from "./WorkoutInformationSection";
import WorkoutVisibilitySection from "./WorkoutVisibilitySection";

const CreateWorkoutForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [visibility, setVisibility] = useState("");
  const [exercises, setExercises] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (coverPhotoUrl) {
      handleCreateWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverPhotoUrl]);

  const handleCreateWorkout = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const result = await createWorkout(
      userId,
      name,
      description,
      selectedExercises,
      visibility,
      coverPhotoUrl
    );

    if (result) {
      toast.success("Workout created successfully");
      navigate("/dashboard/workouts");
    } else {
      toast.error("Error creating workout");
    }
  };

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

    if (coverPhoto) {
      const result = await uploadWorkoutCoverPhoto(coverPhoto);
      if (result) {
        setCoverPhotoUrl(result);
      } else {
        toast.error("Error uploading cover photo");
        return; // Exit if cover photo upload fails
      }
    } else {
      handleCreateWorkout(); // Call directly if no cover photo
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
        <WorkoutInformationSection
          name={name}
          setName={setName}
          handleChange={handleChange}
          description={description}
          setDescription={setDescription}
          dragActive={dragActive}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          coverPhoto={coverPhoto}
        />

        <WorkoutVisibilitySection setVisibility={setVisibility} />

        <AddExercisesSection
          exercises={exercises}
          setExercises={setExercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          loading={loading}
          handleSearch={handleSearch}
        />
      </div>

      <div className="mt-8 flex items-center justify-end gap-x-6">
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

export default CreateWorkoutForm;
