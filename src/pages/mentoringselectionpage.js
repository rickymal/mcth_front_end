import React from "react";
import "../pages/mentoringselectionpage.css";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Mentoringselecionpage = (props) => {
  const { push } = useHistory();
  // data de teste

  async function show_disposable_mentors() {
    const response = await api.get("show_disposable_mentors/");
    const r = response.data;
    //alert(JSON.stringify(r))

    var converted_data = r.map(function (resposta) {
      //alert("OI")
      return {
        id_key: resposta.id,
        mentor_id: resposta.mentor_id,
        team_id: resposta.team_id,
        mentor_name: resposta.name,
        data_meeting: resposta.time_meeting,
      };
    });

    //alert(JSON.stringify(converted_data))

    setDataaxios(converted_data);
  }

  useEffect(() => {
    show_disposable_mentors();
  }, []);

  const [dataaxios, setDataaxios] = useState([]);

  async function selectMentoring(chl) {
    alert("Mentoria selecionada com sucesso");
    const queries = {
      mentor_id: chl.mentor_id,
      mentor_name: chl.mentor_name,
      data_meeting: chl.data_meeting,
    };

    const uri =
      "select_mentor/?mentor_id=" +
      queries.mentor_id +
      "&mentor_name=" +
      queries.mentor_name +
      "&data_meeting=" +
      queries.data_meeting;
    const response = await api.get(uri);
    const data = response.data;

    if (data == "Mentoria registrada!") {
      alert("Mentoria registrada com sucesso");
      push("/dashboard");
    } else {
      alert("Algo de errado não deu muito certo");
    }
  }

  function handleChallenge(chl) {
    return (
      <div className="challengeBox">
        <p>
          Identificador do mentor : <strong>{chl.mentor_id}</strong>
        </p>
        <p>
          Nome do mentor : <strong>{chl.mentor_name}</strong>
        </p>
        <p>
          Horário da mentoria : <strong>{chl.data_meeting}</strong>
        </p>
        <button onClick={() => selectMentoring(chl)}>
          <strong>Selecionar mentoria</strong>
        </button>
      </div>
    );
  }

  function filterMentors(dataaxios) {
    //const r = dataaxios.map(chl => <li key = {chl.id}> {handleChallenge(chl)} </li>)

    const data_filtered = dataaxios.filter(function (e) {
      return e.team_id == null ? true : false;
    });

    const response = data_filtered.map((chl) => (
      <li key={chl.id}> {handleChallenge(chl)} </li>
    ));

    return response.length != 0 ? response : "Sem mentorias no momento";
  }

  return (
    <div className="mentoring_selection_page-container">
      <ul>{filterMentors(dataaxios)}</ul>
    </div>
  );
};

export default Mentoringselecionpage;
