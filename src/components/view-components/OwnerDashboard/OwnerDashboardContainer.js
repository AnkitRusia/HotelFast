import React, { useState } from "react";
import menuData from "../../../assets/menu.json";
import OwnerDashboardComponent from "./OwnerDashboardComponent";
import orders from "../../../assets/order.json";

const OwnerDashboardContainer = () => {
  const [currentTab, setCurrentTab] = useState("menu");

  const formatter = (data) => {
    const ret = {};
    Object.keys(data).forEach((key) => {
      if (data[key].length > 0) ret[key] = data[key];
    });
    return ret;
  };

  const tableOrders = formatter(orders);

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
