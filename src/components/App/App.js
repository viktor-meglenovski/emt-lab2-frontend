import './App.css';
import React, {Component} from "react";
import Repository from "../../repository/repository";
import {BrowserRouter as Router, Redirect , Route} from "react-router-dom";
import Header from '../Header/header';
import Authors from '../Authors/authors';
import Countries from '../Countries/countries';
import Books from '../Books/BookList/books';
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Categories from "../Categories/categories";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      countries: [],
      categories:[],
      selectedBook: {}
    }
  }
  loadBooks=()=>{
    Repository.fetchBooks()
        .then((data)=>{
          this.setState({
            books:data.data
          })
        });
  }
  loadAuthors=()=>{
    Repository.fetchAuthors()
        .then((data)=>{
          this.setState({
            authors:data.data
          })
        });
  }
  loadCountries=()=>{
    Repository.fetchCountries()
        .then((data)=>{
          this.setState({
            countries:data.data
          })
        });
  }
    loadCategories=()=>{
        Repository.fetchCategories()
            .then((data)=>{
                this.setState({
                    categories:data.data
                })
            });
    }
    deleteBook = (id)=>{
        Repository.deleteBook(id)
            .then(()=>{
                this.loadBooks();
            })
    }
    addBook=(name,category,author,availableCopies)=>{
        Repository.addBook(name,category,author,availableCopies)
            .then(()=>{
                this.loadBooks();
            })
    }
    getBook=(id)=>{
        Repository.getBook(id)
            .then((data)=>{
                this.setState({
                    selectedBook:data.data
                })
            })
    }
    editBook=(id,name,category,author,availableCopies)=>{
        Repository.editBook(id,name,category,author,availableCopies)
            .then(()=>{
                this.loadBooks();
            })
    }
    getBookCopy=(id)=>{
      Repository.getBookCopy(id)
          .then(()=>{
              this.loadBooks();
          })
    }
    addBookCopy=(id)=>{
        Repository.addBookCopy(id)
            .then(()=>{
                this.loadBooks();
            })
    }

  componentDidMount(){
      this.loadBooks();
      this.loadAuthors();
      this.loadCountries();
      this.loadCategories();
  }
  render() {
    return(
        <Router>
          <Header/>
          <main>
            <div className="container">
                <Route path={"/categories"} exact render={()=>
                    <Categories
                        categories={this.state.categories}/>}/>
              <Route path={"/authors"} exact render={()=>
                  <Authors
                      authors={this.state.authors}/>}/>
              <Route path={"/countries"} exact render={()=>
                  <Countries
                      countries={this.state.countries}/>}/>
              <Route path={"/books/add"} exact render={()=>
                  <BookAdd
                      authors={this.state.authors}
                      categories={this.state.categories}
                      onAddBook={this.addBook}/>}/>
              <Route path={"/books/edit/:id"} exact render={()=>
                  <BookEdit
                      authors={this.state.authors}
                      categories={this.state.categories}
                      onEditBook={this.editBook}
                      book={this.state.selectedBook}/>}/>
              <Route path={["/books","/"]} exact render={()=>
                  <Books
                      books={this.state.books}
                      onDelete={this.deleteBook}
                      onGetCopy={this.getBookCopy}
                      onAddCopy={this.addBookCopy}
                      onEdit={this.getBook}/>}/>
              <Redirect to={"/"}/>
            </div>
          </main>
        </Router>
    );
  }
}

export default App;
