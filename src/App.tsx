import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import NotFound from "./pages/not_found";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Post from "./pages/post";
import Blog from "./pages/blog";
import Compare from "./pages/compare";
import About from "./pages/about";
import ProtectedRoute from "./components/guard/protected_route";
import AuthRoute from "./components/guard/auth_route";
import Home from "./pages/home";

export default function App() {
  const publicRoute = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Home /> },
    { path: "/post", element: <Post /> },
    { path: "/blog", element: <Blog /> },
    { path: "/compare", element: <Compare /> },
    { path: "/about", element: <About /> },
  ];
  const privateRoute = [{ path: "/profile", element: <Profile /> }];
  const authRoute = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {publicRoute.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {privateRoute.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route element={<Layout />}>
            {authRoute.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
