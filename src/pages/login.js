import react from 'react'
import {useState} from 'react'
import {Component} from 'react'
import '../pages/login.css'
import {useHistory} from 'react-router-dom'
import api from '../services/api'


// forma hook de fazer

const Login = (props) => {
    const {push} = useHistory()

    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    async function show(){
        ////alert(login)
        ////alert(password)

        
        const response = await api.get(`login/?username=${login}&password=${password}`)
      
        localStorage.setItem("username",login.split("@")[0]);
        push('/dashboard')
   
    }

    

    return(
    <div className = "forms">
        <h1>Tela de login</h1>
        <form>
            <input type="text" placeholder = "login" onChange = {e => setLogin(e.target.value)}/>
            <input type="password" placeholder = "senha" onChange = {e => setPassword(e.target.value)} />
        </form>

        <button onClick = {() => show()}>Logar</button>
    </div>
    )
}


export default Login;