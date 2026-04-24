import { Link } from "react-router-dom"

function CarCard({ car }){

return(

<div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 border border-gray-100">

{/* IMAGE */}
<div className="overflow-hidden">

<img
src={car.image}
alt={car.model}
className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
/>

</div>

{/* CONTENT */}
<div className="p-5">

<h3 className="text-lg font-semibold text-gray-900">
{car.brand} {car.model}
</h3>

<p className="text-gray-500 text-sm mt-1">
Year: {car.year}
</p>

<p className="text-blue-600 font-bold text-xl mt-2">
${car.price}
</p>

<Link
to={`/car/${car.id}`}
className="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline"
>
View Details →
</Link>

</div>

</div>

)
}

export default CarCard