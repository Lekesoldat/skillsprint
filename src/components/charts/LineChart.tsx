import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

const meMockData = [
  {
    points: 0,
    time: new Date("2023-02-02 09:00:00"),
  },

  {
    points: 20,
    time: new Date("2023-02-02 09:10:00"),
  },
  {
    points: 45,
    time: new Date("2023-02-02 09:20:00"),
  },
  {
    points: 60,
    time: new Date("2023-02-02 09:30:00"),
  },
  {
    points: 85,
    time: new Date("2023-02-02 09:40:00"),
  },
  {
    points: 100,
    time: new Date("2023-02-02 09:50:00"),
  },
  {
    points: 120,
    time: new Date("2023-02-02 10:00:00"),
  },
  {
    points: 150,
    time: new Date("2023-02-02 10:10:00"),
  },
  {
    points: 170,
    time: new Date("2023-02-02 10:20:00"),
  },
  {
    points: 190,
    time: new Date("2023-02-02 10:30:00"),
  },
  {
    points: 210,
    time: new Date("2023-02-02 10:40:00"),
  },
  {
    points: 230,
    time: new Date("2023-02-02 10:50:00"),
  },
  {
    points: 275,
    time: new Date("2023-02-02 11:00:00"),
  },
];

const classMockData = [
  {
    points: 0,
    time: new Date("2023-02-02 09:00:00"),
  },
  {
    points: 5,
    time: new Date("2023-02-02 09:10:00"),
  },
  {
    points: 20,
    time: new Date("2023-02-02 09:20:00"),
  },
  {
    points: 40,
    time: new Date("2023-02-02 09:30:00"),
  },
  {
    points: 90,
    time: new Date("2023-02-02 09:40:00"),
  },
  {
    points: 110,
    time: new Date("2023-02-02 09:50:00"),
  },
  {
    points: 150,
    time: new Date("2023-02-02 10:00:00"),
  },
  {
    points: 160,
    time: new Date("2023-02-02 10:10:00"),
  },
  {
    points: 170,
    time: new Date("2023-02-02 10:20:00"),
  },
  {
    points: 190,
    time: new Date("2023-02-02 10:30:00"),
  },
  {
    points: 200,
    time: new Date("2023-02-02 10:40:00"),
  },
  {
    points: 210,
    time: new Date("2023-02-02 10:50:00"),
  },
  {
    points: 235,
    time: new Date("2023-02-02 11:00:00"),
  },
];

const labels = meMockData.map((data) => format(data.time, "HH:mm"));

const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Deg",
      data: meMockData.map((data) => data.points),
      borderColor: "rgb(34, 202, 148)",
      backgroundColor: "#FFFFFF",
    },
    {
      label: "Klassen",
      data: classMockData.map((data) => data.points),
      borderColor: "rgb(254, 81, 80)",
      backgroundColor: "#FFFFFF",
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      text: "Poeng Over Tid",
    },
  },
};

export const LineChart = () => {
  return <Line data={data} options={options} />;
};
