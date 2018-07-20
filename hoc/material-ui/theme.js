import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Color from 'color';
// import 'typeface-roboto';

const theme = createMuiTheme();

export default createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        background: `linear-gradient(60deg, ${Color('#2196f3').lighten(0.1)}, ${Color('#2196f3').darken(0.1)})`,
        boxShadow: `0 4px 20px 0px ${Color('#2196f3').alpha(0.3)}, 0 7px 10px -5px ${Color('#2196f3').alpha(0.5)}`,
      },
    },
    MuiInputLabel: {
      formControl: {
        color: '#9197a3',
      },
    },
    MuiInput: {
      underline: {
        '&::before': {
          borderBottom: '1px #ddd solid',
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0 3px 5px 0px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 3px 5px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
        // marginBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down('xs')]: {
          // boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.05)',
          // boxShadow: '0 1px 3px 0px rgba(0, 0, 0, 0.05)',
          // marginBottom: theme.spacing.unit * 1,
          boxShadow: 'none',
        },
      },
    },
    // MuiButton: {
    //   outlined: {
    //     borderRadius: 0,
    //     border: '1px #015978 solid',
    //   },
    // },
  },
  palette: {
    primary: {
      main: '#00B9F7',
      contrastText: '#fff',
    },
    secondary: red,
    background: {
      default: '#f3f4f7',
    },
  },
  typography: {
    htmlFontSize: '14px',
    fontFamily: [
      'PingFang SC',
      'Roboto',
      'Microsoft Yahei',
      'sans-serif',
    ].join(','),

    // 'PingFang SC,sans-serif',
    // fontWeightLight: 200,
    // fontWeightRegular: 300,
    // fontWeightMedium: 400,
  },
  nowrap: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  centerBlock: {
    display: 'block',
    margin: '0 auto',
  },
  container: {
    maxWidth: 1110,
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
});
