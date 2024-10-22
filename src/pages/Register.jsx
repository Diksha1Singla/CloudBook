import Pic from "../images/background.png"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth_store"
export const Register = () =>{

    const [user,setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })

    const navigate = useNavigate();
    const {storetoken} = useAuth()
    const handleChnage = (e)=>{
        let name = e.target.name
        let value = e.target.value;

        setUser({
            ...user,               //to prevent previous user   
            [name] : value          // dynamic data
        });
        
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();    //prevent page refresh
        // alert(user);
        try {
            const response = await fetch("http://localhost:2000/register",{
                method:'POST',
                headers:{
                    'Content-Type' : "application/json"
                },
                body:JSON.stringify(user)
            })
            console.log(response);
            if(response.ok){
                const res_data = await response.json();
                // localStorage.setItem("token",res_data.token)        problem in it is we have to define it multiple times whenever we need to generate token easy is to create function
                alert("Registeration successfull")
                storetoken(res_data.token);      
                setUser({
                    username:"",
                    email:"",
                    phone:"",
                    password:""
                })
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            {/* <div className="container"> */}
                <div className="row row-cols-2">   {/* row-cols-2 each row 2 columns */}
                    <div className="col text-center" style={{marginTop:"3rem"}}>
                        <img src={Pic} alt="Pic"/>
                    </div>
                    <div className="col" style={{marginTop:"3rem"}}>
                        <h1 style={{color:"white"}}>Register Here</h1>
                        {/* <div> */}
                            <form className="px-4 py-4" onSubmit={handleSubmit} style={{color:"white"}}>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormUsername" className="form-label">UserName</label>
                                    <input type="text" name="username" value={user.username} onChange={handleChnage} className="form-control" id="exampleDropdownFormUsername" placeholder="enter username"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                                    <input type="email" name="email" value={user.email} onChange={handleChnage} className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPhone" className="form-label">Phone Number</label>
                                    <input type="Number" name="phone" value={user.phone} onChange={handleChnage} className="form-control" id="exampleDropdownFormPhone" placeholder="876543456"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" value={user.password} onChange={handleChnage} className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                                        <label className="form-check-label" htmlFor="dropdownCheck">Remember me</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Register now</button>
                                <h6>Already Registered! <a href="/login">Login</a> here</h6>
                            </form>
                        {/* </div> */}
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}