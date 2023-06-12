"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import axiosInstance from "@component/services/axiosInstance";

export default function CardLineChart() {
  useEffect(() => {
    (async () => {
      const { data: userRecords } = await axiosInstance.get("/admin/userRecords?year=2023");

      const { usersRecordsPerMonth } = userRecords;
      const userRecordsValues = [];
      for (let i = 0; i < 12; i++) {
        userRecordsValues.push(usersRecordsPerMonth[i] || 0);
      }

      var config = {
        type: "line",
        data: {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: userRecordsValues,
              fill: false,
            },
            {
              label: new Date().getFullYear() - 1,
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: [4, 6, 8, 7, 5, 6, 8, 4, 6, 8, 7, 5, 6, 8],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    })();
  }, []);
  return (
    <>
      <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-blueGray-700 shadow-lg'>
        <div className='mb-0 rounded-t bg-transparent px-4 py-3'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full max-w-full flex-1 flex-grow'>
              <h6 className='mb-1 text-xs font-semibold uppercase text-blueGray-100'>Usuarios</h6>
              <h2 className='text-xl font-semibold text-white'>Cantidad de registros</h2>
            </div>
          </div>
        </div>
        <div className='flex-auto p-4'>
          {/* Chart */}
          <div className='relative h-[350px]'>
            <canvas id='line-chart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
