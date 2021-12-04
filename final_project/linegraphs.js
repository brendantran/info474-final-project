var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#allraces")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// OVERALL/TOP LINE CHART WITH ALL RACES/ETHNICITIES ---------------------------------------------------
d3.csv("/csv/educational-attainment-all.csv", function (d) {
  // format variables 
  // array of grade levels (strings)
  var grades = d.map(d => d.grade)
  console.log(grades)

  // array of numbers of graduates (integers)
  var graduateString = d.map(d => d.asian)
  var graduates = []
  for (i = 0; i <= graduateString.length; i++) {
    graduates.push(parseInt(graduateString[i]))
  }

  // add X-Axis  
  var xScale = d3.scalePoint().domain(grades).range([0, width]);
  var xAxis = d3.axisBottom(xScale).ticks(15)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  // Add Y axis
  var y = d3.scaleLinear().domain([0, d3.max(graduates)]).range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(y))

  // Add the line
  svg.append("path")
    .data(d)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return xScale(d.grades) })
      .y(function (d) { return yScale(d.asian) })
    )

})


// // MINI CHARTS CODE BELOW ---------------------------------------------------


