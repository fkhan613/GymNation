import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import SearchBar from "../WorkoutsPage/SearchBar";

const CreateWorkoutForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [exercises, setExercises] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleSearch = (e, searchTerm, select, selectCategory) => {
    e.preventDefault();
    console.log(searchTerm, select, selectCategory);
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
    <>
      <Typography variant="h2" color="blue-gray" className="mb-12">
        Create a Workout
      </Typography>
      <form className=" shadow-md p-8">
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
                          value={coverPhoto}
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
                        onSelect={(e) => setVisibility(e.target.value)}
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
                        onSelect={(e) => setVisibility(e.target.value)}
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
            <SearchBar handleSearch={handleSearch} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateWorkoutForm;
