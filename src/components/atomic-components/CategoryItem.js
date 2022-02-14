import React, { useCallback } from "react";
import VegIcon from "../../assets/veg.svg";
import NonVegIcon from "../../assets/non-veg.svg";
import { setCartList } from "../../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";

const toUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function CategoryItem({ item }) {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartReducer.cartList);

  const itemTypes = useCallback(() => {
    let types = [];
    if (item && item.price && item.price.length === 1) {
      types.push("full");
    } else if (item && item.price && item.price.length === 2) {
      types.push("full", "half");
    } else if (item && item.price && item.price.length === 3) {
      types.push("full", "half", "quarter");
    }
    return types;
  }, [item]);

  const getItemFromCartList = useCallback(
    (name, type) => {
      let item = null;
      if (cartList && cartList.length > 0) {
        item = cartList.find(
          (item) => item.name === name && item.type === type
        );
      }
      return item;
    },
    [cartList]
  );

  const onAddClick = (name, price, type, veg) => {
    let newCartList = [...cartList];
    const index = newCartList.findIndex(
      (item) => item.name === name && item.type === type
    );
    if (index !== -1) {
      newCartList[index]["qty"] += 1;
      dispatch(setCartList(newCartList));
    } else {
      let item = {
        name,
        price,
        type,
        veg,
        qty: 1,
      };
      newCartList.push(item);
      dispatch(setCartList(newCartList));
    }
  };

  const onRemoveClick = (name, type) => {
    let newCartList = [...cartList];
    const index = newCartList.findIndex(
      (item) => item.name === name && item.type === type
    );
    if (index !== -1) {
      if (newCartList[index]["qty"] === 1) {
        newCartList.splice(index, 1);
        dispatch(setCartList(newCartList));
      } else {
        newCartList[index]["qty"] -= 1;
        dispatch(setCartList(newCartList));
      }
    }
  };

  if (item && item.inStock === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          rowGap: "10px",
          columnGap: "10px",
          alignItems: "center",
          border: "1px solid #fff",
          padding: "20px 0",
          flexWrap: "wrap",
          borderBottom: "1px solid #dedede",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            columnGap: "20px",
            marginLeft: "20px",
          }}
        >
          <img
            src={item.veg ? VegIcon : NonVegIcon}
            alt="veg-non-veg"
            style={{ height: "20px", width: "20px" }}
          />
          <Typography style={{ fontSize: "20px" }}>{item.name}</Typography>
        </Box>
        {itemTypes()?.length > 0 &&
          itemTypes().map((type, id) => (
            <Box
              key={`type-${Math.random()}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontSize: "16px" }}>
                {`${toUpperCase(type)} - ₹ ${item.price[id]}`}
              </Typography>
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
              >
                <Button
                  style={{ height: "26px" }}
                  onClick={() => onRemoveClick(item.name, type)}
                >
                  <Typography style={{ fontSize: "26px" }}>-</Typography>
                </Button>
                <Button style={{ height: "26px" }} disabled>
                  {getItemFromCartList(item.name, type)?.qty || 0}
                </Button>
                <Button
                  style={{ height: "26px" }}
                  onClick={() =>
                    onAddClick(item.name, item.price[id], type, item.veg)
                  }
                >
                  <Typography style={{ fontSize: "26px" }}>+</Typography>
                </Button>
              </ButtonGroup>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default CategoryItem;
