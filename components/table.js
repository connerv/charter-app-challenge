


function Table({ data }){
    return( 
        <table className={"u-full-width"}>

        {data.map((restaurant) => (
          <tr key={restaurant.id}><td>{restaurant.name}</td></tr>
        ))}
      </table>
    )
}

export default Table