
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const Searchbar =()=>{

   
    const [filter,setfilter]=useState([])
    const [focused, setFocused] = useState(false)
    const [loading, setloading] = useState(false);
    const [Error, setError] = useState(false);
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false);


    useEffect(()=>{getData()},[])

    const [data,setdata]=useState([])
  

    const handleSearch=(e)=>{
      
        const filteredContacts = e.length === 0 ? data : 
        data.filter(contact => contact.block.toLowerCase().includes(e.toLowerCase()))

                    
                    setfilter(filteredContacts)
    }
    const getData =()=>{
        axios.get("https://fullst.herokuapp.com/product").then(({data})=>{
            
            setdata(data)
            setloading(true);
        }).catch((err) => {
            setloading(false);
            setError(true);
          });
    }



    return (

        <>
        <div>
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
        </Link></div>
        <div id='baseinp' style={{boxShadow:focused?'inset 0 -2px 0 black':"",
        position:'relative', transition:'all 0.5s',textAlign:"center"
    }}>
        <svg width="30px" height="30px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5834 5.16602C14.5001 2.08268 9.50008 2.08268 6.41675 5.16602C3.33341 8.24935 3.33341 13.3327 6.41675 16.416L12.0001 21.9993L17.5834 16.3327C20.6667 13.3327 20.6667 8.24935 17.5834 5.16602ZM12.0001 12.416C11.0834 12.416 10.3334 11.666 10.3334 10.7493C10.3334 9.83268 11.0834 9.08268 12.0001 9.08268C12.9167 9.08268 13.6667 9.83268 13.6667 10.7493C13.6667 11.666 12.9167 12.416 12.0001 12.416Z" fill="#000000"></path></svg>

        <input type="text" className="search" placeholder="Search block" style={{height:"68px",width:"858px",marginTop:"70px"}}  onFocus={onFocus} onBlur={onBlur} onInput={((e)=>{
            handleSearch(e.target.value)
        })}/>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell align="right"><button onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>a.number-b.number)]))
        })}>Ascending</button></TableCell>
            <TableCell align="right"><button onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>a.residents-b.residents)]))
        })}>Ascending</button></TableCell>

{/* filter */}

        
      
<TableCell align="right"><button onClick={(()=>{
   axios.get("https://fullst.herokuapp.com/product").then((res)=>{
    return (setfilter([...res.data.filter((el)=>el.flat==="owner")]))
   
})})}>owner</button></TableCell>




{/* filter */}

            <TableCell align="right"><button  onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>a.block-b.block)]))
        })}>Ascending</button></TableCell>
        
          </TableRow>
          <TableRow>
        <TableCell></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>b.number-a.number)]))
        })} >decending</button></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>b.residents-a.residents)]))
        })} >decending</button></TableCell>
         <TableCell align="right"><button onClick={(()=>{
   axios.get("https://fullst.herokuapp.com/product").then((res)=>{
    return (setfilter([...res.data.filter((el)=>el.flat==="rental")]))
   
})})}>rental</button></TableCell>
            <TableCell align="right"><button  onClick={(()=>{
          return (setfilter([...filter.sort((a,b)=>b.block-a.block)]))
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
          { filter.map((row) => (
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
      
     

      
    )
    
}