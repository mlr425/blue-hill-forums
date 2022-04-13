import React from "react";
import { useNavigate } from "react-router-dom";
import Like from '../../Like/Like';
import moment from "moment";
import defaultImage2 from "../../../images/defaultImage2.png";
import {
  Card,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

//detail is the param to determine 
//if we're on 'first level' displaying posts
//vs second level, inside a post 

const Post = ({ post, detail  }) => {
  const navigate = useNavigate();

  const openPost = () => {
    if(detail){
      return
    }
    return navigate(`/posts/${post._id}`);
  };

  const openProfile = () => {
    return navigate(`/profile/${post.creator}`)
  }



  // ##ccd1d9
  // #f7f8fc
  

  return (
    <Card
      sx={{backgroundColor: "#e6e9ed" }} elevation={0}
    >
      <Grid container >
        <Like post={post}></Like>
        <Grid item onClick={openPost}>
          <CardMedia
            sx={{
              padding: "8px",
              height: "120px",
              width: "120px",
              borderRadius: "10%",
              cursor: detail ? '' : 'pointer',
              
            }}
            component="img"
            image={
              post?.selectedFile?.length > 0 ? post.selectedFile : defaultImage2
            }
            title={post.title}
          />
        </Grid>

        <Grid item lg={8} md={5} sm={8} xs={12}
        sx={{
          paddingLeft:'15px',
          paddingBottom:'10px',
          wordWrap: "break-word"
          }}>
          <Typography sx={{cursor: detail ? '' : 'pointer'}} onClick={openPost}   variant="h6">{post.title}</Typography>
          <Typography variant="body6">
            Posted by&nbsp;
            <Typography variant="body6" sx={{cursor: detail ? '' : 'pointer'}} onClick={openProfile}>
              {post.name}
            </Typography>
            &nbsp;{moment(post.createdAt).fromNow()}
          </Typography>
          <Grid item>
            {post.comments.length > 0 ? (
              <Typography variant="body6">
                Comments: {post.comments.length}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Post;
