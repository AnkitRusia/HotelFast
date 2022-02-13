import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CategoryItem from "../atomic-components/CategoryItem";

function CategoryItemsList({ category }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch(
        `https://bbh-api-v1.herokuapp.com/item/category/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await data.json();
      setItems(json);
      setLoading(false);
    };
    fetchData();
    return () => {
      setItems([]);
    };
  }, [category]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={16} />
      </Box>
    );
  }

  if (items && items.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "18px" }}>No items in stock.</Typography>
      </Box>
    );
  }

  return (
    <div>
      {items &&
        items.map((item, id) => (
          <CategoryItem key={`box-${Math.random()}`} item={item} />
        ))}
    </div>
  );
}

export default CategoryItemsList;
