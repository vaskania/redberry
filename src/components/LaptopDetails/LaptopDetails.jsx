import styles from './LaptopDetails.module.css'

const LaptopDetails = ({ data }) => {
  const { user, laptop } = data.data
  console.log(user)
  console.log(laptop)
  return (
     <div className={styles.container}>
       <div className={styles.img}><img/></div>
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
           <span>{user.team_id}</span>
           <span>{user.position_id}</span>
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
             <span>{laptop.brand_id}</span>
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

         </div>
         <div className={styles.right}>

         </div>
       </div>
       {/*<div>*/}
       {/*  <h6>ლეპტოპის მდგომარეობა:</h6>*/}
       {/*  <span>{laptop.state}</span>*/}
       {/*  <h6>ლეპტოპის ფასი:</h6>*/}
       {/*  <span>{laptop.price}</span>*/}
       {/*  <h6>შევსების რიცხვი:</h6>*/}
       {/*  <span>{laptop.purchase_date}</span>*/}
       {/*</div>*/}
     </div>
  );
};

export default LaptopDetails;