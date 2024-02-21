import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Slider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
  },
}));

const InputFields: React.FC<{ setMin: (v: number[]) => void }> = ({
  setMin,
}) => {
  const [value, setValue] = React.useState<number[]>([10, 30]);
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    setMin(value);
  };
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Minimum Total
      </Typography>

      <Slider
        value={value}
        aria-labelledby="range-slider"
        valueLabelDisplay="auto"
        onChange={handleChange}
        step={0.25}
        min={1}
        max={30}
      />
    </div>
  );
};

export default InputFields;
