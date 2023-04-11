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

  const [clothingTypes, setClothingTypes] = useState([])
  const [sizesOfClothing, setSizesOfClothing] = useState([])

  const setOfPictures = {
    tShirt: '/images/t-shirt.jpg',
    Sweater: '/images/sweater.jpg',
    Pants: '/images/pants.jpg',
    Jacket: '/images/jacket.jpg',
    Coat: '/images/coat.jpg',
    Shoes: '/images/shoes.jpg'
  }

  const picKeys = Object.keys(setOfPictures)

  useEffect(() => {
      const fetchData = async () => {
          const fetchClothingTypes = axios.get("/types")
          const fetchClothingSizes = axios.get("/sizes")

          const requirementArray = [fetchClothingTypes, fetchClothingSizes]

          try {
              const [firstResult, secondResult] = await Promise.all(requirementArray)

              setClothingTypes(firstResult.data)
              setSizesOfClothing(secondResult.data)

          }
          catch (error){
              console.log(error)
          }
      }

      fetchData()
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
      <InputForm setWardrobe={setWardrobe} clothingTypes={clothingTypes} sizesOfClothing={sizesOfClothing}
        setOfPictures={setOfPictures} picKeys={picKeys}/>
      <div className='line' />
      <div className='table-section'>
        <h2>List</h2>  
        <Table
          warderobe={wardrobe}
          setWarderobe={setWardrobe}
          clothingTypes={clothingTypes}
          sizesOfClothing={sizesOfClothing}
          setOfPictures={setOfPictures}
          picKeys={picKeys}
        />
      </div>
    </div>
    </>
  )
}

export default App
