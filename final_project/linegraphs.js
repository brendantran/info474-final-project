// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#all-races-line-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// OVERALL/TOP LINE CHART WITH ALL RACES/ETHNICITIES ---------------------------------------------------
d3.csv("/csv/educational-attainment-all.csv", function(d) {
  // add X-Axis
  console.log(d)
    var grades = d.map(d=>d.grade)
    var xScale = d3.scalePoint().domain(grades).range([0, width]);
    var xAxis = d3.axisBottom().scale(xScale)
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    // Add Y axis
    var graduates = d.map(d=>d.asian)
    var y = d3.scaleLinear().domain([0, d3.max(graduates)]).range([ height, 0 ])
    svg.append("g")
      .call(d3.axisLeft(y))

    // Add the line
    svg.append("path")
      .datum(d)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(grades) })
        .y(function(d) { return y(graduates) })
        )

})


// MINI CHARTS CODE BELOW ---------------------------------------------------
    

