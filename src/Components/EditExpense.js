import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
  } from "react";
  import { useParams,useNavigate } from 'react-router-dom'
  import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Button,
    unstable_toUnitless,
  } from "@mui/material";
  import { gql, useMutation, useQuery } from "@apollo/client";
  
  import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import moment from 'jalali-moment'
  
  import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import { Icon } from "leaflet";
  import markerIconPng from "leaflet/dist/images/marker-icon.png";
  import AddLocationIcon from "@mui/icons-material/AddLocation";

  
  
  const GET_ALL_EXPENSE=gql`
    query Query {
      getMyExpenses {
        _id
        amount
        date
        geo {
          lat
          lon
        }
        tag {
          _id
          color
          expenseCount
          name
        }
      }
     
     
    }

    
  `

  const EDIT_EXPENSE=gql`
  mutation Mutation($id: ID!, $data: ExpenseInfo!) {
  edit_expense(_id: $id, data: $data) {
    msg
    status
  }
}
  `

  
 
  
  export default function EditExpense() {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(null)
    const [tag, setTag] = useState('');

    const [color,setColor]=useState("")
    const[ expenseCount,setExpenseCount]=useState("")
    const [name,setName]=useState("")
    const[id,setId]=useState("")

    const [edit]=useMutation(EDIT_EXPENSE)
    // console.log(tag,"tag")

    let params = useParams()
    let index=params.id

    const center = [51.505, -0.09];
    const zoom = 13;
  
    const markerRef = useRef(null);
    const { loading, error, data, refetch } = useQuery(GET_ALL_EXPENSE);

     console.log(date)

    useEffect(() => {
        if (data) {
            console.log("ok")
          const expenses=data.getMyExpenses;
          const expense=expenses.find(item=>item._id==index)
          console.log(expense,"setAmount")
          setAmount(expense.amount)
          // setDate(`${expense.date.year} ${expense.date.month} ${expense.date.day}`)
          setDate(expense.date)
          setTag(expense.tag.name)
        
         
        
    
          
        }
      }, [data]);
   
  
   
  
  
    console.log(markerRef, "ref");

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    console.log(data)

    // getMyExpenses
  
    // const addExpense = async() => {
    //   console.log("ok");
    //   // console.log(markerRef._current)
    //   console.log(markerRef.current);
    //   // console.log(markerRef.current.getCenter())
    //   const x = markerRef.current.getCenter();
    //   const geo = {
    //     lat: x.lat,
    //     lon: x.lng,
    //   };
    //   // console.log(tag,"tag")
    //   // console.log(amount,"amount")
  
    //   const day = value?.toDate?.().toString();
    //   // console.log(typeof amount)
  
    //   const dataEx = {
    //     amount: Number(amount),
    //     date: day,
    //     geo: geo,
  
    //     tag: tag,
    //   };
     
  
    //   try {
    //     const { data } = await create({
    //       variables: {
    //         data: dataEx
    //       },
    //     });
    //     console.log(data,"data")
  
       
    //     window.location.assign("/dashboard/allexpense");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    const editExpense=async()=>{
        console.log(markerRef.current);
        // console.log(markerRef.current.getCenter())
        const x = markerRef.current.getCenter();
        const geo = {
          lat: x.lat,
          lon: x.lng,
        };
      
        // let newDate=moment().locale("en").format()

        // console.log( typeof  newDate,newDate)

        // new Date(newDate)

        console.log(tag,"tag")

     



       
      

        const dataEx = {
            amount: Number(amount),
            // date: newDate,
            date:date,
            geo: geo,
            tag:tag,
          };
          console.log(dataEx,"dataEx")

        try {
            const { data } = await edit({
              variables: {
                id:index,
                data: dataEx
                
                
              },
            });
            console.log(data)
            window.location.assign("/dashboard/allexpense");
          } catch (error) {
            console.log(error);
          }
    }
  
      
   
   
    
  
    return (
      <>
     
      <Stack
       
          sx={{
            padding: "10px",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap:"wrap",
            direction:{xs:"column" ,md:"row" }
           
           
  
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <TextField
              id="outlined-basic"
              label="amount"
              variant="outlined"
              sx={{ width: "330px", margin: "10px 0" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Box>
            <DtPicker onChange={setDate}
            // value={(e)=>setDate(e.target.value)}
            initValue={date}

            // onCalenderChange={handleCalendarChange}


          
          showWeekend
          headerClass='custom-header'
          local="fa"
         
         
          />
             
            </Box>
  
            <div>
              <FormControl sx={{ mt: 1, width: "336px" }}>
                <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={tag}
                
                  onChange={(e) => setTag(e.target.value)}
                >
                   
{/*                
                   <MenuItem >{tag}</MenuItem>;
   */}
                  {data.getMyExpenses.map((item) => {
                   
                  

                    return <MenuItem value={item.tag._id}>{item.tag.name}</MenuItem>;
                  })}
  
      
                </Select>
              </FormControl>
            </div>
          </Box>
  
          <Box sx={{  width: { xs: "100%", md: "50%" }  ,marginTop:{xs:"20px"} }}>
            <MapContainer
              ref={markerRef}
              center={center}
              zoom={10}
              style={{ width: "50wh", height: "50vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
  
   <AddLocationIcon
              sx={{
                color: "blue",
                fontSize:"40px",
                top: "calc(50% - 24px)",
                left: "calc(50% - 24px)",
                zIndex: "1000",
                position: "absolute",
              }}
            />
            
  
             
            </MapContainer>
          </Box>
  
          <Box  >
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={editExpense}
          >
            Edit
          </Button>
        </Box>
        </Stack>
  
   
      
       
      </>
    );
  }
  