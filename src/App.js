import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandinPage from "./components/LandinPage";
import Owner from "./components/Owner";
import Customer from "./components/Customer";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Raleway"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandinPage />} />
          <Route exact path="/Owner" element={<Owner />} />
          <Route exact path="/Customer" element={<Customer />} />
          <Route path="*" element={<LandinPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

// import "./App.css";
// import { createTheme, ThemeProvider } from "@mui/material";
// import MainApp from "./components/MainApp";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Raleway"].join(","),
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <MainApp />
//     </ThemeProvider>
//   );
// }

// export default App;
