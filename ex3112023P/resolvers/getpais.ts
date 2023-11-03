
const getpais = async (country_code:string) => {
  try {
    const url=`https://restcountries.com/v3.1/alpha/${country_code}`;
    const res=await fetch(url);
    if (res.status !== 200) {
      return "no encontrado";
    }
    const json=await res.json();
    return (json[0].name.common)
  } catch (error) {
    console.log(error)
    return "incorrecto";
  }
};

export default getpais;