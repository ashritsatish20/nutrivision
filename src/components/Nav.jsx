
import "./Nav.css"; // Import the CSS file for styling

/**
 * BMICalculator component
 * Calculates the BMI of the user based on height and weight input
 * Provides a text-based output of the BMI and a categorization of the BMI into
 * one of four categories: Underweight, Normal weight, Overweight, Obese
 * Provides a list of recommended foods to eat based on the BMI category
 */
const Nav = () => {

    return (

        
        <section id="showcase">
            <nav className="navbar">
                <p className="logo"><a href="#">My<span>Site</span></a></p>
                <ul>
                    <li><a className="menu" href="#">Support</a></li>
                    <li><a className="menu" href="#">Smack it</a></li>
                    <li><a className="menu" href="#">About</a></li>
                </ul>
                <a className="link" href="#">Sign up</a>
            </nav>
            <div className="container">
                <div className="title">
                    <h1><span className="under">Not</span><br />another<br />boring page</h1>
                </div>
                <a href="#" className="getstarted" type="submit">Get started for free</a>
            </div>
        </section>



    );
}


export default Nav;
