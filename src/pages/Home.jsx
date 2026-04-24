import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { Link } from "react-router-dom"

function Home(){

const [role,setRole] = useState("customer")

useEffect(()=>{
loadUser()
},[])

async function loadUser(){

const { data } = await supabase.auth.getUser()

if(data.user){

const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

if(userData){
setRole(userData.role)
}
}

}

// 🔥 ROLE SWITCH (for demo)
async function handleRoleChange(e){

const newRole = e.target.value
setRole(newRole)

const { data } = await supabase.auth.getUser()

await supabase
.from("users")
.update({ role: newRole })
.eq("id", data.user.id)

}

return(

<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">

<div className="max-w-7xl mx-auto px-10">

{/* TOP BAR */}
<div className="flex justify-between items-center pt-6">

<h1 className="text-xl font-bold text-blue-600">
MotoVerse
</h1>

<div className="flex items-center gap-4">

<p className="text-sm text-gray-500">
Logged in as:
<span className="text-blue-600 font-semibold ml-1 capitalize">
{role}
</span>
</p>

<select
value={role}
onChange={handleRoleChange}
className="border px-3 py-1 rounded"
>
<option value="customer">Customer</option>
<option value="dealer">Dealer</option>
<option value="admin">Admin</option>
</select>

</div>

</div>

{/* HERO */}
<div className="grid md:grid-cols-2 gap-16 items-center py-20">

<div>

<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
Drive Your <span className="text-blue-600">Dream Car</span>
</h1>

<p className="mt-6 text-gray-600 text-lg max-w-lg">
MotoVerse helps you explore cars, connect with dealers, and book test drives — all in one seamless experience.
</p>

<div className="mt-8 flex gap-4">

<Link
to="/cars"
className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition"
>
Explore Cars
</Link>

{role === "dealer" && (
<Link
to="/dealer"
className="bg-white border px-8 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
>
Dealer Dashboard
</Link>
)}

{role === "admin" && (
<Link
to="/admin"
className="bg-white border px-8 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
>
Admin Panel
</Link>
)}

</div>

</div>

{/* IMAGE */}
<div className="relative">

<img
src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
className="rounded-3xl shadow-2xl"
/>

<div className="absolute -z-10 top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

</div>

</div>

{/* DIVIDER */}
<div className="w-full h-px bg-gray-200 my-16"></div>

{/* WHY SECTION */}
<div className="bg-gradient-to-b from-white to-gray-50 py-24 rounded-3xl">

<h2 className="text-4xl font-bold text-center mb-14">
Why MotoVerse?
</h2>

<div className="grid md:grid-cols-3 gap-10 px-10">

<div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition duration-300 hover:-translate-y-2">

<h3 className="text-xl font-semibold flex items-center gap-2">
<span className="text-2xl group-hover:scale-110 transition">🚗</span>
Smart Browsing
</h3>

<p className="text-gray-500 mt-3">
Explore cars with detailed information and clean listings.
</p>

</div>

<div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition duration-300 hover:-translate-y-2">

<h3 className="text-xl font-semibold flex items-center gap-2">
<span className="text-2xl group-hover:scale-110 transition">⚡</span>
Instant Booking
</h3>

<p className="text-gray-500 mt-3">
Book test drives easily with just one click.
</p>

</div>

<div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition duration-300 hover:-translate-y-2">

<h3 className="text-xl font-semibold flex items-center gap-2">
<span className="text-2xl group-hover:scale-110 transition">💬</span>
Direct Connect
</h3>

<p className="text-gray-500 mt-3">
Connect with dealers instantly without delays.
</p>

</div>

</div>

</div>

{/* CTA */}
<div className="text-center py-24">

<h2 className="text-4xl font-bold">
Start Your Journey Today
</h2>

<p className="text-gray-500 mt-4">
Find your perfect car in just a few clicks.
</p>

<Link
to="/cars"
className="inline-block mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
>
Get Started →
</Link>

</div>

</div>

</div>
)
}

export default Home