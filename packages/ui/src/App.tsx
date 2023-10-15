
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./views/Login";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import {ThemeProvider, createTheme} from "@mui/material";

const defaultTheme = createTheme();

const App = (): JSX.Element => 
  <ThemeProvider theme={defaultTheme}>
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
  </ThemeProvider>


;

export default App;
