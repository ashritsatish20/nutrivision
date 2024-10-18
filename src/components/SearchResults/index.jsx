import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * SearchResults component
 * Renders the search results in a tabbed interface
 * The tabs are: All, Common, Branded
 * Each tab renders a list of food items
 * The list of food items is determined by the searchResults object
 * The searchResults object contains two properties: common and branded
 * common is an array of objects, each representing a common food item
 * branded is an array of objects, each representing a branded food item
 * The list of food items is rendered as a list of divs with the class "list-item"
 * Each div contains an image of the food item and the name of the food item
 * The divs are given a key of the index of the food item in the array
 * The food item is rendered as the text content of the div
 * The divs are given an onClick event handler that navigates to the single item page
 * The state of the single item page is set to the food item that was clicked
 */
const SearchResults = ({ searchResults }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const { common = [], branded = [] } = searchResults;

  /**
   * Function to handle the click event on a food item
   * Navigates to the single item page and sets the state to the food item that was clicked
   * @param {object} data - the food item that was clicked
   */
  const handleClick = (data) => {
    if (!data) return;
    navigate("/search-item", { state: data });
  };

  return (
    <div className="search-results">
      <div className="tabs">
        <div
          role="tab"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSelectedTab("all");
            }
          }}
          className={selectedTab === "all" ? "active" : ""}
          onClick={() => setSelectedTab("all")}
        >
          All
        </div>
        <div
          role="tab"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSelectedTab("common");
            }
          }}
          className={selectedTab === "common" ? "active" : ""}
          onClick={() => setSelectedTab("common")}
        >
          Common
        </div>
        <div
          role="tab"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSelectedTab("branded");
            }
          }}
          className={selectedTab === "branded" ? "active" : ""}
          onClick={() => setSelectedTab("branded")}
        >
          Branded
        </div>
      </div>
      <div className="list-container">
        {selectedTab === "all" ? (
          <div className="list-item-heading">Common Items</div>
        ) : null}
        {selectedTab === "branded"
          ? null
          : common
              ?.slice(0, selectedTab === "common" ? 10 : 5)
              .map((item) => (
                <div
                  className="list-item"
                  key={item.food_name + item.tag_id}
                  onClick={() => handleClick(item)}
                >
                  <img src={item?.photo?.thumb} />
                  <div>{item.food_name}</div>
                </div>
              ))}
        {selectedTab === "all" ? (
          <div className="list-item-heading">Branded Items</div>
        ) : null}
        {selectedTab === "common"
          ? null
          : branded
              ?.slice(0, selectedTab === "branded" ? 10 : 5)
              .map((item) => (
                <div
                  className="list-item"
                  key={item.food_name + item.tag_id}
                  onClick={() => handleClick(item)}
                >
                  <img src={item?.photo?.thumb} />
                  <div>{item.food_name}</div>
                </div>
              ))}
      </div>
    </div>
  );
};
SearchResults.propTypes = {
  searchResults: PropTypes.object.isRequired,
};

export default SearchResults;
