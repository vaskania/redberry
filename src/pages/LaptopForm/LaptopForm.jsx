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
  const { data, toggleActive, addNewData } = useContext(AppContext)
  const navigate = useNavigate()
  console.log(data)
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

  const selectFile = (e) => {
    try {
      const file = e.target.files[0]
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        throw new Error('arali surati')
      }
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, laptop_image: file }))
      setLaptopDetails({ ...laptopDetails, laptop_image: file })
    } catch (e) {
      console.log(e)
    }

  }


  const handleChange = (e) => {
    const { value } = e.target;

    if (e.target.name === 'laptop_cpu_cores' || e.target.name === 'laptop_cpu_threads' || e.target.name === 'laptop_ram' || e.target.name === 'laptop_price') {
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [e.target.name]: value }))
      return setLaptopDetails({
        ...laptopDetails,
        [e.target.name]: +value.trim()
      });
    }
    localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [e.target.name]: value }))
    setLaptopDetails({
      ...laptopDetails,
      [e.target.name]: value.trim()
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

    if (laptop) {
      setLaptopDetails(laptop);
    }
  }, []);

  const sendData = async (data) => {
    console.log(data)
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/laptop/create`, data,
         { headers: { "Content-Type": "multipart/form-data" } }
      )
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


      await sendData(data)
      localStorage.removeItem('user')
      localStorage.removeItem('laptop')


      toggleActive()
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
           <label className={styles.imgLabel}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</label>
           {/*<input className={styles.imgBtn} type='file' onChange={selectFile}/>*/}
           <div className={styles.imgBtn}><span className={styles.imgBtnText}>ატვირთე</span></div>
         </div>

         <div className={styles.laptopName}>
           <label className={styles.laptopNameLabel}>ლეპტოპის სახელი</label>
           <input className={styles.laptopNameInput} type='text' name="laptop_name" value={laptop_name} onChange={handleChange} placeholder="HP"/>
           <label className={styles.laptopNameHint}>ლათინური ასოები, ციპრები, !@#$%^&*()_+</label>
         </div>

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
             {cpus?.data?.map(cpu => <option className={styles.selectCpus} key={cpu?.id} value={cpu?.id}>{cpu.name}</option>)}
           </select>
         </div>
         <div className={styles.cpuCores}>
           <label className={styles.cpuCoresLabel}>CPU-ს ბირთვი</label>
           <input className={styles.cpuCoresInput} type='number' name='laptop_cpu_cores' value={laptop_cpu_cores} onChange={handleChange} placeholder="14"/>
           <label className={styles.cpuCoresHint}>მხოლოდ ციფრები</label>
         </div>


         <div className={styles.cpuThreads}>
           <label className={styles.cpuThreadsLabel}>CPU-ს ნაკადი</label>
           <input className={styles.cpuThreadsInput} type='number' name='laptop_cpu_threads' value={laptop_cpu_threads} onChange={handleChange} placeholder="365"/>
           <label className={styles.cpuThreadsHint}>მხოლოდ ციფრები</label>
         </div>

         <div className={styles.ram}>
           <label className={styles.ramLabel}>RAM</label>
           <input className={styles.ramInput} type='number' name="laptop_ram" value={laptop_ram} onChange={handleChange} placeholder="16"/>
           <label className={styles.ramHint}>მხოლოდ ციფრები</label>
         </div>

         <div className={styles.hdContainer}>
           <label className={styles.hdType}>მეხსიერების ტიპი</label>
           <input className={styles.ssdType} type="radio" name='laptop_hard_drive_type' id="ssd" checked={laptop_hard_drive_type === 'SSD'} value='SSD'
                  onChange={handleChange}/> <label htmlFor="ssd" className={styles.ssdLabel}>SSD</label>
           <input className={styles.hddType} type="radio" name='laptop_hard_drive_type' id="hdd" value='HDD' checked={laptop_hard_drive_type === "HDD"}
                  onChange={handleChange}/> <label htmlFor='hdd' className={styles.hddLabel}>HDD</label>
         </div>

         <div className={styles.line2}/>

         <div className={styles.date}>
           <label className={styles.dateLabel}>შეძენის რიცხვი (არჩევითი)</label>
           <input className={styles.dateInput}
                  type='date' name="laptop_purchase_date"
                  onChange={handleChange}
                  value={laptop_purchase_date}
           />
         </div>

         <div className={styles.price}>
           <label className={styles.priceLabel}>ლეპტოპის ფასი</label>
           <input className={styles.priceInput} type='number' name='laptop_price' value={laptop_price} onChange={handleChange} placeholder="0000"/>
           <label className={styles.priceHint}>მხოლოდ ციფები</label>
         </div>

         <div className={styles.condition}>
           <label className={styles.conditionLabel}>ლეპტოპის მდგომარეობა</label>
           <input className={styles.new} type="radio" name='laptop_state' id="new" value='new' checked={laptop_state === 'new'} onChange={handleChange}/>
           <label className={styles.newLabel} htmlFor="new">ახალი</label>
           <input className={styles.used} id="used" type="radio" name='laptop_state' value='used' checked={laptop_state === 'used'}
                  onChange={handleChange}/> <label className={styles.usedLabel} htmlFor="used">მეორადი</label>
         </div>

         <div className={styles.btnBack} onChange={toggleActive}>უკან</div>
         <Button type='submit' top="1397px" left="840px" width="219px">დამახსოვრება</Button>
       </form>
         <Logo top="1500px"/>
       </div>
     </div>
  )
}