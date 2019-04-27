export function errorCheck(res){
  let error ={};
  return new Promise(function(resolve, reject){
    if (!res.ok){
      error = {status: res.status}
      error.message = 'The server responded with: ' + res.statusText;
      return reject(error)
    }
     resolve(res.json())
  }).then(res => {
    error.message = res.count === 0 ? 'No Results Found' : undefined
    
    if (!!error.message) return Promise.reject(error);
    return Promise.resolve(res)

  })
}

export const filter = (arr, category) => {
  return arr.map(item =>{
    const name = category === 'films' ? 'title' : 'name';
    return {
      name: item[name]
    }
  })
}