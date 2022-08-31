import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { AppContext } from "../context/app.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LaptopForm = () => {
  const initialState = {
    laptop_name: '',
    laptop_image: '',
    laptop_brand_id: null,
    laptop_cpu: '',
    laptop_cpu_cores: '',
    laptop_cpu_threads: '',
    laptop_ram: '',
    laptop_hard_drive_type: '',
    laptop_purchase_date: '',
    laptop_price: ''
  }

  const { data: brands, loading, error } = useFetch(`${process.env.REACT_APP_URL}/brands`)
  const { data: cpus } = useFetch(`${process.env.REACT_APP_URL}/cpus`)
  const [laptopDetails, setLaptopDetails] = useState(initialState)
  const [brandName, setBrandName] = useState('')
  const [cpuName, setCpusName] = useState('')
  const { data, toggleActive, addNewData } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    laptop_name,
    laptop_cpu_cores,
    laptop_cpu_threads,
    laptop_ram,
    laptop_price
  } = laptopDetails

  const selectFile = (e) => {
    try {
      const file = e.target.files[0]
      if (file.type !== 'image/png' && file.type !== 'image/jpg') {
        throw new Error('arali surati')
      }
      const convertedToBinary = convert(file.name)
      setLaptopDetails({ ...laptopDetails, laptop_image: convertedToBinary })

    } catch (e) {
      console.log(e)
    }

  }

  function convert(text) {
    let converted = ''
    for (let i = 0; i < text.length; i++) {
      converted += text[i].charCodeAt(0).toString(2) + " ";
    }
    return converted
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setLaptopDetails({
      ...laptopDetails,
      [e.target.name]: value.trim()
    });

  }

  const selectBrand = (e) => {
    const { value } = e.target;
    if (value === 'ლეპტოპის ბრენდი') {
      return setBrandName(value)
    }

    const filtered = brands.data.filter(brand => brand.name === value)

    setBrandName(filtered[0].name)
    setLaptopDetails({ ...laptopDetails, laptop_brand_id: filtered[0].id })
  }

  const selectCpu = (e) => {
    const { value } = e.target
    if (value === 'CPU') {
      return setCpusName(value)
    }
    const filtered = cpus.data.filter(cpu => cpu.name === value)
    setCpusName(filtered[0].name)
    setLaptopDetails({ ...laptopDetails, laptop_cpu: filtered[0].id })
  }

  useEffect(() => {
    localStorage.setItem("laptop", JSON.stringify({
      ...laptopDetails,
    }))
    addNewData(laptopDetails)
  }, [laptopDetails])

  useEffect(() => {
    const laptop = JSON.parse(localStorage.getItem('laptop'));
    if (laptop) {
      const fromStorage = laptop
      console.log(fromStorage)

      setLaptopDetails(laptop);
    }
  }, []);

  const sendData = async (data) => {
    console.log(data)
    console.log('mevida')
    const res = await axios.post(`${process.env.REACT_APP_URL}/laptop/create`, data, {
      headers: { "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}` }
    })
    return res
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    const res = await sendData(data)
    console.log(res)
    localStorage.removeItem('user')
    localStorage.removeItem('laptop')
    toggleActive()
    navigate('/success')
  }

  if (loading) return <h1>loading ...</h1>

  if (error) console.log(error)

  return (
     <>
       <form onSubmit={handleSubmit}>
         <input type='file' onChange={selectFile}/>

         <label>ლეპტოპის სახელი</label>
         <input type='text' name="laptop_name" value={laptop_name} onChange={handleChange}/>

         <select value={brandName} onChange={selectBrand}>
           <option>{brandName ? `${brandName}` : "ლეპტოპის ბრენდი"}</option>
           {brands?.data?.map(brand => <option key={brand?.id} value={brand?.name}>{brand.name}</option>)}
         </select>
         <select value={cpuName} onChange={selectCpu}>
           <option>{cpuName ? `${cpuName}` : "CPU"}</option>
           {cpus?.data?.map(cpu => <option key={cpu?.id} value={cpu?.name}>{cpu.name}</option>)}
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
         <input type="radio" name='storage' value='SSD' onChange={handleChange}/> <label>SSD</label>
         <input type="radio" name='storage' value='HDD' onChange={handleChange}/> <label>HDD</label>
         <label>შეძენის რიცხვი (არჩევითი)</label>
         <input
            type='date' name="laptop_purchase_date"
            onChange={handleChange}
         />
         {/*must contain only numbers   */}
         <label>ლეპტოპის ფასი</label>
         <input type='number' name='laptop_price' value={laptop_price} onChange={handleChange}/>
         <label>ლეპტოპის მდგომარეობა</label>
         <input type="radio" name='condition' value="ახალი" onChange={handleChange}/> <label>ახალი</label>
         <input type="radio" name='condition' value="მეორადი" onChange={handleChange}/> <label>მეორადი</label>
         <button onChange={toggleActive}>უკან</button>
         <button type='submit'>დამახსოვრება</button>
       </form>
     </>
  )
}