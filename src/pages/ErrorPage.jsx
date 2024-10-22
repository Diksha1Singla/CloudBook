import { NavLink } from "react-router-dom"

export const ErrorPage=()=>{
    const divStyle = {
        backgroundColor : 'white',
        margin:'2rem'
    }
    return(
        <>
            <h1>Erorr Page</h1>
            <section style={divStyle}>
                <div>
                    <h2>404</h2>
                    <h4>Sorry!Page not found</h4>
                    <div>
                        <NavLink to="/">Return to home Page</NavLink>
                        <NavLink to="/contact">Report Problem</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}