import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getPostsFromUserId} from '../../actions/posts'
import { useDispatch, useSelector } from "react-redux";
import Post from '../Posts/Post/Post';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Grid, Container, Paper, Card, CardContent, Avatar, Typography,Button,Divider} from '@mui/material'
import Loading from '../Utilities/UtilComponents/Loading'

const Profile = () => {
    const { id } = useParams();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [errorMsg, setErrorMsg] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

    useEffect(() => {
        dispatch(getPostsFromUserId(id,setErrorMsg));
    }, [id,dispatch])
    
    if (isLoading) {
      return (<Loading/>)
    }

    const returnToHomePage = () => {
      return navigate("/posts");
    };

    if (errorMsg === true) {
      return (
        <Container>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">User has no posts</Typography>
            <Button onClick={returnToHomePage}>Return to Home</Button>
          </Paper>
        </Container>
      );
    }
    
    return (
        <Container maxWidth='xl' sx={{ flexDirection: isMobile ? "column-reverse" : "row" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography>Profile Name: {posts[0]?.name}</Typography>
                            <Typography>Total Posts: {posts.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                {posts.map((post) => (
                        <Grid item key={post._id} xs={12}>
                        <Post post={post} />
                        <Divider/>
                        </Grid>
                ))}
                </Grid>
            </Grid>
        </Container>
    )
};

export default Profile;
