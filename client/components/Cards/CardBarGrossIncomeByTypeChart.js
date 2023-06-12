"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import axiosInstance from "@component/services/axiosInstance";

// function to render products an prices in html divs

export default function CardBarGrossIncomeByTypeChart() {
  useEffect(() => {
    (async () => {
      // Crear endpoint en backend que retorne un array con los ingresos por mes (y demas endpoints de data requerida)
      const { data } = await axiosInstance.get("/admin/grossIncome?year=2023");
      const { ticketsRevenuePerMonth, ordersRevenuePerMonth, travelsRevenuePerMonth } = data;
      const ticketsValues = [];
      const ordersValues = [];
      const travelsValues = [];
      for (let i = 0; i < 12; i++) {
        ticketsValues.push(ticketsRevenuePerMonth[i] || 0);
        ordersValues.push(ordersRevenuePerMonth[i] || 0);
        travelsValues.push(travelsRevenuePerMonth[i] || 0);
      }
      let config = {
        type: "bar",
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
              label: "Tickets",
              backgroundColor: "#EF4444",
              borderColor: "#EF4444",
              data: ticketsValues,
              fill: false,
              barThickness: 8,
            },
            {
              label: "Orders",
              backgroundColor: "#10B981",
              borderColor: "#10B981",
              data: ordersValues,
              fill: false,
              barThickness: 8,
            },
            {
              label: "Travels",
              backgroundColor: "#A855F7",
              borderColor: "#A855F7",
              data: travelsValues,
              fill: false,
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      let ctx = document.getElementById("barGrossIncomeByType-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    })();
  }, []);
  return (
    <>
      <div className='relative mb-6 flex  w-full min-w-0 flex-col break-words rounded bg-white shadow-lg'>
        <div className='mb-0 rounded-t bg-transparent px-4 py-3'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full max-w-full flex-1 flex-grow'>
              <h6 className='mb-1 text-xs font-semibold uppercase text-blueGray-400'>Ingresos</h6>
              <h2 className='text-xl font-semibold text-blueGray-700'>Ingresos brutos por tipo</h2>
            </div>
          </div>
        </div>
        <div className='flex-auto p-4'>
          {/* Chart */}
          <div className='relative h-[350px]'>
            <canvas id='barGrossIncomeByType-chart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
