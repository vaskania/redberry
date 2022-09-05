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
import UploadButton from "../../components/UploadButton/UploadButton";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import Alert1 from "../../components/Alert1/Alert1";
import Success from "../../components/Success/Success";

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

  const { data: brands, loading } = useFetch(`${process.env.REACT_APP_URL}/brands`)
  const { data: cpus } = useFetch(`${process.env.REACT_APP_URL}/cpus`)
  const [laptopDetails, setLaptopDetails] = useState(initialState)
  const [url, setUrl] = useState()
  const [laptopErrors, setLaptopErrors] = useState({
    laptop_nameError: false,
    laptop_imageError: false,
    laptop_brand_idError: false,
    laptop_cpuError: false,
    laptop_cpu_coresError: false,
    laptop_cpu_threadsError: false,
    laptop_ramError: false,
    laptop_hard_drive_typeError: false,
    laptop_purchase_dateError: false,
    laptop_priceError: false,
    laptop_stateError: false
  })
  const { data, addNewData } = useContext(AppContext)
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
    if ((file.type !== 'image/png' && file.type !== 'image/jpeg') || file.size > 1048576) {
      setLaptopErrors({
        ...laptopErrors,
        laptop_imageError: true
      })
      return;
    }
    setLaptopErrors({
      ...laptopErrors,
      laptop_imageError: false
    })
    setLaptopDetails({ ...laptopDetails, laptop_image: file })
    addNewData({ laptop_image: file })
  }

  const handleChange = (data) => {
    const { name, value } = data
    if (name === "laptop_name") {
      laptopErrors.laptop_nameError = !fileNameRegEx.test(laptopDetails.laptop_name);
      setLaptopErrors(laptopErrors)
      localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))
    }
    if (name === 'laptop_cpu_cores' || name === 'laptop_cpu_threads' || name === 'laptop_ram' || name === 'laptop_price') {
      if (name === 'laptop_cpu_cores') {
        laptopErrors.laptop_cpu_coresError = value === 0 || !value;
      }
      if (name === "laptop_cpu_threads") {
        laptopErrors.laptop_cpu_threadsError = value === 0 || !value;
      }
      if (name === 'laptop_ram') {
        laptopErrors.laptop_ramError = value === 0 || !value;
      }
      if (name === 'laptop_price') {
        laptopErrors.laptop_priceError = value === 0 || !value;
      }
      setLaptopErrors(laptopErrors)
      localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
      addNewData({ [name]: +value.trim() })
      return setLaptopDetails({
        ...laptopDetails,
        [name]: +value.trim()
      });
    }
    if (name === "laptop_hard_drive_type" || name === "laptop_state") {
      localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
      addNewData({ [name]: value })
      if (name === "laptop_hard_drive_type") {
        laptopErrors.laptop_hard_drive_typeError = false
      } else {
        laptopErrors.laptop_stateError = false
      }
      setLaptopErrors(laptopErrors)
      localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))
      return setLaptopDetails({
        ...laptopDetails,
        [name]: value
      });
    }
    localStorage.setItem('laptop', JSON.stringify({ ...laptopDetails, [name]: value }))
    addNewData({ [name]: value.trim() })
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

    laptopErrors.laptop_brand_idError = false
    setLaptopErrors(laptopErrors)
    localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))

    const filtered = brands.data.filter(brand => brand.id === +value)
    addNewData({ laptop_brand_id: filtered[0].id })
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
    laptopErrors.laptop_cpuError = false
    setLaptopErrors(laptopErrors)
    localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))

    addNewData({ laptop_cpu: value })
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

  const goToUserForm = () => {
    navigate('/user/create')
  }

  useEffect(() => {
    const laptop = JSON.parse(localStorage.getItem('laptop'));
    const user = JSON.parse(localStorage.getItem('user'));
    const laptopError = JSON.parse(localStorage.getItem('laptopErrors'))
    if (laptopError) {
      setLaptopErrors(laptopError)
    } else {
      localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))
    }
    if (laptop) {
      setLaptopDetails(laptop);
      addNewData(laptop)
    } else {
      localStorage.setItem('laptop', JSON.stringify(laptopDetails))
    }
    if (user) {
      addNewData(user)
    }
  }, []);

  const sendData = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/laptop/create`, data,
         { headers: { "Content-Type": "multipart/form-data" } }
      )
      return res
    } catch (e) {
      console.log(e)
    }

  }

  function convertImageName(name) {

    if (!name || name.length <= 30) {
      return name
    }

    const fileNameCompression = name.slice(0, 26)
    const fileName = name.split('.')
    const fileExtension = fileName[fileName.length - 1]
    const arr = [fileNameCompression, '...', fileExtension]

    return arr.join('')
  }

  function calculateFileSize(size) {
    if (!size) return
    const number = size / 1048576
    return number.toFixed(2)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!laptop_image || laptop_image.size > 1048576) {
      laptopErrors.laptop_imageError = true
    }
    if (!fileNameRegEx.test(laptopDetails.laptop_name) || laptopDetails.laptop_name.length === 0) {
      laptopErrors.laptop_nameError = true
    }
    if (!laptop_brand_id) {
      laptopErrors.laptop_brand_idError = true
    }
    if (!laptop_cpu) {
      laptopErrors.laptop_cpuError = true
    }
    if (laptop_cpu_cores === 0 || !laptop_cpu_cores) {
      laptopErrors.laptop_cpu_coresError = true
    }
    if (laptop_cpu_threads === 0 || !laptop_cpu_threads) {
      laptopErrors.laptop_cpu_threadsError = true
    }
    if (laptop_ram === 0 || !laptop_ram) {
      laptopErrors.laptop_ramError = true
    }
    if (!laptop_hard_drive_type) {
      laptopErrors.laptop_hard_drive_typeError = true
    }
    if (laptop_price === 0) {
      laptopErrors.laptop_priceError = true
    }
    if (!laptop_state) {
      laptopErrors.laptop_stateError = true
    }
    setLaptopErrors({
      ...laptopErrors
    })
    const errorValues = Object.values(laptopErrors)
    let errorExists = false
    for (let i = 0; i < errorValues.length; i++) {
      if (errorValues[i]) {
        errorExists = true
        break;
      }
    }
    localStorage.setItem('laptopErrors', JSON.stringify(laptopErrors))
    if (errorExists) {
      return;
    }
    delete data.positionName
    delete data.teamName
    await sendData(data)
    localStorage.removeItem('user')
    localStorage.removeItem('laptop')
    localStorage.removeItem('userErrors')
    localStorage.removeItem('laptopErrors')
    navigate('/success')
  }
  if (loading) return

  return (
     <div className={styles.laptopForm}>
       <BackButton onClick={() => navigate('/user/create')}/>
       <div className={styles.nav}>
         <div className={styles.laptopHide}><h3>თანამშრომლის ინფო</h3></div>
         <div ><h3>ლეპტოპის მახასიათებლები</h3></div>
         <h6 className={styles.pages}>2/2</h6>
       </div>
       <div className={styles.line}/>

       <div className={styles.form}>
         <form onSubmit={handleSubmit}>
           <div className={styles.img}>
             {url && <img
                src={url} alt={url}
                className={styles.image}
             />}
             {url &&
                <div className={styles.fileInfo}>
                  <div>
                    <Success/>{convertImageName(laptop_image.name)}, <span
                     className={styles.size}>{calculateFileSize(laptop_image.size)} mb</span>
                  </div>
                  <UploadButton
                     position="absolute"
                     top="0px"
                     left="645px"
                     file={laptop_image}
                     setUrl={setUrl}
                     selectFile={selectFile}
                     title="თავიდან ატვირთე"
                  />
                </div>
             }
             {!url && <DragAndDrop
                containerStyle={{
                  left: "120px"
                }}
                file={laptop_image}
                setUrl={setUrl}
                selectFile={selectFile}
                error={laptopErrors.laptop_imageError}
             />}
             {!url && <UploadButton
                top="30px"
                left="-430px"
                file={laptop_image}
                setUrl={setUrl}
                selectFile={selectFile}
                title="ატვირთე"
             />}


           </div>
           <Input
              title="ლეპტოპის სახელი"
              type="text"
              name="laptop_name"
              value={laptop_name}
              placeholder="+995 590 00 07 01"
              onHandleChange={handleChange}
              error={laptopErrors.laptop_nameError}
              hint="ლათინური ასოები, ციპრები, !@#$%^&*()_+"
              top="540px"
              left="150px"
              width="407px"
           />

           <div className={styles.laptopBrand}>
             <select style={laptopErrors.laptop_brand_idError ? { "border": "1px solid red" } : {}}
                     className={styles.selectLaptopBrand} value={laptop_brand_id} onChange={selectBrand}>
               <option value=''>ლეპტოპის ბრენდი</option>
               {brands?.data?.map(brand => <option className={styles.selectLaptopBrands} key={brand?.id}
                                                   value={brand?.id}>{brand.name}</option>)}
             </select>
           </div>

           <div className={styles.line1}/>

           <div className={styles.cpu}>
             <select style={laptopErrors.laptop_cpuError ? { "border": "1px solid red" } : {}}
                     className={styles.selectCpu} value={laptop_cpu}
                     onChange={selectCpu}>
               <option value=''>CPU</option>
               {cpus?.data?.map(cpu => <option className={styles.selectCpus} key={cpu?.id}
                                               value={cpu?.name}>{cpu.name}</option>)}
             </select>
           </div>

           <Input
              title="CPU-ს ბირთვი"
              type="number"
              name="laptop_cpu_cores"
              value={laptop_cpu_cores}
              placeholder="22"
              onHandleChange={handleChange}
              error={laptopErrors.laptop_cpu_coresError}
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
              error={laptopErrors.laptop_cpu_threadsError}
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
              error={laptopErrors.laptop_ramError}
              hint="მხოლოდ ციფრები"
              top="930px"
              left="150px"
              width="407px"
           />

           <div className={styles.hdContainer}>
             <div className={styles.radioLabel}>
               <label className={styles.hdType}
                      style={laptopErrors.laptop_hard_drive_typeError ? { color: "red" } : {}}>მეხსიერების
                 ტიპი</label>
               {laptopErrors.laptop_hard_drive_typeError && <Alert1/>}
             </div>
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
              error={laptopErrors.laptop_purchase_dateError}
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
              error={laptopErrors.laptop_priceError}
              hint="მხოლოდ ციფრები"
              top="1140px"
              left="620px"
              width="407px"
           />

           <div className={styles.condition}>
             <div className={styles.radioLabel}>
               <label className={styles.conditionLabel}
                      style={laptopErrors.laptop_stateError ? { color: "red" } : {}}>ლეპტოპის მდგომარეობა</label>
               {laptopErrors.laptop_stateError && <Alert1/>}
             </div>
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

           <div className={styles.btnBack} onClick={goToUserForm}>უკან</div>
           <Button type='submit' top="1397px" left="840px" width="219px">დამახსოვრება</Button>
         </form>
         <Logo top="1500px"/>
       </div>
     </div>
  )
}