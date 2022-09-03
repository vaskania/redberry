import styles from './Input.module.css'

const Input = ({...props}) => {
    return (
        <div className={styles.container} style={{...props}}>
            <label className={styles.inputTitle}>{props.title}</label>
            <div className={props.error ? styles.error : styles.inputContainer}>
                <input className={styles.input} type={props.type} />
            </div>
            <label className={styles.inputHint}>{props.hint}</label>
        </div>
    );
};

export default Input;


// export const MyInput = (params: any) => {
//     const { title, description, placeholder, blockStyles, onHandleChange, value, name, error } = params
//     return (
//         <div className={styles.block} style={blockStyles}>
//             <div className={styles.title}>{title}</div>
//             <div className={error ? styles.errorDiv : styles.inputDiv}>
//                 <input
//                     name={name}
//                     onChange={handleChange}
//                     className={styles.input}
//                     placeholder={placeHolder}
//                     value={value}
//                 />
//             </div>
//             <div className={styles.description}>{description}</div>
//         </div>
//     );
// };