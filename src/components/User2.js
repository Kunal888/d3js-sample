import React, { useState, useEffect } from 'react'
import * as d3 from "d3"
import '../App.css'

function User2() {

    const [issues, setIssues] = useState([])
    const [comments, setComments] = useState([])
    const [createDates, setCreateDates] = useState([])
    const [updateDates, setUpdateDates] = useState([])

    function drawChart() {
        var data = comments 
        var svg = d3.select("svg"); 
  
        let g = svg.append("g") 
               .attr("transform", "translate(150,120)"); 
        var pie = d3.pie(); 
        var arc = d3.arc() 
                    .innerRadius(0) 
                    .outerRadius(100); 
        var arcs = g.selectAll("arc") 
                    .data(pie(data)) 
                    .enter() 
                    .append("g"); 
        arcs.append("path") 
            .attr("fill", (data, i)=>{ 
                return d3.schemeSet3[i]; 
            }) 
            .attr("d", arc); 
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
        <div id="user2">
            <h1>Welcome, Micky!</h1>
            <div id="pie-chart"><svg></svg></div> 
        </div>
    )
}

export default User2
