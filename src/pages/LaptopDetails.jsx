import {useParams} from "react-router-dom";

export const LaptopDetails = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>This is a dynamic page for {id} </h1></div>
    )


}