import styles from './LaptopDetails.module.css'
import {ReactComponent as Laptop} from "../../storage/Laptop.svg";

const LaptopDetails = ({ data , brand, team, position}) => {

  const { user, laptop } = data.data
  return (
     <div className={styles.container}>
       <div className={styles.img}><Laptop/></div>
       <div className={styles.userDetails}>
         <div className={styles.fields}>
           <span>სახელი:</span>
           <span>თიმი:</span>
           <span>პოზიცია:</span>
           <span>მეილი:</span>
           <span>ტელ. ნომერი:</span>
         </div>
         <div className={styles.info}>
           <span> {user.name} {user.surname}</span>
           <span>{team}</span>
           <span>{position}</span>
           <span>{user.email}</span>
           <span>{user.phone_number}</span>
         </div>
       </div>

       <div className={styles.line1}/>

       <div className={styles.laptopDetails1}>

         <div className={styles.left}>

           <div className={styles.fields}>
             <span>ლეპტოპის სახელი:</span>
             <span>ლეპტოპის ბრენდი:</span>
             <span>RAM:</span>
             <span>მეხსიერების ტიპი:</span>
           </div>

           <div className={styles.info}>
             <span>{laptop.name}</span>
             <span>{brand}</span>
             <span>{laptop.ram}</span>
             <span>{laptop.hard_drive_type}</span>
           </div>
         </div>


         <div className={styles.right}>
           <div className={styles.fields}>
             <span>CPU:</span>
             <span>CPU-ს ბირთვი:</span>
             <span>CPU-ს ნაკადი:</span>
           </div>
           <div className={styles.info}>
             <span>{laptop.cpu.name}</span>
             <span>{laptop.cpu.cores}</span>
             <span>{laptop.cpu.threads}</span>
           </div>
         </div>
       </div>

       <div className={styles.line2}/>

       <div className={styles.laptopDetails2}>
         <div className={styles.left}>
           <div className={styles.fields}>
             <span>ლეპტოპის მდგომარეობა:</span>
             <span>ლეპტოპის ფასი:</span>
           </div>
           <div className={styles.info}>
             <span>{laptop.state === "new" ? "ახალი" : "მეორადი"}</span>
             <span>{laptop.price}</span>
           </div>

         </div>
         <div className={styles.right}>
           <div className={styles.fields}>
             <span>შევსების რიცხვი:</span>
           </div>
           <div className={styles.info}>
             <span>{laptop.purchase_date} </span>
           </div>
         </div>
       </div>
       <div>


       </div>
     </div>
  );
};

export default LaptopDetails;