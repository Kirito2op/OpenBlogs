import { Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavBar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import BlogPage from "./pages/BlogPage";
import WriterDashboard from "./pages/WriterDashboard";
import FullScreenSpinner from "./components/FullScreenSpinner";
import useLoadStateStore from "./zustand/loadStateStore";
import SearchForBlogs from "./pages/SearchAllBlogs";
import NewBLog from "./pages/NewBlog";
import Friends from "./pages/Friends";
import NewColaborativeBLog from "./pages/NewColaborativeBlog";
import CollabBlogPage from "./pages/CollabBlogPage";
export default function App() {
  const isLoading = useLoadStateStore((state) => state.isLoading);

  return (
    <>
      <NavbarComp />
      {isLoading && <FullScreenSpinner />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} /> 
        <Route path="/collabblog/:id" element={<ProtectedRoute><CollabBlogPage /></ProtectedRoute>} /> 
        <Route path="/newblog" element={<ProtectedRoute><NewBLog /></ProtectedRoute>} /> 
        <Route path="/newcollabblog" element={<ProtectedRoute>< NewColaborativeBLog/></ProtectedRoute>} />
        <Route path="/writers/:writerId" element={<ProtectedRoute><WriterDashboard /></ProtectedRoute>} /> */
        <Route path="/blogs" element={<ProtectedRoute><SearchForBlogs/></ProtectedRoute>} /> 
        <Route path="/friends" element={<ProtectedRoute><Friends/></ProtectedRoute>} /> 
      </Routes>
    </>
  );
}
