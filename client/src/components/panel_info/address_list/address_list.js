import React from 'react';
import './address_list.css';

class AddressList extends React.Component {

  selectLocation = evt => {
    const id = evt.target.getAttribute('data-id');
    this.props.selectLocation(id);
  }

  render() {
    const locationsNodes = this.props.locations.map(location => {
      return <div key={location._id} data-id={location._id} className='list-item'>
               <h3>{location.address}</h3>
               <p>{location.fun_facts}</p>
             </div>
    })

    return (
      <div className='address-list' onClick={this.selectLocation}>
        {locationsNodes}
      </div>
    )
  }
}

AddressList.propTypes = {
  locations: React.PropTypes.array.isRequired,
  selectLocation: React.PropTypes.func.isRequired,
}

export default AddressList;
