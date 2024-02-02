import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [34, 45, 345, 7, 87, 74, 4, 45, 7, 4, 47],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [34, 45, 345, 7, 787, 74, 4, 45, 7, 4, 47],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

export const LineChart = ({
  data: dbData,
  value,
}: {
  data: { totalSales: number; date?: number }[];
  value: string;
}) => {
  // value === "Day" && console.log(dbData[0]?.date);
  const labels =
    value === "Day"
      ? dbData.map((d) => `Date : ${d.date}`)
      : dbData.map((_d, i) => `${value} ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: value,
        data: dbData.map((d) => d.totalSales),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full">
      <Line className="w-full" datasetIdKey="id" data={data} />
    </div>
  );
};
