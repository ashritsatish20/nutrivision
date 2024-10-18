import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";

/**
 * A pie chart that shows the breakdown of the item's macronutrients (carbohydrates, fat, protein).
 * The chart is responsive and will resize itself based on the width of its parent element.
 *
 * @param {{proteinPercentage: number, carbsPercentage: number, fatPercentage: number}} macronutrientPercentages
 * The percentages of the item's macronutrients.
 * @returns A div element containing the chart.
 */
const NutritionsChart = ({ macronutrientPercentages }) => {
  // This ref is used to store a reference to the DOM element that the chart is
  // rendered in. This is necessary because the chart needs to be resized when
  // the window is resized, and the chart needs to know how big its container is
  // in order to resize itself correctly.
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // This object contains the configuration options for the chart.
    const options = {
      // This is the configuration for the tooltip.
      tooltip: {
        trigger: "item",
      },
      // This is the configuration for the legend.
      legend: {
        orient: "vertical",
        left: "right",
      },
      // This is the configuration for the series (i.e. the pie chart).
      series: [
        {
          // This is the name of the series, which is displayed in the legend.
          name: "",
          // This is the type of the series, which is a pie chart.
          type: "pie",
          // This sets the radius of the pie chart to 50% of its container's width.
          radius: "50%",
          // This is the data for the pie chart.
          data: [
            {
              // The value of this data point is the percentage of the item's protein.
              value: macronutrientPercentages?.proteinPercentage?.toFixed(2) || 0,
              // The name of this data point is "Protein", which is displayed in the tooltip.
              name: "Protein",
            },
            {
              // The value of this data point is the percentage of the item's carbohydrates.
              value: macronutrientPercentages?.carbsPercentage?.toFixed(2) || 0,
              // The name of this data point is "Carbohydrates", which is displayed in the tooltip.
              name: "Carbohydrates",
            },
            {
              // The value of this data point is the percentage of the item's fat.
              value: macronutrientPercentages?.fatPercentage?.toFixed(2) || 0,
              // The name of this data point is "Fat", which is displayed in the tooltip.
              name: "Fat",
            },
          ],
          // This is the configuration for the emphasis (i.e. the hover) effect.
          emphasis: {
            // This sets the shadow blur, offset, and color for the emphasis effect.
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          // This sets the label for the pie chart to be hidden.
          label: {
            show: false,
          },
        },
      ],
    };

    // This creates a new instance of the chart, and renders it in the DOM element
    // that is stored in the chartContainerRef.
    const chart = echarts.init(chartContainerRef.current, null, {
      // This sets the width and height of the chart to be the same as its parent
      // element.
      width: chartContainerRef.current?.offsetWidth,
      height: chartContainerRef.current?.offsetWidth,
    });

    // This sets the options for the chart.
    chart.setOption(options);

    // This is a function that is called when the window is resized. It resizes the
    // chart to fit its new container size.
    const handleResize = () => {
      chart.resize({
        // This sets the width and height of the chart to be the same as its parent
        // element.
        width: chartContainerRef.current?.offsetWidth,
        height: chartContainerRef.current?.offsetWidth,
      });
    };

    // This adds an event listener to the window that calls the handleResize
    // function whenever the window is resized.
    window.addEventListener("resize", handleResize);

    // This is the cleanup function for the useEffect hook. It removes the event
    // listener from the window, and disposes of the chart instance.
    return () => {
      window.removeEventListener("resize", handleResize);
      chart?.dispose();
    };
  }, [macronutrientPercentages]);

  // This returns a div element containing the chart. The chart is rendered in the
  // div with the class "chart-container", and the div is given a width of 100%.
  return (
    <div className="chart-container">
      <div style={{ width: "100%" }} ref={chartContainerRef} />
    </div>
  );
};NutritionsChart.propTypes = {
  macronutrientPercentages: PropTypes.object,
};

export default NutritionsChart;
