import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthRoute from "./routes/public_route/index";
import PrivateRoute from "./routes/private_route/ndex";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
