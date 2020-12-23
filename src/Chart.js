import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { scaleTime } from "d3-scale";
import { timeFormat } from "d3-time-format";
import { utcDay } from "d3-time";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, BarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

class CandleStickChart extends React.Component {
  render() {
    const { type, width, data, ratio, height } = this.props;
    const xAccessor = (d) => new Date(`${d.date} 00:00:00`);
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100]),
    ];

    return (
      <div
        className="bg-gray-900"
        style={{ position: "absolute", top: 50, bottom: 0 }}
      >
        <ChartCanvas
          mouseMoveEvent={true}
          panEvent={true}
          zoomEvent={true}
          clamp={false}
          ratio={ratio}
          width={width}
          height={window.innerHeight - 50}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          type={type}
          seriesName="MSFT"
          data={data}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          xExtents={xExtents}
        >
          <Chart id={1} yExtents={(d) => [d.high, d.low]}>
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={20}
              tickStroke="#6c7080"
              stroke="#6c7080"
            />
            <YAxis
              axisAt="left"
              orient="left"
              ticks={20}
              tickStroke="#6c7080"
              stroke="#6c7080"
            />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />
            <CandlestickSeries
              strokeWidth={0}
              stroke={(d) => (d.close > d.open ? "#26a69a" : "#ef5350")}
              wickStroke={(d) => (d.close > d.open ? "#26a69a" : "#ef5350")}
              fill={(d) => (d.close > d.open ? "#26a69a" : "#ef5350")}
              width={timeIntervalBarWidth(utcDay)}
            />
            <OHLCTooltip origin={[10, 10]} textFill="#d5d5d5" fontSize={14} />
          </Chart>
          <Chart
            id={2}
            height={150}
            yExtents={(d) => d.volume}
            origin={(w, h) => [0, h - 150]}
          >
            <BarSeries
              width={2}
              yAccessor={(d) => d.volume}
              fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
              stroke={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
            />
          </Chart>

          <CrossHairCursor stroke="#6c7080" />
        </ChartCanvas>
      </div>
    );
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
  type: "hybrid",
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
