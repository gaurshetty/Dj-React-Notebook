import React from 'react'
import "./About.css"
import { Link } from 'react-router-dom'
import notepic from './logo.png'


const About = () => {

  return (
    <div className='contianer'>
      <div className="text-center">
        <img className="mb-4" src={notepic} alt="" style={{width:"150px", height:"150px"}} />
      </div>
      <div className="container text-center">
        <h1>About iNotebook</h1>
        <p>Quickly capture what is on your mind and get a reminder later at the right place or time. Speak a voice memo on the go and have it automatically transcribed. Grab a photo of a poster, receipt or document and easily organize or find it later in search. Google Keep makes it easy to capture a thought or list for yourself, and share it with friends and family.</p>
      </div>
      <footer className="container text-center">
        <h4>Follow Us</h4>
        <div className='socialMedia'>
        <Link className='logo' to="#" title="Facebook"><i className="fa fa-facebook" style={{width: "18px"}}></i></Link>
        <Link className='logo' to="#" title="Twitter"><i className="fa fa-twitter"></i></Link>
        <Link className='logo' to="#" title="Google +"><i className="fa fa-google-plus"></i></Link>
        <Link className='logo' to="#" title="Google +"><i className="fa fa-instagram"></i></Link>
        <Link className='logo' to="#" title="Linkedin"><i className="fa fa-linkedin"></i></Link>
        </div>
        <p>Powered by iNotebook</p>
      </footer>
    </div>
  )
}

export default About
