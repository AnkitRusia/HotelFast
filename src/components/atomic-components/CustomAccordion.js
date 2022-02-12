import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import CategoryItemsList from "../functional-components/CategoryItemsList";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "52.8px",
    width: "80vw",
    cursor: "pointer",
    borderRadius: "5px 5px 0 0",
    background: "#fff",
  },
  rootClosed: {
    display: "flex",
    height: "52.8px",
    width: "80vw",
    borderRadius: "5px",
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 1.25px 1px -1px black",
  },
  titleBar: {
    display: "flex",
    padding: "0 20px",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionBody: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    borderRadius: "0 0 5px 5px",
    background: "#fff",
  },
  accordionBodyHidden: {
    display: "none",
  },
}));

function CustomAccordion({ title, children }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div
        className={expanded ? classes.root : classes.rootClosed}
        onClick={handleAccordion}
      >
        <div className={classes.titleBar}>
          <Typography style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {title}
          </Typography>
          <ExpandMoreIcon />
        </div>
      </div>
      <div
        className={
          expanded ? classes.accordionBody : classes.accordionBodyHidden
        }
      >
        <CategoryItemsList category={title} />
      </div>
    </div>
  );
}

export default CustomAccordion;
