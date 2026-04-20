import React from "react";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const RatingChart = ({ player }) => {
  if (!player) return null;

  const data = {
    labels: ["Blitz", "Rapid", "Bullet"],
    datasets: [
      {
        label: player.username,
        data: [
          player.stats?.chess_blitz?.last?.rating || 0,
          player.stats?.chess_rapid?.last?.rating || 0,
          player.stats?.chess_bullet?.last?.rating || 0,
        ],
        backgroundColor: ["#00ffcc", "#ffcc00", "#ff4d4d"], // color
      },
    ],
  };

  // ✅ ADD HERE (below data, before return)
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      {/* ✅ UPDATE HERE */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default RatingChart;