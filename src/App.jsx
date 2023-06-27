import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import Body from './components/Body/Body';
import Transaction from './components/Body/Pages/Sales/Transactions'
import History from './components/Body/Pages/Sales/History'
import SubMenu from './components/Body/SubMenu/SubMenu';
import Category from './components/Body/Pages/Items/Category';
import Items from './components/Body/Pages/Items/Items'
import { UserContextProvider } from './context/UserContext';
import EditItems from './components/Body/Pages/Items/EditItems'
import ManageCategory from './components/Body/Pages/Utilities/ManageCategory';
import NewCashier from './components/Body/Pages/Utilities/NewCashier';
import SelectedCategory from './components/Body/Pages/Utilities/SelectedCategory';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/ninongs' element={<Body />} >
          <Route path='sales' element={<SubMenu />}>
            <Route path='transactions' element={<Transaction />} />
            <Route path='history' element={<History />} />
          </Route>
          <Route path='product' element={<Category />} >
            <Route path=':catId' element={<Items />} >
              <Route path=':itemId' element={<EditItems />} />
            </Route>
          </Route>
          <Route path='inventory' element={<SubMenu />} />
          <Route path='reports' element={<SubMenu />} />
          <Route path='utilities' element={<SubMenu />} >
            <Route path='category' element={<ManageCategory />}>
              <Route path=':catId' element={<SelectedCategory />} />
            </Route>
            <Route path='new-cashier' element={<NewCashier />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to="/ninongs" replace={true} />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
