import React from 'react';
import './address_list.css';

class AddressList extends React.Component {
  render() {
    const locationsNodes = this.props.locations.map(location => {
      return <div key={location._id} className='list-item'>
               <h3>{location.address}</h3>
               <p>{location.fun_facts}</p>
             </div>
    })

    return (
      <div className='address-list'>
        {locationsNodes}
      </div>
    )
  }
}

AddressList.propTypes = {
  locations: React.PropTypes.array.isRequired,
}

export default AddressList;
