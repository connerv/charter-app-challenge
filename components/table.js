import TableHead from './tableHead'

function Table({ restaurants }){
    function handleClick(e,val){
        console.log(val)
    }

    return( 
        <table className={"u-full-width"}>
        <TableHead handleClick={handleClick}></TableHead>
        <tbody>

            {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre}</td>
            </tr>
            ))}

        </tbody>
        
      </table>
    )
}

export default Table