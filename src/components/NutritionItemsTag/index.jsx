import PropTypes from "prop-types";

/**
 * NutritionItemsTag component
 * Renders a list of tags from the Nutrition API
 * The tags are wrapped in a div with the class "tag-list"
 * Each tag is rendered in a div with the class "tag"
 * The tags are mapped over and rendered as a list
 * The tags are given a key of the index of the tag
 * The tag is rendered as the text content of the div
 */
const NutritionItemsTag = ({ tags = [] }) => {
  return (
    <div className="tag-list">
      {/* Map over the tags and render them as a list */}
      {tags?.map((tag, index) => (
        <div key={index} className="tag">
          {/* Render the tag as the text content of the div */}
          {tag}
        </div>
      ))}
    </div>
  );
};


NutritionItemsTag.propTypes = {
  tags: PropTypes.array,
};

export default NutritionItemsTag;
