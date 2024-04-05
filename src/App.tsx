import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./Components/Navbar/Navbar.Component";
import { Routes, Route } from "react-router-dom";
import CustomeLinearProgress from "./Components/Navbar/CustomeLinearLoaded.component.tsx/CustomeLinearProgress.component";

// import AddCompany from "./Pages/Companies/AddCompany.page";
// import Companies from "./Pages/Companies/Companies.page";
// import  Home  from "./Pages/Home/Home.page";

// Import with the lazy loading
const Home = lazy(() => import("./Pages/Home/Home.page"));
const Companies = lazy(() => import("./Pages/Companies/Companies.page"));
const AddCompany = lazy(() => import("./Pages/Companies/AddCompany.page"));
const Jobs = lazy(() => import("./Pages/jobs/jobs.page"));
const AddJob = lazy(() => import("./Pages/jobs/AddJob.page"));

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
            <Route path="/Companies">
              <Route index element={<Companies/>} />
              <Route path="add" element={<AddCompany/>} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs/>} />
              <Route path="add" element={<AddJob/>} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
