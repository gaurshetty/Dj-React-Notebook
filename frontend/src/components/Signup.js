import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import notepic from './logo.png';

const Signup = (props) => {
  const host = "http://localhost:8000"
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let navigate = useNavigate ();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(credentials.password !== credentials.cpassword){
      props.showAlert("Password does not match", "danger")
    }else{
      const response = await fetch(`${host}/signup/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });
      const result = await response.json()
      if(result.success) {
        navigate('/login');
        props.showAlert("Account created successfully!", "success")
      }
      else{
        props.showAlert(result.message.email, "danger")
      }
    }
  };

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  };

  return (
    <div className='container'>
      <div className="text-center">
        <img className="mb-4" src={notepic} alt="" style={{width:"150px", height:"150px"}} />
      </div>
      <h1 className='text-center'>Create your account!</h1>
      <div className="row mt-4">
        <div className="col-md-4 offset-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} required aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
