import React from "react";
import { Box, Typography } from "@mui/material";

function OrderSuccess() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Order Successful</Typography>
      <Typography>Thank you for your order!</Typography>
      <Typography style={{ textAlign: "center" }}>
        Kindly scan the QR again, if you wish to order again.
      </Typography>
    </Box>
  );
}

export default OrderSuccess;
