import PropTypes from "prop-types";

/**
 * NutritionsFact component
 * Renders a table of nutrition facts for a single food item
 * The table has two columns, the first column contains the name of the
 * nutrition fact, the second column contains the amount of the nutrition fact
 * per serving, and the percentage of the daily value (DV) for the nutrition
 * fact.
 * The table is rendered as a series of tr elements, each tr element contains
 * two td elements, the first td element contains the name of the nutrition fact
 * and the second td element contains the amount and percentage of the daily
 * value for the nutrition fact.
 * The table is wrapped in a div with the class "nutritions-facts-container"
 * The serving size is rendered as an input element with the value of the
 * serving size and the unit of measurement is rendered as text after the
 * input element
 * The "Amount Per Serving" is rendered as a bold element with the text "Amount
 * Per Serving"
 * The macronutrient percentages are rendered as a series of tr elements, each
 * tr element contains two td elements, the first td element contains the name
 * of the macronutrient and the second td element contains the percentage of the
 * daily value for the macronutrient
 * The macronutrient percentages are rendered with three decimal places
 * The serving size is rendered as a number input element with the value of the
 * serving size, and the unit of measurement is rendered as text after the
 * input element
 * The macronutrient percentages are rendered as a series of tr elements, each
 * tr element contains two td elements, the first td element contains the name
 * of the macronutrient and the second td element contains the percentage of the
 * daily value for the macronutrient
 * The macronutrient percentages are rendered with three decimal places
 * @param {object} data - an object containing the nutrition facts for a single
 * food item
 * @param {number} serving - the serving size of the food item
 * @param {function} setServing - a function to set the serving size of the
 * food item
 * @param {object} macronutrientPercentages - an object containing the
 * percentages of the daily value for the macronutrients
 */
const NutritionsFact = ({
  data,
  serving,
  setServing,
  macronutrientPercentages,
}) => {
  const servingMultiplier = serving / data?.serving_qty;
  return (
    <div className="nutritions-facts-container">
      <h2>Nutritions Fact</h2>
      <div className="serving-container">
        <h3>Serving Size:</h3>
        <div>
          <input
            type="number"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
          />{" "}
          {data?.serving_unit}
        </div>
      </div>
      <div className="border-bottom"></div>
      <b>Amount Per Serving</b>
      <div className="calories-container">
        <h1>Calories</h1>
        <h1>{(data?.nf_calories * servingMultiplier || 0)?.toFixed()}</h1>
      </div>
      <div className="facts-table">
        <table>
          <tr>
            <td></td>
            <td>
              <small>
                % <b>Daily Value*</b>
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <small>
                <b>Total Fat</b>{" "}
                {(data?.nf_total_fat * servingMultiplier || 0)?.toFixed(1)}g
              </small>
            </td>
            <td>
              <small>
                <b>{macronutrientPercentages?.fatPercentage?.toFixed(2) || 0}</b>%
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Saturated Fat{" "}
                {(data?.nf_saturated_fat * servingMultiplier || 0)?.toFixed(1)}g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Trans Fat{" "}
                {(data?.nf_trans_fatty_acid * servingMultiplier || 0)?.toFixed(
                  1
                )}
                g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Polyunsaturated Fat{" "}
                {(
                  data?.nf_polyunsaturated_fat * servingMultiplier || 0
                )?.toFixed(1)}
                g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Monounsaturated Fat{" "}
                {(
                  data?.nf_monounsaturated_fat * servingMultiplier || 0
                )?.toFixed(1)}
                g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                <b>Cholesterol</b>{" "}
                {(data?.nf_cholesterol * servingMultiplier || 0)?.toFixed(1)}mg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                <b>Sodium</b>{" "}
                {(data?.nf_sodium * servingMultiplier || 0)?.toFixed(1)}mg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                <b>Total Carbohydrates</b>{" "}
                {(
                  data?.nf_total_carbohydrate * servingMultiplier || 0
                )?.toFixed(1)}
                mg
              </small>
            </td>
            <td>
              <small>
                <b>{macronutrientPercentages?.carbsPercentage?.toFixed(2) || 0}</b>%
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Dietary Fiber{" "}
                {(data?.nf_dietary_fiber * servingMultiplier || 0)?.toFixed(1)}g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-3">
                Sugars {(data?.nf_sugars * servingMultiplier || 0)?.toFixed(1)}g
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                <b>Protein</b>{" "}
                {(data?.nf_protein * servingMultiplier || 0)?.toFixed(1)}mg
              </small>
            </td>
            <td>
              <small>
                <b>{macronutrientPercentages?.proteinPercentage?.toFixed(2) || 0}</b>%
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <small>
                Vitamin D{" "}
                {(data?.nf_vitamin_d_mcg * servingMultiplier || 0)?.toFixed(1)}
                mcg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                Calcium{" "}
                {(data?.nf_calcium_mg * servingMultiplier || 0)?.toFixed(1)}
                mg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                Iron {(data?.nf_iron_mg * servingMultiplier || 0)?.toFixed(1)}mg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <small>
                Potassium{" "}
                {(data?.nf_potassium * servingMultiplier || 0)?.toFixed(1)}
                mg
              </small>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{ textAlign: "left", lineHeight: "1", paddingTop: 10 }}
            >
              <small>
                *The % Daily Value (DV) tells you how much a nutrient in a
                serving of food contributes to a daily diet. 2000 calories a day
                is used for general nutrition advice.
              </small>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
NutritionsFact.propTypes = {
  data: PropTypes.object,
  serving: PropTypes.number,
  setServing: PropTypes.func,
  macronutrientPercentages: PropTypes.object,
};

export default NutritionsFact;
