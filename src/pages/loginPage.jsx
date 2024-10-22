import { useState } from "react"
import Pic from "../images/background.png"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth_store"

export const Login = () => {

    const [user,setUser] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();
    const {storetoken} = useAuth()
    const handleChnage = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();    //prevent page refresh
        try {
            const response = await fetch("http://localhost:2000/login",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body : JSON.stringify(user),
            })
            if(response.ok){
                const res_data = await response.json();
                // alert("Login Successful")
                // localStorage.setItem("token",res_data.token)         M1
                storetoken(res_data.token);      
                setUser({email:"",password:""});
                navigate("/")
            }
        } catch (error) {
            alert("InValid credential")
            console.log(error);
        }
    }
    return(
        <>
            <div className="container">
                <div className="row row-cols-2">   {/* row-cols-2 each row 2 columns */}
                    <div className="col" style={{marginTop:"3rem"}}>
                        <img src={Pic} alt="Pic"/>
                    </div>
                    <div className="col" style={{marginTop:"3rem"}}>
                        <h1 style={{color:"white"}}>LogIn Here</h1>
                        <div>
                            <form className="px-4 py-4" onSubmit={handleSubmit} style={{color:"white"}}>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                                    <input type="email"  name="email" value={user.email} onChange={handleChnage}  className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                                    <input type="password"  name="password" value={user.password} onChange={handleChnage}  className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">LogIn</button>
                            </form >
                        </div>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/register">New around here? Sign up</a>
                            <a className="dropdown-item" href="#">Forgot password?</a>
                    </div>
                </div>
            </div>
        </>
    )
}