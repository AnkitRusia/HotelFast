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

function createData({ name, price }) {
  return {
    name,
    full: price[0],
    half: price[1],
    quarter: price[2],
  };
}

const headCells = [
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ name }) => {
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
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function MenuCard({ data, name }) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const rows = [];
  Object.keys(data).map((key) => rows.push(createData(data[key])));

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={11} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar name={name} />
        <TableContainer sx={{ maxHeight: "600px", minHeight: "600px" }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead rowCount={rows.length} />
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.full ?? "--"}</TableCell>
                    <TableCell align="right">{row.half ?? "--"}</TableCell>
                    <TableCell align="right">{row.quarter ?? "--"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
