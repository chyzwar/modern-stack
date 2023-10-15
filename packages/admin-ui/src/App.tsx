import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./views/Login";
import {ThemeProvider, createTheme} from "@mui/material";


const defaultTheme = createTheme();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-ui/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
