const gethora = async (country:string) => {
    try {
      const region=await fetch(`https://restcountries.com/v3.1/alpha/${country}`); 
      if (region.status !== 200) {
        return "incorrecto";
      }
      const jsonreg=await region.json();
      const url=`http://worldtimeapi.org/api/timezone/${jsonreg[0].continents[0]}/${jsonreg[0].capital[0]}`;
      const res=await fetch(url);
      if (res.status !== 200) {
        return "incorrecto";
      }
      const json=await res.json();
      return (json.utc_datetime)
    } catch (error) {
      return "incorrecto";
    }
  };
  
  export default gethora;