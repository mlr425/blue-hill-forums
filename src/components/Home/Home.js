import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Button,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {getLocalStorageUser} from '../Utilities/UtilsJS/UtilJS'

const Home = () => {
  const [currId, setCurrId] = useState(null);
  const [createPost, setCreatePost] = useState(false);
  const user = getLocalStorageUser()
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const toggleCreatePost = () => {
    setCreatePost((p) => !p);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ flexDirection: isMobile ? "column-reverse" : "row" }}
        >
          <Grid item xs={12} md={9} sm={8}>
            <Posts />
          </Grid>
          {user && currId === null && createPost === false ? (
            <>
              <Grid item xs={12} md={3} sm={4}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={toggleCreatePost}
                >
                  Create a Post
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} md={3} sm={4}>
              <Form currId={currId} setCurrId={setCurrId} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
