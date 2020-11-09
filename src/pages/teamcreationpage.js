import React from 'react'
import "../pages/teamcreationpage.css"
import api from '../services/api'
import { useHistory } from 'react-router-dom'




class Challenge extends React.Component {
    constructor(name,enterprise,description){
        this.name = name;
        this.enterprise = enterprise;
        this.description = description;


    }


    render(){
        return(
            <div className = "challengeBox">
                <h3>Nome</h3>
                <h3>{this.name}</h3>
                <h3>Empresa</h3>
                <h3>{this.enterprise}</h3>
                <h3>Descrição</h3>
                <h3>{this.description}</h3>
            </div>
        )
    }
}

// http://127.0.0.1:8000/create_team?challenge=Gorila%20Glass






const Teamcreationpage = (props) => {
    const { push } = useHistory() 

    async function createTeamAndSelectChallenge(chl){
    
        alert("Selecionando desafio " + chl.challenge_name)
        const uri = `create_team/?challenge=${chl.challenge_name}`
        alert(uri);
        const response = await api.get(uri);
        const data = response.data
        alert(data)
        push('/dashboard')
        
    
    }
    
    const handleChallenge = (chl) => {
        return (
            <div className = "challengeBox">
                <h2>{chl.challenge_name}</h2>
                <h2>{chl.enterprise}</h2>
                <h2>{chl.description}</h2>
                <button onClick = {() => createTeamAndSelectChallenge(chl)}>Selecionar desafio</button>
            </div>
        )
    }



    const user = localStorage.getItem("username");

    const data = [{
        enterprise : "Empresalandia",
        challenge_name : "Gorila Glass",
        description : "descritura",
        id : 0
    },{
        enterprise : "Empresalandia",
        challenge_name : "Desafio Catamarã",
        description : "descrivosa"
    }]


    return(
        <div className = "container">
            <h2>Bem vindo, {user}</h2>
            <div className = "challengeSelection">
                <ul>
                    {data.map(chl => <li key = {chl.id}> {handleChallenge(chl)} </li>)}
                </ul>
            </div>
        </div>
    )
}
export default Teamcreationpage;