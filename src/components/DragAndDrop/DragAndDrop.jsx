
import styles from './DragAndDrop.module.css'
const DragAndDrop = ({setFile}) => {
    const uploadHandler =(e) => {
        const file = e.target.files[0]
        file.isUploading = true;
        setFile(file)
    }

    return (
        <div className={styles.container}>
            <div className={styles.fileInput}>
                <input className={styles.input} type="file" onChange={uploadHandler}/>
                <button className={styles.uploadButton}>ატვირთე</button>
            </div>
        </div>
    );
};

export default DragAndDrop;