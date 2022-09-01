import { useParams } from "react-router-dom";
import LaptopComponent from "../components/LaptopComponent";
import useFetch from "../hooks/useFetch";

export const LaptopDetails = () => {
  const { id } = useParams();
  const url = `${process.env.REACT_APP_URL}/laptop/${id}?token=${process.env.REACT_APP_TOKEN}`
  const { data, loading, error } = useFetch(url)

  if (loading) return <h2>Loading ...</h2>

  if (error) console.log(error)

  return (
     <div>
       <LaptopComponent data={data}/>
     </div>
  )


}