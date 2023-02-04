import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Colors,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.scss';
import { formatBytes } from '../../formattingBytes/formattingBytes';
/************************* */
import { currentTextColor } from '../../getCurrentTextColor';
//currentTextColor is based off of current light/dark mode theme set in docker desktop settings. 
//Since ChartJS needs a color property passed in for the labels, we need to get this current themed color to apply it to our graphs
/************************/


ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

type containerData = {
  ID: string;
  Name: string;
  MemPerc: string;
  MemUsage: string;
};

type datasets = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  color: string;
};

type data = {
  labels: string[];
  datasets: datasets[];
}

type props = {
  containerNames: string[];
  containerMemPerc: number[];
  maxMem?: any;
  className: string;
  id: string;
}

const backgroundColors = [
  '#819FB3',
  'green',
  '#D4D4FF',
  'blue',
  '#D7F4F3',
  '#9BCFB6',
  'orange',
  '#FFF0D9',
  'yellow',
  '#F3E7BE',
  'purple',
  '#F8CDE8',
  'red',
  '#D68D96',
  '#DFB1E6',
  '#996D99',
  '#003f5c',
  '#58508d',
  '#bc5090',
];

export default function DoughnutChart(props: props): JSX.Element {

  const { containerNames, containerMemPerc, maxMem } = props;
  const [data, setData] = React.useState<data>({
    labels: [''],
    datasets: [
      {
        label: 'Percentage',
        data: [0],
        backgroundColor: [''],
        borderColor: ['rgba(0, 0, 0, 0.54)'],
        color: currentTextColor,
      },
    ],
  });

  useEffect(() => {
    /**************
    This is to find the sum of all memory currently being used by containers
    ***************/
    let sum = containerMemPerc.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
    /**************
    There are two doughnut charts, one for the memory usage of all containers with remaining memory,
    And one for memory usage ratio per container.
    Memory usage of all containers gets passed a 'maxMem' prop.
    Checking if 'maxMem' props exists, if so
    Set the data state variable to include sum and max memory.
    ***************/
    if (maxMem) {
      setData({
        labels: ['Remaining Memory', ...containerNames],
        datasets: [
          {
            label: 'Raw Memory',
            data: [maxMem - sum, ...containerMemPerc],
            backgroundColor: ['whitesmoke', ...backgroundColors],
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: currentTextColor,
          },
        ],
      });
    } else {
      setData({
        labels: containerNames,
        datasets: [
          {
            label: 'Raw Memory',
            data: containerMemPerc,
            backgroundColor: backgroundColors,
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: currentTextColor,
          },
        ],
      });
    }
  }, [containerMemPerc, maxMem]);

  /**************
  Setting the title to the appropriate doughnut chart depending on whether 'maxMem' prop exists
  ***************/
  let title: string = 'Memory Usage Ratio per Container';
  if (maxMem) {
    title = 'Memory Usage by Containers';
  }
 

  /**************
  From Chart.js: https://www.chartjs.org/docs/latest/general/options.html
  This object describes how the chart will look. 
  ***************/
  const options: any = {
    tooltip: {
      position: 'nearest',
    },
    layout: {},
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            tooltipItem.formattedValue = formatBytes(tooltipItem.raw, '');
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: currentTextColor,
          font: {
            size: 12,
            lineHeight: 1.2,
          },
          padding: 15,
        },
      },
      title: {
        fullSize: true,
        color: currentTextColor,
        display: true,
        position: 'top',
        text: title,
        padding: {
          top: 30,
          bottom: 0,
        },
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className='gaugeChart'
    style = {{
      boxShadow: ` 0px 0px 6px 1px ${currentTextColor}`,
      borderColor: `${currentTextColor}`
    }}
    >
      <Doughnut
        className="totalMemUsageChart"
        data={data}
        options={options}
      />
    </div>
  );
}