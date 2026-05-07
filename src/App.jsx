import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, getUserCart } from './store/actions';
import ShopRoutes from './modules/shop/ShopRoutes';
import AdminRoutes from './modules/admin/AdminRoutes';

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
        <Routes>
          <Route path="/admin/*" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]} />}>
            <Route path="*" element={<AdminRoutes />} />
          </Route>
          <Route path="/*" element={<ShopRoutes />} />
        </Routes>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App
