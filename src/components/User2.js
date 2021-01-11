import React, { useState, useEffect } from 'react'
import * as d3 from "d3"
import '../App.css'

function User2() {

    const [issues, setIssues] = useState([])
    const [comments, setComments] = useState([])
    const [createDates, setCreateDates] = useState([])
    const [updateDates, setUpdateDates] = useState([])

    function drawChart() {
        var data = comments //[1.1,2.2,4.46,2.12,1.36,5.002445,4.1242]; 
  
        // Selecting SVG using d3.select() 
        var svg = d3.select("svg"); 
  
        let g = svg.append("g") 
               .attr("transform", "translate(150,120)"); 
          
        // Creating Pie generator 
        var pie = d3.pie(); 
  
        // Creating arc 
        var arc = d3.arc() 
                    .innerRadius(0) 
                    .outerRadius(100); 
  
        // Grouping different arcs 
        var arcs = g.selectAll("arc") 
                    .data(pie(data)) 
                    .enter() 
                    .append("g"); 
  
        // Appending path  
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
