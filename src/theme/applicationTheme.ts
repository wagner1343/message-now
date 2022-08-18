import { createTheme, responsiveFontSizes } from "@material-ui/core";

const applicationTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily: ["Inter"].join(","),
      button: {
        fontWeight: 600,
        fontSize: "0.9375rem",
        textTransform: "none",
      },
      subtitle1: {
        fontWeight: 600,
        fontSize: "0.8rem",
      },
      subtitle2: {
        fontWeight: 600,
        fontSize: "0.775rem",
      },
      h6: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
    },
  })
);

export default applicationTheme;
