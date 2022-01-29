import React, { useState } from "react";
import menuData from "../../../assets/menu.json";
import OwnerDashboardComponent from "./OwnerDashboardComponent";

const OwnerDashboardContainer = () => {
  const [currentTab, setCurrentTab] = useState("menu");

  const tableOrders = {
    1: [
      {
        name: "biryani",
        type: "full",
        price: 300,
        qty: 2,
      },
    ],
    2: [
      {
        name: "biryani",
        type: "full",
        price: 300,
        qty: 2,
      },
      {
        name: "dal fry",
        type: "half",
        price: 300,
        qty: 2,
      },
    ],
  };

  return (
    <OwnerDashboardComponent
      menu={menuData}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tableOrders={tableOrders}
    />
  );
};

export default OwnerDashboardContainer;
