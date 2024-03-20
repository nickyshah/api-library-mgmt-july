import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./Components/Navbar/Navbar.Component";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return <div className={appStyle}>
    {/* Navbar */}
    <Navbar/>
    {/* Wrapper */}

  </div>;
};

export default App;
