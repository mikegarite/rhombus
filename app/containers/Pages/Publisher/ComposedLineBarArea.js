import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import ThemePallete from 'enl-api/palette/themePalette';
import blue from '@material-ui/core/colors/blue';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import data1 from './sampleData';

const styles = {
  chartFluid: {
    width: '100%',
    minWidth: 500,
    height: 450
  }
};

const theme = createMuiTheme(ThemePallete.yellowCyanTheme);
const color = ({
  main: theme.palette.primary.main,
  maindark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  third: blue[500],
});

function ComposedLineBarArea(props) {
  const { classes, data } = props;
  let chartData = [];
  for (var key in data) {
      if (data.hasOwnProperty(key)) {
          let d = {};
          d.name = key;
          d.uv = data[key];
          chartData.push(d);
      }
  }
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <ComposedChart
          width={800}
          height={450}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" tickLine={false} />
          <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <CartesianAxis vertical={false} />
          <Area type="monotone" dataKey="amt" fillOpacity="0.8" fill={color.main} stroke="none" />
          <Bar dataKey="pv" barSize={60} fillOpacity="0.8" fill='#6BA302' />
          <Line type="monotone" dataKey="uv" strokeWidth={4} stroke='#1755d7' />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

ComposedLineBarArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedLineBarArea);
