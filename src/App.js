import React from 'react';
import './App.css';
import Form from './Form/Form';
import { errorCheck, filter } from './data-helpers';
import ResultList from './ResultsRender/ResultList';


class App extends React.Component {
  state = {
    query : "",
    category: 'people',
    isLoading: false,
    error: null,
    prevSearches:{},
    currentSearch:[],
  }
  
  handleForm = (e) =>{
    let error
    const {id, value} = e.target;    
    error =  value.trim() === "" ? "Query cannot be blank" : null
    
    this.setState({
      [id]: value,
      error
    })
  } 

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({isLoading: true})
    this.setState({currentSearch: []})
     await this.getData()
     this.setState({isLoading:false})

    
    
  }

  getData = () => {
    const { query, category} = this.state;
    const URL = `https://swapi.co/api/${category}?search=${query}`
    
    if (!!this.state.prevSearches[URL]){
      this.setState({currentSearch: this.state.prevSearches[URL]})
      return;
    }   
    return fetch(URL)
    .then(errorCheck)
    .then((data)=>{
      let filteredResults = filter(data.results, this.state.category)
      this.setState({
        prevSearches: {...this.state.prevSearches, [URL]: filteredResults},
        currentSearch: filteredResults,
        error: data.count > 10 ? 'Try narrowing down your search term' : null });
    })
    .catch((e)=> {
      this.setState({error: e.message, isLoading: false})
    })
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Star Wars Search</h1>
        </header>
        <Form 
          handleSubmit={this.handleSubmit} 
          queryValue={this.state.query} 
          handleForm={this.handleForm} 
          buttonEnabled={this.state.error === null && !!this.state.query && !this.state.isLoading} 
          categorySelect={this.state.category}
        />
        {this.state.isLoading ? <img src={require("./loadCircle.gif")} alt="loading"/> : ""}
        <div className="errorContainer">{this.state.error ? <h4 aria-live="polite">{this.state.error}</h4>: "" }  </div>
        <ResultList results={this.state.currentSearch}/>
      </div>
    );
  }
}

export default App;
