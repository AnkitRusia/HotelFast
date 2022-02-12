import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

var css = {
  glass: {
    backgroundColor: "rgba(210, 210, 210, 0.1)",
    backdropFilter: `blur(7px)`,
    height: "30vh",
    width: "80vw",
    borderTop: `3px solid rgba(255, 255, 255, 0.5)`,
    borderLeft: `3px solid rgba(255, 255, 255, 0.5)`,
    borderRadius: `5vh`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.5)`,
    marginBottom: "10vh",
    zIndex: "1",
    position: "relative",
    PointerEvent: "none",
  },
};

function LandingPage() {
  const [tableNo, setTableNo] = useState(null);

  const handleTableNoChange = () => {
    setTableNo(prompt("Enter your table number : "));
  };

  if (tableNo) {
    return <Navigate to={`/Customer/${tableNo}`} />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        background: "#161623",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: `linear-gradient(#f00, #f0f)`,
          clipPath: "circle(30% at 86% 60%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: `linear-gradient(#2196f3, #e91e63)`,
          clipPath: "circle(20% at 10% 20%)",
        },
      }}
    >
      <Box sx={css.glass} onClick={handleTableNoChange}>
        <Typography align="center" variant="h3" color="#fff">
          Customer
        </Typography>
      </Box>
      <Link style={{ textDecoration: "none" }} to="/owner">
        <Box sx={css.glass}>
          <Typography align="center" variant="h3" color="#fff">
            Owner
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default LandingPage;
