import React from "react";

// components

import CardLineChart from "../../../components/Cards/CardLineChart";
import CardGrossIncomeChart from "../../../components/Cards/CardGrossIncomeChart";
import CardBarChart from "../../../components/Cards/CardBarChart";
import CardBarGrossIncomeByTypeChart from "../../../components/Cards/CardBarGrossIncomeByTypeChart";
import CardPageVisits from "../../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../../components/Cards/CardSocialTraffic";

// layout for page

import Admin from "../../../layouts/Admin";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="mt-4 flex w-full flex-wrap ">
          <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
            <CardLineChart />
          </div>
          <div className="w-full px-4 xl:w-4/12">
            <CardBarChart />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="mt-4 flex w-full flex-wrap ">
          <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
            <CardGrossIncomeChart />
          </div>
          <div className="w-full px-4 xl:w-4/12">
            <CardBarGrossIncomeByTypeChart />
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-full flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardPageVisits />
        </div>
        <div className="w-full px-4 xl:w-4/12">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
