import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
          <div className="header-container">
        
        <h1 className="header-title">NutriVision</h1>
        <nav className="header-nav">
          <ul>
            <li><Link to={"/"}>Know Your Food</Link></li>
            <li><Link to={"/calculate-bmi"}>Personal Assistant</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;