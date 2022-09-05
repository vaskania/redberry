import styles from './UploadButton.module.css'
import {useEffect} from "react";


const UploadButton = ({file, selectFile,setFile, setUrl,...props}) => {
    const uploadHandler =(e) => {
        if(!e.target.files[0]) return
        const file = e.target.files[0]
         return  selectFile(file)
    }
    //
    // useEffect(()=> {
    //     if(file.length <1) return
    //     return  setUrl(URL.createObjectURL(file))
    // },[file])
    return (
            <div className={styles.fileInput} style={{...props}}>
                <input className={styles.input} type="file" onChange={uploadHandler}/>
                <button type="button" className={styles.uploadButton}>ატვირთე</button>
            </div>
    );
};

export default UploadButton;