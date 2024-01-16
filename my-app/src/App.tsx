import React, { useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleList } from './components/ArticleList';
import { Header } from './components/Header';
import { ShowArticle } from './components/ShowArticle';




function App() {


  return (
    <BrowserRouter>
    <Header/>
    <main>
    <Routes>
    <Route path='/' element={<ArticleList/>}/>
    <Route path='/articles/:id' element={<ShowArticle/>} />
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
