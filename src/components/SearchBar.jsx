import { useState } from "react"

function SearchBar({onSearch}){
  const [query,setQuery]=useState("")

  const handleSearch=(e)=>{
    const value=e.target.value
    setQuery(value)
    onSearch(value)
  }

  return(
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by brand or model..."
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border rounded-lg"
      />
    </div>
  )
}

export default SearchBar