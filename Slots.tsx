import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slot from "./Slot";
//import { TextField } from "@material-ui/core";
import { yearbook } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px auto",
    display: "flex",
  },
  centre: {
    display: "flex",
    flexDirection: "column",
  },
  textfield: {
    width: "80%",
    margin: "auto",
  },
}));

const Slots: React.FC<{
  slots: yearbook;
  indexes: number[];
}> = ({ slots, indexes }) => {
  const classes = useStyles();
  const slotArray = [
    slots.slot1,
    slots.slot2,
    slots.slot3,
    slots.slot4,
    slots.slot5,
  ];

  return (
    <div className={classes.root}>
      {slotArray.map((slot, index) => (
        <div className={classes.centre} key={index}>
          {/* <TextField
            className={classes.textfield}
            label={"Item name"}
            variant="standard"
          /> */}
          <Slot slot={slot[indexes[index]]} />
        </div>
      ))}
    </div>
  );
};

export default Slots;
