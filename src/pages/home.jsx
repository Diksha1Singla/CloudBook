// import { Navbar } from "../components/Navbar"
import backgroundAnimation from "../images/background.mp4"

export const  Home = ()=>{
    return (
        <div className="video-background">
            <video autoPlay loop muted>
                <source src={backgroundAnimation} type="video/mp4"/>
            </video>
            <h1 className="homeStyle">Welcome to home page</h1> 
        </div>
    )
}