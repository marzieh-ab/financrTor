import React from 'react'
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';


const GET_ME_QUERY = gql`
 query Query {
  me {
    myTags {
      _id
      color
      expenseCount
      name
    }
    name
    username
    img
    _id
  }
}
`;



const IconStack = styled(Stack)(({ theme }) => ({
  width:"400px",
  border:"1px solid #ccc",
  
  margin:"auto",
  padding:"40px"
 
}));


export default function User() {

  const { error, loading, data, refetch } = useQuery(GET_ME_QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <IconStack  sx={{justifyContent:"center",alignItems:"center" ,}}>
      <Typography  variant='h5' sx={{margin:"20px"}}>Profile Info</Typography> 
       <Avatar  src="images/userImage.png" sx={{width:"100px",height:"100px",margin:"10px 0"}} />
       <TextField   type="file"   sx={{margin:"10px 0",backgroundColor:"transparent"}} />
      


       <TextField   type="text"  variant="standard"  

       value={data.me.name}
         sx={{margin:"10px 0",backgroundColor:"transparent",width:"348px",borderBottom:"1px solid #ccc"}} />

      <Link  to={`/dashboard/editprofile/${data.me._id}`}>
      <Button variant="contained" sx={{marginTop:"20px"}}  >
            edit
          </Button>
      </Link>


      


    </IconStack >
  )
}
