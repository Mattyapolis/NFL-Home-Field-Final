//Set size of svg

var svgWidth = 960;
var svgHeight = 500;

// Set chart margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

//Set chart size
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#bar")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "homewin";

// function used for updating x-scale var upon click on axis label
function xScale(nflData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(nflData, d => d[chosenXAxis]) * 0.8,
            d3.max(nflData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating bars group with a transition to
// new bars
function renderBars(barsGroup, chosenXAxis, xLinearScale) {

    barsGroup.transition()
        .duration(1000)
        .attr("x", 0)
        .attr("width", d => xLinearScale(d[chosenXAxis]));

    return barsGroup;
}

// function used for updating bars group with new tooltip
function updateToolTip(chosenXAxis, barsGroup) {

    if (chosenXAxis === "homewin") {
        var label = "Home Win Rate";
    } else {
        var label = "Average Home Score";
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([20, 20])
        .html(function(d) {
            return (`${d[chosenXAxis]}`);
        });

    barsGroup.call(toolTip);

    barsGroup.on("mouseover", function(data) {
            toolTip.show(data);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    return barsGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.json("http://127.0.0.1:5000/seasons-data").then(function(nflData, err) {
    if (err) throw err;

    // parse data
    nflData.forEach(function(data) {
        data.season = String(data.season);
        data.homewin = Number(data.homeWin);
        data.homescore = Number(data.homeScore);
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(nflData, chosenXAxis);

    // Create y scale function
    var y = d3.scaleLinear()
        .domain([2009, 2019])
        .range([0, height]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(y);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    // append initial bars
    var barsGroup = chartGroup.selectAll(".bar")
        .data(nflData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.season))
        .attr("height", 30)
        .attr("width", d => xLinearScale(d[chosenXAxis]))
        .attr("x", 0)
        .attr("opacity", "1")
        .attr("fill", "blue");


    // var barsText = chartGroup.selectAll("yearText")
    //     .data(nflData)
    //     .enter()
    //     .append("text")
    //     .text(function(d) {
    //         return d.season
    //     })
    //     .attr("x", function(d) {
    //         return xLinearScale(d[chosenXAxis]);
    //     })
    //     .attr("y", function(d) {
    //         return yLinearScale(d.season);
    //     })
    //     .attr("font-size", "10px")
    //     .attr("text-anchor", "middle")
    //     .attr("fill", "black");

    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var scoreLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "homescore") // value to grab for event listener
        .classed("active", true)
        .text("Average Home Score");

    var homewinLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "homewin") // value to grab for event listener
        .classed("inactive", true)
        .text("Home Win Rate");

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Year");

    // updateToolTip function above csv import
    var barsGroup = updateToolTip(chosenXAxis, barsGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function() {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(nflData, chosenXAxis);

                // updates x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                // updates bars with new x values
                barsGroup = renderBars(barsGroup, chosenXAxis, xLinearScale);

                // updates tooltips with new info
                barsGroup = updateToolTip(chosenXAxis, barsGroup);

                // changes classes to change bold text
                if (chosenXAxis === "homeScore") {
                    scoreLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    homewinLabel
                        .classed("active", false)
                        .classed("inactive", true);
                } else {
                    scoreLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    homewinLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });
}).catch(function(error) {
    console.log(error);
});