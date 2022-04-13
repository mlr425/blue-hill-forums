import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../../actions/posts";
import {getLocalStorageUser} from '../../Utilities/UtilsJS/UtilJS'

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = getLocalStorageUser();
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleSubmitPost = async () => {
    const comm = `${user.result.name}: ${comment}`;
    const updatedComments = await dispatch(commentPost(comm, post._id));
    setComments(updatedComments); //update n rerender
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" }); //scroll to comment
  };

  return (
    <>
      <Typography paragraph variant="body1">
        COMMENTS
      </Typography>
      {user?.result.name && (
        <div>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleSubmitPost}
            color="primary"
          >
            Submit Comment
          </Button>
        </div>
      )}
      {comments.length > 0 ? (
        <Container
          sx={{
            border: "2px solid",
            marginTop: "25px",
            backgroundColor: "#f5f7fa",
            wordWrap: "break-word"
          }}
        >
          {comments.map((comment, i) => (
            <div key={i}>
              <Typography>
                <strong>{comment.split(": ")[0]}</strong>
              </Typography>
              <Typography sx={{ paddingBottom: "10px" }}>
                {comment.split(":")[1]}
              </Typography>
            </div>
          ))}
          <div ref={commentsRef}></div>
        </Container>
      ) : null}
    </>
  );
};

export default CommentSection;
