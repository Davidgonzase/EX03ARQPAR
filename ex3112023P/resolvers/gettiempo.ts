const gettiempo = async (city:string) => {
    try {
      const url=`http://api.weatherapi.com/v1/current.json?key=6f1aa25ff93a4d44813220545230510&q=${city}`
      const res=await fetch(url);
    if (res.status !== 200) {
      return "incorrecto";
    }
    const json=await res.json();
    console.log(url)
    return (json.current.condition.text)
    } catch (error) {
      return "incorrecto";
    }
  };
  
  export default gettiempo;