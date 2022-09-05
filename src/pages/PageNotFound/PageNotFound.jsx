import styles from './PageNotFound.module.css'
import UploadButton from "../../components/UploadButton/UploadButton";
import {useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone'


const PageNotFound = () => {
    const [file, setFile] = useState([])
    const [url, setUrl] = useState()

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

    console.log(file)
    return (
        <div className={styles.container}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
                      {/*<UploadButton  file={file} setFile={setFile} setUrl={setUrl}/>*/}
            </div>
            <div>
                <img src={file} alt={file}/>
            </div>

        </div>
    );
};

export default PageNotFound;