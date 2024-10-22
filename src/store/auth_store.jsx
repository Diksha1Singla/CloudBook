import { createContext,useContext,useEffect,useState } from "react";

// context
export const authContext = createContext();

// provider
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children})=>{
    const host="http://localhost:2000/notes"

    const InitialNotes = []

    const [notes,setNotes] = useState(InitialNotes)
    
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [user,setUser] = useState("")
        // reusable function
    const storetoken=(token)=>{
        setToken(token)
        return localStorage.setItem("token",token)  
    }

    let isLoggedIn = !!token;

    const LogoutUser =()=>{
        // const confirmLogout = window.confirm("Are you sure you want to log out?");
        // if (confirmLogout == true)
        setToken("")
        return localStorage.removeItem("token")
    }

    const userAuthentication = async()=>{
        try {
            const response = await fetch("http://localhost:2000/user",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            if(response.ok){
                const data = await response.json()
                setUser(data.userData);
            }
        } catch (error) {
            console.log(error)
        }
    }
                                                       
    const getAllNotes = async()=>{
        const url = `${host}/fetchNotes`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                "AuthToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjg3MjI3ODQsImV4cCI6MTcyOTkzMjM4NH0.SOJfUNFdQ82GpM0WMYeTxw3GMQ1vwbvvjJTkl8PXaV0"
                // "AuthToken" : localStorage.getItem("token")
            }
        })
        // console.log("response data: ",response);
        
        const json = await response.json();

        // console.log("json data: ",json);
        setNotes(json)
    } 

    const addNote =  async(title,description,tag)=>{
        const url = `${host}/addNotes`;
        // fetching api
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                // "AuthToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU4MjkzNjcsImV4cCI6MTcyNzAzODk2N30.O7RXZ2qoU6GOK6pRWorUtuuvY5Y_Ru8_RmbocyDrKRE"
            },
            body:JSON.stringify({title,description,tag})
        });
        // console.log("response",response);
        const note = await response.json();
        // const note = {
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     // "_id": "66dfef65f0fb9ec46112127d",
        //     // "date": "2024-09-10T07:04:05.231Z",
        //     // "__v": 0
        // };

        setNotes(notes.concat(note))
    }

    const deleteNote = async(id)=>{
        const url = `${host}/deleteNotes/${id}`;
        // fetching api
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                // "AuthToken" : localStorage.getItem("token")
                "AuthToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjg5MjgxMTAsImV4cCI6MTczMDEzNzcxMH0.T_fNjQ_Oyq64fED6yqO1szAMLXvNSNrYvK55eyYFCvk"
            },
            // body:JSON.stringify(id)
        });
        const json = await response.json();
        console.log("jsonDta for add note : ",json);

        // console.log(response);
        console.log("Deleting note with id = ",id);
        setNotes(notes.filter(note => (note._id !== id)));
    }

    const editNote = async(id,title,description,tag)=>{
        // const data=""
        const url = `${host}/updateNotes/${id}`;
        // fetching api
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id,title,description,tag})
        });
        const jsonData = await response.json();
        console.log(jsonData);
        const newnotes = JSON.parse(JSON.stringify(notes))
        // console.log(newnotes)
        for(let index=0;index<newnotes.length;index++){
            if(newnotes[index]._id===id){                
                newnotes[index].title=title;
                newnotes[index].description=description;
                newnotes[index].tag=tag;
                break;
            }
        }
        setNotes(newnotes);
    }

    useEffect(()=>{
        // getServices();
        userAuthentication();
    },[])

   // value={} is props
    return (
        <authContext.Provider value={{isLoggedIn,storetoken,LogoutUser,user,notes,setNotes,addNote,deleteNote,editNote,getAllNotes}}>      
            {children}
        </authContext.Provider>
    )
}

// consumer
export const useAuth = () => {
    const authContextValue = useContext(authContext);
    if(!authContextValue){
        throw new Error("Invalid")
    }
    return authContextValue
}