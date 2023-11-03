const getciudad = async (country_code:string,postal_code:string) => {
    try {
      const url=`https://zip-api.eu/api/v1/info/${country_code}-${postal_code}`;
      const res=await fetch(url);
      if (res.status !== 200) {
        return null;
      }
      const json=await res.json();
      return (json.place_name)
    } catch (error) {
      return null;
    }
  };
  
  export default getciudad;