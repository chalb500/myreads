import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  }
  changeShelf = (book, newShelf) => {
    //Update database
    BooksAPI.update(book, newShelf)

    //Update book
    book.shelf = newShelf

    //Update state
    this.setState({
      books: [...this.state.books.filter((filteredBook) => filteredBook.id !== book.id), book]
    })
  }
  search = (searchTerm) => {
      if (searchTerm) {
        BooksAPI.search(searchTerm)
          .then((data) => {
            if (data.error) {
              this.setState({
                results: []
              })
            }
            else {
              //Get the ids of the books with shelves
              let bookIDS = []
              this.state.books.forEach((book) => {bookIDS.push(book.id)})

              let filteredData = []
              data.forEach((item) => {
                if (bookIDS.includes(item.id)) {
                  filteredData.push(this.state.books[bookIDS.indexOf(item.id)])
                } else {
                  filteredData.push(item)
                }
              })

              this.setState({
                results: filteredData
              })
            }
          })
      } else {
        this.setState({
          results: []
        })
      }
  }
  reset = () => {
    this.setState({
      results: []
    })
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      }
    )

  }
  render() {
    return (
      <div className="app">
          <Route
          exact path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={this.changeShelf}/>
          )} />
          <Route
          path="/search"
          render={() => (
            <SearchBooks
              results={this.state.results}
              onChangeSearch={this.search}
              onChangeShelf={this.changeShelf}
              onReset={this.reset} />
          )} />
      </div>
    )
  }
}

export default BooksApp
