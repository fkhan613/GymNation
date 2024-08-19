/* eslint-disable react/prop-types */


const WorkoutVisibilitySection = ({setVisibility}) => {
  return (
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
                <label htmlFor="public" className="font-medium text-gray-900">
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
                <label htmlFor="private" className="font-medium text-gray-900">
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
  );
}

export default WorkoutVisibilitySection