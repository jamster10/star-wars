import React from 'react';
import PropTypes from 'prop-types'
import './Form.css'


const Form = ({queryValue, handleForm, buttonEnabled, categorySelect, showPrevious,searchResults, handleSubmit}) => {
  

  return (
    <form onSubmit ={handleSubmit}>
      <div className='left'>
        <label htmlFor="query">
          Search for
        </label>
        <input type="text" value={queryValue} onChange={handleForm} id="query" name="query" placeholder="Skywalker"/>
        <label htmlFor="category">
        
        </label>
        <select  
          aria-label="Search Category"
          value={categorySelect} 
          onChange={handleForm}
          id="category" 
          className="category-select">
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="films">Films</option>
          <option value="species">Species</option>
          <option value="vehicles">vehicles</option>
          <option value="starships">Starships</option>
        </select>
      </div>
      <div className="right">
        <input type="submit" className="search-btn" disabled={!buttonEnabled} value="Search"/>
      </div>
    </form>
  )
}

Form.propTypes = {
  queryValue: PropTypes.string,
  handleForm: PropTypes.func,
  buttonEnabled: PropTypes.bool.isRequired,
}

export default Form;