import React, { useState } from 'react';
import './auth.css'; // Shared CSS for both login and register
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../API/api'; // Ensure this is correct
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneno: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Please enter a name';
      }
      if (!values.email) {
        errors.email = 'Please enter an email';
      }
      if (!values.password) {
        errors.password = 'Please enter a password';
      }
      if (!values.phoneno) {
        errors.phoneno = 'Please enter a phone number';
      } else if (!/^\d{10}$/.test(values.phoneno)) {
        errors.phoneno = 'Phone number must be 10 digits';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(`${API}/api/user/register`, values);
        console.log(response);
        setLoading(false);

        // Show success toast notification
        toast.success('Registration successful!', {
          position: "top-right", // Using string for position
        });

        // Navigate to login page after successful registration
        navigate('/login');
      } catch (error) {
        setLoading(false);
        console.error('Error registering:', error);

        // Show error toast notification
        toast.error('An error occurred during registration.');
      }
    },
  });

  return (
    <div className="auth-container">
      <ul className="nav nav-pills nav-justified mb-3 justify-content-lg-end" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-register" href="#pills-register" role="tab" aria-selected="true">
            Register
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="pills-register" role="tabpanel">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="registerName"
              className="form-control"
              placeholder="Name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}

            <input
              type="email"
              id="registerEmail"
              className="form-control mt-3"
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}

            <input
              type="password"
              id="registerPassword"
              className="form-control mt-3"
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}

            <input
              type="tel"
              id="registerPhoneno"
              className="form-control mt-3"
              placeholder="Phone Number"
              {...formik.getFieldProps('phoneno')}
            />
            {formik.touched.phoneno && formik.errors.phoneno ? (
              <div className="text-danger">{formik.errors.phoneno}</div>
            ) : null}

            <button type="submit" className="btn btn-primary btn-block mt-4">
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center mt-3">
              <p>Already a member? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
