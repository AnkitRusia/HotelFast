import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../atomic-components/Navbar";
import MenuCard from "../../functional-components/MenuCard";
import OrderCard from "../../functional-components/OrdersCard";
import { useReactToPrint } from "react-to-print";

const OwnerDashboardComponent = ({
  menu,
  setCurrentTab,
  currentTab,
  tableOrders,
}) => {
  const ref = React.useRef(null);
  const changer = (reference) => {
    ref.current = reference;
  };

  const handleClickOnPrint = useReactToPrint({
    content: () => ref?.current?.current,
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar type="Owner" onClick={setCurrentTab} />
      <Box sx={{ flexGrow: 1 }}>
        {currentTab === "orders" ? (
          <Grid container>
            {Object.keys(tableOrders).map((key) => (
              <Grid item xs={12} sm={12} md={6} sx={{ padding: "20px" }}>
                <OrderCard
                  data={tableOrders[key]}
                  name={key}
                  handleClickOnPrint={handleClickOnPrint}
                  changer={changer}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container>
            {Object.keys(menu).map((key) => (
              <Grid item xs={12} sm={12} md={6} sx={{ padding: "20px" }}>
                <MenuCard data={menu[key]} name={key} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default OwnerDashboardComponent;
