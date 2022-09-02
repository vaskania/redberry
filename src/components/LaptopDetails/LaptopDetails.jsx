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
       {/*<div>*/}
       {/*  <h6>ლეპტოპის სახელი:</h6>*/}
       {/*  <span>{laptop.name}</span>*/}
       {/*  <h6>ლეპტოპის ბრენდი:</h6>*/}
       {/*  <span>{laptop.brand_id}</span>*/}
       {/*  <h6>RAM:</h6>*/}
       {/*  <span>{laptop.ram}</span>*/}
       {/*  <h6>მეხსიერების ტიპი:</h6>*/}
       {/*  <span>{laptop.hard_drive_type}</span>*/}
       {/*  <h6>CPU:</h6>*/}
       {/*  <span>{laptop.cpu.name}</span>*/}
       {/*  <h6>CPU-ს ბირთვი:</h6>*/}
       {/*  <span>{laptop.cpu.cores}</span>*/}
       {/*  <h6>CPU-ს ნაკადი:</h6>*/}
       {/*  <span>{laptop.cpu.threads}</span>*/}
       {/*</div>*/}
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