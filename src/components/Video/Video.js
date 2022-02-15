import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const api_rest = config.api_url;

export default function VideoList({ setLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoId] = React.useState(id);
  const [videoInfo, setVideoInfo] = React.useState([]);

  const getData = async () => {
    const url = `${api_rest}/api/video/${videoId}`;
    console.log(videoId)
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(url,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideoInfo(data);
      console.log(data);
    } catch {
      setLoggedIn(false);
      navigate("/");
    }
  }

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Grid item xs={12} md={12} marginTop={2}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>   
              <CardMedia sx={{height: "30em"}} component="iframe" src={videoInfo.video} allow="autoPlay"/>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="primary">
            Created by:{videoInfo.createdBy?.fullname}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="primary">
            Created: {videoInfo.uploadDate}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">{videoInfo.title}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={6}>
           <Box sx={{ '& > :not(style)': { m: 0 } }}>
            <Fab href="/video" color="primary" aria-label="add">
              <ArrowBackIosNewIcon/>
            </Fab>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
