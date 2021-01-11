import React, { useEffect, useState } from 'react'
import * as d3 from "d3"
import '../App.css'

function User1() {

    const [issues, setIssues] = useState([])
    const [comments, setComments] = useState([])
    const [createDates, setCreateDates] = useState([])
    const [updateDates, setUpdateDates] = useState([])

    function drawChart() {
        const dataset = comments
        const w = 900;
        const h = 300;
        const svg = d3
            .select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "bar")
        svg
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("fill", "navy")
            .attr("class", "sBar")
            .attr("x", (d, i) => i * 30)
            .attr("y", (d, i) => {
                return h - 7 * d
            })
            .attr("width", 20)
            .attr("height", (d, i) => 7 * d)
        svg
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .style("font-size", 18)
            .attr("fill", "red")
            .attr("x", (d, i) => i * 30)
            .attr("y", (d, i) => h - 7 * d - 3)
            .text(d => d)
    }

    useEffect(() => {
        async function fetchdata() {
            const response = await fetch(`https://api.github.com/repositories/19438/issues`)
            const data = await response.json()
            console.log(data)

            data.forEach(element => {
                issues.push(element.number)
                comments.push(element.comments)
                createDates.push(element.created_at)
                updateDates.push(element.updated_at)
            })
            setIssues(issues)
            setComments(comments)
            setCreateDates(createDates)
            setUpdateDates(updateDates)
            console.log(issues)
            console.log(comments)
            console.log(createDates)
            console.log(updateDates)
            drawChart()
        }
        fetchdata()
    })

    return (
        <div id="user1">
            <h1>Welcome, John!</h1>
            <div id="chart"></div>
        </div>
    )
}

export default User1
