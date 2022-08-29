import axios from "axios";
import {useEffect} from "react";

export const LaptopsList = () => {
    const token = "47d53d62672b00ec9599a278ebfb7bfa"
    const url = `https://pcfy.redberryinternship.ge/api/laptops?token=${token}`

    const getData = async () => {
        await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => console.log(res))
            .catch((error) =>    console.log(error))
    }

    useEffect(()=> {
        getData()
    },[])

    return (
        <>
            <p>all products</p>
        </>
    )
}