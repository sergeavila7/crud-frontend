import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Update(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [identification, setIdentification] = useState('');
  const [role, setRole] = useState('');
  const [tcontracts, setTcontracts] = useState([]);
  const [contractselect, setContractselect] = useState('');

  useEffect(() => {
    getEmployee();
    setTcontracts(['Fijo', 'Temporal', 'Practicante']);
    // setContractselect('Fijo');
  }, []);

  const getEmployee = async () => {
    const id = props.match.params.id;
    const token = sessionStorage.getItem('token');
    const response = await Axios.get(
      '/employee/show/' + id,
      {
        headers: { authorization: token },
      }
    );
    setName(response.data.name);
    setLastname(response.data.lastname);
    setIdentification(response.data.identification);
    setRole(response.data.role);
    setContractselect(response.data.tcontract);
  };
  const update = async (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    const token = sessionStorage.getItem('token');
    const employee = {
      name,
      lastname,
      identification,
      role,
      tcontract: contractselect,
    };
    const response = await Axios.put(
      '/employee/update/' + id,
      employee,
      {
        headers: { authorization: token },
      }
    );
    const message = response.data.message;
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = '/home';
    }, 800);
  };
  return (
    <div className='container col-md-6 mt-4'>
      <div className='card'>
        <div className='card-header'>
          <h3>Editar</h3>
          <div className='card-body'>
            <form onSubmit={update}>
              <div className='form-group'>
                <label>Nombres:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className='form-group'>
                <label>Apellidos:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
              </div>
              <div className='form-group'>
                <label>Puesto:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
              </div>
              <div className='form-group'>
                <label>Identificación:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setIdentification(e.target.value)}
                  value={identification}
                />
                <div className='form-group'>
                  <label>Tipo de contrato:</label>
                  <select
                    className='form-control'
                    onChange={(e) => setContractselect(e.target.value)}
                    value={contractselect}
                  >
                    {tcontracts.map((tcontract) => (
                      <option key={tcontract}>{tcontract}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button variant='warning' type='submit'>
                Actualizar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
