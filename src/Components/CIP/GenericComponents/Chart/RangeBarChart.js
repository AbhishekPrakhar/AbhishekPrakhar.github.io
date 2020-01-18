import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class RangeBarChart extends Component {
		render() {
		const options = {
            animationEnabled: true,
            height:120,
			axisY: {
				lineThickness: 1
			},
			data: [{
				type: "rangeBar",
				dataPoints: []
			}]
			
		}
		for(var i=0;i<this.props.chartArray.length;i++){
			let range=[];
			for(var j=0;j<this.props.chartArray[i].y.length;j++){
				range.push(this.props.chartArray[i].y[j]);
			}
			options.data[0].dataPoints.push({label:this.props.chartArray[i].label,y:range});
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default RangeBarChart;