import {useDropzone} from 'react-dropzone'
import {useState} from "react";
import styles from "./DragAndDrop.module.css";

const DragAndDrop = ({file, selectFile,setFile, setUrl,...props}) => {
    const [file, setFile] = useState([])
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) =>{
            setFile(
                acceptedFiles.map(file=> Object.assign(file, {
                    preview:URL.createObjectURL(file)
                }))
            )
            console.log(acceptedFiles)
        }
    })
    return (
        <div>
            <div className={styles.container} style={{...props}}>
                <div {...getRootProps()} className={styles.dropContainer}>
                    <input {...getInputProps()} />
                    <label className={styles.label}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</label>
                </div>
               </div>
        </div>
    );
};

export default DragAndDrop;