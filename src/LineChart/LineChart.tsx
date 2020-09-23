import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { AltitudeResponse } from '../App'
import moment from 'moment'
import { WARNING_THRESHOLD } from '../Status/Status'

interface LineChartProps {
    altitudeData: AltitudeResponse[]
}

const LineChart = (props: LineChartProps) => {
    const { altitudeData } = props
    useEffect(() => {
        createChart(altitudeData)
    }, [altitudeData])
    return (<div id="chart"></div>)
}

const createChart = (data: AltitudeResponse[]) => {
    d3.selectAll("#chart > *").remove();
    const minAlt = d3.min(data, d => d.altitude)
    const maxAlt = d3.max(data, d => d.altitude)
    const margin = {top: 10, right: 60, bottom: 30, left: 60},
    width = window.innerWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    const x = data.length && d3.scaleTime()
        .domain([moment(data[0].last_updated).toDate(), moment(data[data.length - 1].last_updated).toDate()])
        .range([ 0, width ]);
    x && svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = maxAlt && minAlt && d3.scaleLinear()
        .domain([minAlt, maxAlt])
        .range([ height, 0 ])
    y && svg.append("g")
        .call(d3.axisLeft(y))

    const modifiedData = data.map(d => [d.altitude, moment(d.last_updated).toDate()])

    const line: any = d3.line()
    .x(d => x && x(d[1]))
    .y(d => y ? y(d[0]) : 0)

    x && y && svg.append("line")
    .style("stroke-dasharray", "4 4")
    .style("stroke", "orange")
    .attr("x1", 0)
    .attr("y1", y(WARNING_THRESHOLD))
    .attr("x2", width)
    .attr("y2", y(WARNING_THRESHOLD));

    svg.append("path")
        .datum(modifiedData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("d", line)
}

export default LineChart