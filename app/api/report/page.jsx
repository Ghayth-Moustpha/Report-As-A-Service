'use client'; // Required for client-side rendering

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import reportData from './data/reportData.json'; // Import the JSON file

const Report = () => {
  const chartRef = useRef(null);
  const data = reportData.data.report.reportAndData.reportData; // Extract relevant data

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const dates = data.periodsData[0].capturedAndSalesData.capturedData[0].map(
      (entry) => entry.date
    );
    const inCounts = data.periodsData[0].capturedAndSalesData.capturedData[0].map(
      (entry) => entry.inCount
    );
    const outCounts = data.periodsData[0].capturedAndSalesData.capturedData[0].map(
      (entry) => entry.outCount
    );

    const options = {
      title: {
        text: 'In and Out Count Over Time',
        textStyle: {
          color: '#333',
        },
        left: 'center',
      },
      tooltip: {},
      legend: {
        data: ['In Count', 'Out Count'],
        top: 30,
      },
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'In Count',
          type: 'bar', // Changed to 'bar' for bar chart
          data: inCounts,
          itemStyle: {
            color: '#4f46e5', // Tailwind indigo-700
          },
        },
        {
          name: 'Out Count',
          type: 'bar', // Changed to 'bar' for bar chart
          data: outCounts,
          itemStyle: {
            color: '#f97316', // Tailwind orange-500
          },
        },
      ],
    };

    chart.setOption(options);

    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        {reportData.data.report.reportAndData.report.name}
      </h1>
      <div ref={chartRef} className="w-full h-96"></div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 mb-6 shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              In Count
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Out Count
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.periodsData[0].capturedAndSalesData.capturedData[0].map((entry, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 whitespace-nowrap">{entry.date}</td>
              <td className="py-2 px-4 whitespace-nowrap">{entry.inCount}</td>
              <td className="py-2 px-4 whitespace-nowrap">{entry.outCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bar Chart */}
    </div>
  );
};

export default Report;
