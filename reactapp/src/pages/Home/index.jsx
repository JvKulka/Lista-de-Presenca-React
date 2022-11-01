import React, {useState, useEffect} from 'react'
import './style.css'
import {Card} from '../../components/Card'

function Home() {
  // 1 Parametro = coloca o nome do estado inicial que esta | 2 Parametro = função que atualiza o estado
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name:'', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect( () => { //usado para trazer as informações de uma API para o projeto
      //corpo do useEffect
      fetch('https://api.github.com/users/JvKulka')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
    }, []);

  return (
    <div className='container'> 
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setStudentName(e.target.value)} //Todas as vezes q o conteudo do input mudar, a informação será passada
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map (student => (
            <Card 
            key = {student.time} //a key deve ser especifica e não pode ter repetição
            name={student.name} 
            time={student.time}
            />
          ))
        }
    </div>

  )
}

export default Home
