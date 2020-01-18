import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';
class Cloud extends Component {
  render() {
    const data = [
      { text: 'retinopathy', value: 60 },
      { text: 'ophthalmology', value: 50 },
      { text: 'treatment', value: 20 },
      { text: 'incurable', value: 10 },
      { text: 'retinitis pigmentosa', value: 10 },
      { text: 'NIBR', value: 10 },
      { text: 'hereditary', value: 50 },
      { text: 'glaucoma', value: 80 },
      { text: 'eyesight', value: 10 }
    ];

    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;
    return (
      <div>
        {this.props.type === "competitor" &&
          <div style={{ width: 300, height: 150 }}>
            <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper} width="300" height="120"
            />
          </div>
        }
        {
          this.props.type === "taview" &&
          <div style={{ width: 300, height: 120 }}>
            <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper} width="300" height="120"
            />
          </div>
        }
      </div>
    );
  }
}

export default Cloud;
