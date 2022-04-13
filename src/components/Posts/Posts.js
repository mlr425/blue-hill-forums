import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Paper,Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import InfiniteScroll from "react-infinite-scroller";
import Loading from '../Utilities/UtilComponents/Loading'

//https://github.com/danbovey/react-infinite-scroller#readme

const Posts = () => {
  const [page, setPage] = useState(2);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { totalNumberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(getPosts(1));
  }, [dispatch]);

  const handleNextCall = async () => {
    //console.log('hasmore?',hasMorePosts, page)
    if (page <= totalNumberOfPages) {
      dispatch(getPosts(page));
      setPage((p) => p + 1);
      return;
    }
    setHasMorePosts(false);
  };

  if (!posts?.length && !isLoading) {
    return <Paper>No posts to display</Paper>;
  }

  return (
    <>
    {/* <div onClick={() => setCount(p => p+1)}>{count}</div> */}
      {/* {posts?.length} */}
      <InfiniteScroll
        initialLoad={false}
        pageStart={2}
        threshold={-5}
        hasMore={hasMorePosts}
        loadMore={handleNextCall}
        loader={<Loading key={page}/>}
      >
        <Grid container spacing={0}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12}>
              <Post post={post} />
              <Divider/>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Posts;

// return (
//   isLoading ? <CircularProgress/> : (
//     <>
//     {posts?.length}
//     <InfiniteScroll
//       initialLoad={false}
//       pageStart={2}
//       threshold={-5}
//       hasMore={hasMorePosts}
//       loadMore={handleNextCall}
//       loader={<Paper sx={{display:'flex', alignItems:'center',justifyContent:'center',fontSize:'20px'}} key={page}>Loading...</Paper>}
//     >
//       <Grid container spacing={1} >
//         {posts.map((post) => (
//           <Grid item key={post._id} xs={12} >
//             <Post post={post} setCurrId={setCurrId} />
//           </Grid>
//         ))}
//     </Grid>
//     </InfiniteScroll>

//     </>
//   )
// )

// <InfiniteScroll
//                             dataLength={Number(totalNumberOfPages) * 4}
//                             next={getPosts(page+1)}
//                             hasMore={page === Number(totalNumberOfPages) ? false : true}
//                             endMessage={
//                                 <p style={{ textAlign: 'center' }}>
//                                   <b>Yay! You have seen it all</b>
//                                 </p>
//                               }
//                         >

//                         </InfiniteScroll>
