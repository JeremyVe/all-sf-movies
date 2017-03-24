const sort = movies => {
  return movies.sort((a, b) => a.title.localeCompare(b.title));
}

const getRegex = text => {
  return new RegExp(`^${text}`, 'g');
}

module.exports.getMovies = () => {
  return fetch('/movies.json')
  .then(data => data.json())
  .then(movies => sort(movies))
  .catch(err => {
    console.log('error fetching movie list :', err)
  })
}


module.exports.getMovie = id => {
  return fetch('/movie/' + id)
  .then(data => data.json())
  .catch(err => {
    console.log('error fetching movie info :', err)
  })
}

module.exports.findMovie = (movies, text) => {
  let regex = getRegex(text);
  return movies.find(movie => movie.title.toLowerCase().match(regex));
}

module.exports.filterMovies = (movies, text) => {
  let regex = getRegex(text);
  return movies.filter(movie => movie.title.toLowerCase().match(regex));
}
