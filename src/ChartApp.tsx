import { Chart, Coord, Line } from "@andyag24/chart-test";
import { Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ChartApp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      x: undefined,
      y: undefined,
    },
  });

  const [line, setLine] = useState<Line>({
    color: "red",
    coords: [],
    width: 2,
  });

  const updateLine = (x: number, y: number) => {
    const updatedCoords: Coord[] = [...line.coords];
    updatedCoords.push({ x, y });

    const updated: Line = { ...line, coords: updatedCoords };
    setLine(updated);
  };

  const onSubmit = (data: { x: string | undefined; y: string | undefined }) => {
    if (!data.x || !data.y) return;
    updateLine(Number(data.x), Number(data.y));
  };

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      pt={4}
      alignContent={"center"}
    >
      <Grid item>
        <Chart
          viewHeight={250}
          viewWidth={500}
          config={{ padding: 50, rowsCount: 5 }}
          dpiRatio={2}
          lines={[
            // {
            //   color: "red",
            //   width: 2,
            //   coords: coordsMock1,
            // },
            line,
          ]}
        />
      </Grid>
      <Grid item pt={4}>
        <Grid>
          <Typography>Enter new coordinates below</Typography>
        </Grid>

        <form style={{ display: "inherit" }} onSubmit={handleSubmit(onSubmit)}>
          <Grid container flexDirection={"row"} columnSpacing={2}>
            <Grid item>
              <Controller
                name="x"
                control={control}
                render={({ field }) => <TextField label="x" {...field} />}
              />
            </Grid>
            <Grid item>
              <Controller
                name="y"
                control={control}
                render={({ field }) => <TextField label="y" {...field} />}
              />
            </Grid>
            <Grid item display={"flex"}>
              <IconButton aria-label="send" type="submit">
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default ChartApp;
