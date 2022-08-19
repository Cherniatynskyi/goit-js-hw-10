export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?`
  )
    .then(response => {        
        if (response.status === 200) {            
            return response.json();
          }
                
          if (response.status === 404) {
            return Promise.reject('Error 404');
          }     
    })    
} 