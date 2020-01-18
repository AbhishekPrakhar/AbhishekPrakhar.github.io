
// import 'rc-slider/assets/index.less';
import "rc-slider/assets/index.css";
import React from 'react';
// import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
// import moment from "moment";
const Range = Slider.Range;
function log(value) {
  console.log(value); //eslint-disable-line
}
  class RangeSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        min:this.props.min,
        max:this.props.max,
      };
   }

  
    onSliderChange = (value) => {
      log(value);
      this.setState({
            min_selected:value[0],
            max_selected:value[1]
          }
        );

        this.props.onChange(value[0],value[1])
    }
    
  
    render() {
     return (
       
        <div style={{}}>
     <Range min={this.state.min} max={this.state.max}
          onChange={this.onSliderChange}
        />
        <p style={{ "float": "left" }}>{this.state.min_selected}  </p>
        <p style={{ "float": "right" }}>{this.state.max_selected} </p>
      </div>
      )
    }
  }

export default RangeSlider;