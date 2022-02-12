import React from "react";
import VegIcon from "../../assets/veg.svg";
import NonVegIcon from "../../assets/non-veg.svg";
import { setCartList } from "../../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";

const toUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CartContainer = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartReducer.cartList);
  const socket = new WebSocket(
    "ws://bbh-api-v1.herokuapp.com/notification/owner"
  );

  socket.addEventListener("open", function (event) {
    console.log("Connected to the WS Server!");
  });

  socket.addEventListener("close", function (event) {
    console.log("Disconnected from the WS Server!");
  });

  socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
  });

  const handleOrderClick = () => {
    const tableNo = window.location.pathname.split("/")[2];
    const order = { [tableNo]: cartList };
    socket.send(JSON.stringify(order));
    console.log("CartList sent to WS server", order);
    dispatch(setCartList([]));
    alert("Order Placed!");
  };

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingBottom: "20px",
        }}
      >
        {cartList?.length > 0 &&
          cartList.map((item, id) => (
            <Box
              key={`${item}-${Math.random()}`}
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
                  columnGap: "20px",
                }}
              >
                <img
                  src={item.veg ? VegIcon : NonVegIcon}
                  alt="veg-non-veg"
                  style={{ height: "20px", width: "20px", marginTop: "4px" }}
                />
                <Typography style={{ fontSize: "16px" }}>
                  {item.name}
                </Typography>
              </Box>
              <Box
                key={`${Math.random()}-${id}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography style={{ fontSize: "12px" }}>
                  {toUpperCase(item.type)}
                </Typography>
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button
                    style={{ height: "26px" }}
                    onClick={() => onRemoveClick(item.name, item.type)}
                  >
                    <Typography style={{ fontSize: "26px" }}>-</Typography>
                  </Button>
                  <Button style={{ height: "26px" }} disabled>
                    {item.qty}
                  </Button>
                  <Button
                    style={{ height: "26px" }}
                    onClick={() =>
                      onAddClick(item.name, item.price, item.type, item.veg)
                    }
                  >
                    <Typography style={{ fontSize: "26px" }}>+</Typography>
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={cartList?.length < 1}
          onClick={handleOrderClick}
        >
          Order now
        </Button>
      </Box>
    </Box>
  );
};

export default CartContainer;
