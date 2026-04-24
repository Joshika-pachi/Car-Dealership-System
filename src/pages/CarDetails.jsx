import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"

function CarDetails(){

const { id } = useParams()
const navigate = useNavigate()
const [car,setCar] = useState(null)

useEffect(()=>{
loadCar()
},[])

async function loadCar(){
const { data } = await supabase
.from("cars")
.select("*")
.eq("id", id)
.single()

setCar(data)
}

async function checkUser(){
const { data } = await supabase.auth.getUser()
return data.user
}

async function bookTestDrive(){
const user = await checkUser()

if(!user){
navigate("/login", { state: { from: `/car/${id}` } })
return
}

await supabase.from("test_drives").insert([{ car_id: id }])
alert("Test drive booked successfully")
}

async function messageDealer(){
const user = await checkUser()

if(!user){
navigate("/login")
}else{
navigate("/messages")
}
}

if(!car){
return <p className="p-10">Loading...</p>
}

return(

<div className="bg-gray-50 min-h-screen">

{/* 🔥 HERO (FIXED HEIGHT) */}
<div className="relative h-[45vh] md:h-[50vh]">

<img
  src={car.image}
  className="w-full h-full object-contain"
/>

{/* overlay */}
<div className="absolute inset-0 bg-black/40"></div>

{/* TEXT */}
<div className="absolute bottom-8 left-8 text-white">

<h1 className="text-4xl md:text-5xl font-bold">
{car.brand} {car.model}
</h1>

<p className="mt-2 text-lg opacity-90">
Year: {car.year}
</p>

<p className="text-2xl md:text-3xl font-bold mt-2 text-blue-300">
${car.price}
</p>

</div>

</div>

{/* 🔥 CONTENT CARD */}
<div className="max-w-6xl mx-auto px-6 md:px-10 -mt-16 relative z-10">

<div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 grid md:grid-cols-2 gap-10">

{/* LEFT */}
<div>

<h2 className="text-xl font-semibold mb-4">
About this car
</h2>

<p className="text-gray-600 leading-relaxed">
{car.description}
</p>

{/* FEATURES */}
<div className="mt-6 grid grid-cols-2 gap-4">

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-sm text-gray-500">Category</p>
<p className="font-semibold">Sedan</p>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-sm text-gray-500">Condition</p>
<p className="font-semibold">Used</p>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-sm text-gray-500">Availability</p>
<p className="font-semibold text-green-600">In Stock</p>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-sm text-gray-500">Fuel</p>
<p className="font-semibold">Petrol</p>
</div>

</div>

</div>

{/* RIGHT */}
<div className="flex flex-col justify-between">

<div>

<h2 className="text-xl font-semibold mb-4">
Interested?
</h2>

<p className="text-gray-500">
Book a test drive or contact dealer instantly.
</p>

</div>

<div className="mt-6 flex flex-col gap-4">

<button
onClick={bookTestDrive}
className="bg-green-600 text-white py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
>
Book Test Drive
</button>

<button
onClick={messageDealer}
className="bg-white border py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
>
Message Dealer
</button>

</div>

</div>

</div>

</div>

</div>
)
}

export default CarDetails