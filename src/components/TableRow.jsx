import axios from "axios";
import { useState } from "react";

function TableRow({warderobe, setWarderobe, clothingTypes, sizesOfClothing, setOfPictures, picKeys}){
    
    const [change, setChange] = useState(false)
    const [formData, setFormData] = useState([])

    async function deleteData() {
        await axios.delete(`/items/${warderobe.id}`)

        const result = await axios.get("/items")
        setWarderobe(result.data)
    }

    function startEdit(){
        setFormData({
            type: warderobe.item.type,
            size: warderobe.item.size,
            color: warderobe.item.color,
            img: warderobe.item.img_path
        })

        setChange(true)
        console.log(warderobe)
    }

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

    async function storeData(){
        const toSend = processData(formData)

        await axios.put(`/items/${warderobe.id}`, toSend)
        const result = await axios.get("/items")
        setWarderobe(result.data)
        setChange(false)
    }

    const inputChange = (event) => {
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }
    
    return(
        <tr>
            <td>{warderobe.id}</td>
            <td>
                {change ? (
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
                ) : (
                    warderobe.item.type
                )}
                </td>
            <td>
                {change ? (
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
                ): (
                    warderobe.item.size
                )}
            </td>
            <td>
                {change ? (
                    <input className="color-input" type="color"
                    name="color"
                    value ={formData.color}
                    onChange={inputChange}
                    required
                    ></input>
                ) : (
                    warderobe.item.color
                )}
                </td>
            <td>
                {change ? (
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
                ) : (
                    <img src={warderobe.item.img_path} alt="Clothing image" className="clothing-image"/>
                )}
            </td>
            <td>
                <button onClick={deleteData}>Delete</button>
                {change ? (
                    <button onClick={storeData}>Store</button>
                ) : (
                    <button onClick={startEdit}>Edit</button>
                )}
            </td>
        </tr>
    )
}

export default TableRow