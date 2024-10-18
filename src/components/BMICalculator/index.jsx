import { useState } from "react";
import "./index.css"; // Import the CSS file for styling

/**
 * BMICalculator component
 * Calculates the BMI of the user based on height and weight input
 * Provides a text-based output of the BMI and a categorization of the BMI into
 * one of four categories: Underweight, Normal weight, Overweight, Obese
 * Provides a list of recommended foods to eat based on the BMI category
 */
const BMICalculator = () => {
  // State variables to store the height, weight, and BMI
  const [feet, setFeet] = useState(); // feet
  const [inches, setInches] = useState(); // inches
  const [weight, setWeight] = useState(); // weight in pounds
  const [bmi, setBMI] = useState(null); // calculated BMI
  const [category, setCategory] = useState(""); // BMI category
  const [error, setError] = useState(""); // error message

  /**
   * Calculates the BMI based on the height and weight input
   * Converts height from feet and inches to meters
   * Converts weight from pounds to kilograms
   * Calculates the BMI
   * Determines the BMI category based on the calculated BMI
   * Updates the state variables with the calculated BMI and category
   */
  const calculateBMI = () => {
    if ((!feet && !inches) || !weight) {
      setError("All fields are required.");
      return;
    }

    // Convert height to meters
    const totalInches = parseInt(feet || 0) * 12 + parseInt(inches || 0);
    const heightInMeters = totalInches * 0.0254;

    // Convert weight to kilograms
    const weightInKg = (weight || 0) * 0.453592;

    // Calculate BMI
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);

    // Set the state variables with the calculated BMI and category
    setBMI(bmiValue.toFixed(2));
    setError("");
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className="bmi-container">
      <h2 className="bmi-title">Calculate Your BMI</h2>
      <p>
        Enter your height and weight below to find you body mass index(BMI).
      </p>
      <div className="bmi-inputs">
        <div>
          <label>Height:</label>
          <input
            type="number"
            placeholder="Feet"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
          />
          <input
            type="number"
            placeholder="Inches"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
          />
        </div>
        <div>
          <label>Weight (lbs):</label>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>} {/* Error message */}
      <button className="bmi-button" onClick={calculateBMI}>
        Calculate BMI
      </button>
      {bmi && (
        <div className="bmi-result-container">
          <h3 className="bmi-result-text">Your BMI is</h3>
          <div className="bmi-result-box">
            <span className="bmi-result-value">{bmi}</span>
          </div>
          <div className="bmi-categories">
            <div
              className={`bmi-category ${
                category === "Underweight" ? "active" : ""
              }`}
            >
              <p>Underweight</p>
              <p>Below 18.5</p>
            </div>
            <div
              className={`bmi-category ${
                category === "Normal weight" ? "active" : ""
              }`}
            >
              <p>Normal weight</p>
              <p>18.5 - 24.9</p>
            </div>
            <div
              className={`bmi-category ${
                category === "Overweight" ? "active" : ""
              }`}
            >
              <p>Overweight</p>
              <p>25 - 29.9</p>
            </div>
            <div
              className={`bmi-category ${category === "Obese" ? "active" : ""}`}
            >
              <p>Obese</p>
              <p>30 and higher</p>
            </div>
          </div>
        </div>
      )}
      {bmi && (
        <div className="bmi-details">
          {category === "Underweight" && (
            <>
              <h3>
                Focus on nutrient-dense, high-calorie foods to gain weight
                healthily:
              </h3>

              <ul>
                <li>Nuts and Nut Butters: Almonds, walnuts, peanut butter</li>
                <li>Avocado: High in healthy fats</li>
                <li>Whole Grains: Quinoa, brown rice, oats</li>
                <li>Dairy Products: Full-fat yogurt, cheese</li>
                <li>Protein-Rich Foods: Eggs, lean meats, legumes</li>
              </ul>
            </>
          )}
          {category === "Normal weight" && (
            <>
              <h3>Aim for a balanced diet to maintain a healthy weight:</h3>

              <ul>
                <li>
                  Fruits and Vegetables: A variety for vitamins and minerals
                </li>
                <li>Lean Proteins: Chicken, fish, tofu</li>
                <li>Whole Grains: Brown rice, whole wheat bread</li>
                <li>Healthy Fats: Olive oil, seeds, fatty fish like salmon</li>
                <li>Legumes: Beans, lentils for fiber and protein</li>
              </ul>
            </>
          )}
          {category === "Overweight" && (
            <>
              <h3>Focus on whole foods that support weight management:</h3>

              <ul>
                <li>Vegetables: Leafy greens, broccoli, peppers</li>
                <li>Fruits: Berries, apples, pears (high in fiber)</li>
                <li>
                  Lean Proteins: Skinless poultry, fish, plant-based proteins
                </li>
                <li>Whole Grains: Barley, quinoa, farro</li>
                <li>Healthy Snacks: Air-popped popcorn, hummus with veggies</li>
              </ul>
            </>
          )}
          {category === "Obese" && (
            <>
              <h3>
                Choose low-calorie, nutrient-dense foods to promote weight loss:
              </h3>

              <ul>
                <li>Vegetables: Leafy greens, broccoli, peppers</li>
                <li>Fruits: Berries, apples, pears (high in fiber)</li>
                <li>
                  Lean Proteins: Skinless poultry, fish, plant-based proteins
                </li>
                <li>Whole Grains: Barley, quinoa, farro</li>
                <li>Healthy Snacks: Air-popped popcorn, hummus with veggies</li>
                <li>Non-Starchy Vegetables: Spinach, zucchini, cucumbers</li>
                <li>Lean Proteins: Fish, legumes, skinless chicken</li>
                <li>
                  Fruits: Citrus fruits, berries (high in fiber and water
                  content)
                </li>
                <li>
                  Whole Grains: Brown rice, whole grain pasta (in moderation)
                </li>
                <li>
                  Hydration: Plenty of water, herbal teas to manage hunger
                </li>
              </ul>
              <h3 style={{marginTop: 20}}>General Tips</h3>
              <ul>
                <li>Portion Control: Be mindful of serving sizes.</li>
                <li>Limit Processed Foods: Reduce sugar and unhealthy fats.</li>
                <li>Stay Hydrated: Drink water throughout the day.</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
