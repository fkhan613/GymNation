import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/Users/UserProfilePage";
import CreateWorkoutPage from "./pages/Workouts/CreateWorkoutPage";
import EditWorkoutPage from "./pages/Workouts/EditWorkoutPage";
import WorkoutsPage from "./pages/Workouts/WorkoutsPage";
import ExercisesPage from "./pages/Exercises/ExercisesPage";
import ProgressLogsPage from "./pages/ProgressLogs/ProgressLogPage";
import CreateProgressLogPage from "./pages/ProgressLogs/CreateProgressLogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard/*" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="workouts">
            <Route index element={<WorkoutsPage />} />
            <Route path="create-workout" element={<CreateWorkoutPage />} />
            <Route path="edit/:id" element={<EditWorkoutPage />} />
          </Route>
          <Route path="exercises">
            <Route index element={<ExercisesPage />} />
            <Route path="exercise/:id" element={<ExercisesPage />} />
          </Route>
          <Route path="progress-logs">
            <Route index element={<ProgressLogsPage />} />
            <Route path="create-log" element={<CreateProgressLogPage />} />
          </Route>

          <Route path="profile/:id" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
