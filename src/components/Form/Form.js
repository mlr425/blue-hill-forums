import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../../actions/posts";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import {getLocalStorageUser} from '../Utilities/UtilsJS/UtilJS'; 

const acceptableImageTypes = [
  "data:image/png",
  "data:image/jpeg",
  "data:image/svg",
  "data:image/gif",
  "data:image/webp",
];

const Form = ({ currId, setCurrId }) => {
  const [postData, setPostData] = useState({title: "",message: "",selectedFile: "",});
  const [wrongImageType, setWrongImageType] = useState(false);
  const post = useSelector((state) =>
    currId ? state.posts.posts.find((p) => p._id === currId) : null
  );
  const user = getLocalStorageUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrId(null);
    setWrongImageType(false);
    setPostData({
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    if (currId) {
      dispatch(updatePost(currId, { ...postData, name: user?.result?.name }));
    } else {
      e.preventDefault();
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const uploadImage = ({ base64 }) => {
    setPostData({ ...postData, selectedFile: "" }); //reset selected file (handling for reselecting img)
    setWrongImageType(false);

    const uploadedDataType = base64.split(";")[0]; //grab the base64 content type

    if (
      uploadedDataType === acceptableImageTypes[0] ||
      uploadedDataType === acceptableImageTypes[1] ||
      uploadedDataType === acceptableImageTypes[2] ||
      uploadedDataType === acceptableImageTypes[3] ||
      uploadedDataType === acceptableImageTypes[4]
    ) {
      //if content is an acceptable data type, then set it (only allowing gifs/imgs)
      setPostData({ ...postData, selectedFile: base64 });
    } else {
      setWrongImageType(true);
    }
  };

  if (!user?.result?.name) {
    //#a0d468 green
    return (
      <Paper component={Link} to="/auth" sx={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ backgroundColor: "#a0d468", borderRadius: 1, padding: "10px" }}
        >
          You must be signed in to create, comment, and like posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {/* <div>{currId}</div> */}
      <Paper elevation={3} sx={{ padding: "10px" }}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">
            {currId ? "Edit" : "Create"} a post
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            sx={{ mt: "8px", paddingBottom: "8px" }}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <div>
            <FileBase type="file" mulitple={false} onDone={uploadImage} />
          </div>
          <div>
            <Typography variant="caption">
              Acceptable file types: JPEG ,PNG, GIF, WEBP, SVG
            </Typography>
          </div>
          {wrongImageType ? "Please select an acceptable file type" : ""}

          <Button
            sx={{ mt: "8px" }}
            disabled={wrongImageType}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
