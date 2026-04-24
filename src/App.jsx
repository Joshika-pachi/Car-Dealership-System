import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./services/supabaseClient"

import Sidebar from "./components/SideBar"

import Home from "./pages/Home"
import BrowseCars from "./pages/BrowseCars"
import CarDetails from "./pages/CarDetails"
import DealerDashboard from "./pages/DealerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Messages from "./pages/Messages"

function App(){

const [user,setUser] = useState(null)
const location = useLocation()

useEffect(()=>{
checkUser()

supabase.auth.onAuthStateChange((_event, session) => {
setUser(session?.user || null)
})

},[])

async function checkUser(){
const { data } = await supabase.auth.getUser()
setUser(data.user)
}

const showSidebar =
location.pathname === "/dealer" ||
location.pathname === "/admin" ||
location.pathname === "/messages"

return(

<div className="flex">

{/* ✅ Sidebar only for dashboards */}
{user && showSidebar && <Sidebar/>}

{/* ✅ Main content */}
<div className={`flex-1 min-h-screen bg-gray-100 ${showSidebar ? "" : "w-full"}`}>

<Routes>

{!user ? (
<>
<Route path="*" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</>
) : (
<>
<Route path="/" element={<Home/>}/>
<Route path="/cars" element={<BrowseCars/>}/>
<Route path="/car/:id" element={<CarDetails/>}/>
<Route path="/dealer" element={<DealerDashboard/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/messages" element={<Messages/>}/>
</>
)}

</Routes>

</div>

</div>
)
}

export default App