
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./views/Login";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = (): JSX.Element => 
  <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  </>
;

export default App;
