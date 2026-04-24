import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"

function AdminDashboard(){

const [users,setUsers]=useState([])
const navigate = useNavigate()

useEffect(()=>{
checkAdmin()
},[])

// 🔐 only admin access
async function checkAdmin(){

const { data } = await supabase.auth.getUser()

if(!data.user){
navigate("/login", { state: { from: "/admin" } })
return
}

// 🔥 allow only admin email
if(data.user.email !== "admin@gmail.com"){
alert("Only admin can access")
navigate("/")
return
}

loadUsers()

}

// load all users
async function loadUsers(){

const { data } = await supabase
.from("users")
.select("*")

setUsers(data)

}

// make dealer
async function makeDealer(id){

await supabase
.from("users")
.update({ role: "dealer" })
.eq("id", id)

loadUsers()

}

// remove dealer
async function removeDealer(id){

await supabase
.from("users")
.update({ role: "customer" })
.eq("id", id)

loadUsers()

}

return(

<div className="max-w-5xl mx-auto p-10">

<h1 className="text-3xl font-bold mb-6">
Admin Dashboard
</h1>

<h2 className="text-xl font-bold mb-4">
Users
</h2>

{users.map(user=>(
<div key={user.id} className="border p-4 mb-3 rounded">

<p className="font-bold">{user.email}</p>
<p>Role: {user.role}</p>

{user.role !== "dealer" ? (
<button
onClick={()=>makeDealer(user.id)}
className="bg-green-600 text-white px-3 py-1 mt-2"
>
Make Dealer
</button>
) : (
<button
onClick={()=>removeDealer(user.id)}
className="bg-red-500 text-white px-3 py-1 mt-2"
>
Remove Dealer
</button>
)}

</div>
))}

</div>

)

}

export default AdminDashboard