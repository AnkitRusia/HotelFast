import React, { useRef, useState, useEffect } from "react";
import CustomerDashboardComponent from "./CustomerDashboardComponent";

const CustomerDashboardContainer = () => {
  const socket = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.current = new WebSocket(
      `wss://bbh-api-v1.herokuapp.com/notification/${Math.random()}`
    );
    socket.current.addEventListener("open", function (event) {
      console.log("Connected to the WS Server!");
    });

    socket.current.addEventListener("close", function (event) {
      console.log("Disconnected from the WS Server!");
    });

    socket.current.addEventListener("message", function (event) {
      console.log("Message from Owner ", event.data);
    });
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://bbh-api-v1.herokuapp.com/item/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    setCategories(json.category);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <CustomerDashboardComponent
      socket={socket}
      loading={loading}
      categories={categories}
    />
  );
};

export default CustomerDashboardContainer;
