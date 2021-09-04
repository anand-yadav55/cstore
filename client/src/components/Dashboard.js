import React,{useState,useEffect} from 'react';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';
// import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import UploadSkeleton from './misc/UploadSkeleton';
import {
  CssBaseline,
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  // Drawer,
  // Divider,
  // Badge,
} from '@material-ui/core/';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



const handleUpload=(e)=>{
  // e.preventDefault();
  // console.log(e.target[0].value)
  var formData = new FormData();
  var imagefile = document.querySelector('#file');
  // console.log(imagefile.files[0])
  formData.append("file", imagefile.files[0]);
  axios.post('/api/upload',formData).then((res)=>imagefile.value=null )
}

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uploadData,setUploadData] = useState([]);

  useEffect(()=>{
    axios.get('/api/getFiles').then((res)=>{
      // res.data.files.map((item)=>console.log(item))
      if(res.data.files)
        setUploadData(res.data.files);
    })
  },[])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
            
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Button variant="contained" color="secondary" onClick={()=>{dispatch(actions.logout())}}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Box pt={9}>
        <form onSubmit={(e)=>handleUpload(e)}>
        <input
          accept="*"
          className={classes.input}
          // style={{ display: 'none' }}
          id="file"

          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button type="submit" variant="outlined" className={classes.button}>
            Upload
          </Button>
        </label>
        </form>
      </Box>
      <Box pt={12}>
        <h1>All Uploaded Files</h1>
        {uploadData.map((item,idx)=> <UploadSkeleton key={idx} id={item._id} fileId={item.files_id} filename={item.filename}/>)}
      </Box>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      </main>
    </div>
  );
}
