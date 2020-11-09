import React from 'react'
import {useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import api from '../services/api'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils'
import '../pages/dashboard.css'
const Dashboard = (props) => {
    const { push } = useHistory()

    
    const [data,setData] = useState({aloha : "OI"})
    const [team,setTeam] = useState("Sem time")
    const [idTeam, setIdTeam] = useState(0);
    const [challenge_name, set_challenge_name] = useState("Sem desafio selecionado");

    const [mentoring_already_made,set_mentoring_already_made] = useState([{}])

    const [user_kind,set_user_kind] = useState("any")

    const [ok,setOk] = useState(false);

    const [email,setEmail] = useState("")     

    const [project_link,set_project_link] = useState("")


    const [data_info,set_data_info] = useState("2021/11/28T19:30:28")

    const [project_list,set_project_list] = useState([{}])
    const [note,set_note] = useState(0.)

    

    useEffect(function(){
        async function wrapper(){
            const t = await api.get("check_user_type") // Retorna uma string 
            const d = await api.get("get_selections_mentor") // retorna uma lista de objetos contendo as mentorias
            ////alert(JSON.stringify(response))
            const response = await api.get("get_user_info") //alterar o nome da rota pois já obtem dados de estudantes e mentores. Recebe uma lista contendo os dados para a dashboard

            if (t.data == "Student"){
                set_challenge_name(response.data.team.challenge);            
                setIdTeam(response.data.team.id)
            }
            else if(t.data == "Judger"){
                //project_list
                api.get("get_listOf_project").then(function({data}){
                    set_project_list(data)
                    //alert(JSON.stringify(data))
                })

            }


            
            const data_async = d.data
            if(typeof(data_async) == "object"){
                
                set_mentoring_already_made(data_async)
            }
            else{
                set_mentoring_already_made([{}])
            }

            set_user_kind(t.data)
            setOk(true)
            
            
       }

       wrapper()
       

    },[])

    function disableMentoring(element){
        //alert("Ainda não implementado")

        
        return null // a implementar
    }



    async function createMentoring(data_to_meet = "2020/11/28T19:30:28"){
        //insert_data_meeting
        const meeting_hour = data_to_meet
        const response = api.get("insert_data_meeting/?meeting_hour=" + meeting_hour).then(function(){
            //alert("Mentoria inscrita com sucesso");
        })
    }
    

    async function insertNewMemberForTeam(email){
        if(!Array.isArray(email)){
            email = [email]
        }
        //alert("emailoso")
        //alert([email])
        const dataJSON = {
            email : email
        }
        const response = api.post("integrate_team",dataJSON).then(function(e){
            
            //alert(JSON.stringify(e.data))

        })
    }

    function sendprojectlink(value){
        //push('/sendprojectlink')
        api.post('sendprojectlink?link=' + value).then(function(response){
            const data = response.data
            //alert(data)
            //alert(JSON.stringify(data))
        })



        // /set_points?team_id=16&note=6.89
        // /set_points?note=5.65&team_id%20=16
    }
    

    async function sendNote(value,team_id){
        //alert(value)
        //alert(team_id)
        const note_number = value.replace(',','.')
        api.get("set_points?note=" + note_number + "&team_id=" + team_id)
    }
    async function getListOfProjects(){
        

    }

    function HandleDashboard(){
           
        

        if (user_kind == "Student"){
            return (
                <div>
                    <button onClick = {() => push('/teamcreationpage')}>{idTeam == 0 ? "Criação de time" : "Alteração"}</button>
                    <button onClick = {() => push('/mentoringselecionpage')}>Seleção de mentorias</button>
                    {idTeam != 0 ? <button onClick = {() => insertNewMemberForTeam(email)}>Inserir membro</button> : null}
                    {idTeam != 0 ? <input onChange = {e => setEmail(e.target.value)}/> : null }
                    {idTeam != 0 ? <button onClick = {() => sendprojectlink(project_link)}>Enviar projeto</button> : null}
                    {idTeam != 0 ? <input onChange = {e => set_project_link(e.target.value)}/> : null}
                    
                </div>
            )
        }
        else if(user_kind == "Mentor"){
            return (
                <div>
                    <textarea value = {data_info} onChange = {(e) => set_data_info(e.target.value)}/>
                    <button onClick = {() => createMentoring(data_info)}>Criar mentoria</button>
                </div>
            )
        }
        else if(user_kind == "Judger"){
            
            return (
                <div>
                    <ul>
                        {project_list.map(function(dataset){
                                return (
                                    <li key = {dataset.id}>
                                        <div>
                                            <p>Nota atual: {dataset.noteJudged}</p>
                                            <p>Link do projeto: {dataset.link_project}</p>
                                            <input placeholder = "Digite a nota" onChange = {e => set_note(e.target.value)}/>
                                            <button onClick = {e => sendNote(note,dataset.id)}>Enviar nota</button>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            )
        }
        else{
            <div>
                <button>Anything</button>
            </div>
        }
    }


    function handleTemplate(){
        if (user_kind == "Student"){
            return(

            <div>
                <div className = "template-dashboard">
                    <h2>{idTeam == 0 ? "Sem equipe definida" : "O número da sua equipe é " + idTeam}</h2>   
                    <h2>Desafio: {challenge_name}</h2>
                </div>
                <div className = "mentoring-dashboard">
                    <h2>Lista de mentorias</h2>
                    <ul>
                        {mentoring_already_made ? mentoring_already_made.map((e) => (
                            <li key = {e.id}>
                                <p>Nome do mentor : {e.mentor_name}</p>
                                <p>data da mentoria : {e.data_meeting}</p>
                            </li>
                            
                        )) : <p>Sem mentoria</p>} 
                    </ul>
                </div>
            </div>
            )
        }
        else if(user_kind == "Mentor") {
            return (
                <div>
                    <p>Nenhum template definido</p>
                </div>
            )
        }
        else if(user_kind == "Judger"){
            return null;
        }
        else{
            return <p>Não foi encontrado template</p>
        }

       
    }

    // gambiarra vergonhosa para renderizar tudo só quando os dados forem pegos no back-end
    if (ok) {
        return (
            <div className = "dashboard-container">
               
                <div className = "navbar">
                    <p>Olá, {localStorage.getItem("username")}</p>
                    <p>Sair</p>
                </div>
                {handleTemplate()}
                <h2>Opções</h2>
                {HandleDashboard()}
            </div>
        )
    }
    else{
        return null;
    }
}

export default Dashboard;