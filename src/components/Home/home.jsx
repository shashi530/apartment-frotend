import { useState, useEffect } from "react";
import { addFlats } from "../../Redux/Flats/action.js";
import { addResidents } from "../../Redux/Residents/action.js";
import { sortAsc ,  sortDsc } from "../../Redux/Flats/action.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import CircularIndeterminate from "./spinners";
import { Navigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const Home = () => {
  const { flats } = useSelector((store) => store.flats);
  const [flatData, setflatData] = useState([]);

  const [loading, setloading] = useState(false);
  const { isLogged } = useSelector((store) => store.admin);

  const dispatch = useDispatch();

  const getFlatsData = () => {
    setloading(true);
    fetch("https://apartmentsbackend.herokuapp.com/flats")
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFlats(data));
        setflatData([...data]);
        setloading(false);
      });
  };

  const getclassData = () => {
    fetch("https://apartmentsbackend.herokuapp.com/residents")
      .then((res) => res.json())
      .then((data) => dispatch(addResidents(data)));
  };

  useEffect(() => {
    getFlatsData();
    getclassData();
  }, []);

  const handleFiltering = (e) => {
    let value = e.target.value;
    let sub = flats.filter((e) => e.resident_type === value);
    setflatData([...sub]);
  };

  const handleSorting = (e) => {
    let value = e.target.value;
    if(value === "asc"){
      let sub = flats.sort((a , b) => ((+a.flat_no) - (+b.flat_no)));
      setflatData([...sub]);
    }else{
      let sub = flats.sort((a , b) => ((+b.flat_no) - (+a.flat_no)));
      setflatData([...sub]);
    }
  }

  const handleDelete = (id) => {
    fetch(`https://apartmentsbackend.herokuapp.com/flats/${id}`, {
      method: "DELETE"
    }).then(alert("Proceed to Delete?"))
    .then(getFlatsData())
  }

  if (!isLogged) {
    return <Navigate to={"/signup-login/"}></Navigate>;
  }

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "55%",
          margin: "auto",
        }}
      >
        <label
          style={{
            margin: "2% auto",
            height: "35px",
            border: "1px solid lightblue",
            backgroundColor: "#616161",
            color: "black",
            fontWeight: "600",
            borderRadius: "6px",
            padding: "5px",
          }}
          htmlFor=""
        >
          <strong>Filter By Resident Type</strong>
        </label>
        <select
          style={{ margin: "2% auto", height: "35px" }}
          onChange={handleFiltering}
          name=""
          id=""
        >
          <option value="--">Select Residnet Type</option>
          <option value="rent">Rent</option>
          <option value="own">Own</option>
        </select>
        
        <label
          style={{
            margin: "2% auto",
            height: "35px",
            border: "1px solid lightblue",
            backgroundColor: "#616161",
            color: "black",
            fontWeight: "600",
            borderRadius: "6px",
            padding: "5px",
          }}
          htmlFor=""
        >
          <strong>Sort By Flat No</strong>
        </label>
        <select
          style={{ margin: "2% auto", height: "35px" }}
          onChange={handleSorting}
          name=""
          id=""
        >
          <option value="--">Select Order For Sorting</option>
          <option value="asc">low to high</option>
          <option value="des">high to low</option>
        </select>
      </div>
      <TableContainer component={Paper} color="white">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#ID</StyledTableCell>
            <StyledTableCell>Flat Name</StyledTableCell>
            <StyledTableCell>Total No of Residents</StyledTableCell>
            <StyledTableCell>Flat No</StyledTableCell>
            <StyledTableCell>Block Name</StyledTableCell>
            <StyledTableCell>Resident Type</StyledTableCell>
            <StyledTableCell>Flat Image</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {flatData.map((e) => (
            <StyledTableRow key={e._id}>
              <StyledTableCell component="th" scope="row">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e._id}
                </Link>
                </StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_name}
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.total_residents}
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_no}
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.block_name}
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.resident_type}
                </Link>
              </StyledTableCell>

              <StyledTableCell align="left">
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  <img
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={e.flat_img}
                    alt=""
                  />
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Button>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "600",
                  }}
                  onClick = {() => {handleDelete(e._id)}}
                >
                  Delete
                </Button>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>      
      </TableContainer>
    </>
  );
};