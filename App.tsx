import React, { useState, useEffect } from "react";
import "./App.css";
import Slots from "./Slots";
import InputFields from "./InputFields";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getData,
  findCombo,
  calcTotal,
  findItemByName,
  jumpIndexes,
} from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    padding: "10px 20px",
    margin: "10px auto",
  },
  result: {
    display: "flex",
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  resultField: {
    width: 150,
    margin: "auto",
  },
  search: {
    padding: 20,
    margin: "50px auto",
  },
}));

const App = () => {
  const STARTINDEXES = [84, 140, 40, 34, 91];
  const [range, setRange] = useState<number[]>([10, 30]);
  const [refreshes, setRefreshes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [stepNumber, setStepNumber] = useState<number>(0);

  const [indexes, setIndexes] = useState<number[]>(STARTINDEXES);
  const classes = useStyles();

  const handleChange = (
    newIndexes: number[],
    refreshNumber: number,
    sum: number
  ) => {
    setIndexes(newIndexes);
    setRefreshes(refreshNumber === 0 ? refreshes : refreshNumber + refreshes);
    setTotal(sum);
  };

  const reset = () => {
    setIndexes(STARTINDEXES);
    setTotal(calcTotal(STARTINDEXES));
    setRefreshes(0);
  };
  useEffect(() => {
    setTotal(calcTotal(indexes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h3">
        Yearbook Calculator
      </Typography>

      <InputFields setMin={setRange} />
      <Button
        onClick={() => {
          var values = findCombo(range[0], range[1], indexes);
          handleChange(values[0], values[1], values[2]);
        }}
        className={classes.button}
        variant="contained"
      >
        Calculate
      </Button>

      <Button
        onClick={() =>
          handleChange(
            jumpIndexes(1, indexes),
            1,
            calcTotal(jumpIndexes(1, indexes))
          )
        }
        className={classes.button}
        variant="contained"
      >
        Step
      </Button>
      <Button
        onClick={() => reset()}
        className={classes.button}
        variant="contained"
      >
        Reset
      </Button>
      {/* <Button className={classes.button} variant="contained">
        Find items
      </Button> */}
      <Slots slots={getData()} indexes={indexes} />

      <div className={classes.result}>
        <Typography align="center" variant="h4">
          Total
        </Typography>
        <Typography align="center" variant="h5">
          {total}
        </Typography>
      </div>

      <div className={classes.result}>
        <Typography align="center" variant="h4">
          Number of refreshes needed
        </Typography>
        <Typography align="center" variant="h5">
          {refreshes === 0 ? "Couldn't find" : refreshes}
        </Typography>
      </div>
      <div className={classes.search}>
        <Typography align="center" variant="h4">
          Find item
        </Typography>
        <TextField
          label={"Item name"}
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            handleChange(
              jumpIndexes(findItemByName(search, indexes), indexes),
              findItemByName(search, indexes),
              calcTotal(jumpIndexes(findItemByName(search, indexes), indexes))
            );
          }}
        >
          Find
        </Button>
      </div>
      <div className={classes.search}>
        <Typography align="center" variant="h4">
          Step number
        </Typography>
        <TextField
          label={"Number"}
          variant="standard"
          onChange={(e) => setStepNumber(parseInt(e.target.value))}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            console.log(jumpIndexes(stepNumber, indexes));
          }}
        >
          Locate
        </Button>
      </div>
      {/* <ItemTable yearbook={getWholeYearbook()} /> */}
    </div>
  );
};

export default App;
