import styles from './PageNotFound.module.css'
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import {useState} from "react";

const PageNotFound = () => {
    const [file, setFile] = useState([])
    const [url, setUrl] = useState()

    console.log(url)
    return (
        <div className={styles.container}>
            <img src={url} alt="img" />
            <DragAndDrop  file={file} setFile={setFile} setUrl={setUrl}/>
        </div>
    );
};

export default PageNotFound;