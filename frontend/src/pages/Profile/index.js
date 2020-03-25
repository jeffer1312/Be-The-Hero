import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link,useHistory } from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import api from '../../services/api'
import './styles.css'


export default function Profile(){

  const[incidents,setIncidents]=useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  useEffect(()=>{
    api.get('/profile',{
      headers:{
        authorization:ongId,
      }
    }).then(res=>{
      setIncidents(res.data)
    })
  },[ongId]);

  async function handleDeleteIncident(id){
    try {
      await api.delete(`/incidents/${id}`,{
        headers:{
          authorization:ongId
        }
      })
      setIncidents(incidents.filter(incident =>incident.id !== id))
    
    } catch (error) {
      alert('erro ao deletar tente novamente')
    }
  }

    function handleLogout(){
      localStorage.clear();
      history.push('/');
    }
  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>

      </header>

      <h1>Casos cadastrados</h1>


      <ul>
       {incidents.map(incident => (
                 <li key={incident.id}>
                 <strong>CASO:</strong>
                 <p>{incident.title}</p>
       
                 <strong>DESCRIÇÂO:</strong>
                 <p>{incident.description}</p>
       
                 <strong>Valor:</strong>
                 <p>{Intl.NumberFormat('pt-Br',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                 <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                   <FiTrash2 size={20} color="#a8a8b3"/>
                 </button>
               </li>
       ) )} 
      </ul>

    </div>
  )
}

