import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/app.context";
import { geoRegEx, emailRegEx, phoneNumberRegEx } from '../../utils'
import { useNavigate } from "react-router-dom";
import styles from './UserForm.module.css'
import BackButton from "../../components/BackButton/BackButton";
import Logo from '../../components/Logo1/Logo'
import Button from "../../components/Button/Button";

export const UserForm = () => {
  const initialState = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    team_id: '',
    position_id: '',
    token: process.env.REACT_APP_TOKEN
  }
  const url = process.env.REACT_APP_URL
  const { data, addNewData } = useContext(AppContext)
  const [teamName, setTeamName] = useState('')
  const [positionName, setPositionName] = useState('')
  const [filteredPositionOptions, setFilteredPositionOptions] = useState([])
  const [userForm, setUserForm] = useState(initialState)
  const [params, setParams] = useState({})
  const { name, surname, email, phone_number } = userForm;
  const navigate = useNavigate()

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
      if (typeof userForm.position_id !== "number") throw new Error('Please select options')

      addNewData(userForm)
      navigate('/laptop/create')
    } catch (e) {
      console.log(e)
    }
  }

  const getTeamValue = async () => {
    const { data: team } = await axios(`${url}/teams`)
    const { data: position } = await axios(`${url}/positions`)

    setParams(getParams(team, position))
  }

  const getParams = (team, position) => {
    const teamObj = {}
    for (let i = 0; i < team.data.length; i++) {
      teamObj[team.data[i].id] = { id: team.data[i].id, name: team.data[i].name }
    }
    for (let i = 0; i < position.data.length; i++) {
      if (!teamObj[position.data[i].team_id].hasOwnProperty('position_id')) {
        teamObj[position.data[i].team_id] = {
          ...teamObj[position.data[i].team_id],
          position_id: [position.data[i]]
        }
      } else {
        teamObj[position.data[i].team_id].position_id.push(position.data[i])
      }
    }
    const teamArray = []
    for (let id in teamObj) {
      teamArray.push(teamObj[id])
    }

    return [teamArray]
  }


  useEffect(() => {
    getTeamValue()
    // eslint-disable-next-line
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { teamName, positionName } = user
      setTeamName(teamName)
      setPositionName(positionName)
      setUserForm(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({
      ...userForm,
      teamName,
      positionName,
    }))
  }, [userForm, teamName, positionName])


  const selectedTeam = (e) => {
    const { value } = e.target
    if (value === "თიმი") {
      return setTeamName(value)
    }
    const filteredValue = params[0].filter(option => option.name === value)
    setUserForm({ ...userForm, team_id: filteredValue[0].id })
    setTeamName(value)
    setFilteredPositionOptions(filteredValue[0].position_id)

  }

  const selectPosition = (e) => {
    const { value } = e.target;
    if (value === 'პოზიცია' && teamName !== 'თიმი') {
      return setPositionName(value)
    }
    const filteredValue = filteredPositionOptions.filter(option => option.name === value)
    setPositionName(value)
    setUserForm({
      ...userForm,
      position_id: filteredValue[0].id
    })

  }


  return (
     <div className={styles.userForm}>
       <BackButton onClick={()=>navigate('/')}/>
       <div className={styles.nav}>
         <div ><h3>თანამშრომლის ინფო</h3></div>
         <div className={styles.laptopHide}><h3>ლეპტოპის მახასიათებლები</h3></div>
         <h6 className={styles.pages}>1/2</h6>
       </div>
       <div className={styles.line}/>
       <div className={styles.form}>
         <form onSubmit={addUser}>

           <div className={styles.userInfo}>
             <div className={styles.userName}>
               <label className={styles.name}>სახელი</label>
               <input className={styles.nameInput} type="text" name="name" value={name} onChange={handleChange} placeholder="გრიშა"/>
               <label className={styles.nameHint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
             </div>

             <div className={styles.userSurname}>
               <label className={styles.surname}>გვარი</label>
               <input className={styles.surnameInput} type="text" name="surname" value={surname} onChange={handleChange} placeholder="ბაგრატიონი"/>
               <label className={styles.surnameHint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
             </div>
           </div>



          <div className={styles.team}>
            <select className={styles.selectTeam} value={teamName} onChange={selectedTeam}>
              <option>თიმი</option>
              {params[0]?.map((param) => <option className={styles.selectTeams} key={param.id} value={param?.name}>{param?.name}</option>)}
            </select>
          </div>

          <div className={styles.position}>
            <select className={styles.selectPosition} value={positionName} onChange={selectPosition}>
              <option>{positionName ? `${positionName}` : 'პოზიცია'}</option>
              {filteredPositionOptions?.map((position) => <option className={styles.selectPositions} key={position.id}
                                                                  value={position?.name}>{position?.name}</option>)}
            < /select>
          </div>


           <div className={styles.email}>
             <label className={styles.emailLabel}>მეილი</label>
             <input className={styles.emailInput} type='email' value={email} name='email' onChange={handleChange} placeholder="grisha666@redberry.ge"/>
             <label className={styles.emailHint}>უნდა მთავრდებოდეს @redberry.ge-ით</label>
           </div>

           <div className={styles.phone}>
             <label className={styles.phoneLabel}>ტელეფონის ნომერი</label>
             <input className={styles.phoneInput} type="text" value={phone_number} name='phone_number' onChange={handleChange} placeholder="+995 590 00 07 01"/>
             <label className={styles.phoneHint}>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</label>
           </div>

           <Button top="809px" width="176px" left="875px">შემდეგი</Button>
         </form>
       </div>
      <Logo />
     </div>
  )
}