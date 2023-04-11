import axios from "axios";
import { useEffect, useState } from "react";

function InputForm({ setWardrobe, clothingTypes, sizesOfClothing, setOfPictures, picKeys }){
    
    const [formData, setData] = useState({
        type: "",
        size: "",
        color: "#000000",
        image: ""
    })

    function processData(object){
        return {
            item: {
                type: object.type,
                size: object.size,
                color: object.color,
                img_path: object.img_path
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
        <form className="input-form" onSubmit={sendData}>
         <div className="input">
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
         <div className="input">
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
         <div className="input">
         <label>
            Color:
            <input className="color-input" type="color"
            name="color"
            value ={formData.color}
            onChange={inputChange}
            required
            ></input>    
            </label>
         </div>
         <div className="input">
            <label>
                Image:
                <select
                 name="img_path"
                 value={formData.img_path}
                 onChange={inputChange}
                 required
                >
                    <option value="" disabled selected>--Choose clothing image--</option>
                        {picKeys.map((key) => (
                            <option key={key} value={setOfPictures[key]}>{key}</option>
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