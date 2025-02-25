import React, { useState, useEffect } from "react";
import { DatePicker, Button, Spin, Row, Col } from "antd";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import dayjs from "dayjs";
import RevenueService from "services/revenueService";

Chart.register(...registerables);

const RevenueChart = () => {
  // Set default dates: one month ago as start date and today as end date
  const defaultStartDate = dayjs().subtract(1, "month");
  const defaultEndDate = dayjs();

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const fetchRevenueData = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    setLoading(true);
    try {
      const data = await RevenueService.getRevenueReport(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      );

      // Process the response
      const dates = Object.keys(data); // Extract the dates
      const revenues = dates.map((date) => data[date].revenue);
      const costs = dates.map((date) => data[date].cost);
      const profits = dates.map((date) => data[date].profit);

      // Prepare chart data
      setChartData({
        labels: dates, // Dates for x-axis
        datasets: [
          {
            label: "Revenue",
            data: revenues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
          {
            label: "Cost",
            data: costs,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
          {
            label: "Profit",
            data: profits,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch revenue data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch data on mount with default dates
    fetchRevenueData();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Revenue Chart</h2>
      <Row gutter={16}>
        <Col>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            placeholder="Start Date"
          />
        </Col>
        <Col>
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            placeholder="End Date"
          />
        </Col>
        <Col>
          <Button type="primary" onClick={fetchRevenueData}>
            Fetch Revenue
          </Button>
        </Col>
      </Row>
      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}
      {chartData && (
        <div style={{ marginTop: "20px" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Revenue, Cost, and Profit Analysis",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
