import styles from './PageNotFound.module.css'
import {useState, useCallback} from "react";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import UploadButton from "../../components/UploadButton/UploadButton";



const PageNotFound = () => {
    const [file, setFile] = useState([])
    const [url, setUrl] = useState()

    console.log(file)
    return (
        <div className={styles.container}>
           <DragAndDrop/>
           <UploadButton/>
        </div>
    );
};

export default PageNotFound;