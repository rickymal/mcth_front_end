import React from "react";
import "../pages/teamcreationpage.css";
import api from "../services/api";
import { useHistory } from "react-router-dom";

// http://127.0.0.1:8000/create_team?challenge=Gorila%20Glass

const Teamcreationpage = (props) => {
  const { push } = useHistory();

  async function createTeamAndSelectChallenge(chl) {
    const uri = `create_team/?challenge=${chl.challenge_name}`;
    const response = await api.get(uri);
    const data = response.data;
    push("/dashboard");
  }

  const handleChallenge = (chl) => {
    return (
      <div className="challengeBox">
        <h2>{chl.challenge_name}</h2>
        <h2>{chl.enterprise}</h2>
        <h2>{chl.description}</h2>
        <button onClick={() => createTeamAndSelectChallenge(chl)}>
          Selecionar desafio
        </button>
      </div>
    );
  };

  // Substituir para os dados obtidos no Back-end depois
  const data = [
    {
      enterprise: "Empresalandia",
      challenge_name: "Gorila Glass",
      description: "descritura",
      id: 0,
    },
    {
      enterprise: "Empresalandia",
      challenge_name: "Desafio Catamarã",
      description: "descrivosa",
    },
  ];

  return (
    <div className="teamcreationpage-container">
      <div className="challengeSelection">
        <ul>
          {data.map((chl) => (
            <li key={chl.id}> {handleChallenge(chl)} </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Teamcreationpage;
