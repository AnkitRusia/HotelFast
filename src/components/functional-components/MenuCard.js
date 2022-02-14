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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Veg from "../../assets/veg.svg";
import NonVeg from "../../assets/nonveg.svg";
import { CircularProgress } from "@mui/material";

function createData({ name, price, veg, inStock, _id }) {
  return {
    name,
    full: price[0],
    half: price[1],
    quarter: price[2],
    veg,
    inStock,
    _id,
  };
}

const headCells = [
  {
    id: "veg",
    label: "",
  },
  {
    id: "name",
    numeric: false,
    label: "Name of Dish",
  },
  {
    id: "full",
    numeric: true,
    disablePadding: false,
    label: "Full (Rs.)",
  },
  {
    id: "half",
    numeric: true,
    disablePadding: false,
    label: "Half (Rs.)",
  },
  {
    id: "quarter",
    numeric: true,
    disablePadding: false,
    label: "Quarter (Rs.)",
  },
  {
    id: "inStock",
    label: "In Stock",
  },
  {
    id: "edit",
    label: "",
  },
];

const headCellsForAdd = [
  {
    id: "name",
    numeric: false,
    label: "Name of Dish",
  },
  {
    id: "full",
    numeric: true,
    disablePadding: false,
    label: "Full (Rs.)",
  },
  {
    id: "half",
    numeric: true,
    disablePadding: false,
    label: "Half (Rs.)",
  },
  {
    id: "quarter",
    numeric: true,
    disablePadding: false,
    label: "Quarter (Rs.)",
  },
  {
    id: "veg",
    label: "is Veg?",
  },
  {
    id: "inStock",
    label: "In Stock",
  },
  {
    id: "add/remove",
    numeric: true,
    disablePadding: false,
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
    id: "full",
    numeric: true,
    disablePadding: false,
    label: "Full (Rs.)",
  },
  {
    id: "half",
    numeric: true,
    disablePadding: false,
    label: "Half (Rs.)",
  },
  {
    id: "quarter",
    numeric: true,
    disablePadding: false,
    label: "Quarter (Rs.)",
  },
  {
    id: "veg",
    label: "is Veg?",
  },
  {
    id: "inStock",
    label: "In Stock",
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

function EnhancedTableHeadForAdd(props) {
  const headers =
    props.currentRoute === "add" ? headCellsForAdd : headCellsForEdit;

  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
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

const EnhancedTableToolbar = ({ name, setOpen, selectCurrentRoute }) => {
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
          setOpen(true);
          selectCurrentRoute("add");
        }}
        variant="outlined"
        sx={{ marginLeft: 3, marginRight: 3 }}
      >
        Add
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function MenuCard({ data, name, setMenuData, menuData }) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const rows = [];
  Object.keys(data).map((key) => rows.push(createData(data[key])));
  const [addData, setAddData] = React.useState([]);
  const [addSpecificInput, setAddSpecificInput] = React.useState({
    name: "",
    price: [0, 0, 0],
    veg: 0,
    category: name,
    inStock: 1,
  });
  const [open, setOpen] = React.useState(false);

  const [screenLoading, setScreenLoading] = React.useState("not adding");
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setAddData([]);
    setOpen(false);
    setScreenLoading("not adding");
    selectCurrentRoute("add");
  };

  const getMenuCategoryData = () => {
    setLoading(true);
    fetch(`https://bbh-api-v1.herokuapp.com/item/category/${name}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ ...menuData, [name]: res });
        setMenuData({ ...menuData, [name]: res });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleAddSave = () => {
    setScreenLoading("Adding....");
    fetch("https://bbh-api-v1.herokuapp.com/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setScreenLoading("Added");
        setTimeout(() => {
          handleClose();
        }, 1000);
        getMenuCategoryData();
      })
      .catch((err) => {
        console.log(err);
        setScreenLoading("Failed to Add");
        setTimeout(() => setScreenLoading("not adding"), 1000);
      });
  };

  const handleAddChange = (place, value) => {
    setAddSpecificInput({ ...addSpecificInput, [place]: value });
  };

  const handleAdd = () => {
    console.log(addData, addSpecificInput);
    setAddData([...addData, addSpecificInput]);
    setAddSpecificInput({
      name: "",
      price: [0, 0, 0],
      veg: 0,
      category: name,
      inStock: 1,
    });
  };

  const handleRemove = (idx) =>
    setAddData(addData.filter((value, index) => index !== idx));

  const handleToggle = (data) => {
    const newData = {
      name: data.name,
      price: [data.full ?? 0, data.half ?? 0, data.quarter ?? 0],
      veg: data.veg,
      category: name,
      inStock: data.inStock,
      _id: data._id,
    };
    fetch(`https://bbh-api-v1.herokuapp.com/item/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getMenuCategoryData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentRoute, selectCurrentRoute] = React.useState("add");

  const goForEdit = (data) => {
    setAddSpecificInput({
      name: data.name,
      price: [data.full ?? 0, data.half ?? 0, data.quarter ?? 0],
      veg: data.veg,
      category: name,
      inStock: data.inStock,
      _id: data._id,
    });
    selectCurrentRoute("edit");
    setOpen(true);
  };

  const saveForEdit = () => {
    setScreenLoading("Editing....");
    fetch(`https://bbh-api-v1.herokuapp.com/item/${addSpecificInput._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addSpecificInput),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setScreenLoading("Edited");
        setTimeout(() => {
          handleClose();
        }, 1000);
        getMenuCategoryData();
      })
      .catch((err) => {
        console.log(err);
        setScreenLoading("Failed to Edit");
        setTimeout(() => setScreenLoading("not adding"), 1000);
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={11} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          name={name}
          setOpen={setOpen}
          selectCurrentRoute={selectCurrentRoute}
        />
        <TableContainer
          sx={{
            maxHeight: "600px",
            minHeight: "600px",
            display: loading && "flex",
            alignItems: loading && "center",
            justifyContent: loading && "center",
          }}
        >
          {loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Table stickyHeader aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead rowCount={rows.length} />
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.name}>
                      <TableCell scope="row">
                        {row.veg ? (
                          <img
                            src={Veg}
                            alt="Veg"
                            style={{ marginTop: 8, height: 30, width: 30 }}
                          />
                        ) : (
                          <img
                            src={NonVeg}
                            style={{ marginTop: 8, height: 30, width: 30 }}
                            alt="NonVeg"
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {Boolean(row.full) ? row.full : "--"}
                      </TableCell>
                      <TableCell align="right">
                        {Boolean(row.half) ? row.half : "--"}
                      </TableCell>
                      <TableCell align="right">
                        {Boolean(row.quarter) ? row.quarter : "--"}
                      </TableCell>
                      <TableCell align="left">
                        <Switch
                          color="secondary"
                          checked={row.inStock === 1}
                          onChange={() =>
                            handleToggle({
                              ...row,
                              inStock: row.inStock === 1 ? 0 : 1,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          color="secondary"
                          sx={{ width: 80, height: 40 }}
                          onClick={() => goForEdit(row)}
                        >
                          edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
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
            <Typography component="div">Add Menu Items</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {screenLoading !== "not adding" ? (
            screenLoading
          ) : (
            <TableContainer
              sx={{
                maxHeight: "400px",
                minHeight: "400px",
              }}
            >
              <Table stickyHeader aria-labelledby="tableTitle" size="medium">
                <EnhancedTableHeadForAdd
                  rowCount={rows.length}
                  currentRoute={currentRoute}
                />
                <TableBody>
                  {addData.map((row, index) => {
                    return (
                      <TableRow role="checkbox" tabIndex={-1} key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {Boolean(row.price[0]) ? row.price[0] : "--"}
                        </TableCell>
                        <TableCell align="right">
                          {Boolean(row.price[1]) ? row.price[1] : "--"}
                        </TableCell>
                        <TableCell align="right">
                          {Boolean(row.price[2]) ? row.price[2] : "--"}
                        </TableCell>
                        <TableCell align="right">
                          {row.veg ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="left">
                          {row.inStock === 1 ? "Yes" : "No"}
                        </TableCell>
                        {currentRoute === "add" && (
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              color="secondary"
                              sx={{ width: 80, height: 40 }}
                              onClick={() => handleRemove(index)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={addSpecificInput.name}
                        onChange={(e) =>
                          handleAddChange("name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={addSpecificInput.price[0]}
                        onChange={(e) => {
                          const prices = [...addSpecificInput.price];
                          prices[0] =
                            parseInt(
                              e.target.value === null || e.target.value === ""
                                ? "0"
                                : e.target.value
                            ) ?? 0;
                          handleAddChange("price", prices);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        value={addSpecificInput.price[1]}
                        onChange={(e) => {
                          const prices = [...addSpecificInput.price];
                          prices[1] =
                            parseInt(
                              e.target.value === null || e.target.value === ""
                                ? "0"
                                : e.target.value
                            ) ?? 0;
                          handleAddChange("price", prices);
                        }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        value={addSpecificInput.price[2]}
                        id="outlined-basic"
                        onChange={(e) => {
                          const prices = [...addSpecificInput.price];
                          prices[2] =
                            parseInt(
                              e.target.value === null || e.target.value === ""
                                ? "0"
                                : e.target.value
                            ) ?? 0;
                          handleAddChange("price", prices);
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={addSpecificInput.veg}
                        onChange={(e) => handleAddChange("veg", e.target.value)}
                      >
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={1}>Yes</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="left">
                      <Switch
                        color="secondary"
                        checked={addSpecificInput.inStock === 1}
                        onChange={(e) =>
                          handleAddChange(
                            "inStock",
                            addSpecificInput.inStock === 1 ? 0 : 1
                          )
                        }
                      />
                    </TableCell>
                    {currentRoute === "add" && (
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          sx={{ width: 80, height: 40 }}
                          onClick={handleAdd}
                        >
                          Add
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={currentRoute === "add" ? handleAddSave : saveForEdit}
            disabled={
              currentRoute === "add" &&
              (addData.length === 0 || screenLoading !== "not adding")
            }
          >
            Save
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
