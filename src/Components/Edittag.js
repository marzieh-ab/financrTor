import React,{useState,useEffect} from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import {
    Box,
    Button,
    Stack,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
  import { SketchPicker } from "react-color";
  import { useParams,useNavigate } from 'react-router-dom'

  const GET_MY_TAGS = gql`
  query GetMyTags {
    getMyTags {
      _id
      color
      expenseCount
      name
    }
  }
`;

const EDIT_TAG=gql`
mutation Edit_tag($id: ID!, $data: tagInfo!) {
  edit_tag(_id: $id, data: $data) {
    msg
    status
  }
}
`

const Edittag = () => {

    const[name,setName]=useState("")
    const[color,setColor]=useState("")
    const [currentColor, setCurrentColor] = useState("#fff");
    console.log( typeof(color))
    let params = useParams()
    let index=params.id

    const { loading, error, data, refetch } = useQuery(GET_MY_TAGS);
 
    
    const [edit]=useMutation(EDIT_TAG)
  

      useEffect(() => {
        if (data) {
          const tags=data.getMyTags;
          const tag=tags.find(item=>item._id==index)
          setName(tag.name)
          setColor(tag.color)
    
          refetch();
        }
      }, [data]);

     
  

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const hanselChange = (color) => {
        setColor(color.hex);
      };

      const editTag=async()=>{
        try {
          const { data } = await edit({
            variables: {
              id:index,
              data: {
                color: color,
                name: name,
              },
            },
          });
          console.log(data)
          window.location.assign("/dashboard/tag");
        } catch (error) {
          console.log(error);
        }
       
        

      }

   
   
    return (
        <Box sx={{ width: "20%" }}>
        <Typography variant="h6" sx={{ taxtAling: "center", padding: "4px" }}>
          Edit Tag
        </Typography>
        <Box sx={{ margin: "10px" }}>
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ margin: "10px" }}>
          <TextField
            id="outlined-basic"
            label="color"
            variant="outlined"
            value={color}
            // onChange={(e)=>setColor(e.target.value)}
            onChange={hanselChange}
          />
          <SketchPicker  color={currentColor} onChangeComplete={hanselChange} />
        </Box>
        <Box
          sx={{
            margin: "15px",
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={editTag} >
            edit
          </Button>
        </Box>
      </Box>
       
    );
}

export default Edittag;
