import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NutritionsFact from "../../components/NutritionsFact";
import NutritionItemsTag from "../../components/NutritionItemsTag";
import NutritionsChart from "../../components/NutritionsChart";

/**
 * SingleItemScreen component
 * Shows the nutrition details of a single food item
 *
 * @returns {ReactElement} - JSX element
 */
const SingleItemScreen = () => {
  // Get the location object from the router
  const location = useLocation();

  // State variables to store the serving size and food item details
  const [serving, setServing] = useState(0);
  const [food, setFood] = useState({});
  const [macronutrientPercentages, setMacronutrientPercentages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches the nutrition details of a food item from the Nutrition API
   *
   * @param {string} foodName - name of the food item
   *
   * @returns {Promise} - promise that resolves with the nutrition details
   */
  const fetchFoodDetails = async (food) => {
    // Set isLoading to true so that the loading indicator is shown
    setIsLoading(true);
    console.log(food);
    try {
      console.log(food);
      if (Object.hasOwn(food, "nix_item_id")) {
        const response = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${food.nix_item_id}`,

          {
            headers: {
              "x-app-id": "880c60c5",
              "x-app-key": "001b3f425baf113d21f77c7c872a0973",
              "Content-Type": "application/json",
            },
          }
        );

        // If the response contains a message, something went wrong
        if (Object.hasOwn(response, "message")) {
          //   errorHandling(myJSON);
        } else {
          // Set the food item details to the response
          const foodItem = response?.data?.foods[0] || {};
          setFood(foodItem);
          setServing(foodItem?.serving_qty);
        }
      } else if (Object.hasOwn(food, "food_name")) {
        // Fetch the nutrition details from the Nutrition API

        const response = await axios.post(
          `https://trackapi.nutritionix.com/v2/natural/nutrients`,
          {
            claims: true,
            include_subrecipe: true,
            ingredient_statement: true,
            line_delimited: true,
            query: food?.food_name,
            taxonomy: true,
            use_raw_foods: false,
          },
          {
            headers: {
              "x-app-id": "880c60c5",
              "x-app-key": "001b3f425baf113d21f77c7c872a0973",
              "Content-Type": "application/json",
            },
          }
        );

        // If the response contains a message, something went wrong
        if (Object.hasOwn(response, "message")) {
          //   errorHandling(myJSON);
        } else {
          // Set the food item details to the response
          const foodItem = response?.data?.foods[0] || {};
          setFood(foodItem);
          setServing(foodItem?.serving_qty);
        }
      }
    } catch (error) {
      console.log("ERROR: occured when fetching.", error);
    }

    // Set isLoading to false so that the loading indicator is hidden
    setIsLoading(false);
  };

  /**
   * Calculates the macronutrient percentages based on the food item's nutrition details
   *
   * @param {object} food - food item details
   *
   * @returns {object} - macronutrient percentages
   */
  function calculateMacronutrientPercentages(food) {
    const servingMultiplier = serving / food?.serving_qty;
    const proteinCalories =
      ((food?.nf_protein || 0) * servingMultiplier || 0) * 4;
    const carbsCalories =
      ((food?.nf_total_carbohydrate || 0) * servingMultiplier || 0) * 4;
    const fatCalories =
      ((food?.nf_total_fat || 0) * servingMultiplier || 0) * 9;

    const totalCalories = proteinCalories + carbsCalories + fatCalories;

    const proteinPercentage = (proteinCalories / totalCalories) * 100 || 0;
    const carbsPercentage = (carbsCalories / totalCalories) * 100 || 0;
    const fatPercentage = (fatCalories / totalCalories) * 100 || 0;
    
    return {
      totalCalories,
      proteinPercentage: proteinPercentage,
      carbsPercentage: carbsPercentage,
      fatPercentage: fatPercentage,
    };
  }

  // Fetch the nutrition details when the component is mounted
  useEffect(() => {
    if (
      Object.hasOwn(location.state, "food_name") ||
      Object.hasOwn(location.state, "nix_item_id")
    ) {
      fetchFoodDetails(location.state);
    }
  }, [location.state]);

  // Calculate the macronutrient percentages when the serving size changes
  useEffect(() => {
    setMacronutrientPercentages(calculateMacronutrientPercentages(food));
  }, [food]);

  // If the component is still loading, show a loading indicator
  if (isLoading) {
    return <div>Loading...</div>;
  }

  /**
   * Calculates the time it takes to burn off the specified calories
   * based on the specified activity
   *
   * @param {string} activity - activity name (walking, running, cycling)
   *
   * @returns {string} - time in minutes to burn the specified calories
   */
  function calculateBurnTime(activity) {
    // Standard calorie burn rates per minute for different activities
    const burnRates = {
      walking: 4.0, // calories burned per minute for walking
      running: 12.0, // calories burned per minute for running
      cycling: 8.0, // calories burned per minute for cycling
    };

    // Check if the activity is valid
    if (!burnRates[activity]) {
      return "Invalid activity. Please choose 'walking', 'running', or 'cycling'.";
    }

    // Get the burn rate for the specified activity
    const caloriesPerMinute = burnRates[activity];

    // Calculate time in minutes to burn the specified calories
    const timeInMinutes =
      (food?.nf_calories * (serving / food?.serving_qty) || 0) /
      caloriesPerMinute;

    return timeInMinutes.toFixed(0);
  }

  // Render the nutrition details
  return (
    <div className="nutrition-details-container">
      <div className="name-container">
        <div>
          <img src={food?.photo?.thumb} alt={food?.food_name} />
        </div>
        <div className="name">{food?.food_name}</div>
        {/* <div className="name">{food?.food_name}</div> */}
      </div>
      <div className="nutrition-details">
        <div>
          <NutritionsFact
            data={food}
            setServing={setServing}
            serving={serving}
            macronutrientPercentages={macronutrientPercentages}
          />
          <NutritionItemsTag tags={food?.claims} />
          <div className="rounded-box" style={{ marginTop: "15px" }}>
            <div className="box-title">Source of Calories</div>
            <div className="box-content">
              <NutritionsChart
                macronutrientPercentages={macronutrientPercentages}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-box">
            <div className="box-title">
              How long would it take to burn off{" "}
              {(
                food?.nf_calories * (serving / food?.serving_qty) || 0
              )?.toFixed()}{" "}
              KCal?
            </div>
            <div className="box-content">
              <table className="burn-time">
                <tr>
                  <td>Walking (3mph)</td>
                  <td>{calculateBurnTime("walking")} minutes</td>
                </tr>
                <tr>
                  <td>Running (6mph)</td>
                  <td>{calculateBurnTime("running")} minutes</td>
                </tr>
                <tr>
                  <td>Bicycling (10mph)</td>
                  <td>{calculateBurnTime("cycling")} minutes</td>
                </tr>
              </table>
              <div>
                <small>
                  Values estimated based on person weighing 140 lbs.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemScreen;
