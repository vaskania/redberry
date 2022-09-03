import Input from "../../components/Input/Input";
import styles from './PageNotFound.module.css'
import Radio from "../../components/Radio/Radio";

const PageNotFound = () => {
    return (
        <div className={styles.container}>
           <Radio
            title="ლეპტოპის მდგომარეობა"
            value="new"
            name="new"
           />

        </div>
    );
};

export default PageNotFound;