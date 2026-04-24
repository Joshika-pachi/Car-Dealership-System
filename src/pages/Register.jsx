import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate, Link } from "react-router-dom"

function Register(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate()

async function handleRegister(e){

e.preventDefault()

const { data, error } = await supabase.auth.signUp({
email,
password
})

if(error){
alert(error.message)
}else{

const user = data.user

if(user){

await supabase.from("users").insert([
{
id: user.id,
email: user.email,
role: "customer"
}
])

}

alert("Registered successfully")
navigate("/login")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-semibold mb-6 text-center">
Create Account
</h2>

<form onSubmit={handleRegister} className="space-y-4">

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
/>

<button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
Register
</button>

</form>

<p className="text-center text-sm mt-4 text-gray-500">
Already have an account?{" "}
<Link to="/login" className="text-blue-600 hover:underline">
Login
</Link>
</p>

</div>

</div>

)

}

export default Register