import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./views/Login";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-ui/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
