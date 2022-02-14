import React, { useState } from "react";
import OwnerDashboardComponent from "./OwnerDashboardComponent";

const OwnerDashboardContainer = () => {
  const [currentTab, setCurrentTab] = useState("menu");

  const [menuLoading, setMenuLoading] = React.useState(false);
  const [menuData, setMenuData] = React.useState({});

  const formatPureData = (data) => {
    const keylist = {};
    data.forEach((menuItem) => {
      if (!keylist[menuItem.category])
        keylist[menuItem.category] = data.filter(
          (menuItems) => menuItems.category === menuItem.category
        );
    });
    return keylist;
  };

  const [orderData, setOrderData] = React.useState({});

  const fetchMenuData = React.useCallback(() => {
    setMenuLoading(true);
    fetch("https://bbh-api-v1.herokuapp.com/item")
      .then((res) => res.json())
      .then((res) => {
        setMenuData(formatPureData(res));
        setMenuLoading(false);
      })
      .catch((err) => {
        console.log("error in menu data", err);
        setMenuData({});
        setMenuLoading(false);
      });
  }, [setMenuLoading, setMenuData]);

  const getAllOrders = React.useCallback(() => {
    setMenuLoading(true);
    fetch(`https://bbh-api-v1.herokuapp.com/order/tables`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const currentOrders = {};
          res.forEach((item) => {
            currentOrders[item.tablenumber] = item;
          });
          setOrderData(currentOrders);
        }
        setMenuLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMenuLoading(false);
      });

    setCurrentTab("orders");
  }, [setOrderData, setCurrentTab]);

  React.useEffect(() => {
    if (currentTab === "orders") {
      getAllOrders();
    } else {
      fetchMenuData();
    }
  }, [currentTab, fetchMenuData, getAllOrders]);

  const socket = React.useRef(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState({
    open: false,
    data: null,
  });

  React.useEffect(() => {
    socket.current = new WebSocket(
      "wss://bbh-api-v1.herokuapp.com/notification/owner"
    );
    socket.current.addEventListener("open", function (event) {
      console.log("Connected to the WS Server!");
    });

    // Connection closed
    socket.current.addEventListener("close", function (event) {
      console.log("Disconnected from the WS Server!");
    });

    // Listen for messages
    socket.current.addEventListener("message", function (event) {
      setSnackbarOpen({ open: true, data: `Table Order at: ${event.data}` });
    });
  }, []);

  return (
    <OwnerDashboardComponent
      menu={menuData}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tableOrders={orderData}
      loading={menuLoading}
      setMenuData={setMenuData}
      snackbarOpen={snackbarOpen}
      setSnackbarOpen={setSnackbarOpen}
      getCurrentOrders={getAllOrders}
    />
  );
};

export default OwnerDashboardContainer;
