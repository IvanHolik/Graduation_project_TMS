import React, { useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleList } from './components/ArticleList';
import { Header } from './components/Header';




function App() {


  return (
    <BrowserRouter>
    <Header/>
    <main>
    <Routes>
    <Route path='/' element={
            <ArticleList/>
          }/>
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
