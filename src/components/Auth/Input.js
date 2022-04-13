import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from '@mui/material'

import {MdOutlineVisibilityOff, MdOutlineVisibility} from 'react-icons/md'


//generalized input field for logging in / signing up

const Input = ({name, label, autoFocus, type, handleChange, handleShowPassword}) => {

  return (
    <Grid item xs={12} >
        <TextField
            name={name}
            onChange={handleChange}
            label={label}
            autoFocus={autoFocus}
            variant='outlined'
            type={type}
            required
            fullWidth
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type ==='password' ? 
                                    <MdOutlineVisibility/> 
                                : 
                                    <MdOutlineVisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: (
                null
            )}
        />
    </Grid>
  )
}

export default Input