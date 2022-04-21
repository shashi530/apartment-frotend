
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {

   

    const [form,setform]=useState({})

    const Postdata = (e)=>{
        e.preventDefault()
         axios.post("https://fullst.herokuapp.com/signup",form).then((res)=>{console.log(res.data,"post")
         if(res.data.token){
            window.location.href = "/home";
        }
        else{
            alert("TRY ANOTHER")
        }
        }).catch((e)=>{console.log(e)}).catch((e)=>{console.log(e)})
    }

    const Handledata = (e)=>{
        e.preventDefault()
        const {id,value} =e.target
        setform({...form,[id]:value})
        console.log(form,"bhh")
    }
    
        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" id="name" placeholder="First name" onChange={((e)=>{Handledata(e)})} required />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control"  id="lastname" placeholder="Last name" onChange={((e)=>{Handledata(e)})} required/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"  id="email" placeholder="Enter email" onChange={((e)=>{Handledata(e)})} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  id="password" placeholder="Enter password" onChange={((e)=>{Handledata(e)})} required/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={((e)=>{Postdata(e)})}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <Link  to={"/login"}>login</Link>
                </p>
            </form>
        );
    
}