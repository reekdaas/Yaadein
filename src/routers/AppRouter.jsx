import { Routes, Route } from "react-router-dom";
import LogIn from "../component/login/login";
import MockAPI from "../backend/Mockman";
import Home from "../pages/Home/home";
import RequiredAuth from "../authentication/authentication";
import BookMarks from "../pages/Bookmarks/bookMarks";
import { ErrorPage, LikedPostsPage } from "../pages";
import ExplorePage from "../pages/explorePages/explorePages";
import ProfilePage from "../pages/profile/profilePage";
import { SingUp } from "../component";

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
        path="/explore"
        element={
          <RequiredAuth>
            <ExplorePage />
          </RequiredAuth>
        }
      />

      <Route
        path="/likedposts"
        element={
          <RequiredAuth>
            <LikedPostsPage />
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
        path="/userprofile/:id"
        element={
          <RequiredAuth>
            <ProfilePage />
          </RequiredAuth>
        }
      />

      <Route path="/login" element={<LogIn />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="/mockman" element={<MockAPI />} />
    </Routes>
  );
}
