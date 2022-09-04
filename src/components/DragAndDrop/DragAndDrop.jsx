import {useDropzone} from 'react-dropzone'
import styles from './DragAndDrop.module.css'
import {useEffect, useCallback} from "react";


const DragAndDrop = ({file, selectFile,setFile, setUrl,...props}) => {
    const uploadHandler =(e) => {
        if(!e.target.files[0]) return
        const file = e.target.files[0]
         return  selectFile(file)
    }

    useEffect(()=> {
        if(file.length <1) return
        return  setUrl(URL.createObjectURL(file))
    },[file])
    return (
        <div className={styles.container} style={{...props}}>
            <div className={styles.fileInput}>
                <input className={styles.input} type="file" onChange={uploadHandler}/>
                <button type="button" className={styles.uploadButton}>ატვირთე</button>
            </div>
        </div>
    );
};

export default DragAndDrop;