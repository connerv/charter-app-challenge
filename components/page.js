function Page(props){

    return(
        props.pageData.map((restaurant) => {
            return(
                <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre}</td>
            </tr>
            )
            
           })
    )

    
}
export default Page