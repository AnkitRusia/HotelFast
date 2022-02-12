import React, { useState, useEffect } from "react";
import CustomerDashboardComponent from "./CustomerDashboardComponent";

const CustomerDashboardContainer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <CustomerDashboardComponent loading={loading} categories={categories} />
  );
};

export default CustomerDashboardContainer;
