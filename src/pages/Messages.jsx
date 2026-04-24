import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate, useLocation } from "react-router-dom"

function Messages(){

const [messages,setMessages]=useState([])
const [text,setText]=useState("")
const [user,setUser]=useState(null)
const [role,setRole]=useState(null)

const navigate = useNavigate()
const location = useLocation()

const params = new URLSearchParams(location.search)
const carId = params.get("car")

useEffect(()=>{
init()
},[])

async function init(){

const { data } = await supabase.auth.getUser()

if(!data.user){
navigate("/login", { state: { from: `/messages?car=${carId}` } })
return
}

setUser(data.user)

// get role
const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

setRole(userData?.role)

loadMessages(data.user)

}

// load messages
async function loadMessages(currentUser){

let query = supabase.from("messages").select("*")

// 👤 customer → only messages of that car
if(carId){
query = query.eq("car_id", carId)
}

const { data } = await query

setMessages(data || [])

}

// send message
async function sendMessage(e){

e.preventDefault()

await supabase.from("messages").insert([
{
message: text,
sender_id: user.id,
car_id: carId
}
])

setText("")
loadMessages(user)

}

return(

<div className="max-w-3xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-4">

{role === "dealer" ? "Inbox" : "Chat with Dealer"}

</h1>

{/* CHAT BOX */}
<div className="border h-80 overflow-y-auto p-4 mb-4 rounded">

{messages.map(msg=>(
<div
key={msg.id}
className={`mb-2 p-2 rounded ${
msg.sender_id === user?.id
? "bg-blue-200 text-right"
: "bg-gray-200"
}`}
>
<p className="text-sm">{msg.message}</p>
</div>
))}

</div>

{/* INPUT */}
<form onSubmit={sendMessage} className="flex gap-2">

<input
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Type message..."
className="flex-1 border p-2 rounded"
/>

<button className="bg-blue-600 text-white px-4 rounded">
Send
</button>

</form>

</div>

)

}

export default Messages