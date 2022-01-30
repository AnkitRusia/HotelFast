import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button, Paper } from "@mui/material";
import data from "../assets/menu.json";
// import orderJSON from "../assets/order.json";

let MENU1 = {
  veg: {
    column: ["Name", "Half", "Full"],
    data: [
      { name: "Biryani", half: 70, full: 100 },
      { name: "Biryani 1", half: 70, full: 100 },
      { name: "2", half: 70, full: 100 },
      { name: "3", half: 70, full: 100 },
      { name: "4", half: 70, full: 100 },
    ],
  },
  starter: {
    column: ["Name", "Full"],
    data: [
      { name: "paneer chilly", full: 100 },
      { name: "chicken chilly", full: 150 },
    ],
  },
  gravy: {
    column: ["Name", "quat", "half", "full"],
    data: [
      { name: "gravy 1", quat: 25, half: 50, full: 100 },
      { name: "gravy 2", quat: 25, half: 50, full: 100 },
      { name: "gravy 13", quat: 25, half: 50, full: 100 },
    ],
  },
};

const MENU3 = [
  { name: "gravy 1", price: { quat: 25, half: 50, full: 100 } },
  { name: "gravy 2", price: { quat: 25, half: 50, full: 100 } },
  { name: "gravy 13", price: { quat: 25, half: 50, full: 100 } },
  { name: "paneer chilly", price: { full: 100 } },
  { name: "chicken chilly", price: { full: 150 } },
  { name: "Biryani", price: { half: 70, full: 100 } },
  { name: "Biryani 1", price: { half: 70, full: 100 } },
  { name: "2", price: { half: 70, full: 100 } },
  { name: "3", price: { half: 70, full: 100 } },
  { name: "4", price: { half: 70, full: 100 } },
];

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

const SelectPriceButton = ({
  idx,
  name,
  price,
  length,
  onAddClick,
  onRemoveClick,
}) => {
  /* 
    dish name: str,
    price: int,

    action:
    add to main bill
    */
  // console.log(idx, name, price);
  let quantity = "";
  if (length === 1) {
    quantity = "Full -  ";
  } else if (length === 2) {
    if (idx === 0) {
      quantity = "Full -  ";
    } else {
      quantity = "Half -  ";
    }
  } else if (length === 3) {
    if (idx === 2) {
      quantity = "Quarter - ";
    } else if (idx === 1) {
      quantity = "Half - ";
    } else {
      quantity = "Full -  ";
    }
  }

  return (
    <Paper
      className="SelectPriceOption"
      sx={{
        backgroundColor: "rgba(212,175,55,0.3)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: "10px",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        sx={{ borderRadius: "20px", border: "0px" }}
      >
        <RemoveCircleOutlineIcon
          onClick={() => onRemoveClick(name, quantity)}
        />
      </Button>
      <Typography>{quantity}</Typography>
      <Typography>{price}</Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{ borderRadius: "20px", border: "0px" }}
      >
        <AddCircleOutlineIcon
          onClick={() => onAddClick(name, price, quantity)}
        />
      </Button>
    </Paper>
  );
};

const MenuCard = ({ name, veg, prices, onAddClick, onRemoveClick }) => {
  /*
    name: str
    veg: bool
    price: list

    quantity: state
    */
  let foodColor = veg ? "rgb(0,255,0)" : "#FF0000";
  return (
    <Paper
      className="MenuBoxGoldColor"
      elevation={3}
      sx={{
        // minHeight: "100px",
        // width: "92vw",
        // height: "20vh",
        margin: "1vh 1vw",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "rgba(212,175,55,0.3)",
        borderTop: `3px solid rgba(0, 0, 0, 0.4)`,
        borderLeft: `3px solid rgba(0, 0, 0, 0.4)`,
        borderRight: `3px solid rgba(0, 0, 0, 0.4)`,
        borderBottom: `3px solid rgba(0, 0, 0, 0.4)`,
      }}
    >
      <Box
        className="VegIconOuterBox"
        sx={{
          height: "15px",
          width: "15px",
          borderColor: foodColor,
          border: `3px solid ${foodColor}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "1.5vh",
          left: "5%",
        }}
      >
        <Box
          className="VegIconInerBox"
          sx={{
            height: "10px",
            width: "10px",
            backgroundColor: foodColor,
            borderRadius: "10px",
          }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          top: "-15%",
          left: "10%",
          paddingBottom: "20px",
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {prices.map((price, idx) => {
          return (
            <SelectPriceButton
              idx={idx}
              name={name}
              price={price}
              length={prices.length}
              onAddClick={onAddClick}
              onRemoveClick={onRemoveClick}
            />
          );
        })}
      </Box>
    </Paper>
  );
};

function Customer() {
  // let CATAGORY = [
  //   "Veg",
  //   "Main Course",
  //   "non veg",
  //   "gravy",
  //   "papad",
  //   "salad",
  //   "rice",
  //   "biryani",
  // ];

  const [orderList, setOrderList] = React.useState([]);

  const onAddClick = (name, price, quant) => {
    let newOrderList = [...orderList];
    console.log("Add to order list ", newOrderList);
    let type = "";
    if (quant === "Full -  ") {
      type = "full";
    } else if (quant === "Half -  ") {
      type = "half";
    } else if (quant === "Quarter - ") {
      type = "quarter";
    }
    const index = newOrderList.findIndex(
      (item) => item.name === name && item.type === type
    );
    console.log("index ", index);
    if (index !== -1) {
      newOrderList[index]["qty"] += 1;
      setOrderList(newOrderList);
    } else {
      let item = {
        name,
        price,
        type,
        qty: 1,
      };
      newOrderList.push(item);
      setOrderList(newOrderList);
    }
  };

  const onRemoveClick = (name, quant) => {
    let newOrderList = [...orderList];
    let type = "";
    if (quant === "Full -  ") {
      type = "full";
    } else if (quant === "Half -  ") {
      type = "half";
    } else if (quant === "Quarter - ") {
      type = "quarter";
    }
    console.log("Remove from order list ", newOrderList);
    const index = newOrderList.findIndex(
      (item) => item.name === name && item.type === type
    );
    console.log("index ", index);
    if (index !== -1) {
      if (newOrderList[index]["qty"] === 1) {
        delete newOrderList[index];
        setOrderList(newOrderList);
      } else {
        newOrderList[index]["qty"] -= 1;
        setOrderList(newOrderList);
      }
    }
  };

  const handleOrder = () => {
    if (orderList.length === 0) {
      alert("No items in your order");
    } else {
      let tableNo = prompt("Enter your table number : ");
      // let bar = window.confirm("Confirm or deny");
      console.log(tableNo);

      const order = {
        [tableNo]: [...orderList],
      };
      console.log("order", order);
      writeToJSON(order, tableNo);
    }
  };

  const writeToJSON = async (order, tableNo) => {
    fetch(`http://localhost:3000/${tableNo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order[tableNo]),
    }).then((res) => console.log("Data insterted", res.json()));
    // fs.writeFile("../assets/order.json", json, "utf8"); // write it back
  };

  // const downloadFile = async (order) => {
  //   const fileName = "file";
  //   const json = JSON.stringify(order);
  //   const blob = new Blob([json], { type: "application/json" });
  //   const href = await URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = href;
  //   link.download = fileName + ".json";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          minHeight: "100px",
          background: `linear-gradient(90deg, #B78628, #DBA514, #FCC201)`,
          height: "15vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          position: "fixed",
          top: "0vh",
          left: "0vw",
          zIndex: "2",
        }}
      >
        <Typography align="center" variant="h5" color="#fff">
          Welcome to Bhilai Biryani House
        </Typography>
      </Box>
      <Box sx={{ height: "16vh" }} />
      <Box sx={{ height: "10vh" }}>
        <Button
          varient="contained"
          sx={{
            margin: "1vh 1vw",
            position: "fixed",
            right: "1vw",
            height: "25px",
            width: "25px",
            backgroundColor: "yellow",
            borderRadius: "12px",
          }}
          onClick={() => handleOrder()}
        >
          Order
        </Button>
      </Box>
      {Object.keys(data).map((key) => {
        return (
          <>
            <MenuHeadings header={key} />
            {Object.keys(data[key]).map((item) => {
              console.log(data[key][item]);

              return (
                <MenuCard
                  name={data[key][item].name}
                  veg={1}
                  prices={data[key][item].price}
                  onAddClick={onAddClick}
                  onRemoveClick={onRemoveClick}
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
}

const MenuHeadings = ({ header }) => (
  <div
    style={{
      display: "flex",
      width: "200px",
      height: "60px",
      background: "maroon",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography style={{ fontSize: "18px", color: "#fff" }}>
      {header}
    </Typography>
  </div>
);

export default Customer;
