import styles from './table.module.css'

function Table({ restaurants }){
    function changeSortMethod(e,val){
        console.log(val)
    }

    return( 
        <table className={"table table-dark"}>
        <thead>
            <tr>

                <th className={styles.sortable} onClick={(e) => changeSortMethod(e,"name")}>Name</th>
                <th className={styles.sortable} onClick={(e) => changeSortMethod(e,"city")}>City</th>
                <th className={styles.sortable} onClick={(e) => changeSortMethod(e,"state")}>State</th>
                <th className={styles.sortable} onClick={(e) => changeSortMethod(e,"phone")}>Phone Number</th>
                <th className={styles.sortable} onClick={(e) => changeSortMethod(e,"genres")}>Genres</th>

            </tr>
        </thead>
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