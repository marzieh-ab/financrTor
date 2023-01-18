import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

const EDIT_MY = gql`
  mutation Mutation($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      msg
      status
    }
  }
`;

const GET_ME_QUERY = gql`
  query Query {
    me {
      _id
      name
      username
      img
    }
  }
`;

const IconStack = styled(Stack)(({ theme }) => ({
  width: "400px",
  border: "1px solid #ccc",

  margin: "auto",
  padding: "40px",
}));

const EditProfile = () => {
  const [editpro] = useMutation(EDIT_MY);
  const { error, loading, data, refetch } = useQuery(GET_ME_QUERY);
  const [name, setName] = useState();
  const [userFile, setUserFile] = useState(null);
  const [ userImage, setUserImage ] = useState()
  let params = useParams();
  let index = params.id;

  console.log(data, "data");
  console.log(userFile)

  useEffect(() => {
    if (data) {
      setName(data.me.name);
      setUserImage(data.me.img)

    }
  }, [data]);

  const editPro = async() => {

    try {
        const { data } = await editpro({
          variables: {
            name:name,
            img:userImage
          
           
          },
        });
        console.log(data)
        window.location.assign("/dashboard/user");
      } catch (error) {
        console.log(error);
      }


  };

  return (
    <IconStack sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" sx={{ margin: "20px" }}>
        Profile Info
      </Typography>
      <Avatar
        src="images/userImage.png"
        sx={{ width: "100px", height: "100px", margin: "10px 0" }}
      />
      <TextField
        type="file"
        sx={{ margin: "10px 0", backgroundColor: "transparent" }}
        onChange={(e) => setUserFile(e.target.files[0])}
      />
   
      <TextField
        type="text"
        variant="standard"
        sx={{
          margin: "10px 0",
          backgroundColor: "transparent",
          width: "348px",
          borderBottom: "1px solid #ccc",
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button variant="contained" sx={{ marginTop: "20px" }} onClick={editPro}>
        edit
      </Button>
    </IconStack>
  );
};

export default EditProfile;
