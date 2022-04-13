import React, { useState, memo } from 'react'
import {
    Button,
    Grid,
  } from "@mui/material";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {likePost} from '../../actions/posts';
import {getLocalStorageUser} from '../Utilities/UtilsJS/UtilJS'

const Like = ({post}) => {
    const [likes, setLikes] = useState(post?.likes);
    const user = getLocalStorageUser()
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLike = async () => {
        if (!user) {
          //if the user isnt signed in, redirect them to login/create an acc
          return navigate("/auth");
        }
        dispatch(likePost(post._id));
        if (hasLikedPost) {
          setLikes(likes.filter((id) => id !== userId));
        } else {
          setLikes([...likes, userId]);
        }
      };

    return (
        <Grid item>
            <Button
                size="small"
                sx={{ fontSize: "25px" }}
                color="primary"
                onClick={handleLike}
            >
                ^
            </Button>
            <Grid
                item
                xs={12}
                sx={{ fontSize: "25px", display: "flex", justifyContent: "center" }}
            >
                {likes.length > 0 ? likes.length : null}
            </Grid>
        </Grid>
    )
}

export default memo(Like)