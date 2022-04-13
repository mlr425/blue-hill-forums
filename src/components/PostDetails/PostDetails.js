import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../../actions/posts";
import CommentSection from "./CommentSection/CommentSection";
import {getLocalStorageUser} from '../Utilities/UtilsJS/UtilJS'
import Form from "../Form/Form";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import Post from '../Posts/Post/Post'
import Loading from '../Utilities/UtilComponents/Loading'

const PostDetails = () => {
  const [toggleEditing, setToggleEditing] = useState(false);
  const { post, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();
  const user = getLocalStorageUser();
  const userId = user?.result?.googleId || user?.result?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id,dispatch]);


  const toggleEdit = () => {
    setToggleEditing((p) => !p);
  };


  const returnToHomePage = () => {
    return navigate("/posts");
  };

  if (isLoading) {
    return (<Loading/>)
  }

  if (!post) {
    setTimeout(1000)
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
          <Typography variant="h2">Invalid Post ID</Typography>
          <Button onClick={returnToHomePage}>Return to Home</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Card elevation={0}>
      <Post post={post} detail={true}></Post>
      {userId === post.creator ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", padding:'5px' }}>
            <Button size="small" variant="contained" onClick={toggleEdit}>
              Edit Post
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "red" }}
              color="secondary"
              onClick={() => dispatch(deletePost(post._id, navigate))}
            >
              Delete Post
            </Button>
          </div>
        </>
      ) : null}
      {toggleEditing === false ? null : (
        <>
          <Form currId={post._id}></Form>
        </>
      )}
      
      <Divider />
      <Container
        sx={{
          marginTop: "25px",
          backgroundColor: "#f5f7fa",
          paddingBottom: "35px",
          border: "2px solid",
        }}
      >
        <CardContent sx={{ marginTop: "20px", wordWrap: "break-word" }}>
          <Typography paragraph variant="body1">
            {post.message}
          </Typography>
          <Divider sx={{ paddingTop: "20px" }} />
        </CardContent>
        <CardMedia
          sx={{ padding: "8px", maxHeight: "800px", maxWidth: "800px" }}
          component="img"
          image={post?.selectedFile?.length > 0 ? post.selectedFile : null}
        />
      </Container>
      <CardContent>
        <Divider sx={{ paddingTop: "20px" }} />
        <Container>
          <CommentSection post={post} />
        </Container>
      </CardContent>
    </Card>
  );
};

export default PostDetails;