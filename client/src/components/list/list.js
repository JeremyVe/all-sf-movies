import React from 'react';
import './list.css';

class List extends React.Component {
  render() {
    const locationsNodes = this.props.locations.map(location => {
      return <div key={location._id}>
               <h3>{location.address}</h3>
               <p>{location.lat}, {location.lng}</p>
             </div>
    })

    return (
      <div className='list'>
        <h2>Addresses :</h2>
        {locationsNodes}
      </div>
    )
  }
}

export default List;
