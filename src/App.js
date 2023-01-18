import { Route, Routes} from "react-router-dom";
import DashboardLayout from './Components/DashboardLayout';
import Singin from "./Components/Singin";
import User from "./Components/User";
import Login from './Components/Login';
import WebLayout from './Components/WebLayout';
import Tag from "./Components/Tag";
import Expense from './Components/Expense';
import Chart from './Components/Chart';
import Edittag from './Components/Edittag';
import EditProfile from "./Components/EditProfile";
import AllExpense from "./Components/AllExpense";
import EditExpense from "./Components/EditExpense";

  

 


function App() {
  return (

      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Singin />} />
        </Route>
        
        <Route path="/dashboard/" element={<DashboardLayout/>}>
          <Route path="user" element={<User />} />
          <Route path="tag" element={<Tag />} />
          <Route path="expense" element={<Expense />} />
          <Route path="chart" element={<Chart />} />
          <Route path="edittag/:id" element={<Edittag />} />
          <Route path="editprofile/:id" element={<EditProfile />} />
          <Route path="allexpense" element={<AllExpense/>} />
          <Route path="editexpense/:id" element={<EditExpense/>} />
        
        </Route>
      </Routes>

   
   
  );
}

export default App;
