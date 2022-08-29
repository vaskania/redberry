import useFetch from "../hooks/useFetch";
import axios from "axios";
import {useEffect, useState} from "react";

export  const Landing = () => {
    const url = 'https://pcfy.redberryinternship.ge/api/teams'
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () =>{
        const {data} = await axios(url)
        setList(prevState => data)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    if(loading) <p>loading</p>
    if(list.data) {
       return (
           list.data.map(el => <p>{el.name}</p>)
       )
    }
    // return (
    //     <>
    //         {list.data.map(el => <p>{el.name}</p>)}
    //     </>
    // )
}