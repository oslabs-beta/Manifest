import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  scales,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FlareSharp } from '@mui/icons-material';
import annotationPlugin from 'chartjs-plugin-annotation';
import { yellow } from '@mui/material/colors';
import './BarChart.scss';
ChartJS.register(
  annotationPlugin,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

type Props = {
  byteUsage: number;
  softLimit: number | null;
  hardLimit: number | null;
  softLimitString: string;
  hardLimitString: string;
  totalMemString: string;
};

export default function BarChart(props: Props) {
/* Destructuring the props object. */
  const { softLimit, hardLimit } = props;
/* Setting the labels for the bar chart. */
  const labels = [props.totalMemString];
/* Setting the labels for the bar chart. */
  const data = {
    labels: labels,

/* Setting the data for the bar chart. */
    datasets: [
      {
        barPercentage: 0.5,
        data: [props.byteUsage],
        backgroundColor: ['green'],
        borderColor: ['white'],
        borderWidth: 1,
        color: 'white',
      },
    ],
  };

/* Setting the hard limit annotation. */
  const hardLimitAnnotations = {
    hardLimit: {
      type: 'line',
      xMin: props.hardLimit,
      xMax: props.hardLimit,
      borderColor: 'rgb(175, 0, 0)',
      borderWidth: 2,
      label: {
        content: 'Hard Limit ' + props.hardLimitString,
        backgroundColor: 'rgb(175, 0, 0)',
        display: true,
        position: '0%',
      },
    },
  };

/* Setting the soft limit annotation. */
  const softLimitAnnotations = {
    softLimit: {
      type: 'line',
      xMin: props.softLimit,
      xMax: props.softLimit,
      borderColor: 'rgb(234,104,20)',
      borderWidth: 2,
      label: {
        content: 'Soft Limit: ' + props.softLimitString,
        backgroundColor: 'rgb(234,120,20)',
        display: true,
        position: '100%',
      },
    },
  };

  /**
   * It takes two numbers and returns an object with some properties
   * @param {number | null} softLimit - The soft limit.
   * @param {number | null} hardLimit - The hard limit.
   * @returns An object with the softLimitAnnotations and hardLimitAnnotations
   */

  function annotations(
    softLimit: number | null,
    hardLimit: number | null
  ): any {
    let result = {};
    if (softLimit) {
      result = Object.assign(result, softLimitAnnotations);
    }
    if (hardLimit) {
      result = Object.assign(result, hardLimitAnnotations);
    }
    return result;
  }

/* Setting the options for the bar chart. */
  const options = {
    indexAxis: 'y',

    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },

    aspectRatio: 3.75,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: annotations(softLimit, hardLimit),
      },
    },
  };

  return (
    <div className="barGraphWrapper">
      <Bar data={data} options={options} />
    </div>
  );
}
