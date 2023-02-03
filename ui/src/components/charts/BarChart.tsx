import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  scales,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import './BarChart.scss';
import type { ChartOptions } from 'chart.js';
/************************* */
import { currentTextColor } from '../../getCurrentTextColor';
//currentTextColor is based off of current light/dark mode theme set in docker desktop settings. 
//Since ChartJS needs a color property passed in for the labels, we need to get this current themed color to apply it to our graphs
/************************/


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

type dataset = [{
    barPercentage: number,
    data: number[],
    backgroundColor: string[],
    borderRadius: number,
    borderSkipped: boolean,
  }]

type Data = {
  labels: string[],

  datasets: dataset,
};

/**
 * If the byteUsage is less than the softLimit, then the red value of the RGB color is set to the
 * percentage of the softLimit that the byteUsage is. Creates a gradient from green to yellow
 * proportional to bar length
 * If the byteUsage is greater than the softLimit, then the green value of the RGB color is set to
 * the percentage of the softLimit that the byteUsage is. Creates a gradient from yellow to red
 * proportional to bar length
 * 
 * @param {number} byteUsage - The number of bytes used by the container.
 * @param {number | null} softLimit - The soft limit set for the container.
 * @param {number | null} hardLimit - The maximum amount of bytes allowed to be used.
 * @returns A string of the form 'rgb(r, g, b)' where r, g, and b are integers between 0 and 255.
 */
const getGradientColor = (byteUsage: number, softLimit: number | null, hardLimit: number | null): string => {

  // rgb is declared as yellow and modified accordingly
  let rgb: number[] = [255, 255, 0]

  // If a soft limit is not set for a given container, use half of the hard limit
  if (!softLimit) {
    if (hardLimit) softLimit = hardLimit / 2;
    // If hard limit is also not set, bar will be green
    else return 'rgb(255, 0, 0)';
  }

  if (byteUsage < softLimit) {
    // If byte usage is less than the soft limit, reduce the red value of rgb
    //  proportional to the percentage of bytes used to soft limit
    //    - Reducing red value makes the bar appear more green
    const perc: number = byteUsage / softLimit;
    rgb[0] = Math.floor(rgb[0] * perc);
  } else if (byteUsage > softLimit) {
    // If byte usage is above the soft limit, reduce the green value of rgb
    //  proportional to the percentage of bytes used between soft and hard limits
    //    - Reducing green value makes the bar appear more red
    // Or, if a hard limit is not set, bar will be yellow
    if (hardLimit) {
      const perc = softLimit / (hardLimit - softLimit);
      rgb[1] = Math.floor(rgb[1] * perc);
    } else return 'rgb(255, 255, 0)';
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/* Creating a bar chart with the data that is passed in from the props. */
export default function BarChart(props: Props) {
 
  // Destructuring the props object.
  const { softLimit, hardLimit } = props;
  // Label for bar chart (One label, appears on left before bar)
  const labels = [props.totalMemString];
  const data = {
    labels: labels,

    datasets: [{
      // Width of bar chart (height because it is horizontal)
      barPercentage: 0.4,
      // Data of bar, how many bytes are being used (controls length of bar)
      data: [props.byteUsage],
      // Sets bar color, used in conjunction with getGradientColor function
      // to dynamically change the color of the bar depending on byte usage
      backgroundColor: [
        `${getGradientColor(props.byteUsage, props.softLimit, props.hardLimit)}`,
      ],
      // Round edges for a nice clean look
      borderRadius: 10,
      // Do not make left edge squared
      borderSkipped: false,
      // borderColor: [
      //   'white',
      // ],
      // borderWidth: 1,
      // color: 'white',
    }]
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
  ){
    let result = {};
    if (softLimit) {
      result = Object.assign(result, softLimitAnnotations);
    }
    if (hardLimit)  {
      result = Object.assign(result, hardLimitAnnotations);
    }
    return result;
  }
  //this object holds our annotations for our chart.js plugin to markup the graph with the hard and soft limits
  const annotation = annotations(softLimit, hardLimit);


/* Setting the options for the bar chart. */
  

  const options: ChartOptions<'bar'> = {
    // Horizontal "progress bar" style
    indexAxis: 'y',

    scales: {
      x: {
        // Remove bottom scale
        display: false,
      },
      y: {
        ticks: {
          color: currentTextColor,
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
        annotations: annotation
      }
    },
  };

 

  return (
    <div 
      className="barGraphWrapper" 
      style = {{
        boxShadow: `0px 0px 5px ${currentTextColor}`,
        borderColor: `${currentTextColor}`
        }}>
      <Bar data={data} options={options} />
    </div>
  );
}
