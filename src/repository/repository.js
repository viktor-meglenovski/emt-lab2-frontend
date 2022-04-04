import axios from '../custom-axios/axios';

const Repository={
    fetchCountries:()=>{
        return axios.get("/country");
    },
    fetchAuthors:()=>{
        return axios.get("/author");
    },
    fetchBooks:()=>{
        return axios.get("/book");
    },
    fetchCategories:()=>{
        return axios.get("/categories");
    },
    deleteBook:(id)=>{
        return axios.delete(`/book/delete/${id}`);
    },
    addBook:(name,category,author,copies)=>{
        return axios.post("/book/add",{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":copies
        })
    },
    editBook:(id,name,category,author,copies)=>{
        return axios.put(`/book/edit/${id}`,{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":copies
        });
    },
    getBook:(id)=>{
        return axios.get(`/book/${id}`);
    },
    getBookCopy:(id)=>{
        return axios.post(`/book/getcopy/${id}`);
    },
    addBookCopy:(id)=>{
        return axios.post(`/book/addcopy/${id}`)
    }
}

export default  Repository;