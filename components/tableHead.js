import styles from './tableHead.module.css'

function TableHead({ handleClick }){
    return( 
        <thead>
            <tr>

                <th className={styles.sortable} onClick={(e) => handleClick(e,"name")}>Name</th>
                <th className={styles.sortable} onClick={(e) => handleClick(e,"city")}>City</th>
                <th className={styles.sortable} onClick={(e) => handleClick(e,"state")}>State</th>
                <th className={styles.sortable} onClick={(e) => handleClick(e,"phone")}>Phone Number</th>
                <th className={styles.sortable} onClick={(e) => handleClick(e,"genres")}>Genres</th>

            </tr>
        </thead>
    )
}

export default TableHead