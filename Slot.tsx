import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Typography } from "@material-ui/core";
import { slotData } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    maxWidth: 300,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "hsl(0, 0, 0, 10%);",
  },
  title: {
    marginRight: 10,
  },
  field: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
}));

const Slot: React.FC<{
  slot: slotData;
}> = ({ slot }) => {
  const classes = useStyles();
  return (
    <Box borderRadius={5} className={classes.root}>
      <Typography align="center">{slot.name}</Typography>
      <div className={classes.field}>
        <Typography variant="h6" className={classes.title}>
          Bonus
        </Typography>
        <TextField
          label={slot.bonus.toString()}
          variant="outlined"
          disabled={true}
        />
      </div>
      <div className={classes.field}>
        <Typography variant="h6" className={classes.title}>
          Characters
        </Typography>
        <TextField
          label={slot.characters.toString()}
          variant="outlined"
          disabled={true}
        />
      </div>
      <div className={classes.field}>
        <Typography variant="h6" className={classes.title}>
          Boost
        </Typography>
        <TextField
          label={slot.boost.toString()}
          variant="outlined"
          disabled={true}
        />
      </div>
      <div className={classes.field}>
        <Typography variant="h6" className={classes.title}>
          Value
        </Typography>
        <TextField
          label={slot.value.toString()}
          variant="outlined"
          disabled={true}
        />
      </div>
    </Box>
  );
};

export default Slot;
