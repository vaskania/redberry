import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/app.context";
import { geoRegEx, emailRegEx, phoneNumberRegEx } from '../utils/index'


export const UserForm = () => {
  const initialState = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    team_id: '',
    position: '',
    token: process.env.REACT_APP_TOKEN
  }
  const url = process.env.REACT_APP_URL
  const { toggleActive, addNewData } = useContext(AppContext)
  const [teamOptions, setTeamOptions] = useState([])
  const [positionOptions, setPositionOptions] = useState([])
  const [teamName, setTeamName] = useState('')
  const [positionName, setPositionName] = useState('')
  const [filteredPositionOptions, setFilteredPositionOptions] = useState([])
  const [userForm, setUserForm] = useState(initialState)

  const { name, surname, email, phone_number, team_id, position } = userForm

  const handleChange = (e) => {
    const value = e.target.value;

    setUserForm({
      ...userForm,
      [e.target.name]: value.trim()
    });

  }

  const addUser = (e) => {
    e.preventDefault()
    try {
      if (!geoRegEx.test(userForm.name)) throw new Error('not georgian')
      if (!geoRegEx.test(userForm.surname)) throw new Error('not georgian')
      if (!emailRegEx.test(userForm.email)) throw new Error('not valid email')
      if (!phoneNumberRegEx.test(userForm.phone_number)) throw new Error('not valid phone number')
      if (typeof userForm.team_id !== "number") throw new Error('Please select option')
      if (typeof userForm.position !== "number") throw new Error('Please select options')
      localStorage.setItem("user", JSON.stringify({ ...userForm, position: positionName, team_id: teamName }))
      addNewData(userForm)
      toggleActive()
    } catch (e) {
      console.log(e)
    }
  }

  const getTeamValue = async () => {
    const { data: team } = await axios(`${url}/teams`)
    const { data: position } = await axios(`${url}/positions`)
    setTeamOptions(team.data)
    setPositionOptions(position.data)
  }


  useEffect(() => {
    getTeamValue()
  }, [userForm])


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log(user)
      setUserForm(user);
    }
  }, []);

  const selectedTeam = (e) => {
    const { value } = e.target
    const filteredValue = teamOptions.filter(option => option.name === value)

    setUserForm(prevState => {
      return { ...prevState, team_id: filteredValue[0].id }
    });
    filterPositionById(filteredValue[0].id)
    setTeamName(value)
  }

  const filterPositionById = (id) => {

    const filtered = positionOptions.filter(position => position.team_id === id)
    console.log(filtered)
    setFilteredPositionOptions(filtered)
  }

  const selectPosition = (e) => {
    const { value } = e.target;
    const filteredValue = filteredPositionOptions.filter(option => option.name === value)

    setUserForm({
      ...userForm,
      position: filteredValue[0].id
    })
    setPositionName(value)
  }


  return (
     <>
       <form onSubmit={addUser}>
         {/*min 2 only georgian*/}
         <label>სახელი</label>
         <input type="text" name="name" value={name} onChange={handleChange}/>
         {/*min 2 only georgian*/}
         <label>გვარი</label>
         <input type="text" name="surname" value={surname} onChange={handleChange}/>


         <select value={teamName} onChange={selectedTeam}>
           <option>თიმი</option>
           {teamOptions.map(team => <option key={team?.id} value={team?.name}>{team?.name}</option>)}
         </select>

         <select value={positionName} onChange={selectPosition}>
           <option>პოზიცია</option>
           {filteredPositionOptions.map(position => <option key={position.id}
                                                            value={position?.name}>{position?.name}</option>)}
         < /select>

         {/*must end with @redberry.ge*/}
         <label>მეილი</label>
         <input type='email' value={email} name='email' onChange={handleChange}/>
         {/*+995 ... ... */}
         <label>ტელეფონის ნომერი</label>
         <input type="text" value={phone_number} name='phone_number' onChange={handleChange}/>
         <button type="submit">Next</button>
       </form>
     </>
  )
}