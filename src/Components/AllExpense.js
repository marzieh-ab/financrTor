import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import moment from 'jalali-moment'


const GET_EXPENSE=gql`
query GetMyExpenses {
    getMyExpenses {
      _id
      amount
      date
      tag {
        _id
        color
        expenseCount
        name
      }
    }
  }



`

const DELETE_EXPENSE=gql`
mutation Mutation($id: ID!) {
  delete_expense(_id: $id) {
    msg
    status
  }
}
`

export default function AllExpense() {
    const [dataExpense, setDataExpense] = useState([]);
    const [deleteExpense] = useMutation(DELETE_EXPENSE);

    const { loading, error, data, refetch } = useQuery(GET_EXPENSE);
    console.log(data)

    useEffect(() => {
        if (data) {
            setDataExpense(data.getMyExpenses );
    
          refetch();
        }
      }, [data]);
    
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const deleteExpensse=async(id)=>{
        console.log(id)

        try {
            const { data } = await deleteExpense({
              variables: {
                id:id,
               
              },
            });
            console.log(data)
            refetch()
          
          } catch (error) {
            console.log(error);
          }


      }



  return (

    <Box sx={{ width: "90%", marginTop: "20px" }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
         
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right"  sx={{text:"center"}}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {dataExpense.map(item=>{
            
            
                return(
                    <TableRow
             
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                     {item.tag.name}
                    </TableCell>
                    <TableCell
                      align="right"
                  
                    >
                      {item.amount
}
                    </TableCell>
                    <TableCell align="right">{`${item.date.year} -  ${item.date.month}- ${item.date.day}`}</TableCell>
                    <TableCell align="right" onClick={() => deleteExpensse(item._id)}>
                      <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                    </TableCell>
                    <Link  to={`/dashboard/editexpense/${item._id}`} p={6}  >
                      <TableCell align="right" >
                        <ModeEditIcon
                          sx={{ color: "green", cursor: "pointer" }}
                        />
                      </TableCell>
                    </Link>
                  </TableRow>


                )

            })}
      
          
       
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
    
  )
}
