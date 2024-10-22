import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../store/auth_store"
import { useEffect } from "react";
export const Navbar = ()=>{
    let location = useLocation();
    useEffect(()=>{},[location])
    const {isLoggedIn} = useAuth()
    return(
        <>
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" href="#">CloudBook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname == "/" ? "active":""}`} aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname == "/notes" ? "active":""}`}  aria-current="page" to="/notes">Notes</NavLink>
                            </li>
                            <li>
                                {
                                    isLoggedIn ? 
                                       
                                        <li className="nav-item">
                                            <NavLink className={`nav-link ${location.pathname == "/logout" ? "active":""}`}  aria-current="page" to="/logout">Logout</NavLink>
                                        </li>
                                        
                                    :
                                    <>
                                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                            <li className="nav-item" style={{display:"flex",flexDirection:"column"}}>
                                                <NavLink className={`nav-link ${location.pathname == "/register" ? "active":""}`}  aria-current="page" to="/register">Register</NavLink>
                                            </li>
                                            <li className="nav-item" style={{display:"flex",flexDirection:"column"}}>
                                                <NavLink className={`nav-link ${location.pathname == "/login" ? "active":""}`}  aria-current="page" to="/login">Login</NavLink>
                                            </li>
                                        </ul>
                                    </>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}