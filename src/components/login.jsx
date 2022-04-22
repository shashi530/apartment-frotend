import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {

    const [form,setform]=useState({})

    const Postdata = (e)=>{
        e.preventDefault()
         axios.post("https://fullst.herokuapp.com/login",form).then((res)=>{console.log(res.data.token,"ress")
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

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"  onChange={((e)=>{Handledata(e)})} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password"  onChange={((e)=>{Handledata(e)})} required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  onClick={((e)=>{Postdata(e)})}>Loginin</button>
                <Link  to={"/signup"}>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                </Link>
               
                <p className="forgot-password text-right">
                 
                </p>
            </form>
        );    
}