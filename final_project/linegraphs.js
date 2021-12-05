var margin = { top: 10, right: 30, bottom: 150, left: 100 },
  width = 900 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#allraces")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")


// OVERALL/TOP LINE CHART WITH ALL RACES/ETHNICITIES ---------------------------------------------------
d3.csv("/csv/educational-attainment-all.csv", function (d) {
  // format variables 
  // array of grade levels (strings)
  var grades = d.map(d => d.grade)
  console.log(grades)

  // array of numbers of asian graduates (integers)
  var asianTotalGraduateString = d.map(d => d.asian)
  var asianTotalGraduates = []
  for (i = 0; i <= asianTotalGraduateString.length; i++) {
    asianTotalGraduates.push(parseInt(asianTotalGraduateString[i]))
  }
  console.log(d)
  // array of numbers of black graduates (integers)
  var blackTotalGraduateString = d.map(d => d.black)
  var blackTotalGraduates = []
  for (i = 0; i <= blackTotalGraduateString.length; i++) {
    blackTotalGraduates.push(parseInt(blackTotalGraduateString[i]))
  }

  // array of numbers of hispanic graduates (integers)
  var hispanicTotalGraduateString = d.map(d => d.hispanic)
  var hispanicTotalGraduates = []
  for (i = 0; i <= hispanicTotalGraduateString.length; i++) {
    hispanicTotalGraduates.push(parseInt(hispanicTotalGraduateString[i]))
  }

  // array of numbers of hispanic graduates (integers)
  var whiteTotalGraduateString = d.map(d => d.white)
  var whiteTotalGraduates = []
  for (i = 0; i <= whiteTotalGraduateString.length; i++) {
    whiteTotalGraduates.push(parseInt(whiteTotalGraduateString[i]))
  }

  // add X-Axis  
  var xScale = d3.scalePoint().domain(grades).range([0, width-100]);
  var xAxis = d3.axisBottom(xScale).ticks(16)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-40)")

  // x-axis label
  svg.append('text')
    .text("GRADE LEVEL")
    .attr("class", "x-axis-label")
    .attr("x", (330))
    .attr("y", 410)

  // Add Y axis
  var yScale = d3.scaleLinear().domain([0, d3.max(asianTotalGraduates)]).range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(yScale))

  // y-axis label
  svg.append('text')
    .text("NUMBER OF GRADUATES")
    .attr("class", "y-axis-label")
    .attr("x", (-230))
    .attr("y", -55)
    .attr("transform", "rotate(-90)")

  // Add the line
  svg.append("path")
    .data(d)
    .attr("class", "asianLine")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(grades)
      .y(function (d) { return yScale(asianTotalGraduates); })
    )

  // chart legend
  svg.append("circle").attr("cx",700).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
  svg.append("circle").attr("cx",700).attr("cy",160).attr("r", 6).style("fill", "#785Bd7")
  svg.append("circle").attr("cx",700).attr("cy",190).attr("r", 6).style("fill", "#187bcd")
  svg.append("circle").attr("cx",700).attr("cy",220).attr("r", 6).style("fill", "#FA6900")
  svg.append("text").attr("x", 720).attr("y", 130).text("Asian").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 160).text("Black").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 190).text("Hispanic").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 220).text("White").style("font-size", "15px").attr("alignment-baseline","middle")
  

})


// // MINI CHARTS CODE BELOW ---------------------------------------------------


