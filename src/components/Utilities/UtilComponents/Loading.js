import React from 'react'
import { Container, Paper, CircularProgress} from '@mui/material'

const Loading = () => {
    return (
        <Container >
          <Paper sx={{display:'flex',justifyContent: "center",alignItems:'center', padding:'20px', backgroundColor:'#f7f8fc'}} elevation={0}>
            <CircularProgress size="7em"></CircularProgress>
          </Paper>
        </Container>
    );
}

export default Loading