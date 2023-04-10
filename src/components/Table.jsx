import TableRow from "./TableRow";


function Table ({warderobe, setWarderobe}){
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
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Table