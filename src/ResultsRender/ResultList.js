import React from 'react'
import Result from './Result'


const ResultList = ({results}) =>{

  const compiledResults = results.map(result=> <li key={result.name}> <Result name={result.name}/> </li>)
  return(
    <section>
      {compiledResults}
    </section>
  )
}

export default ResultList;