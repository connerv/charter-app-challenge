import { useEffect } from 'react'
import styles from './table.module.css'
import SelectState from './select-state'
import SelectGenre from './select-genre'


const useSortableData = (items, config = null) => {
    const [sortMethod, setSortMethod] = React.useState(config)

    const sortedRestaurants = React.useMemo(() =>{
        let sortableRestaurants =  [...items]
        if(sortMethod !== null){
            
                sortableRestaurants.sort((a, b) => {
                    if (a[sortMethod.sort.key] < b[sortMethod.sort.key]) {
                        return sortMethod.sort.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortMethod.sort.key] > b[sortMethod.sort.key]) {
                        return sortMethod.sort.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            
                if(sortMethod.stateFilter && sortMethod.stateFilter !== 'all'){
                    console.log('here')
                    let pickArray = sortableRestaurants.filter(item => item['state'].includes(sortMethod.stateFilter))
                    if(pickArray.length > 0){
                        sortableRestaurants = pickArray
                    } else {
                        sortableRestaurants = [{name: "No Restuarants Match", city: "", state: "", telephone: "", genre: "", id:"1" }]
                    }
                } 
                if(sortMethod.genreFilter && sortMethod.genreFilter !== 'all'){
                    console.log('here')
                    let pickArray = sortableRestaurants.filter(item => item['genre'].includes(sortMethod.genreFilter))
                    if(pickArray.length > 0){
                        sortableRestaurants = pickArray
                    } else {
                        sortableRestaurants = [{name: "No Restuarants Match", city: "", state: "", telephone: "", genre: "", id:"1"}]
                    }
                }  
            
        }
        return sortableRestaurants;
    }, [items, sortMethod])
    


    const changeSortMethod = (key) => {
        let direction = 'ascending'
    
        if(sortMethod && sortMethod.sort.key === key && sortMethod.sort.direction === 'ascending'){
            direction = 'descending'
        }
       
        setSortMethod((prevState) => ({...prevState, sort:{key, direction}}))
        
    }

    const changeFilterMethod = (key, val) => {
        
        if(key === 'state'){
            setSortMethod((prevState) => ({...prevState, stateFilter: val}))
        }else if(key === 'genre'){
            setSortMethod((prevState) => ({...prevState, genreFilter: val}))
        }
        

        
        
    }
    
    return {sortedRestaurants: sortedRestaurants, changeSortMethod, changeFilterMethod, sortMethod};
}



function Table({ restaurants }){
    const { sortedRestaurants, changeSortMethod, changeFilterMethod, sortMethod } = useSortableData(restaurants);
    const getClassNamesFor = (name) => {
        if (!sortMethod) {
          return styles.sortable;
        }
        return sortMethod.key === name ? `${sortMethod.direction} ${styles.sortable} ` : styles.sortable;
      };
      
      useEffect(()=>{
        changeSortMethod('name')
      }, [])

    const stateSelected = (e) =>{
        changeFilterMethod('state',e.target.value)
    }
    const genreSelected = (e) =>{
        changeFilterMethod('genre',e.target.value)
    }
      

    return( 
        <table className={"table table-dark"}>
        <thead>
            <tr >
                <th>Search:</th>
            </tr>
            <tr>
                <th><u className={getClassNamesFor('name')} onClick={(e) => changeSortMethod('name')}>Name</u></th>
                <th><u className={getClassNamesFor('city')} onClick={(e) => changeSortMethod('city')}>City</u></th>
                <th><div className={'d-flex'}><u className={getClassNamesFor('state')} onClick={(e) => changeSortMethod('state')}>State</u><SelectState stateSelected={stateSelected}/></div></th>
                <th>Phone Number</th>
                <th><div className={'d-flex'}>Genre<SelectGenre genreSelected={genreSelected} restaurants={restaurants}/></div></th>

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