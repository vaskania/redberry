import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from "react";
import styles from "./DragAndDrop.module.css";
import Alert2 from "../Alert2/Alert2";

const DragAndDrop = ({  selectFile, setUrl, containerStyle, error }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles => {
      setUrl(URL.createObjectURL(acceptedFiles[0]))
      return selectFile(acceptedFiles[0])
    })
  })
  if (error) {
    containerStyle["border"] = "1px dashed red"
    containerStyle.background = "#FFF1F1"
  }
  return (
     <div>
       <div className={styles.container} style={{ ...containerStyle }}>
         <div {...getRootProps()} className={styles.dropContainer}>
           <input {...getInputProps()} />
           {error && <div className={styles.errorAlert}><Alert2 /></div>}
           <label className={styles.label} style={error ? { color: "red" } : {}}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</label>
         </div>
       </div>
     </div>
  );
};

export default DragAndDrop;