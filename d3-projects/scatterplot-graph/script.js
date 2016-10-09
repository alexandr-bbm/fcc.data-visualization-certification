var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
function getData () {
    return new Promise((resolve) => {
        fetch(dataUrl)
            .then((res) => res.json())
            .then((res) => resolve(res))
    });
}
getData().then((data) => {

    var svg, margin, width, height, x, y;

    prepare();
    main();
    makeAxes();

    function prepare () {
        // set the dimensions and margins of the graph
        margin = {top: 20, right: 20, bottom: 50, left: 50};
        width = 900 - margin.left - margin.right;
        height = 600 - margin.top - margin.bottom;


        // set the ranges
        x = d3.scaleLinear().range([0, width]);
        y = d3.scaleLinear().range([0, height]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin

        svg = d3.select('#scatterplot-graph').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        // scale the range of the data
        const minMaxSeconds = d3.extent(data, (d) => d.Seconds);
        x.domain([minMaxSeconds[0] - 30, minMaxSeconds[1] + 10]);
        y.domain([1, d3.max(data, (d) => d.Place) + 1]);
    }


    function main () {
        var tooltip = d3.select('#scatterplot-graph').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        var selection = svg.selectAll('dot')
            .data(data)
            .enter();

        var circleRadius = 5,
            transitionDuration = 200;

        var g = selection.append('g')
            .attr('transform', (d) => `translate(${x(d.Seconds)}, ${y(d.Place)})`)
            .on('mouseover', function (d) {
                tooltip.transition()
                    .duration(transitionDuration)
                    .style('opacity', .9);
                tooltip.html(` 
                    <bold>${d.Name}</bold><br/>
                    Nationality: ${d.Nationality} <br/>
                    Year: ${d.Year}, Time:  ${d.Time} <br/> 
                    ${d.Doping}`
                );
            })
            .on('mouseout', function () {
                tooltip.transition()
                    .duration(transitionDuration)
                    .style('opacity', 0);
            });

        var names = g.append('text')
            .text((d) => d.Name)
            .attr('x', function (d) {
                // чтобы текст был слева
                // Сдвигаем влево на длину самого себя плюс диаметр круга
                return - (this.getBBox().width + circleRadius*2);
            })
            .attr('y', circleRadius)
            .attr('class', 'cyclist-name');


        var circles = g.append('circle')
            .attr('r', circleRadius)


    }

    function makeAxes () {
        // add the X Axis
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));
        // X axis label
        svg.append('text')
            .attr('transform',
                'translate(' + (width / 2) + ' ,' +
                (height + margin.top + 20) + ')')
            .style('text-anchor', 'middle')
            .text('Seconds');


        // add the Y Axis
        svg.append('g')
            .call(d3.axisLeft(y).tickValues([1, 5, 10, 15, 20, 25, 30, 35]));
        // Y axis label
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Place');
    }


});