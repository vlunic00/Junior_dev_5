import TableRow from "./TableRow";


function Table ({warderobe, setWarderobe, clothingTypes, sizesOfClothing, setOfPictures, picKeys}){
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {warderobe.map((w) => (
                    <TableRow
                        key={w.id}
                        warderobe={w}
                        setWarderobe={setWarderobe}
                        clothingTypes={clothingTypes}
                        sizesOfClothing={sizesOfClothing}
                        setOfPictures={setOfPictures}
                        picKeys={picKeys}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Table