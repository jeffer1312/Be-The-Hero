import React, {useState} from 'react';
import './styles.css';
import {Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'


export default function Newincident(){
  const ongId = localStorage.getItem('ongId')
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [value,setValue] = useState('');
  const history = useHistory()

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents',data,{ 
        headers:{
          authorization:ongId,
        }
      })
      history.push('/profile')

    } catch (error) {
      alert('Erro ao cadastrar tente novamente')
    }

  }
  return(
    <div className="new-incident-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso </p>

        <Link className="back-link" to="/profile">
           <FiArrowLeft size={16} color="#e02041" />
            voltar para home 
           
        </Link>
      </section>
      <form onSubmit={handleNewIncident}>
        <input 
        required
          placeholder="titulo do caso"
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
        <textarea  
         required
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        <input 
         required
          placeholder="valor em reais"
          value={value}
          onChange={e => setValue(e.target.value)}
          />


        <button className="button" type='submit'>Cadastrar</button>
        

      </form>
    </div>
  </div>
  )
}