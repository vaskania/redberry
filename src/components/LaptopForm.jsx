import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { AppContext } from "../context/app.context";
import { useNavigate } from "react-router-dom";
import { fileNameRegEx } from '../utils/index'
import axios from "axios";

export const LaptopForm = () => {
  const initialState = {
    laptop_name: '',
    laptop_image: '',
    laptop_brand_id: null,
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
    laptop_brand_id
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

  console.log(laptop_cpu)

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
      laptop_brand_id: value,
      laptop_brand: filtered[0].name
    }))
  }

  const selectCpu = (e) => {

    const { value } = e.target
    console.log(value)
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
    // setLaptopDetails({ ...laptopDetails, laptop_cpu: filtered[0].name })
  }

  // useEffect(() => {
  //   localStorage.setItem("laptop", JSON.stringify({
  //     ...laptopDetails,
  //   }))
  //   addNewData(laptopDetails)
  // }, [laptopDetails])

  useEffect(() => {
    const laptop = JSON.parse(localStorage.getItem('laptop'));

    if (laptop) {
      setLaptopDetails(laptop);
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
     <>
       <form onSubmit={handleSubmit}>
         <input type='file' onChange={selectFile}/>

         <label>ლეპტოპის სახელი</label>
         <input type='text' name="laptop_name" value={laptop_name} onChange={handleChange}/>

         <select value={laptop_brand_id} onChange={selectBrand}>
           <option value=''>ლეპტოპის ბრენდი</option>
           {/*<option>{brandName ? `${brandName}` : "ლეპტოპის ბრენდი"}</option>*/}
           {brands?.data?.map(brand => <option key={brand?.id} value={brand?.id}>{brand.name}</option>)}
         </select>
         <select value={laptop_cpu} onChange={selectCpu}>
           <option value=''>CPU</option>
           {cpus?.data?.map(cpu => <option key={cpu?.id} value={cpu?.id}>{cpu.name}</option>)}
         </select>
         {/*/!*must contain only numbers   *!/*/}
         <label>CPU-ს ბირთვი</label>
         <input type='number' name='laptop_cpu_cores' value={laptop_cpu_cores} onChange={handleChange}/>
         {/*/!*must contain only numbers     *!/*/}
         <label>CPU-ს ნაკადი</label>
         <input type='number' name='laptop_cpu_threads' value={laptop_cpu_threads} onChange={handleChange}/>
         {/*/!*must contain only numbers     *!/*/}
         <label>RAM</label>
         <input type='number' name="laptop_ram" value={laptop_ram} onChange={handleChange}/>
         <label>მეხსიერების ტიპი</label>
         <input type="radio" name='laptop_hard_drive_type' value='SSD' onChange={handleChange}/> <label>SSD</label>
         <input type="radio" name='laptop_hard_drive_type' value='HDD' onChange={handleChange}/> <label>HDD</label>
         <label>შეძენის რიცხვი (არჩევითი)</label>
         <input
            type='date' name="laptop_purchase_date"
            onChange={handleChange}
         />
         {/*must contain only numbers   */}
         <label>ლეპტოპის ფასი</label>
         <input type='number' name='laptop_price' value={laptop_price} onChange={handleChange}/>
         <label>ლეპტოპის მდგომარეობა</label>
         <input type="radio" name='laptop_state' value="new" onChange={handleChange}/> <label>ახალი</label>
         <input type="radio" name='laptop_state' value="used" onChange={handleChange}/> <label>მეორადი</label>
         <button onChange={toggleActive}>უკან</button>
         <button type='submit'>დამახსოვრება</button>
       </form>
     </>
  )
}