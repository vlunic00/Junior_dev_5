import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import InputForm from './components/InputForm';
import Table from './components/Table';

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers = {
  "content-type": "application/json",
};

function App() {

  const [wardrobe, setWardrobe] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/items")
      .then(res => setWardrobe(res.data))
  }, [])

  function write(wardrobe){
    wardrobe.map(el => console.log(el))
  }

  return (
    <>
    {write(wardrobe)}
    <div className='title'>
      <h1>My Warderobe</h1>
    </div>
    <div className='front-page'>
      <InputForm setWardrobe={setWardrobe}/>
      <div className='line' />
      <div className='table-section'>
        <h2>List</h2>  
        <Table
          warderobe={wardrobe}
          setWarderobe={setWardrobe}
        />
      </div>
    </div>
    </>
  )
}

export default App
