import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./Components/Navbar/Navbar.Component";
import { Routes, Route } from "react-router-dom";
import CustomeLinearProgress from "./Components/Navbar/CustomeLinearLoaded.component.tsx/CustomeLinearProgress.componenet";
// import Companies from "./Pages/Companies/Companies.page";
// import  Home  from "./Pages/Home/Home.page";

// Import with the lazy loading
const Home = lazy(() => import("./Pages/Home/Home.page"));
const Companies = lazy(() => import("./Pages/Companies/Companies.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return (
    <div className={appStyle}>
      {/* Navbar */}
      <Navbar />
      {/* Wrapper */}
      <div className="wrapper">
        <Suspense fallback={<CustomeLinearProgress/>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="companies">
              <Route index element={<Companies/>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
