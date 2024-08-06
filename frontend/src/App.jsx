import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import WorkoutsPage from "./pages/WorkoutsPage";

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
            <Route path="edit-workout/:id" element={<EditWorkoutPage />} />
          </Route>
          <Route path="profile/:id" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
