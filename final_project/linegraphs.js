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
  d3.csv("./csv/educational-attainment-all.csv", function (dataset) {
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
      return +d.white;
    })]).range([height, 10])
    svg.append("g")
      .call(d3.axisLeft(yScale))
 
    // y-axis label
    svg.append('text')
      .text("NUMBER OF GRADUATES")
      .attr("class", "y-axis-label")
      .attr("x", (-230))
      .attr("y", -70)
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

    var svg = d3.select("." + race)
      .append("g")
      .attr("class", race + gender)
      .attr("transform",
        "translate(" + 75 + "," + margin.bottom + ")")
      
    window.value = svg;

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

    svg.append('text')
      .text("GRADE LEVEL")
      .attr("class", "x-axis-label")
      .attr("x", (150))
      .attr("y", 250)
      .attr("font-size", "12px")

    svg.append('text')
      .text("NUMBER OF GRADUATES")
      .attr("class", "y-axis-label")
      .attr("x", -145)
      .attr("y", -60)
      .attr("transform", "rotate(-90)")
      .attr("font-size", "12px")

    // add chart title
    svg.append('text')
      .text("Educational Attainment by Race/Ethnicity: " + race.charAt(0).toUpperCase() + race.slice(1))
      .attr("class", "chart-title")
      .attr("x", 35)
      .attr("y", -5)
  })
}

d3.select(".asian").append("circle").attr("cx", 475).attr("cy", 111).attr("r", 6).style("fill", "#69b3a2")
d3.select(".asian").append("circle").attr("cx", 475).attr("cy", 143).attr("r", 6).style("fill", "#7B9891")
d3.select(".asian").append("circle").attr("cx", 475).attr("cy", 173).attr("r", 6).style("fill", "#3D7165")
d3.select(".asian").append("text").attr("x", 490).attr("y", 114).text("All").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".asian").append("text").attr("x", 490).attr("y", 145).text("Male").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".asian").append("text").attr("x", 490).attr("y", 176).text("Female").style("font-size", "15px").attr("alignment-baseline", "middle")

d3.select(".black").append("circle").attr("cx", 475).attr("cy", 111).attr("r", 6).style("fill", "#FA6900")
d3.select(".black").append("circle").attr("cx", 475).attr("cy", 143).attr("r", 6).style("fill", "#BFA089")
d3.select(".black").append("circle").attr("cx", 475).attr("cy", 173).attr("r", 6).style("fill", "#884A1C")
d3.select(".black").append("text").attr("x", 490).attr("y", 114).text("All").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".black").append("text").attr("x", 490).attr("y", 145).text("Male").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".black").append("text").attr("x", 490).attr("y", 176).text("Female").style("font-size", "15px").attr("alignment-baseline", "middle")

d3.select(".white").append("circle").attr("cx", 475).attr("cy", 111).attr("r", 6).style("fill", "#785Bd7")
d3.select(".white").append("circle").attr("cx", 475).attr("cy", 143).attr("r", 6).style("fill", "#8376AF")
d3.select(".white").append("circle").attr("cx", 475).attr("cy", 173).attr("r", 6).style("fill", "#3D2B78")
d3.select(".white").append("text").attr("x", 490).attr("y", 114).text("All").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".white").append("text").attr("x", 490).attr("y", 145).text("Male").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".white").append("text").attr("x", 490).attr("y", 176).text("Female").style("font-size", "15px").attr("alignment-baseline", "middle")

d3.select(".hispanic").append("circle").attr("cx", 475).attr("cy", 111).attr("r", 6).style("fill", "#187bcd")
d3.select(".hispanic").append("circle").attr("cx", 475).attr("cy", 143).attr("r", 6).style("fill", "#698BA7")
d3.select(".hispanic").append("circle").attr("cx", 475).attr("cy", 173).attr("r", 6).style("fill", "#264C6B")
d3.select(".hispanic").append("text").attr("x", 490).attr("y", 114).text("All").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".hispanic").append("text").attr("x", 490).attr("y", 145).text("Male").style("font-size", "15px").attr("alignment-baseline", "middle")
d3.select(".hispanic").append("text").attr("x", 490).attr("y", 176).text("Female").style("font-size", "15px").attr("alignment-baseline", "middle")

createMiniGraph('./csv/educational-attainment-asian.csv', 'asian', '#69b3a2', 'All');
createMiniGraph('./csv/educational-attainment-black.csv', 'black', '#FA6900', 'All');
createMiniGraph('./csv/educational-attainment-white.csv', 'white', '#785Bd7', 'All');
createMiniGraph('./csv/educational-attainment-hispanic.csv', 'hispanic', '#187bcd', 'All')

function drawAsianAll(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-asian.csv', 'asian', '#69b3a2', 'All');
  } else {
    d3.selectAll('.asian-path-All').remove()
  }
}
function drawAsianMale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-asian.csv', 'asian', '#7B9891', 'Male');
  } else {
    d3.selectAll('.asian-path-Male').remove()
  }
}
function drawAsianFemale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-asian.csv', 'asian', '#3D7165', 'Female');
  } else {
    d3.selectAll('.asian-path-Female').remove()
  }
}

function drawBlackAll(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-black.csv', 'black', '#FA6900', 'All');
  } else {
    d3.selectAll('.black-path-All').remove()
  }
}
function drawBlackMale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-black.csv', 'black', '#BFA089', 'Male');
  } else {
    d3.selectAll('.black-path-Male').remove()
  }
}
function drawBlackFemale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-black.csv', 'black', '#884A1C', 'Female');
  } else {
    d3.selectAll('.black-path-Female').remove()
  }
}

function drawWhiteAll(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-white.csv', 'white', '#785Bd7', 'All');
  } else {
    d3.selectAll('.white-path-All').remove()
  }
}
function drawWhiteMale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-white.csv', 'white', '#8376AF', 'Male');
  } else {
    d3.selectAll('.white-path-Male').remove()
  }
}
function drawWhiteFemale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-white.csv', 'white', '#3D2B78', 'Female');
  } else {
    d3.selectAll('.white-path-Female').remove()
  }
}

function drawHispanicAll(id) {
  console.log(id)
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-hispanic.csv', 'hispanic', '#187bcd', 'All');
  } else {
    d3.selectAll('.hispanic-path-All').remove()
  }
}
function drawHispanicMale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-hispanic.csv', 'hispanic', '#698BA7', 'Male');
  } else {
    d3.selectAll('.hispanic-path-Male').remove()
  }
}
function drawHispanicFemale(id) {
  if (document.getElementById(id).checked) {
    createMiniGraph('./csv/educational-attainment-hispanic.csv', 'hispanic', '#264C6B', 'Female');
  } else {
    d3.selectAll('.hispanic-path-Female').remove()
  }
}