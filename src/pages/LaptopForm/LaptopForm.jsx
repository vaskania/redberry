import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { AppContext } from "../../context/app.context";
import { useNavigate } from "react-router-dom";
import { fileNameRegEx } from '../../utils'
import axios from "axios";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./LaptopForm.module.css";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo1/Logo";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";

export const LaptopForm = () => {
  const initialState = {
    laptop_name: '',
    laptop_image: '',
    laptop_brand_id: 0,
    laptop_cpu: '',
    laptop_cpu_cores: 0,
    laptop_cpu_threads: 0,
    laptop_ram: 0,
    laptop_hard_drive_type: '',
    laptop_purchase_date: '',
    laptop_price: 0,
    laptop_state: ''
  }

  const { data: brands, loading, error } = useFetch(`${process.env.REACT_APP_URL}/brands`)
  const { data: cpus } = useFetch(`${process.env.REACT_APP_URL}/cpus`)
  const [laptopDetails, setLaptopDetails] = useState(initialState)
  const [url, setUrl] = useState()
  const { data, toggleActive, addNewData } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    laptop_name,
    laptop_cpu_cores,
    laptop_cpu_threads,
    laptop_ram,
    laptop_price,
    laptop_hard_drive_type,
    laptop_state,
    laptop_image,
    laptop_cpu,
    laptop_brand_id,
    laptop_purchase_date
  } = laptopDetails


  const selectFile = (file) => {
    console.log(file)
    try {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        throw new Error('arali surati')
      }
      // localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, laptop_image: file }))
      setLaptopDetails({ ...laptopDetails, laptop_image: file })
      addNewData({laptop_image: file})
    } catch (file) {
      console.log(file)
    }

  }

  const handleChange = (data) => {
    const {name, value} = data
    console.log(name)
    console.log(value)
    if (name === 'laptop_cpu_cores' || name === 'laptop_cpu_threads' || name === 'laptop_ram' || name === 'laptop_price') {
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
      addNewData({ [name]: +value.trim()})
      return setLaptopDetails({
        ...laptopDetails,
        [name]: +value.trim()
      });
    }
    if(name === "laptop_hard_drive_type" || name === "laptop_state" ){
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
      addNewData({ [name]: value})
      return setLaptopDetails({
        ...laptopDetails,
        [name]: value
      });
    }
    localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
    addNewData({ [name]: value.trim()})
    setLaptopDetails({
      ...laptopDetails,
      [name]: value.trim()
    });
  }

  const selectBrand = (e) => {

    const { value } = e.target;

    if (value === '') {
      localStorage.setItem('laptop', JSON.stringify({
        ...laptopDetails,
        laptop_brand: '',
        laptop_brand_id: -1
      }))
      setLaptopDetails({
        ...laptopDetails,
        laptop_brand_id: -1
      })
      return;
    }
    const filtered = brands.data.filter(brand => brand.id === +value)
    addNewData({laptop_brand_id: filtered[0].id})
    setLaptopDetails({ ...laptopDetails, laptop_brand_id: filtered[0].id })
    localStorage.setItem('laptop', JSON.stringify({
      ...laptopDetails,
      laptop_brand_id: +value,
      laptop_brand: filtered[0].name
    }))
  }

  const selectCpu = (e) => {

    const { value } = e.target
    if (value === '') {
      setLaptopDetails({
        ...laptopDetails,
        laptop_cpu: -1
      })
      return
    }
    addNewData({laptop_cpu: value})
    setLaptopDetails({
      ...laptopDetails,
      laptop_cpu: value
    })
    const laptop = JSON.parse(localStorage.getItem('laptop'));
    localStorage.setItem('laptop', JSON.stringify({
      ...laptop,
      laptop_cpu: value
    }))

  }

  useEffect(() => {
    const laptop = JSON.parse(localStorage.getItem('laptop'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (laptop) {
      setLaptopDetails(laptop);
      addNewData(laptop)
    }
    if(user){
      addNewData(user)
    }
  }, []);

  const sendData = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/laptop/create`, data,
         { headers: { "Content-Type": "multipart/form-data" } }
      )
      console.log(res)
      return res
    } catch (e) {
      console.log(e)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!laptop_image) throw new Error('please add image')
      if (!fileNameRegEx.test(laptopDetails.laptop_name)) throw new Error('fill laptop name')
      if (!laptop_brand_id) throw new Error('select laptop brand')
      if (!laptop_cpu) throw new Error('select laptop CPU')
      if (laptop_cpu_cores === 0) throw new Error('please add cpu cores')
      if (laptop_cpu_threads === 0) throw new Error('please add cpu threads')
      if (laptop_ram === 0) throw new Error('please add ram')
      if (!laptop_hard_drive_type) throw new Error('please select hard drive type')
      if (laptop_price === 0) throw new Error('please add laptop price')
      if (!laptop_state) throw new Error('please select laptop condition')

      delete data.positionName
      delete data.teamName
      await sendData(data)
      // localStorage.removeItem('user')
      localStorage.removeItem('laptop')

      navigate('/success')
    } catch (e) {
      console.log(e)
    }

  }

  if (loading) return <h1>loading ...</h1>

  if (error) console.log(error)

  return (
     <div className={styles.laptopForm}>
       <BackButton onClick={()=>navigate('/user/create')}/>
       <div className={styles.nav}>
         <div ><h3>თანამშრომლის ინფო</h3></div>
         <div className={styles.laptopHide}><h3>ლეპტოპის მახასიათებლები</h3></div>
         <h6 className={styles.pages}>2/2</h6>
       </div>
       <div className={styles.line}/>

       <div className={styles.form}>
       <form onSubmit={handleSubmit}>
         <div className={styles.img}>
           {url && <img src={url} alt={url} className={styles.image}/>}
           {!url && <DragAndDrop
               top="0px"
               left="0px"
               file={laptop_image}
               setUrl={setUrl}
               selectFile={selectFile}
           />}

         </div>

         <Input
             title="ლეპტოპის სახელი"
             type="text"
             name="laptop_name"
             value={laptop_name}
             placeholder="+995 590 00 07 01"
             onHandleChange={handleChange}
             hint="ლათინური ასოები, ციპრები, !@#$%^&*()_+"
             top="540px"
             left="150px"
             width="407px"
         />

        <div className={styles.laptopBrand}>
          <select className={styles.selectLaptopBrand} value={laptop_brand_id} onChange={selectBrand}>
            <option value=''>ლეპტოპის ბრენდი</option>
            {/*<option>{brandName ? `${brandName}` : "ლეპტოპის ბრენდი"}</option>*/}
            {brands?.data?.map(brand => <option className={styles.selectLaptopBrands} key={brand?.id} value={brand?.id}>{brand.name}</option>)}
          </select>
        </div>

         <div className={styles.line1}/>

         <div className={styles.cpu}>
           <select className={styles.selectCpu} value={laptop_cpu} onChange={selectCpu}>
             <option value=''>CPU</option>
             {cpus?.data?.map(cpu => <option className={styles.selectCpus} key={cpu?.id} value={cpu?.name}>{cpu.name}</option>)}
           </select>
         </div>

         <Input
             title="CPU-ს ბირთვი"
             type="number"
             name="laptop_cpu_cores"
             value={laptop_cpu_cores}
             placeholder="22"
             onHandleChange={handleChange}
             hint="მხოლოდ ციფრები"
             top="760px"
             left="450px"
             width="276px"
         />

         <Input
             title="CPU-ს ნაკადი"
             type="number"
             name="laptop_cpu_threads"
             value={laptop_cpu_threads}
             placeholder="365"
             onHandleChange={handleChange}
             hint="მხოლოდ ციფრები"
             top="760px"
             left="750px"
             width="276px"
         />

         <Input
             title="RAM"
             type="number"
             name="laptop_ram"
             value={laptop_ram}
             placeholder="16"
             onHandleChange={handleChange}
             hint="მხოლოდ ციფრები"
             top="930px"
             left="150px"
             width="407px"
         />

         <div className={styles.hdContainer}>
           <label className={styles.hdType}>მეხსიერების ტიპი</label>
           <Radio
               title="SSD"
               value="SSD"
               name="laptop_hard_drive_type"
               top="25px"
               checked={laptop_hard_drive_type}
               left="-15px"
               handleChange={handleChange}
           />
           <Radio
               title="HDD"
               value="HDD"
               name="laptop_hard_drive_type"
               checked={laptop_hard_drive_type}
               top="-5px"
               left="150px"
               handleChange={handleChange}
           />
         </div>

         <div className={styles.line2}/>

         <Input
             title="შეძენის რიცხვი (არჩევითი)"
             type="date"
             name="laptop_purchase_date"
             value={laptop_purchase_date}
             onHandleChange={handleChange}
             top="1140px"
             left="150px"
             width="407px"
         />

         <Input
             title="ლეპტოპის ფასი"
             type="number"
             name="laptop_price"
             value={laptop_price}
             placeholder="000"
             onHandleChange={handleChange}
             hint="მხოლოდ ციფრები"
             top="1140px"
             left="620px"
             width="407px"
         />

         <div className={styles.condition}>
           <Radio
               title="ახალი"
               value="new"
               name="laptop_state"
               top="25px"
               checked={laptop_state}
               left="-15px"
               handleChange={handleChange}
           />
           <Radio
               title="მეორადი"
               value="used"
               name="laptop_state"
               checked={laptop_state}
               top="-5px"
               left="150px"
               handleChange={handleChange}
            />
         </div>

         <div className={styles.btnBack} onChange={toggleActive}>უკან</div>
         <Button type='submit' top="1397px" left="840px" width="219px">დამახსოვრება</Button>
       </form>
         <Logo top="1500px"/>
       </div>
     </div>
  )
}