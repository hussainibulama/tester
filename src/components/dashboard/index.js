import "./styles.scss";
import React,{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import Dots from './dots';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import instance from "../../utils/axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Star from '../../assets/Star.svg';
import curvegreen from '../../assets/curvegreen.svg';
import curveyellow from '../../assets/curveyellow.svg';
import user from '../../assets/userprofile.svg';
const state = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        label: 'Users',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#FF7F00',
        borderColor: '#FF7F00',
        borderWidth: 2,
        data: [15, 15, 15, 50, 90],
        pointRadius: 3,
      },
      {
        label: 'Advertiser',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#1F78B4',
        borderColor: '#1F78B4',
        borderWidth: 2,
        data: [5, 18, 14, 51, 34],
        pointRadius: 3,
      },
      {
        label: 'Active Ads',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#318348',
        borderColor: '#318348',
        borderWidth: 2,
        data: [4, 24, 36, 12, 6],
        pointRadius: 3,
      },
      {
        label: 'Inactive Ads',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#FD242B',
        borderColor: ' #FD242B',
        borderWidth: 2,
        data: [3, 15, 18, 9, 21],
        pointRadius: 3,
      },
      {
        label: 'Downloads',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#00A85A',
        borderColor: '#00A85A',
        borderWidth: 2,
        data: [6, 36, 42, 48, 6],
        pointRadius: 3,
      },
      {
        label: 'Token',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#E1B000',
        borderColor: ' #E1B000',
        borderWidth: 2,
        data: [21, 15, 35, 23, 20],
        pointRadius: 3,
      },
  
      {
        label: 'Referrals',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#33A02C',
        borderColor: '#33A02C',
        borderWidth: 2,
        data: [73, 26, 29, 34, 14],
        pointRadius: 3,
      },
      {
        label: 'Reviews',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#FDBF6F',
        borderColor: '#FDBF6F',
        borderWidth: 2,
        data: [50, 12, 5, 23, 10],
        pointRadius: 3,
      },
    ],
  };
  const options = {
    // showXAxisLabel:false,
    scales: {
      //   title:{display: false},
      x: {
        // showAxisLabel:{},
        // labels:{},
        //   display: false,
        grid: {
          //   labels:{},
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: false,
        },
      },
      y: {
        //   display: false,
        grid: {
          drawBorder: false,
          drawTicks: false,
          drawOnChartArea: true,
        },
      },
    },
  
    responsive: true,
  
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: '#333',
        },
  
        //   borderRadius:2
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  useEffect(() => {
    (async () => {
      let res = await instance.get("/auth/v2/admin/user/get-total?platform=web");
      let result = await res.data;
      // if(result){
      //   let ar = [];
      //   let counter = 1;
      //   result.message.allCareers.forEach((item,index)=>{
      //     let q= {
      //       id: counter,
      //       title: item.title,
      //       status: item.status===1?"Active":"Draft",
      //       publishedDate: item.createdAt,
      //       location: item.city + " "+ item.country,
      //       type: item.type,
      //     }
      //     counter++;
      //     ar.push(q);
      //   })
      //   setItems(ar);
      // }
      
      if (result.statusCode === 200) {
        console.log("a");
      }
    })();
  },[]);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,

    '& .MuiTableCell-head': {
        color: '#ffffff',
    },
    '& .MuiTableCell-root': {
        padding:'26px 16px',
    }
  },
});
const useNavStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        
        '& .MuiTabs-indicator': {
            backgroundColor: '#1D1B1B'
        },
        '& .MuiAppBar-colorPrimary': {
            color: '#443E3E',
            backgroundColor: 'inherit',
        },
        '& .MuiPaper-elevation4': {
            boxShadow: 'none',
        },
        '& .MuiTabs-root': {
            marginBottom: '52px',
        },
        '& .MuiCardActions-root': {
            float: 'right',
            padding: '0px',
        },
        '& .MuiBox-root-38': {
          padding: '0px 0px 16px 0px',
        },
        '& .MuiBox-root': {
          padding: '0px',
        },
        '& .MuiCard-root': {
            marginBottom: '16px',
            boxShadow: 'none',
            backgroundColor: '#F9F9F9',
        },
    },
    cardPos: {
      marginBottom: 12,
    },
  }));

function createData(browser, date, ip, location) {
  return { browser, date, ip, location };
}

const rows = [
  createData('08136668344', '100', 'Airtime', 'Nigeria'),
  createData('09066335084', '700 ', 'Cable Tv', 'Indonesia'),
  createData('07022233456', '1000', 'Bill', 'London'),

];

const DashboardPage = () => {
    const classes = useStyles();
    const navClasses = useNavStyles();
    const [value, setValue] = React.useState(0);
    const [anchorCardEl, setAnchorCardEl] = React.useState(null);

    const handleCardButtonClick = (event) => {
        setAnchorCardEl(event.currentTarget);
    };

    const handleCardButtonClose = () => {
        setAnchorCardEl(null);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return ( 
        <div>
            <div className="column1">
                <div className="main__heading">
                    <div className="_heading_text">
                        <h1>Hi, Welcome</h1>
                    </div>
                    <div className="_subheading_text">
                        <p>Admoni Admin dashboard.
                        </p>
                    </div>
                </div>
                <div className="column1__overviewer">
                    <div className="straight">
                        <div className="quarter">
                        <div className="details">
                            <p className="title1">Users Overview</p>
                            <p className="content1">Total Overview of users </p>
                            <p className="title2">28756</p>
                            <p className="content1">Total Users</p>
                            <p className="title3">12987</p>
                            <p className="content1">Active User</p>
                            <p className="title4">1456</p>
                            <p className="content1">Inactive User</p>
                            <p className="title4">1456</p>
                            <p className="content1">Blocked User</p>
 
                            
                        </div>
                        </div>
                        <div className="full">
                            <Line type="line" data={state} options={options} />
                            <div className="dot-group">
                                <Dots legendName={'User'} legendColor={'#FF7F00'} />
                                <Dots legendName={'Advertiser'} legendColor={'#1F78B4'} />
                                <Dots legendName={'Active Ads'} legendColor={'#318348'} />
                                <Dots legendName={'Inactive Ads'} legendColor={'#FD242B'} />
                                <Dots legendName={'Downloads'} legendColor={'#00A85A'} />
                                <Dots legendName={'Token'} legendColor={'#E1B000'} />
                                <Dots legendName={'Referrals'} legendColor={'#33A02C'} />
                                <Dots legendName={'Reviews'} legendColor={'#FDBF6F'} />
                            </div>
                        </div>
                    </div>
                    <div className="other-details">
              <div className="sub-views">
                <div>
                  <img src={Star} alt="" />
                </div>{' '}
                <div className="tags">
                  <p>16455</p>
                  <p>App Review</p>
                </div>
              </div>
              <div className="sub-views">
                <div>
                  <img src={curvegreen} alt="" />
                </div>{' '}
                <div className="tags">
                  <p>112</p>
                  <p>Total Advertisers</p>
                </div>
              </div>
              <div className="sub-views">
                <div>
                  <img src={curveyellow} alt="" />
                </div>{' '}
                <div className="tags">
                  <p>112</p>
                  <p>Total Token</p>
                </div>
              </div>
              <div className="sub-views">
                <div>
                  <img src={user} alt="" />
                </div>{' '}
                <div className="tags">
                  <p>112</p>
                  <p>Total Referrals</p>
                </div>
              </div>
            </div>
                </div>
                <br></br>
                <div className="column1__card1">
                    <div className="column1__card1__section1">
                        <span>Total Impression</span>
                        <h1>120,000,000</h1>
                    </div><p className="strong">|</p>
                    <div className="column1__card1__section2">
                        <span>Total Videos</span>
                        <h1>986,000</h1>
                    </div><p className="strong">|</p>
                    <div className="column1__card1__section3">
                        <span>Total Clicks</span>
                        <h1>986,000</h1>
                    </div>
                </div>
                <div className="column1__card1">
                    <div className="column1__card1__section1">
                        <span>Total Adverts</span>
                        <h1>120,000,000</h1>
                    </div><p className="strong">|</p>
                    <div className="column1__card1__section2">
                        <span>Total Active Adverts</span>
                        <h1>986,000</h1>
                    </div>
                    <p className="strong">|</p>
                    <div className="column1__card1__section2">
                        <span>Total Inactive Adverts</span>
                        <h1>986,000</h1>
                    </div>
                </div>
              
                <div className="column1__card2">
                    <div className="column1__card2__heading_text">
                        <h3>Recent User Redemption records</h3>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{backgroundColor: '#000000'}}>
                                <TableRow>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                    <TableCell align="left">Service type</TableCell>
                                    <TableCell align="left">Location&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.browser}
                                </TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.ip}</TableCell>
                                <TableCell align="left">{row.location}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
            <div className="column2">
                <div className={navClasses.root}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="Tab">
                            <Tab label="Transactions" {...a11yProps(0)} style={{minWidth: '83px'}}/>
                            <Tab label="Fail" {...a11yProps(1)}  style={{minWidth: '83px'}}/>
                            <Tab label="Success" {...a11yProps(2)}  style={{minWidth: '83px'}}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Paper style={{marginBottom: '2px'}}>
                     
                        </Paper>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button size="small">See All</Button>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        empty...
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        empty...
                    </TabPanel>
                </div>
            </div>
            
        </div>
     );
}
 
export default DashboardPage;