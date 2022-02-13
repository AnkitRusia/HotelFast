import React from "react";
import Logo from "../../../assets/logo.svg";
import { Box, Typography, CircularProgress } from "@mui/material";
import AccordionComponent from "../../atomic-components/Accordion";
import CartContainer from "../../functional-components/CartContainer";
import Accordion from "../../atomic-components/CustomAccordion";

const CategoriesContainer = ({ categories }) => {
  return (
    <Box>
      {categories.length > 0 &&
        categories.map((category, id) => (
          <Box
            key={`box-${Math.random()}`}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            <Accordion title={category} />
          </Box>
        ))}
    </Box>
  );
};

const CustomerDashboardComponent = ({ loading, categories }) => {
  const scrollToTop = () => {
    let rootElement = document.documentElement;
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        background: "RGB(214, 160, 22, 0.4)",
      }}
    >
      <Box
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          columnGap: "15px",
          background: "linear-gradient(90deg, #B78628, #DBA514, #FCC201)",
        }}
      >
        <img src={Logo} alt="logo" style={{ width: "40px", height: "40px" }} />
        <Typography align="center" color="#fff" style={{ fontSize: "1.2rem" }}>
          Welcome to Bhilai Biryani House
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingTop: "50px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(214, 160, 22, 0.3)",
        }}
      >
        <AccordionComponent title="My Orders">
          <CartContainer />
        </AccordionComponent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "20px 0 20px 0",
            borderBottom: "1px solid #dedede",
          }}
        >
          <Typography style={{ fontSize: "1.5rem" }}>Categories</Typography>
        </Box>
      </Box>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "44px",
          height: "44px",
          position: "fixed",
          bottom: "60px",
          right: "10px",
          zIndex: "99",
          borderRadius: "50%",
          color: "#fff",
          cursor: "pointer",
          background: `linear-gradient(90deg, #B78628, #DBA514, #FCC201)`,
        }}
        onClick={scrollToTop}
      >
        Top
      </div>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "420px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={25} />
        </Box>
      ) : (
        <CategoriesContainer categories={categories} />
      )}
    </Box>
  );
};

export default CustomerDashboardComponent;
