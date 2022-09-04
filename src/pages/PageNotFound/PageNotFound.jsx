import styles from './PageNotFound.module.css'
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import {useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone'


const PageNotFound = () => {
    const [file, setFile] = useState([])
    const [url, setUrl] = useState()

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) =>{
            acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        }
    })

    console.log(url)
    return (
        <div className={styles.container}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
                      {/*<DragAndDrop  file={file} setFile={setFile} setUrl={setUrl}/>*/}
            </div>
            <div>
                <img src={file} alt={file}/>
            </div>

        </div>
    );
};

export default PageNotFound;