import React, { useState } from 'react';
import './auth.css'; // Shared CSS for both login and register
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../API/api'; // Ensure this is correct

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Please enter an email';
      }
      if (!values.password) {
        errors.password = 'Please enter a password';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
       
        const response = await axios.post(`${API}/api/signin/create`, values);
        console.log(response.data)
        setLoading(true);
        const { success, message, } = response.data;
        if (success) {
          // toast.success(message);
          setLoading(true);
          // localStorage.setItem('auth', JSON.stringify({ user, token }));
          navigate('/home'); 
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('An error occurred while logging in.');
      }
    },
  });

  return (
    <div className="auth-container">
      <ul className="nav nav-pills nav-justified mb-3 justify-content-lg-end" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-login" href="#pills-login" role="tab" aria-selected="true">
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <Link to="/" className="nav-link">
            Register
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>
            <p className="text-center">or:</p>

            <input
              type="email"
              id="loginName"
              className="form-control"
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}

            <input
              type="password"
              id="loginPassword"
              className="form-control mt-3"
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}

            <div className="row mb-4">
              <div className="col-md-6 d-flex justify-content-center"></div>
              <div className="col-md-6 d-flex justify-content-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center">
              <button>Not a member? <Link to="/">Register</Link></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
