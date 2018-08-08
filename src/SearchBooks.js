import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  state = {
    text: ''
  }
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })

    this.props.onChangeSearch(event.target.value)
  }
  handleReset = (event) => {
    this.setState({
      text: ''
    })
    this.props.onReset()
  }
  render() {
    const {onChangeShelf, results} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            onClick={this.handleReset}
            to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              text={this.state.text} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            results.map((book) => (
              (book.hasOwnProperty('shelf')) ?
                <Book key={book.id} book={book} onChangeShelf={onChangeShelf} defaultValue={book.shelf}/> :
                <Book key={book.id} book={book} onChangeShelf={onChangeShelf} defaultValue="none"/>
            ))
          }
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
}

export default SearchBooks
