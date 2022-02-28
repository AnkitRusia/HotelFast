import React from "react";
import Grid from "@mui/material/Grid";
import StatisticsCard from "../../functional-components/StatisticsCard";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

const StatisticDashboard = ({
  statisticData,
  handleClickOnPrint,
  changer,
  getAllStatisticOrders,
  dates,
  setDates,
}) => {
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
      <Grid container item xs={12}>
        {Object.keys(statisticData).map((key) => (
          <Grid item xs={12} sm={12} md={6} sx={{ padding: "20px" }}>
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
