import { Routes, Route } from "react-router-dom";
import LogIn from "../component/login/login";
import MockAPI from "../backend/Mockman";
import Home from "../pages/Home/home";
import RequiredAuth from "../authentication/authentication";
import LikedProductsPage from "../pages/likedProducts/likedProducts";
import BookMarks from "../pages/Bookmarks/bookMarks";
import UserProfile from "../pages/userProfile/userProfile";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Home />
          </RequiredAuth>
        }
      />
      <Route
        path="/likedproducts"
        element={
          <RequiredAuth>
            <LikedProductsPage />
          </RequiredAuth>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <RequiredAuth>
            <BookMarks />
          </RequiredAuth>
        }
      />
      <Route
        path="/userprofile"
        element={
          <RequiredAuth>
            <UserProfile />
          </RequiredAuth>
        }
      />

      <Route path="/login" element={<LogIn />} />
      <Route path="/mockman" element={<MockAPI />} />
    </Routes>
  );
}
