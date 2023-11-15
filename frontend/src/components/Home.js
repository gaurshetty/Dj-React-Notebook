import React from 'react';
import Notes from './Notes';

const Home = (props) => {
 
  return (
    <div className='container my-3'>
      <h1 className='mt-3 text-center'>My Notes</h1>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
