// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([0, height]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#scatterplot-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
function getData () {
    return new Promise((resolve) => {
        fetch(dataUrl)
            .then((res) => res.json())
            .then((res) => resolve(res))
    });
}
getData().then((data) => {

    // scale the range of the data
    const minMaxSeconds = d3.extent(data, (d) => d.Seconds) ;
    x.domain([minMaxSeconds[0] - 10, minMaxSeconds[1] + 10]);
    y.domain([1, d3.max(data, (d) => d.Place) + 1]);


    var div = d3.select("#scatterplot-graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // add the dots
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", (d) => x(d.Seconds))
        .attr("cy", (d) => y(d.Place))
        .on("mouseover", (d) => {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html('Doping info: ' + d.Doping)
        })
        .on('mouseout', () => {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        });

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
});