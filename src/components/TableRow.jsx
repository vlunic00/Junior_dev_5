import axios from "axios";
import { useState } from "react";

function TableRow({warderobe, setWarderobe}){
    
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
            <td>{warderobe.item.type}</td>
            <td>{warderobe.item.size}</td>
            <td>{warderobe.item.color}</td>
            <td><img src="{warderobe.item.img_path}" alt="Clothing image"/></td>
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