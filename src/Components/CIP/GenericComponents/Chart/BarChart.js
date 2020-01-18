import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
var options;
class BarChart extends Component {
    constructor(){
        super();
    }
    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    render() {
        console.log("props",this.props.type);
        const options = {
            animationEnabled: true,
            height: 184,
            theme: "light2",
            axisX: {
                // title: "Social Network",
                reversed: true,
            },
            axisY: {
                // title: "Monthly Active Users",
                labelFormatter: this.addSymbols
            }
            
        }
        if(this.props.type==="Phase"){
         options["data"]= [{
            type: "bar",
            dataPoints: []

        }];
        for(var i=0;i<this.props.chartArray.length;i++){
            options.data[0].dataPoints.push({y:this.props.chartArray[i].y,label:this.props.chartArray[i].label})
        }
    }
    if(this.props.type==="Companies"){
        options["data"]= [{
            type: "bar",
            dataPoints: []
        }];
        for(var i=0;i<this.props.chartArray.length;i++){
            options.data[0].dataPoints.push({y:this.props.chartArray[i].y,label:this.props.chartArray[i].label})
        }
    }
    if(this.props.type === "Sales & Contribution"){
        var dataPoints=[];
        console.log("this.props.chartArray"+JSON.stringify(this.props.chartArray));
        for(var i=0;i<this.props.chartArray.length;i++){
            if(this.props.chartArray[i].value!==null && this.props.chartArray[i].value!==undefined && this.props.chartArray[i].value!==""){
                dataPoints.push({y:Number(this.props.chartArray[i].value.replace("%","")),label: this.props.chartArray[i].country})
            }
            else{
                dataPoints.push({y:0,label: this.props.chartArray[i].country}) 
            }
        }
        console.log("dataPoints",dataPoints);
        options["data"]= [{
            type: "bar",
            dataPoints: dataPoints
        }]
    }
        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default BarChart;