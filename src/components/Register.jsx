import { React, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { IconContext } from 'react-icons';
import { FaUserPlus } from 'react-icons/fa';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    const response = await Axios.post('/boss/add', user);
    const message = response.data.message;
    if (message !== 'Bienvenido') {
      Swal.fire({
        icon: 'error',
        title: message,
        text: '¡Algo ha salido mal!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const token = response.data.token;
      const name = response.data.name;
      const iduser = response.data.id;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('iduser', iduser);
      window.location.href = '/home';
      // Swal.fire({
      //   icon: 'success',
      //   title: message,
      //   text: '¡Inicio de sesión correcto!',
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <div className='card'>
            <IconContext.Provider value={{ size: '50px' }}>
              <div className='container text-center pt-4'>
                <i>
                  <FaUserPlus />
                </i>
              </div>
            </IconContext.Provider>

            <div className='card-header text-center'>
              <h4>Inicio de sesión</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={register}>
                <div className='form-group'>
                  <label>Nombre:</label>
                  <input
                    type='text'
                    className='form-control'
                    autoFocus
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Email:</label>
                  <input
                    type='email'
                    className='form-control'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Password:</label>
                  <input
                    type='password'
                    className='form-control'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type='submit' className='btn btn-primary btn-block' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
