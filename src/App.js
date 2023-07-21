import './App.css'
import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
// import { DataContext } from './context/DataContext'
// import { SearchContext } from './context/SearchContext'
// import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom'
// import HomePage from './components/HomePage.js'
// import ArtistView from './components/ArtistView'
// import AlbumView from './components/AlbumView'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner'


const App = () => {
  let [searchTerm, setSearchTerm, ] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)
  // let searchInput = useRef('');

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      console.log(fetchData(searchTerm))
      setData(fetchData(searchTerm))
  }
  }, [searchTerm])


  // const API_URL = 'https://itunes.apple.com/search?term='

  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}



const handleSearch = (e, term) => {
  e.preventDefault()
  setSearchTerm(term)
}
  

  return (
      <div className='App'>
      
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
        <Suspense fallback={<h1>Loading...</h1>}>
            // <Gallery data={data} />
        </Suspense>

        {/* <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
          <DataContext.Provider value={data}>

            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:id" element={<ArtistView/>} />
                <Route path="/album/:id" element={<AlbumView/>} />
              </Routes>
            </Router>
            
          </DataContext.Provider>
        </SearchContext.Provider> */}
      </div>
  )

}


export default App

