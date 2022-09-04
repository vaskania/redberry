import Input from "../../components/Input/Input";
import styles from './PageNotFound.module.css'
import Radio from "../../components/Radio/Radio";

const PageNotFound = () => {
    return (
        <div className={styles.container}>
            <label >მეხსიერების ტიპი</label>
           <Radio
                 title="SSD"
                 value="SSD"
                 name="laptop_hard_drive_type"
           />
            {/*<Radio*/}
            {/*    title="HDD"*/}
            {/*    value="HDD"*/}
            {/*    name="laptop_hard_drive_type"*/}
            {/*/>*/}
        </div>
    );
};

export default PageNotFound;