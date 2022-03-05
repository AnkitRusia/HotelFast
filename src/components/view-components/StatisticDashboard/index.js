import React from "react";
import Grid from "@mui/material/Grid";
import StatisticsCard from "../../functional-components/StatisticsCard";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useReactToPrint } from "react-to-print";
import Box from "@mui/material/Box";

const StatisticDashboard = ({
  statisticData,
  getAllStatisticOrders,
  dates,
  setDates,
  totalAmount,
}) => {
  const ref = React.useRef(null);

  const changer = (reference) => {
    ref.current = reference;
  };

  const handleClickOnPrint = useReactToPrint({
    content: () => ref?.current,
  });

  const handleChangeDates = (val) => {
    console.log("changing", dates, val);
    if (
      val[0].toDateString() !== dates[0] ||
      val[1].toDateString() !== dates[1]
    ) {
      setDates(val);
      getAllStatisticOrders(val[0].toISOString(), val[1].toISOString());
    }
  };

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        sx={{ padding: "30px" }}
        justifyContent="flex-end"
      >
        <Grid item xs={7} container justifyContent="flex-end">
          {totalAmount && (
            <Typography variant="h5">
              <strong>Total Payment:&nbsp;&nbsp;&nbsp;</strong>
              Rs.&nbsp;{Math.round(totalAmount)}
            </Typography>
          )}
        </Grid>
        <Grid item xs={5} container justifyContent="flex-end">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dates}
              onChange={(newValue) => {
                handleChangeDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
              calendars={1}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        {Object.keys(statisticData).map((key) => (
          <Grid item xs={12} sm={12} md={3} sx={{ padding: "20px" }}>
            <StatisticsCard
              data={statisticData[key].items}
              mainData={statisticData[key]}
              name={key}
              handleClickOnPrint={handleClickOnPrint}
              changer={changer}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default StatisticDashboard;
