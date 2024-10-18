import { FaSearch } from "react-icons/fa";
import SearchResults from "../SearchResults";
import axios from "axios";
import { useState } from "react";

/**
 * A search bar component that fetches search results from the Nutrition API
 * as the user types in the input field.
 *
 * @returns {ReactElement} - JSX element
 */
const SearchBar = () => {
  /**
   * State variable to store the search results.
   * The search results will be an object with two properties: common and branded.
   * Each property will contain an array of objects, each representing a food item.
   * The objects will contain the following properties: food_name, brand_name, serving_qty, serving_unit, serving_weight_grams, nf_calories, nf_total_fat, nf_saturated_fat, nf_cholesterol, nf_sodium, nf_total_carbohydrates, nf_dietary_fiber, nf_sugars, nf_protein, photo, tag_id.
   */
  const [searchResults, setSearchResults] = useState({});

  /**
   * Function to fetch search results from the Nutrition API.
   * This function will be called whenever the user types in the input field.
   * @param {Event} e - event object
   */
  const fetchSearchResults = async (e) => {
    try {
      /**
       * Make a GET request to the Nutrition API to fetch search results.
       * The request will include the query parameter, which is the value of the input field.
       * The request will also include the x-app-id and x-app-key headers, which are the API credentials.
       */
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant/?query=${e.target.value}`,
        {
          headers: {
            "x-app-id": "880c60c5",
            "x-app-key": "001b3f425baf113d21f77c7c872a0973",
          },
        }
      );

      console.log(response);
      /**
       * Update the searchResults state variable with the response from the API.
       * The response will be an object with two properties: common and branded.
       * Each property will contain an array of objects, each representing a food item.
       */
      setSearchResults({ ...response.data });
    } catch (error) {
      /**
       * If there is an error, log the error to the console and reset the searchResults state variable to an empty object.
       */
      setSearchResults({});
      console.log(error);
    }
  };

  return (
    <div className="search-header">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Food Database"
          onChange={fetchSearchResults}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
      {
        /**
         * If the searchResults state variable is not empty, render the SearchResults component.
         * The SearchResults component will receive the searchResults state variable as a prop.
         */
        searchResults?.common?.length || searchResults?.branded?.length ? (
          <SearchResults searchResults={searchResults} />
        ) : null
      }
    </div>
  );
};

export default SearchBar;
