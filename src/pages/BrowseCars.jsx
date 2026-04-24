import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import CarCard from "../components/CarCard"

function BrowseCars(){

const [cars,setCars] = useState([])
const [search,setSearch] = useState("")

useEffect(()=>{
loadCars()
},[])

async function loadCars(){
const { data } = await supabase.from("cars").select("*")
setCars(data || [])
}

const filteredCars = cars.filter(car =>
`${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="min-h-screen bg-gray-50">

{/* 🔥 HERO */}
<div className="relative h-[40vh] bg-black flex items-center justify-center">

<img
src="https://images.unsplash.com/photo-1493238792000-8113da705763"
className="absolute w-full h-full object-cover opacity-60"
/>

<h1 className="relative text-white text-5xl font-bold">
Find Your Perfect Car
</h1>

</div>

{/* 🔥 SEARCH (FLOATING) */}
<div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">

<div className="bg-white rounded-2xl shadow-xl p-4">

<input
type="text"
placeholder="Search by brand or model..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full px-4 py-3 rounded-xl border focus:outline-none text-lg"
/>

</div>

</div>

{/* 🔥 CONTENT */}
<div className="max-w-7xl mx-auto px-10 py-16">

{/* FEATURED */}
<h2 className="text-2xl font-semibold mb-6">
Featured Cars
</h2>

<div className="grid md:grid-cols-2 gap-10 mb-16">

{filteredCars.slice(0,2).map(car=>(
<div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">

<img
src={car.image}
className="w-full h-64 object-cover"
/>

<div className="p-6">

<h3 className="text-xl font-bold">
{car.brand} {car.model}
</h3>

<p className="text-blue-600 font-semibold mt-2">
${car.price}
</p>

</div>

</div>
))}

</div>

{/* ALL CARS */}
<h2 className="text-2xl font-semibold mb-6">
All Cars
</h2>

<div className="grid md:grid-cols-3 gap-10">

{filteredCars.map(car=>(
<CarCard key={car.id} car={car}/>
))}

</div>

</div>

</div>
)
}

export default BrowseCars