var margin = { top: 10, right: 30, bottom: 150, left: 100 },
  width = 900 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#allraces")
  .append("svg")
  .attr("id", "overallChart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")


// OVERALL/TOP LINE CHART WITH ALL RACES/ETHNICITIES AND ALL GENDERS
d3.csv("/csv/educational-attainment-all.csv", function (dataset) {
  // format variables 
  // array of grade levels (strings)
  var grades = dataset.map(dataset => dataset.grade)
  window.value = grades
  // array of numbers of asian graduates (integers)

  var asianTotalGraduateString = dataset.map(dataset => dataset.asian)
  var asianTotalGraduates = []
  for (i = 0; i <= asianTotalGraduateString.length; i++) {
    asianTotalGraduates.push(parseInt(asianTotalGraduateString[i]))
  }

  // array of numbers of black graduates (integers)
  var blackTotalGraduateString = dataset.map(dataset => dataset.black)
  var blackTotalGraduates = []
  for (i = 0; i <= blackTotalGraduateString.length; i++) {
    blackTotalGraduates.push(parseInt(blackTotalGraduateString[i]))
  }

  // array of numbers of hispanic graduates (integers)
  var hispanicTotalGraduateString = dataset.map(dataset => dataset.hispanic)
  var hispanicTotalGraduates = []
  for (i = 0; i <= hispanicTotalGraduateString.length; i++) {
    hispanicTotalGraduates.push(parseInt(hispanicTotalGraduateString[i]))
  }

  // array of numbers of hispanic graduates (integers)
  var whiteTotalGraduateString = dataset.map(dataset => dataset.white)
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
  
  //var yScale = d3.scaleLinear().domain([0, d3.max(whiteTotalGraduates)]).range([height, 0])
  var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function(d) { 
    return +d.white;
  })]).range([height, 0])
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
    .datum(dataset)
    .attr("class", "asianLine")
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return xScale(d.grade); })
      .y(function (d) { return yScale(d.asian); })
    )
    svg.append("path")
    .datum(dataset)
    .attr("class", "blackLine")
    .attr("fill", "none")
    .attr("stroke", "#FA6900")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return xScale(d.grade); })
      .y(function (d) { return yScale(d.black); })
    )
    svg.append("path")
    .datum(dataset)
    .attr("class", "hispanicLine")
    .attr("fill", "none")
    .attr("stroke", "#187bcd")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return xScale(d.grade); })
      .y(function (d) { return yScale(d.hispanic); })
    )
    svg.append("path")
    .datum(dataset)
    .attr("class", "whiteLine")
    .attr("fill", "none")
    .attr("stroke","#785Bd7")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return xScale(d.grade); })
      .y(function (d) { return yScale(d.white); })
    )
    
  // chart legend
  svg.append("circle").attr("cx",700).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
  svg.append("circle").attr("cx",700).attr("cy",160).attr("r", 6).style("fill", "#FA6900")
  svg.append("circle").attr("cx",700).attr("cy",190).attr("r", 6).style("fill", "#187bcd")
  svg.append("circle").attr("cx",700).attr("cy",220).attr("r", 6).style("fill", "#785Bd7")
  svg.append("text").attr("x", 720).attr("y", 130).text("Asian").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 160).text("Black").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 190).text("Hispanic").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 720).attr("y", 220).text("White").style("font-size", "15px").attr("alignment-baseline","middle")

  
})

function drawAll() {
  //console.log("drawAll WORKS when you click the male radio button")
}
function drawMale() {
  //console.log("drawMale WORKS when you click the male radio button")
  //var removeOverall = d3.select("#overallChart")
  //removeOverall.selectAll("*").remove()
  
}
function drawFemale() {
  //console.log("drawFemale WORKS when you click the male radio button")
}

// // MINI CHARTS CODE BELOW ---------------------------------------------------
d3.csv('/csv/educational-attainment-asian.csv', function(dataset) {
//console.log(dataset)

  var margin = { top: 5, right: 15, bottom: 75, left: 50 },
  width = 450 - margin.left - margin.right,
  height = 225 - margin.top - margin.bottom;
  
  var svg = d3.select(".asian")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 
  var grades = window.value
  var xScale = d3.scalePoint().domain(grades).range([0, width]);
  var xAxis = d3.axisBottom(xScale).ticks(16)
  svg.append('g')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-40)")

  var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function(d) {
    return +d.All;
  })]).range([height, 0])
  svg.append('g')
    .call(d3.axisLeft(yScale))

  svg.append('path')
    .datum(dataset)
    .attr('fill', 'none')
    .attr('stroke', '#69b3a2')
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
      .x(function(d) { return d.Coordinates })
      .y(function(d) { return d.All })
      )
})

