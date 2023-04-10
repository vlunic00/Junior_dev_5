import axios from "axios";
import { useEffect, useState } from "react";
import tShirtPic from '../pictures/t-shirt.jpg'

function InputForm({ setWardrobe }){
    
    const [formData, setData] = useState({
        type: "",
        size: "",
        color: "#000000",
        image: ""
    })

    const [clothingTypes, setClothingTypes] = useState([])
    const [sizesOfClothing, setSizesOfClothing] = useState([])

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

    function processData(object){
        return {
            item: {
                type: object.type,
                size: object.size,
                color: object.color,
                img: object.img_path
            }
        }
}

    const sendData = async (event) => {
        event.preventDefault()

        const dataToSend = processData(formData)
        console.log(dataToSend)
        
        await axios.post("/items", dataToSend)

        const result = await axios.get("/items")
        setWardrobe(result.data)
    }

    const inputChange = (event) => {
        const { name, value } = event.target
        setData({...formData, [name]: value})
    }
    
    return (
        <>
        <form onSubmit={sendData}>
         <div>
            <label>
                Type:
                <select
                 name="type"
                 value={formData.type}
                 onChange={inputChange}
                 required
                >
                    <option value="" disabled selected>--Choose clothing type--</option>
                    {clothingTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </label>
         </div>
         <div>
            <label>
                Size:
                <select
                 name="size"
                 value={formData.size}
                 onChange={inputChange}
                 required
                >
                    <option value="" disabled selected>--Choose clothing size--</option>
                    {sizesOfClothing.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>
         </div>
         <div>
         <label>
            Color:
            <input type="color"
            name="color"
            value ={formData.color}
            onChange={inputChange}
            required
            ></input>    
            </label>
         </div>
         <div>
            <label>
                Image:
                <select
                 name="img_path"
                 value={formData.img_path}
                 onChange={inputChange}
                 required
                >
                    <option value="" disabled selected>--Choose clothing image--</option>
                    {clothingTypes.map((type) => (
                        <option key={type} value={tShirtPic}>{type}</option>
                    ))}
                </select>
            </label>
         </div>
         <button type="submit">Add item</button>
        </form>
        </>
    )
}

export default InputForm