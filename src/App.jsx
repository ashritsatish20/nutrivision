import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";
import SingleItemScreen from "./screens/SingleItemScreen";
import BMIScreen from "./screens/BMIScreen";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/search-item" element={<SingleItemScreen />} />
        <Route path="/calculate-bmi" element={<BMIScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
