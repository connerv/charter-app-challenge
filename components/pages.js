
import { Fragment, forwardRef, useRef, useImperativeHandle, createRef } from 'react'
import styles from './pages.module.css'
import Page from './page'
import { TableBody } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const pageSetup = (restaurants) => {
    const makePages = (restaurants) => {
        
        let tempArray = []
        const pages = []
        restaurants.forEach( (element, index) => {
            
            tempArray.push(element)
            if(((index+1) % 10 === 0)){
                
                pages.push(tempArray)
                tempArray = []
            }
        });
        pages.push(tempArray)
      
        return pages
    }
    return {makePages}
}


export const Pages = forwardRef((props, ref) => {
    const restaurants = props.restaurants
    const {makePages} = pageSetup(restaurants)
    
    const [pageState, setPageState] = React.useState({currentPage: 1})
    

    const totalRestaurants = restaurants.length
    const pageLength = 10

    const totalPages = Math.ceil( totalRestaurants / pageLength)

    let madePages = makePages(restaurants)

    
    useImperativeHandle(ref, () => ({

        reset() {
            setPageState({currentPage: 1})
        }
    
      }));
    
        
    
   
   
    
    

    const pageDown = (e) =>{
        let page = pageState.currentPage
        if(page > 1){
            page = page - 1
            setPageState({currentPage: page})
        }
    }

    const pageUp = (e) =>{
        let page = pageState.currentPage
        if(page <= totalPages){
            page = page + 1
            setPageState({currentPage: page})
        }
    }

    return(
        <>
        
        { madePages.map((page, index) => {
           return(
            <tbody key={'body'+index} className={pageState.currentPage === index+1 ? styles.display : styles.nodisplay}>
                <Page key={index}  pageData={page}/>
            </tbody>
        
           )
            
           
        })}
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="float-right">
                    <button type="button" className="btn btn-light mr-2" onClick={pageDown}> <FontAwesomeIcon className="p-1 mr-2" icon={faAngleLeft} /></button> 
                    Page: {pageState.currentPage} 
                    <button type="button" className="btn btn-light ml-2"  onClick={pageUp}> <FontAwesomeIcon className="p-1 mr-2" icon={faAngleRight} /></button> 
                </td>
            </tr>
        </tfoot>
        </>
        
    )
})

export default Pages
