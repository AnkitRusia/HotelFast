import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = ({ type, onClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: `linear-gradient(90deg, #B78628, #B78628, #B78628, #FCC201, #FCC201)`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bhilai Biryani House
          </Typography>
          <Box sx={{ paddingLeft: "25px" }}>
            <Button
              sx={{
                border: `1px solid #000000`,
                color: "#000000",
              }}
              onClick={() => onClick("menu")}
            >
              Menu
            </Button>
          </Box>
          <Box sx={{ paddingLeft: "25px" }}>
            <Button
              color="primary"
              onClick={() => onClick("orders")}
              sx={{
                border: `1px solid #000000`,
                color: "#000000",
              }}
            >
              Orders
            </Button>
          </Box>
          <Box sx={{ paddingLeft: "25px" }}>
            <Button
              color="primary"
              onClick={() => onClick("statistics")}
              sx={{
                border: `1px solid #000000`,
                color: "#000000",
              }}
            >
              DATA
            </Button>
          </Box>
          <Typography variant="h6" component="div" sx={{ paddingLeft: "25px" }}>
            {type}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
