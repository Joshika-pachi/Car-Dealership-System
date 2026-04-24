function FilterPanel({onFilter}){

  const handleBrand=(e)=>{
    onFilter({brand:e.target.value})
  }

  const handlePrice=(e)=>{
    onFilter({price:e.target.value})
  }

  return(
    <div className="bg-white p-4 rounded shadow mb-6 flex gap-6">

      <select onChange={handleBrand} className="border p-2 rounded">
        <option value="">All Brands</option>
        <option value="Toyota">Toyota</option>
        <option value="BMW">BMW</option>
        <option value="Audi">Audi</option>
      </select>

      <select onChange={handlePrice} className="border p-2 rounded">
        <option value="">Any Price</option>
        <option value="40000">Below 40k</option>
        <option value="60000">Below 60k</option>
      </select>

    </div>
  )
}

export default FilterPanel