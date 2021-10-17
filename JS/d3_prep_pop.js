    const data2 = [
    {
        date: 2021 ,
        Population: 5061000,
        Annual  : 1.87
      },
      {
        date: 2022 ,
        Population: 5151000,
        Annual  : 1.78
      },
      {
        date: 2023 ,
        Population: 5235000,
        Annual  : 1.63
      },
      {
        date: 2024 ,
        Population: 5316000,
        Annual  : 1.55
      },
      {
        date: 2025 ,
        Population: 5392000,
        Annual  : 1.43
      },
      {
        date: 2026 ,
        Population: 5465000,
        Annual  : 1.35
      },
      {
        date: 2027 ,
        Population: 5535000,
        Annual  : 1.28
      },
      {
        date: 2028 ,
        Population: 5604000,
        Annual  : 1.25
      },
      {
        date: 2029 ,
        Population: 5671000,
        Annual  : 1.2
      },
      {
        date: 2030 ,
        Population: 5736000,
        Annual  : 1.15
      },
      {
        date: 2031 ,
        Population: 5801000,
        Annual  : 1.13
      },
      {
        date: 2032 ,
        Population: 5865000,
        Annual  : 1.1
      },
      {
        date: 2033 ,
        Population: 5929000,
        Annual  : 1.09
      },
      {
        date: 2034 ,
        Population: 5992000,
        Annual  : 1.06
      },
      {
        date: 2035 ,
        Population: 6056000,
        Annual  : 1.07
      },

    ];
    // Create svg2 and padding for the chart
    const svg2 = d3
    .select("#Pred")
    .append("svg2")
    .attr("height", 600)
    .attr("width", 650);
    const margin = { top: 100, bottom: 50, left: 100, right: 100};
    const chart = svg2.append("g").attr("transform", `translate(${margin.left},0)`);
    const width = +svg2.attr("width") - margin.left - margin.right;
    const height = +svg2.attr("height") - margin.top - margin.bottom;
    const grp = chart
    .append("g")
    .attr("transform", `translate(-${margin.left},-${margin.top})`);
    
    // Create scales
    const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data2, dataPoint => dataPoint.Population)]);
    const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data2, dataPoint => dataPoint.date));
    
    const line = d3
    .line()
    .x(dataPoint => xScale(dataPoint.date))
    .y(dataPoint => yScale(dataPoint.Population));
    
    // Add path
    const addPath = () => {
      const path = grp
      .append("path")
      .attr("transform", `translate(${margin.left},0)`)
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    
      const pathLength = path.node().getTotalLength();
      const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(6000)
      .on("end", loopPath);
    
      path
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);
    }
    
    const loopPath = () => {
      grp.select("path").remove();
      addPath();
    }
    
    addPath();

    // Add the X Axis
    chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(data2.length));

    svg2.append("text")      // text label for the x axis
    .attr("x", width / 2 )
    .attr("y",  height + margin.bottom)
    .style("text-anchor", "middle")
    .text("Year");
    // Add the Y Axis
    chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));

    svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Population");