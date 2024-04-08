import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/PageNotFound/NotFound';
import Photo from './components/pages/Photo/Photo';
import Events from './components/pages/Events/Events';
import Unsub from './components/pages/Unsub/Unsub';
import { Uniform } from './components/pages/Uniform/Uniform';
import { ChakraProvider } from '@chakra-ui/react';
import Store from './Store/store';
import { AlbumPage } from './components/pages/Photo/Album/AlbumPage';
import { ContactPage } from './components/main/Contacts/ContactPage';
import Post from './components/pages/Post/Post';
import { ServicePage } from './components/pages/ServicePage/ServicePage';
import { CommentPage } from './components/pages/Comments/CommentPage';
import { Policy } from './components/pages/Policy/Policy';
import { AboutTeam } from './components/pages/AboutTeam/AboutTeam';
import { AdminPanel } from './components/pages/AdminPanel/AdminPanel';
import { AdminServicesList } from './components/pages/AdminPanel/AdminServicesList';
import { AdminAlbumsList } from './components/pages/AdminPanel/AdminAlbumsList';
import { AdminCommentsModeration } from './components/pages/AdminPanel/AdminCommentsModeration';
import { AdminPost } from './components/pages/AdminPanel/AdminPost';
import { AdminCreatePost } from './components/pages/AdminPanel/AdminCreatePost';

const store = new Store();
export const Context = createContext({store});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <ChakraProvider toastOptions={{defaultOptions: {position: 'top'}}}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route element={<App/>} path='/'/>
          <Route element={<Photo/>} path='/photo'/>
          <Route element={<Events/>} path='/events'/>
          <Route element={<Unsub/>} path='/unsubscribe'/>
          <Route element={<Uniform/>} path='/uniform'/>
          <Route element={<NotFound/>} path='*'/>
          <Route element={<AlbumPage/>} path='/album/:id'/>
          <Route element={<ContactPage/>} path='/contacts'/>
          <Route element={<Post/>} path='/post/:id'/>
          <Route element={<ServicePage/>} path='/services'/>
          <Route element={<CommentPage/>} path='/comments'/>
          <Route element={<Policy/>} path='/policy'/>
          <Route element={<AboutTeam/>} path='/team'/>
          <Route element={<AdminPanel/>} path='/panel'/>
          <Route element={<AdminServicesList/>} path='/panel-services'/>
          <Route element={<AdminAlbumsList/>} path='/panel-albums'/>
          <Route element={<AdminCommentsModeration/>} path='/panel-comments'/>
          <Route element={<AdminPost/>} path='/panel-post'/>
          <Route element={<AdminCreatePost/>} path='/panel-create-post'/>
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
