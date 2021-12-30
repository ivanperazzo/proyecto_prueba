import React, {useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {
  
  const baseUrl = 'https://localhost:44343/api/gestores';

  const [data, setData] = useState([]);

  const [modalInsertar, setModalInsertar] = useState(false);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id: '', 
    nombre: '', 
    lanzamiento: '', 
    desarrollador: '', 
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]:value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{ 
    setModalInsertar(!modalInsertar);
  }

  const peticionGet=async() =>{
    await axios.get(baseUrl)
    .then(response =>{
      setData(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const peticionPost=async() =>{
    delete gestorSeleccionado.id;
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl, gestorSeleccionado)
    .then(response =>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error =>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
  },[]);
  return (
    <div className="App">
      <br/>
    <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar Nuevo Gestor</button> {" "}
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Lanzamiento</td>
            <td>Desarrollador</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor=>(
            <tr key={gestor.id}>
              <td>{gestor.id}</td>
              <td>{gestor.nombre}</td>
              <td>{gestor.lanzamiento}</td>
              <td>{gestor.desarrollador}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {" "}
                <button className="btn btn-danger">Eliminar</button> {" "}
              </td>
            </tr>))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Gestor de Base de Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre"  onChange={handleChange}/>
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input type="text" className="form-control" name="desarrollador" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
