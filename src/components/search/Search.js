import React from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions , GEO_API_URL } from "../../Api";

const Search = ({onSearchChange}) => {

     const [search , setSearch] = React.useState(null);
    
    
     const loadOptions = (inputValue) => {

     return   fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GeoApiOptions)
	.then(response => response.json())
	.then((response) =>  {
        return {
            options: response.data.map((city)=> {
                return {
                    value: `${city.latitude} ${city.longitude}` ,
                    label: `${city.name} , ${city.countryCode}` ,
                };
            }),
        };
    }
    );
	
     };


     const  handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

     }

      
    return (
        
        <AsyncPaginate 
           placeholder="Search for city"
           debounceTimeout={600}
           value={search}
           onChange={handleOnChange}
           loadOptions={loadOptions}
         />

        
    );
};

export default Search;