import React from 'react'
import PropTypes from 'prop-types'


const PrevQuery = ({searchedQuery, id}) => (
  <option value={id}>{searchedQuery}</option>
)

export default PrevQuery

PrevQuery.propTypes = {
  searchedQuery: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

