import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Name of Dish",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({
  name,
  cardRef,
  changer,
  handleClickOnPrint,
}) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {name}
      </Typography>
      <Button
        onClick={() => {
          changer(cardRef);
          handleClickOnPrint();
        }}
        variant="contained"
      >
        Print
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function OrderCard({ data, name, handleClickOnPrint, changer }) {
  // Avoid a layout jump when reaching the last page with empty rows.

  console.log("menu 2", data);

  let total_price = 0;
  data.forEach((value) => {
    total_price += value.price;
  });

  const cardRef = React.useRef(null);
  return (
    <Box sx={{ width: "100%" }} ref={cardRef}>
      <Paper elevation={11} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          name={name}
          handleClickOnPrint={handleClickOnPrint}
          changer={changer}
          cardRef={cardRef}
        />
        <TableContainer sx={{ maxHeight: "600px", minHeight: "600px" }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead rowCount={data.length} />
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type ?? "--"}</TableCell>
                    <TableCell align="right">{row.qty ?? "--"}</TableCell>
                    <TableCell align="right">{row.price ?? "--"}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{ fontWeight: "bolder" }}
                >
                  Total
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                  {total_price}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
