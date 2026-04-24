import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function Sidebar(){

const [user,setUser] = useState(null)
const [role,setRole] = useState(null)
const navigate = useNavigate()
const location = useLocation()

useEffect(()=>{

getUser()

// 🔥 listen for login/logout changes
supabase.auth.onAuthStateChange((_event, session) => {
setUser(session?.user || null)
getUser()
})

},[])

async function getUser(){

const { data } = await supabase.auth.getUser()

if(data.user){
setUser(data.user)

// 🔥 fetch role from DB
const { data: userData, error } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

// ✅ FIX: fallback if no role found
if(userData){
setRole(userData.role)
}else{
setRole("customer")   // 🔥 fallback
}

}
}

async function handleLogout(){
await supabase.auth.signOut()
window.location.reload()   // 🔥 refresh UI
}

// 🎯 active link highlight
const isActive = (path) => location.pathname === path

return(

<div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-6">

<div>

{/* LOGO */}
<h1 className="text-xl font-bold text-blue-600 mb-8">
MotoVerse
</h1>

{/* ROLE DISPLAY */}
<div className="mb-8">
<p className="text-xs text-gray-400">Logged in as</p>
<p className="text-sm font-semibold text-blue-600 capitalize">
{role || "customer"}
</p>
</div>

{/* MENU */}
<div className="flex flex-col gap-2 text-gray-700">

<Link
to="/"
className={`px-3 py-2 rounded-lg transition ${
isActive("/") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
}`}
>
🏠 Home
</Link>

<Link
to="/cars"
className={`px-3 py-2 rounded-lg transition ${
isActive("/cars") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
}`}
>
🚗 Browse Cars
</Link>

{/* DEALER */}
{role === "dealer" && (
<>
<Link
to="/dealer"
className={`px-3 py-2 rounded-lg ${
isActive("/dealer") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
}`}
>
📊 Dashboard
</Link>

<Link
to="/messages"
className={`px-3 py-2 rounded-lg ${
isActive("/messages") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
}`}
>
💬 Inbox
</Link>
</>
)}

{/* ADMIN */}
{user?.email === "admin@gmail.com" && (
<Link
to="/admin"
className={`px-3 py-2 rounded-lg ${
isActive("/admin") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
}`}
>
🛠 Admin Panel
</Link>
)}

</div>

</div>

{/* LOGOUT */}
<button
onClick={handleLogout}
className="mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
>
Logout
</button>

</div>

)

}

export default Sidebar