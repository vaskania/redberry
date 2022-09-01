import React from 'react';

const LaptopComponent = ({ data }) => {
  const { user, laptop } = data.data
  console.log(user)
  console.log(laptop)
  return (
     <div>
       <img/>
       <div>
         <h6>სახელი:</h6>
         <span>{user.name} {user.surname}</span>
         <h6>თიმი:</h6>
         <span>{user.team_id}</span>
         <h6>პოზიცია:</h6>
         <span>{user.position_id}</span>
         <h6>მეილი:</h6>
         <span>{user.email}</span>
         <h6>ტელ. ნომერი:</h6>
         <span>{user.phone_number}</span>
       </div>
       <div>
         <h6>ლეპტოპის სახელი:</h6>
         <span>{laptop.name}</span>
         <h6>ლეპტოპის ბრენდი:</h6>
         <span>{laptop.brand_id}</span>
         <h6>RAM:</h6>
         <span>{laptop.ram}</span>
         <h6>მეხსიერების ტიპი:</h6>
         <span>{laptop.hard_drive_type}</span>
         <h6>CPU:</h6>
         <span>{laptop.cpu.name}</span>
         <h6>CPU-ს ბირთვი:</h6>
         <span>{laptop.cpu.cores}</span>
         <h6>CPU-ს ნაკადი:</h6>
         <span>{laptop.cpu.threads}</span>
       </div>
       <div>
         <h6>ლეპტოპის მდგომარეობა:</h6>
         <span>{laptop.state}</span>
         <h6>ლეპტოპის ფასი:</h6>
         <span>{laptop.price}</span>
         <h6>შევსების რიცხვი:</h6>
         <span>{laptop.purchase_date}</span>
       </div>
     </div>
  );
};

export default LaptopComponent;