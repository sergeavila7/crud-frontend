import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Table, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Home() {
  const [employes, setEmployes] = useState([]);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [identification, setIdentification] = useState('');
  const [role, setRole] = useState('');
  const [tcontracts, setTcontracts] = useState([]);
  const [contractselect, setContractselect] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getEmployes();
    setTcontracts(['Fijo', 'Temporal', 'Practicante']);
    setContractselect('Fijo');
  }, []);

  const getEmployes = async () => {
    const id = sessionStorage.getItem('iduser');
    const token = sessionStorage.getItem('token');
    const response = await Axios.get('/employee/byTheUser/' + id, {
      headers: { authorization: token },
    });
    setEmployes(response.data);
  };

  const remove = async (id) => {
    const token = sessionStorage.getItem('token');
    const response = await Axios.delete('/employee/delete/' + id, {
      headers: { authorization: token },
    });
    const message = response.data.message;
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    getEmployes();
  };
  const save = async (e) => {
    e.preventDefault();
    const user = {
      name,
      lastname,
      identification,
      role,
      tcontract: contractselect,
      user: sessionStorage.getItem('iduser'),
    };
    const token = sessionStorage.getItem('token');
    const response = await Axios.post('/employee/add', user, {
      headers: { authorization: token },
    });
    const message = response.data.message;
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
  };

  const search = async (e) => {
    if (e.target.value === '') {
      return getEmployes();
    }
    const search = e.target.value;
    const token = sessionStorage.getItem('token');
    const response = await Axios.get(
      `/employee/search/${search}/${sessionStorage.getItem('iduser')}`,
      {
        headers: { authorization: token },
      }
    );
    setEmployes(response.data);
  };
  return (
    <div>
      <header className='py-2 bg-primary text-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>
                <i className='pr-2'>
                  <FaUserFriends />
                </i>
                Empleados
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/*Search*/}
      <nav className='navbar py-4'>
        <div className='container'>
          <div className='col-md-3'>
            <Link
              to='#'
              className='btn btn-primary btn-block'
              data-toggle='modal'
              data-target='#addEmployee'
              onClick={handleShow}
            >
              <IconContext.Provider value={{ size: '30px' }}>
                <i className=''>
                  <FaUserPlus />
                </i>
              </IconContext.Provider>
            </Link>
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Buscar...'
                aria-label='Search'
                onChange={(e) => search(e)}
              />
            </div>
          </div>
        </div>
      </nav>
      {/*Mostar empleados*/}
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Empleados de {sessionStorage.getItem('name')}</h4>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre(s)</th>
                      <th>Apellidos</th>
                      <th>Identificación</th>
                      <th>Puesto</th>
                      <th>Tipo de contrato</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employes.map((employee, i) => (
                      <tr key={employee._id}>
                        <td>{i + 1}</td>
                        <td>{employee.name}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.identification}</td>
                        <td>{employee.role}</td>
                        <td>{employee.tcontract}</td>
                        <td>
                          <Button
                            variant='success'
                            text='white'
                            className='mr-2'
                          >
                            <Link to={'/edit/' + employee._id}>Editar</Link>
                          </Button>
                          <Button
                            onClick={() => remove(employee._id)}
                            variant='danger'
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MODAL */}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={save}>
              <div className='form-group'>
                <label>Nombres:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Apellidos:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Puesto:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Identification:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  onChange={(e) => setIdentification(e.target.value)}
                />
                <div className='form-group'>
                  <label>Tipo de contrato:</label>
                  <select
                    className='form-control'
                    onChange={(e) => setContractselect(e.target.value)}
                  >
                    {tcontracts.map((tcontract) => (
                      <option key={tcontract}>{tcontract}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Modal.Footer>
                <Button className='btn btn-primary' type='submit'>
                  Guardar
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
