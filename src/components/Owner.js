import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "./Menu";
import Orders from "./Orders";
import OwnerDashboard from "./view-components/OwnerDashboard/OwnerDashboardContainer";

function Owner() {
  const [toShow, SetShow] = React.useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#161623",
        overflowY: "auto",
      }}
    >
      {/* NAVBASR START  */}
      <Box
        className="NavBar"
        sx={{
          minHeight: "100px",
          background: `linear-gradient(90deg, #B78628, #B78628, #B78628, #FCC201, #FCC201)`,
          height: "15vh",
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          top: "0vh",
          left: "0vw",
          zIndex: "2",
        }}
      >
        <Typography
          variant="h3"
          sx={{ flex: "1", margin: "20px" }}
          color="#fff"
        >
          Bhilai Biryani House
        </Typography>
        <Typography variant="h4" sx={{ margin: "20px" }}>
          Owner
        </Typography>
      </Box>
      {/* NAVBASR END  */}

      {/* CARDS FOR CUSTOMER & MENU */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "30vh",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Box
          onClick={() => SetShow(0)}
          sx={{
            height: "90%",
            width: "30%",
            backgroundColor: "#f7e98e",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            transition: "transform 500ms",
            "&:hover": {
              transform: `scale(1.1)`,
            },
          }}
        >
          Menu
        </Box>
        <Box
          onClick={() => SetShow(1)}
          sx={{
            height: "90%",
            width: "30%",
            backgroundColor: "#f7e98e",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            transition: "transform 500ms",
            "&:hover": {
              transform: `scale(1.1)`,
            },
          }}
        >
          Orders
        </Box>
      </Box>
      {/* END OF CODE FOR CUSTOMER & MENU */}
      {/* CONTENT SPACE BOX */}
      <Box
        sx={{
          height: "80vh",
          width: "96%",
          backgroundColor: "#fff",
          marginBottom: "5vh",
        }}
      >
        {toShow ? <Orders /> : <Menu />}
      </Box>
      {/* CONTENT SPACE BOX END*/}
    </Box>
  );
}

export default OwnerDashboard;
