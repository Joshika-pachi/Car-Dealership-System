import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { Link, useNavigate } from "react-router-dom"

function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate()

async function handleLogin(e){

e.preventDefault()

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert(error.message)
}else{
navigate("/")   
}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-semibold mb-6 text-center">
Welcome Back
</h2>

<form onSubmit={handleLogin} className="space-y-4">

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
Login
</button>

</form>

<p className="text-center text-sm mt-4 text-gray-500">
New user?{" "}
<Link to="/register" className="text-blue-600 hover:underline">
Register
</Link>
</p>

</div>

</div>

)

}

export default Login