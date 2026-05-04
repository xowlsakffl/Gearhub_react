import './App.css';
import Products from './components/products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/cart/Cart';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import LogIn from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, getUserCart } from './store/actions';
import AccountDashboard from './components/account/AccountDashboard';
import OrderHistory from './components/account/OrderHistory';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    dispatch(getUserAddresses());
    dispatch(getUserCart());
  }, [dispatch, user?.id]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/products' element={ <Products /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/cart' element={ <Cart /> } />

          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
            <Route path='/account' element={<AccountDashboard />} />
            <Route path='/account/orders' element={<OrderHistory />} />
          </Route>
          
          <Route path='/' element={ <PrivateRoute publicPage /> }>
            <Route path='/login' element={ <LogIn /> } />
            <Route path='/register' element={ <Register /> } />
          </Route>
        </Routes>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App
