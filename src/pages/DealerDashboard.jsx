import { useState, useEffect } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"

function DealerDashboard(){

const navigate = useNavigate()

const [brand,setBrand] = useState("")
const [model,setModel] = useState("")
const [year,setYear] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [description,setDescription] = useState("")
const [cars,setCars] = useState([])

// 🔐 check dealer access
useEffect(()=>{
checkAccess()
},[])

async function checkAccess(){

const { data } = await supabase.auth.getUser()

if(!data.user){
navigate("/login", { state: { from: "/dealer" } })
return
}

const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

if(userData.role !== "dealer"){
alert("Only approved dealers can access")
navigate("/")
return
}

loadCars()

}

// load cars
async function loadCars(){

const { data } = await supabase
.from("cars")
.select("*")

setCars(data)

}

// add car
async function handleSubmit(e){

e.preventDefault()

if(!brand || !model || !price){
alert("Fill all required fields")
return
}

const { error } = await supabase.from("cars").insert([
{
brand,
model,
year: parseInt(year),
price: parseInt(price),
image,
description
}
])

if(error){
alert(error.message)
}else{
alert("Car added successfully")

// clear form
setBrand("")
setModel("")
setYear("")
setPrice("")
setImage("")
setDescription("")

loadCars()
}

}

return(

<div className="max-w-6xl mx-auto p-10">

<h1 className="text-3xl font-bold mb-6">
Dealer Dashboard
</h1>

{/* FORM */}
<form onSubmit={handleSubmit} className="space-y-3">

<input value={brand} placeholder="Brand" onChange={(e)=>setBrand(e.target.value)} className="border p-2 w-full"/>
<input value={model} placeholder="Model" onChange={(e)=>setModel(e.target.value)} className="border p-2 w-full"/>
<input value={year} placeholder="Year" onChange={(e)=>setYear(e.target.value)} className="border p-2 w-full"/>
<input value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)} className="border p-2 w-full"/>
<input value={image} placeholder="Image URL" onChange={(e)=>setImage(e.target.value)} className="border p-2 w-full"/>

<textarea value={description} placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className="border p-2 w-full"/>

<button className="bg-blue-600 text-white px-4 py-2 rounded">
Add Car
</button>

</form>

{/* LISTINGS */}
<h2 className="text-2xl font-bold mt-10">
My Listings
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

{cars.map(car=>(
<div key={car.id} className="border p-4 rounded shadow">

<img
src={car.image}
className="w-full h-40 object-cover rounded"
/>

<p className="font-bold mt-2">
{car.brand} {car.model}
</p>

<p className="text-green-600 font-semibold">
${car.price}
</p>

</div>
))}

</div>

</div>

)

}

export default DealerDashboard