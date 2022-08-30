export const LaptopForm = () => {
  return (
     <>
       <input type='file'/>
       {/*must contain also $#T%    */}
       <label>Laptop Name</label>
       <input/>
       <select></select>
       <select></select>
       {/*must contain only numbers   */}
       <label>CPU-s cores</label>
       <input/>
       {/*must contain only numbers     */}
       <label>CPU-s threads</label>
       <input/>
       {/*must contain only numbers     */}
       <label>RAM</label>
       <input/>
       <label>HDD type</label>
       <input type="radio"/>
       <input type="radio"/>
       <label>Offer date</label>
       <input type='date'/>
       {/*must contain only numbers   */}
       <label>Laptops price</label>
       <input/>
       <label>Laptops condition</label>
       <input type="radio"/>
       <input type="radio"/>
       <button>back</button>
       <button>save</button>
     </>
  )
}