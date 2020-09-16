import { createRef, useEffect, useRef } from 'react'
import styles from './table.module.css'
import SelectState from './select-state'
import SelectGenre from './select-genre'
import Pages from './pages'


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
                   
                    let pickArray = sortableRestaurants.filter(item => item['state'].includes(sortMethod.stateFilter))
                    if(pickArray.length > 0){
                        sortableRestaurants = pickArray
                    } else {
                        sortableRestaurants = [{name: "No Restuarants Match", city: "", state: "", telephone: "", genre: "", id:"1" }]
                    }
                } 
                if(sortMethod.genreFilter && sortMethod.genreFilter !== 'all'){
                    
                    let pickArray = sortableRestaurants.filter(item => item['genre'].includes(sortMethod.genreFilter))
                    if(pickArray.length > 0){
                        sortableRestaurants = pickArray
                    } else {
                        sortableRestaurants = [{name: "No Restuarants Match", city: "", state: "", telephone: "", genre: "", id:"1"}]
                    }
                } 
                if(sortMethod.searchValue && sortMethod.searchValue !== ''){
                    
                    let pickArray = sortableRestaurants.filter(restaurant => {
                        for (const key in restaurant) {
                           if(restaurant[key].toLowerCase().includes(sortMethod.searchValue.toLowerCase())){
                               return true
                           }
                        }
                    })
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

    const changeSearchValue = (val) => {
        setSortMethod((prevState) => ({...prevState, searchValue: val}))
    }
    
    return {sortedRestaurants: sortedRestaurants, changeSortMethod, changeFilterMethod, changeSearchValue, sortMethod};
}



function Table({ restaurants }){
    const { sortedRestaurants, changeSortMethod, changeFilterMethod, changeSearchValue, sortMethod } = useSortableData(restaurants);
    
    const childRef = useRef()

    const getClassNamesFor = (name) => {
        if (!sortMethod) {
          return styles.sortable;
        }
        return sortMethod.key === name ? `${sortMethod.direction} ${styles.sortable} ` : styles.sortable;
    };
     
    const changeParams = () =>{
    
        if(childRef.current) {
            
            childRef.current.reset()
        }
    }

    const stateSelected = (e) =>{
        
        changeFilterMethod('state',e.target.value)
        changeParams()
    }
    const genreSelected = (e) =>{
        changeFilterMethod('genre',e.target.value)
        changeParams()
    }
    const searchEntry = (e) =>{
       changeSearchValue(e.target.value)
       changeParams()
    }
    
    useEffect(()=>{
        changeSortMethod('name')
    }, [])

      

    return( 
        <table className={"table table-dark"}>
        <thead>
            <tr >
                <th>Search:<input type="text" className="form-control" onChange={searchEntry}></input></th>
            </tr>
            <tr>
                <th><u className={getClassNamesFor('name')} onClick={(e) => changeSortMethod('name')}>Name</u></th>
                <th><u className={getClassNamesFor('city')} onClick={(e) => changeSortMethod('city')}>City</u></th>
                <th><div className={'d-flex'}><u className={getClassNamesFor('state')} onClick={(e) => changeSortMethod('state')}>State</u><SelectState stateSelected={stateSelected}/></div></th>
                <th>Phone Number</th>
                <th><div className={'d-flex'}>Genre<SelectGenre genreSelected={genreSelected} restaurants={restaurants}/></div></th>

            </tr>
        </thead>
        
        <Pages ref={childRef} restaurants={sortedRestaurants}  ></Pages>
        
        
      </table>
    )
}

export default Table