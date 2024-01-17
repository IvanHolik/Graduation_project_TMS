import React, { useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleList } from './components/ArticleList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { ShowArticle } from './components/ShowArticle';




function App() {


  return (
    <BrowserRouter>
    <Header/>
    <main>
    <Routes>
    <Route path='/' element={<ArticleList/>}/>
    <Route path='/articles/:id' element={<ShowArticle/>} />
    <Route path='/login' element={<LoginPage/>} />
    </Routes>
    </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
