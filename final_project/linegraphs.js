var margin = { top: 10, right: 30, bottom: 150, left: 100 },
  width = 900 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#allraces")
  .append("svg")
  .attr("id", "#overallChart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")

function drawOverall(asianData, blackData, hispanicData, whiteData, margin, width, height, svg, gender) {
  d3.csv("/csv/educational-attainment-all.csv", function (dataset) {
    // format variables 
    // array of grade levels (strings)
    var grades = dataset.map(dataset => dataset.grade)
    // array of numbers of asian graduates (integers)

    var asianTotalGraduateString = dataset.map(dataset => dataset[asianData])
    var asianTotalGraduates = []
    for (i = 0; i <= asianTotalGraduateString.length; i++) {
      asianTotalGraduates.push(parseInt(asianTotalGraduateString[i]))
    }

    // array of numbers of black graduates (integers)
    var blackTotalGraduateString = dataset.map(dataset => dataset[blackData])
    var blackTotalGraduates = []
    for (i = 0; i <= blackTotalGraduateString.length; i++) {
      blackTotalGraduates.push(parseInt(blackTotalGraduateString[i]))
    }

    // array of numbers of hispanic graduates (integers)
    var hispanicTotalGraduateString = dataset.map(dataset => dataset[hispanicData])
    var hispanicTotalGraduates = []
    for (i = 0; i <= hispanicTotalGraduateString.length; i++) {
      hispanicTotalGraduates.push(parseInt(hispanicTotalGraduateString[i]))
    }

    // array of numbers of hispanic graduates (integers)
    var whiteTotalGraduateString = dataset.map(dataset => dataset[whiteData])
    var whiteTotalGraduates = []
    for (i = 0; i <= whiteTotalGraduateString.length; i++) {
      whiteTotalGraduates.push(parseInt(whiteTotalGraduateString[i]))
    }

    // add X-Axis  
    var xScale = d3.scalePoint().domain(grades).range([0, width - 100]);
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
    var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function (d) {
      return +d[whiteData];
    })]).range([height, 10])
    svg.append("g")
      .call(d3.axisLeft(yScale))
 
    // y-axis label
    svg.append('text')
      .text("NUMBER OF GRADUATES")
      .attr("class", "y-axis-label")
      .attr("x", (-230))
      .attr("y", -55)
      .attr("transform", "rotate(-90)")

    // add chart title
    svg.append('text')
      .text("Educational Attainment by Race/Ethnicity: " + gender)
      .attr("class", "chart-title")
      .attr("x", 150)
      .attr("y", 5)

    // Add the line
    svg.append("path")
      .datum(dataset)
      .attr("class", "asianLine")
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return xScale(d.grade); })
        .y(function (d) { return yScale(d[asianData]); })
      )
    svg.append("path")
      .datum(dataset)
      .attr("class", "blackLine")
      .attr("fill", "none")
      .attr("stroke", "#FA6900")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return xScale(d.grade); })
        .y(function (d) { return yScale(d[blackData]); })
      )
    svg.append("path")
      .datum(dataset)
      .attr("class", "hispanicLine")
      .attr("fill", "none")
      .attr("stroke", "#187bcd")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return xScale(d.grade); })
        .y(function (d) { return yScale(d[hispanicData]); })
      )
    svg.append("path")
      .datum(dataset)
      .attr("class", "whiteLine")
      .attr("fill", "none")
      .attr("stroke", "#785Bd7")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return xScale(d.grade); })
        .y(function (d) { return yScale(d[whiteData]); })
      )

    // chart legend
    svg.append("circle").attr("cx", 700).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx", 700).attr("cy", 160).attr("r", 6).style("fill", "#FA6900")
    svg.append("circle").attr("cx", 700).attr("cy", 190).attr("r", 6).style("fill", "#187bcd")
    svg.append("circle").attr("cx", 700).attr("cy", 220).attr("r", 6).style("fill", "#785Bd7")
    svg.append("text").attr("x", 720).attr("y", 130).text("Asian").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 720).attr("y", 160).text("Black").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 720).attr("y", 190).text("Hispanic").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 720).attr("y", 220).text("White").style("font-size", "15px").attr("alignment-baseline", "middle")


  })
}
drawOverall('asian', 'black', 'hispanic', 'white', margin, width, height, svg, "All")

function drawAll() {
  svg.selectAll("*").remove()
  drawOverall('asian', 'black', 'hispanic', 'white', margin, width, height, svg, "All")
}
function drawMale() {
  svg.selectAll("*").remove()
  drawOverall('asianmale', 'blackmale', 'hispanicmale', 'whitemale', margin, width, height, svg, "Male")
}
function drawFemale() {
  svg.selectAll("*").remove()
  drawOverall('asianfemale', 'blackfemale', 'hispanicfemale', 'whitefemale', margin, width, height, svg, "Female")
}

// // MINI CHARTS CODE BELOW ---------------------------------------------------



function createMiniGraph(csv, race, color, gender) {
  d3.csv(csv, function (dataset) {

    var grades = dataset.map(dataset => dataset.grade)

    var margin = { top: 5, right: 15, bottom: 75, left: 50 },
      width = 450 - margin.left - margin.right,
      height = 225 - margin.top - margin.bottom;

    var svg = d3.select(race)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

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

    var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function (d) {
      return +d.All;
    })]).range([height, 0])
    svg.append('g')
      .call(d3.axisLeft(yScale))

    svg.append('path')
      .datum(dataset)
      .attr('class', race + '-path-' + gender)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(function (d) { return xScale(d.grade) })
        .y(function (d) { return yScale(d[gender]) })
      )
  })
}

createMiniGraph('/csv/educational-attainment-asian.csv', '.asian', '#69b3a2', 'All');
createMiniGraph('/csv/educational-attainment-black.csv', '.black', '#FA6900', 'All');
createMiniGraph('/csv/educational-attainment-white.csv', '.white', '#785Bd7', 'All');
createMiniGraph('/csv/educational-attainment-hispanic.csv', '.hispanic', '#187bcd', 'All')

function drawAsianAll() {
  createMiniGraph('/csv/educational-attainment-asian.csv', '.asian', '#69b3a2', 'All');
}
function drawAsianMale() {
  createMiniGraph('/csv/educational-attainment-asian.csv', '.asian', '#7B9891', 'Male');
}
function drawAsianFemale() {
  createMiniGraph('/csv/educational-attainment-asian.csv', '.asian', '#3D7165', 'Female');
}

function drawBlackAll() {
  createMiniGraph('/csv/educational-attainment-black.csv', '.black', '#FA6900', 'All');
}
function drawBlackMale() {
  createMiniGraph('/csv/educational-attainment-black.csv', '.black', '#BFA089', 'Male');
}
function drawBlackFemale() {
  createMiniGraph('/csv/educational-attainment-black.csv', '.black', '#884A1C', 'Female');
}

function drawWhiteAll() {
  createMiniGraph('/csv/educational-attainment-white.csv', '.white', '#785Bd7', 'All');
}
function drawWhiteMale() {
  createMiniGraph('/csv/educational-attainment-white.csv', '.white', '#8376AF', 'Male');
}
function drawWhiteFemale() {
  createMiniGraph('/csv/educational-attainment-white.csv', '.white', '#3D2B78', 'Female');
}

function drawHispanicAll(id) {
  console.log(id)
  if (document.getElementById(id).checked) {
    createMiniGraph('/csv/educational-attainment-hispanic.csv', '.hispanic', '#187bcd', 'All');
  } else {
    d3.selectAll('.hispanic-path-All').remove()
  }
}
function drawHispanicMale() {
  createMiniGraph('/csv/educational-attainment-hispanic.csv', '.hispanic', '#698BA7', 'Male');
}
function drawHispanicFemale() {
  createMiniGraph('/csv/educational-attainment-hispanic.csv', '.hispanic', '#264C6B', 'Female');
}