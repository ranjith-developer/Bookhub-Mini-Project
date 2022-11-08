import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import MyFavorites from './components/MyFavorites'
import BookItemDetails from './components/BookItemDetails'
import FavoriteContext from './Context/FavoriteContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

// const bookshelvesList = [
//   {
//     id: '22526c8e-680e-4419-a041-b05cc239ece4',
//     value: 'ALL',
//     label: 'All',
//   },
//   {
//     id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
//     value: 'READ',
//     label: 'Read',
//   },
//   {
//     id: '2ab42512-3d05-4fba-8191-5122175b154e',
//     value: 'CURRENTLY_READING',
//     label: 'Currently Reading',
//   },
//   {
//     id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
//     value: 'WANT_TO_READ',
//     label: 'Want to Read',
//   },
// ]

class App extends Component {
  state = {favoriteList: []}

  onToggleFavorite = bookDetails => {
    const {favoriteList} = this.state
    const isAlreadyExist = favoriteList.some(
      eachItem => eachItem.id === bookDetails.id,
    )
    if (isAlreadyExist === true) {
      this.setState(prevState => ({
        favoriteList: prevState.favoriteList.filter(
          eachBook => eachBook.id !== bookDetails.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        favoriteList: [...prevState.favoriteList, bookDetails],
      }))
    }
  }

  render() {
    const {favoriteList} = this.state
    return (
      <FavoriteContext.Provider
        value={{
          favoriteList,
          onToggleFavorite: this.onToggleFavorite,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/favorites" component={MyFavorites} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </FavoriteContext.Provider>
    )
  }
}

export default App
