import { useNavigate, useParams } from "react-router-dom";
import LaptopDetails from "../../components/LaptopDetails/LaptopDetails";
import useFetch from "../../hooks/useFetch";
import styles from './LaptopDetail.module.css'
import BackButton from "../../components/BackButton/BackButton";

export const LaptopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const url = `${process.env.REACT_APP_URL}/laptop/${id}?token=${process.env.REACT_APP_TOKEN}`
  const { data, loading, error } = useFetch(url)

  const back = () => navigate('/laptops')

  if (loading) return <h2>Loading ...</h2>

  if (error) console.log(error)

  return (
     <div className={styles.container}>
       <BackButton onClick={back} />
       <h3 className={styles.header}>ლეპტოპის ინფო</h3>
       <LaptopDetails data={data}/>
     </div>
  )
}