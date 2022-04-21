import axios from "axios"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from "react"
import { Searchbar } from "./search";
import { Link } from "react-router-dom";

export const Home=()=>{

    useEffect(()=>{
        axios.get("https://fullst.herokuapp.com/product").then((res)=>{
            setdb([...res.data])
           
        })
    },[])

    const [db,setdb]=useState([])
    const [fil,setfil]=useState([])

   



  return (
    <>

      <Link  to={"/search"}>
        <h2>Search</h2>
        </Link>
        <Link  to={"/login"}>
        <h2>login</h2>
        </Link>
        <Link  to={"/signup"}>
        <h2>register</h2>
        </Link>
        <Link  to={"/home"}>
        <h2>home</h2>
        </Link>
    
  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell align="right"><button onClick={(()=>{
          return (setdb([...db.sort((a,b)=>a.number-b.number)]))
        })}>Ascending</button></TableCell>
            <TableCell align="right"><button onClick={(()=>{
          return (setdb([...db.sort((a,b)=>a.residents-b.residents)]))
        })}>Ascending</button></TableCell>

{/* filter */}

        
      
<TableCell align="right"><button onClick={(()=>{
   axios.get("https://fullst.herokuapp.com/product").then((res)=>{
    return (setdb([...res.data.filter((el)=>el.flat==="owner")]))
   
})})}>owner</button></TableCell>




{/* filter */}

            <TableCell align="right"><button  onClick={(()=>{
          return (setdb([...db.sort((a,b)=>a.block-b.block)]))
        })}>Ascending</button></TableCell>
        
          </TableRow>
          <TableRow>
        <TableCell></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setdb([...db.sort((a,b)=>b.number-a.number)]))
        })} >decending</button></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setdb([...db.sort((a,b)=>b.residents-a.residents)]))
        })} >decending</button></TableCell>
         <TableCell align="right"><button onClick={(()=>{
   axios.get("https://fullst.herokuapp.com/product").then((res)=>{
    return (setdb([...res.data.filter((el)=>el.flat==="rental")]))
   
})})}>rental</button></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setdb([...db.sort((a,b)=>b.block-a.block)]))
        })} >decending</button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>.</TableCell>
            <TableCell align="right">regional Number</TableCell>
            <TableCell align="right">distance from office</TableCell>
            <TableCell align="right">type</TableCell>
            <TableCell align="right">block name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { db.map((row) => (
            <TableRow
        
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
            
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.residents}</TableCell>
              <TableCell align="right">{row.flat}</TableCell>
              <TableCell align="right">{row.block}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  );
}


