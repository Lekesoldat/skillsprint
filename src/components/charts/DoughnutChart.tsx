import type { ChartData, ChartOptions } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data: ChartData<"doughnut"> = {
  labels: ["Riktig", "Feil"],
  datasets: [
    {
      data: [10, 5],
      backgroundColor: ["rgba(34, 202, 148, 0.6)", "rgba(254, 81, 80, 0.6)"],
      borderColor: ["#00000", "#00000"],
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
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
      text: "Forsøk",
    },
  },
};

export const DoughnutChart = () => {
  return <Doughnut data={data} options={options} />;
};
