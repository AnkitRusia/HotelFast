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
  {
    id: "Edit",
    label: "",
  },
  {
    id: "Remove",
    label: "",
  },
];

const headCellsForEdit = [
  {
    id: "name",
    numeric: false,
    label: "Name of Dish",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Item Price",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Is Veg?",
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

function EnhancedTableHeadForEdit(props) {
  return (
    <TableHead>
      <TableRow>
        {headCellsForEdit.map((headCell) => (
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
  setToPaid,
  setToDelete,
  payWay,
  setPayWay,
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
        onClick={() => setToDelete()}
        variant="outlined"
        color="secondary"
      >
        Delete
      </Button>
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
      <Button
        onClick={() => setToPaid()}
        variant="outlined"
        color="secondary"
        sx={{ marginLeft: 3, marginRight: 1 }}
      >
        Paid
      </Button>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={payWay ?? "cash"}
        onChange={(e) => setPayWay(e.target.value)}
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
  getCurrentOrders,
  mainData,
}) {
  // Avoid a layout jump when reaching the last page with empty rows.

  console.log("menu 2", data);

  const [hideOnPrint, setHideOnPrint] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(
    mainData.paymentMethod ?? "cash"
  );

  const [addSpecificInput, setAddSpecificInput] = React.useState({
    name: "",
    price: 0,
    veg: 0,
    type: "",
    qty: 1,
    _idx: 0,
  });

  const getItems = ({ name, price, veg, type, qty }) => ({
    name,
    price: parseInt(price),
    veg,
    type,
    qty,
  });

  const [screenLoading, setScreenLoading] = React.useState("not editing");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setScreenLoading("not editing");
  };

  const handleAddChange = (place, value) => {
    setAddSpecificInput({ ...addSpecificInput, [place]: value });
  };

  const setToEdit = (index) => {
    setAddSpecificInput({ ...data[index], _idx: index });
    setOpen(true);
  };

  const handleAddSave = () => {
    setScreenLoading("Editing....");
    fetch(
      `https://bbh-api-v1.herokuapp.com/order/changeOrder/${mainData.tablenumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            mainData.amount -
            data[addSpecificInput._idx].price *
              data[addSpecificInput._idx].qty +
            parseInt(addSpecificInput.price) * parseInt(addSpecificInput.qty),
          items: [
            ...data.filter((value, index) => index !== addSpecificInput._idx),
            getItems(addSpecificInput),
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setScreenLoading("Edited");
        setTimeout(() => {
          handleClose();
        }, 1000);
        getCurrentOrders();
      })
      .catch((err) => {
        console.log(err);
        setScreenLoading("Failed to Edit");
        setTimeout(() => setScreenLoading("not editing"), 1000);
      });
  };

  const sgst = (2.5 * mainData.amount) / 100;
  const cgst = (2.5 * mainData.amount) / 100;
  const service_charge = 0;
  const total = sgst + cgst + service_charge + mainData.amount;

  const setToPaid = () => {
    const retData = { ...mainData, paymentMethod };
    fetch(`https://bbh-api-v1.herokuapp.com/order/paid/${name}`, {
      method: "POST",
      body: JSON.stringify(retData),
    })
      .then((res) => {
        getCurrentOrders();
        console.log("Data insterted", res.json());
      })
      .catch((err) => {
        console.log("Data failed", err);
      });
  };

  const setToDelete = () => {
    fetch(`https://bbh-api-v1.herokuapp.com/order/del/${name}`, {
      method: "DELETE",
    })
      .then((res) => {
        getCurrentOrders();
        console.log("Data insterted", res.json());
      })
      .catch((err) => {
        console.log("Data failed", err);
      });
  };

  const setToRemove = (idx) => {
    const retData = {
      items: data.filter((each, index) => index !== idx),
      amount: mainData.amount - data[idx].price,
    };
    fetch(
      `https://bbh-api-v1.herokuapp.com/order/changeOrder/${mainData.tablenumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(retData),
      }
    )
      .then((res) => {
        getCurrentOrders();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSelectForPayChange = (value) => {
    setPaymentMethod(value);
  };

  const cardRef = React.useRef(null);

  return (
    <Card ref={cardRef} elevation={11} sx={{ width: "100%", mb: 2 }}>
      <CardHeader
        title="Bhilai Biriyani Hotel"
        subheader={new Date().toLocaleDateString()}
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
          setToPaid={setToPaid}
          setToDelete={setToDelete}
          hideOnPrint={hideOnPrint}
          setHideOnPrint={setHideOnPrint}
          payWay={paymentMethod}
          setPayWay={handleSelectForPayChange}
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
                    <TableCell align="right">
                      <Fab
                        variant="outlined"
                        color="primary"
                        sx={{ width: 30, height: 25 }}
                        onClick={() => setToEdit(index)}
                      >
                        <EditIcon />
                      </Fab>
                    </TableCell>
                    <TableCell align="left">
                      <Fab
                        variant="outlined"
                        color="secondary"
                        sx={{ width: 30, height: 25 }}
                        onClick={() => setToRemove(index)}
                      >
                        <RemoveIcon />
                      </Fab>
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: { maxWidth: "700px", minWidth: "700px" },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="div">Edit Items</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {screenLoading !== "not editing" ? (
              screenLoading
            ) : (
              <TableContainer
                sx={{
                  maxHeight: "400px",
                  minHeight: "400px",
                }}
              >
                <Table stickyHeader aria-labelledby="tableTitle" size="medium">
                  <EnhancedTableHeadForEdit />
                  <TableBody>
                    <TableRow role="checkbox" tabIndex={-1}>
                      <TableCell component="th" scope="row">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={addSpecificInput.name}
                          onChange={(e) =>
                            handleAddChange("name", e.target.value)
                          }
                          disabled
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={addSpecificInput.price}
                          onChange={(e) => {
                            handleAddChange("price", e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={addSpecificInput.qty}
                          onChange={(e) => {
                            handleAddChange("qty", e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={addSpecificInput.type}
                          onChange={(e) =>
                            handleAddChange("type", e.target.value)
                          }
                          disabled
                        >
                          <MenuItem value={"full"}>Full</MenuItem>
                          <MenuItem value={"half"}>Half</MenuItem>
                          <MenuItem value={"half"}>Quarter</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={addSpecificInput.veg}
                          onChange={(e) =>
                            handleAddChange("veg", e.target.value)
                          }
                          disabled
                        >
                          <MenuItem value={0}>No</MenuItem>
                          <MenuItem value={1}>Yes</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSave}>Save</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
