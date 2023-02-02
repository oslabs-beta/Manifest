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
import './doughnut.scss';
import { formatBytes } from '../../formattingBytes/formattingBytes';

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

interface data {
  labels: string[];
  datasets: datasets[];
}

interface props {
  containerNames: string[];
  containerMemPerc: number[];
  maxMem?: any;
  darkMode: boolean;
  className: string;
  id: string;
}

export default function DoughnutChart(props: props) {
  const { containerNames, containerMemPerc, maxMem, darkMode } = props;
  // console.log(MemPerc);
  const [data, setData] = React.useState<data>({
    labels: [''],
    datasets: [
      {
        label: 'Percentage',
        data: [0],
        backgroundColor: [''],
        borderColor: ['rgba(0, 0, 0, 0.54)'],
        color: '#FFF',
      },
    ],
  });

  useEffect(() => {
    let sum = containerMemPerc.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);

    if (maxMem) {
      setData({
        labels: ['Remaining Memory', ...containerNames],
        datasets: [
          {
            label: 'Raw Memory',
            data: [maxMem - sum, ...containerMemPerc],
            backgroundColor: ['whitesmoke'],
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: color,
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
            backgroundColor: [''],
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: color,
          },
        ],
      });
    }
  }, [containerMemPerc, maxMem, darkMode]);

  let title = 'Memory Usage Ratio per Container';
  if (maxMem) {
    title = 'Memory Usage by Containers';
  }
  let color = 'black';
  if (darkMode) {
    color = 'white';
  }

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
      colors: {
        forceOverride: true,
        enabled: true,
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: color,
          font: {
            size: 12,
            lineHeight: 1.2,
          },
          padding: 15,
        },
      },
      title: {
        fullSize: true,
        color: color,
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
    <div className={darkMode ? 'gaugeChartDark' : 'gaugeChart'}>
      <Doughnut
        className="totalMemUsageChart"
        data={data}
        options={options}
        // plugins={}
      />
    </div>
  );
}

// const textCenter = {
//   id: 'textCenter',
//   beforeDatasetsDraw(chart, args, pluginOptions) {
//     const { ctx, data } = chart;

//     const number = data.datasets[0].data[0];

//     ctx.save();
//     ctx.font = 'bold 30px sans-serif';
//     ctx.fillStyle = 'white';
//     ctx.textAlign = 'center';
//     ctx.textBaseLine = 'middle';
//     ctx.fillText(
//       `${(Math.round(number * 100) / 100).toFixed(2)}%`,
//       chart.getDatasetMeta(0).data[0].x,
//       chart.getDatasetMeta(0).data[0].y
//     );
//   },
// };

// console.log(options.plugins.title);
