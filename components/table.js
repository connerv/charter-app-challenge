import { useEffect } from 'react'
import styles from './table.module.css'

const useSortableData = (items, config = null) => {
    const [sortMethod, setSortMethod] = React.useState(config)

    const sortedRestaurants = React.useMemo(() =>{
        let sortableRestaurants =  [...items]
        if(sortMethod !== null){
            sortableRestaurants.sort((a, b) => {
                if (a[sortMethod.key] < b[sortMethod.key]) {
                    return sortMethod.direction === 'ascending' ? -1 : 1;
                  }
                  if (a[sortMethod.key] > b[sortMethod.key]) {
                    return sortMethod.direction === 'ascending' ? 1 : -1;
                  }
                  return 0;
            });
        }
        return sortableRestaurants;
    }, [items, sortMethod])
    

    const changeSortMethod = key => {
        let direction = 'ascending'
        if(sortMethod && sortMethod.key === key && sortMethod.direction === 'ascending'){
            direction = 'descending'
        }
        setSortMethod({key, direction})
    }
    
    return {sortedRestaurants: sortedRestaurants, changeSortMethod, sortMethod};
}


function Table({ restaurants }){
    const { sortedRestaurants, changeSortMethod, sortMethod } = useSortableData(restaurants);
    const getClassNamesFor = (name) => {
        if (!sortMethod) {
          return styles.sortable;
        }
        return sortMethod.key === name ? `${sortMethod.direction} ${styles.sortable} ` : styles.sortable;
      };
      
      useEffect(()=>{
        changeSortMethod('name')
      }, [])
      

    return( 
        <table className={"table table-dark"}>
        <thead>
            <tr>
                <th className={getClassNamesFor('name')} onClick={(e) => changeSortMethod('name')}>Name</th>
                <th className={getClassNamesFor('city')} onClick={(e) => changeSortMethod('city')}>City</th>
                <th className={getClassNamesFor('state')} onClick={(e) => changeSortMethod('state')}>State</th>
                <th>Phone Number</th>
                <th>Genres</th>

            </tr>
        </thead>
        <tbody>

            {sortedRestaurants.map((restaurant) => (
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