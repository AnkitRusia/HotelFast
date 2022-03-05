import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Logo from "../../assets/logo2.svg";

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
    label: "Item Price",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Total Price",
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
            sx={{ fontWeight: "bolder" }}
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
  payWay,
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
        sx={{ marginLeft: 3, marginRight: 1 }}
        variant="contained"
      >
        Print
      </Button>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={payWay ?? "cash"}
        disabled
        sx={{ marginLeft: 3, marginRight: 1 }}
      >
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="online">Online</MenuItem>
      </Select>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function OrderCard({
  data,
  name,
  handleClickOnPrint,
  changer,
  mainData,
}) {
  // Avoid a layout jump when reaching the last page with empty rows.

  const sgst = (2.5 * mainData.amount) / 100;
  const cgst = (2.5 * mainData.amount) / 100;
  const service_charge = 0;
  const total = sgst + cgst + service_charge + mainData.amount;

  const cardRef = React.useRef(null);

  return (
    <Card ref={cardRef} elevation={11} sx={{ width: "60%", mb: 2 }}>
      <CardHeader
        title="Bhilai Biriyani Hotel"
        subheader={Date(mainData.date).slice(0, Date(mainData.date).length-31)}
        avatar={
          <Avatar
            src={Logo}
            sx={{ height: 50, width: 50 }}
            aria-label="recipe"
          ></Avatar>
        }
      />
      <CardContent>
        <EnhancedTableToolbar
          name={`Table No. : ${name}`}
          handleClickOnPrint={handleClickOnPrint}
          changer={changer}
          cardRef={cardRef}
          payWay={mainData.paymentMethod}
        />
        <TableContainer sx={{ maxHeight: "560px", minHeight: "560px" }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead rowCount={data.length} />
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type ?? "--"}</TableCell>
                    <TableCell align="right">{row.qty ?? "--"}</TableCell>
                    <TableCell align="right">{row.price ?? "--"}</TableCell>
                    <TableCell align="right">
                      {row.price * row.qty ?? "--"}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="right"
                  sx={{ fontWeight: "bolder" }}
                >
                  SGST (2.5%)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                  {sgst}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="right"
                  sx={{ fontWeight: "bolder" }}
                >
                  CGST (2.5%)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                  {cgst}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="right"
                  sx={{ fontWeight: "bolder" }}
                >
                  Service Charge
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                  {service_charge}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="right"
                  sx={{ fontWeight: "bolder" }}
                >
                  Total
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                  {total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5">Thank You Visit Again!</Typography>
      </CardContent>
    </Card>
  );
}
