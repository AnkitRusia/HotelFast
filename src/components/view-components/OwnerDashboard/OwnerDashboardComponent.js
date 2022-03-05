import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../atomic-components/Navbar";
import MenuCard from "../../functional-components/MenuCard";
import OrderCard from "../../functional-components/OrdersCard";
import { CircularProgress, Snackbar, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StatisticDashboard from "./../StatisticDashboard";

const OwnerDashboardComponent = ({
  menu,
  setCurrentTab,
  currentTab,
  tableOrders,
  loading,
  setLoading,
  setMenuData,
  snackbarOpen,
  setSnackbarOpen,
  getCurrentOrders,
  statisticData,
  getAllStatisticOrders,
  dates,
  setDates,
}) => {
  const renderers = {
    orders: (
      <Grid container>
        {Object.keys(tableOrders).map((key) => (
          <Grid item xs={12} sm={12} md={6} sx={{ padding: "20px" }}>
            <OrderCard
              data={tableOrders[key].items}
              mainData={tableOrders[key]}
              name={key}
              setLoading={setLoading}
              getCurrentOrders={getCurrentOrders}
            />
          </Grid>
        ))}
      </Grid>
    ),
    menu: (
      <Grid container>
        {Object.keys(menu).map((key) => (
          <Grid item xs={12} sm={12} md={6} sx={{ padding: "20px" }}>
            <MenuCard
              data={menu[key]}
              name={key}
              menuData={menu}
              setMenuData={setMenuData}
            />
          </Grid>
        ))}
      </Grid>
    ),
    statistics: (
      <StatisticDashboard
        statisticData={statisticData.currentOrders ?? {}}
        totalAmount={statisticData.totalAmount}
        getAllStatisticOrders={getAllStatisticOrders}
        dates={dates}
        setDates={setDates}
      />
    ),
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar type="Owner" onClick={setCurrentTab} />
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: loading && "center",
          alignItems: loading && "center",
          display: loading && "flex",
          height: "88vh",
        }}
      >
        {loading ? <CircularProgress /> : renderers[currentTab]}
      </Box>
      <Snackbar
        open={snackbarOpen.open}
        onClose={() => setSnackbarOpen({ open: false, data: null })}
        message={snackbarOpen.data}
        action={
          <>
            <Button
              color="secondary"
              size="small"
              onClick={() => setCurrentTab("orders")}
            >
              Orders
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen({ open: false, data: null })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Box>
  );
};

export default OwnerDashboardComponent;
