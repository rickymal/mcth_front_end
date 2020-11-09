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
        /*
        api.get(`/login/?username=${login}&password=${password}`).then(function(e){
            //alert("Esta mensagem indica que a resposta irá seguir em seguida");
            //alert(e);
        },function(e){
            //alert("Algo de errado não está certo");
        }).catch(function (error) {
            //alert("Algo de errado não está certo");
        })
        
        const response = 'oi';
        */
        ////alert(data_result)
        //console.log(response.data)
        ////alert(typeof(response.data))
        //alert("Você foi logado com sucesso");
        //alert("Redirecionamento")
        localStorage.setItem("username",login.split("@")[0]);
        push('/dashboard')
        
        ////alert(response.data.status)
        //alert(JSON.stringify(response.data))
        ////alert(response.data.data)
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