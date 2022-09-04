import Input from "../../components/Input/Input";
import styles from './PageNotFound.module.css'
import Radio from "../../components/Radio/Radio";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import {useState} from "react";

const PageNotFound = () => {
    const [file, setFile] = useState({})

    console.log(file)
    return (
        <div className={styles.container}>
            <p> Upload File </p>
            <DragAndDrop  setFile={setFile}/>
        </div>
    );
};

export default PageNotFound;