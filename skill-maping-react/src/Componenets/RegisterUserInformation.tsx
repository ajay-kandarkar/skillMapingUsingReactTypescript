import { useEffect, useState } from "react"
import axios from "axios"
import '../App.css';
import { toast } from "react-toastify";
export default function RegisterUserInformation() {
  interface IUser {
    id : number
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    is_confirmed: ""
  }
  const [order, setOrder] = useState("Asc");
  const [searchRegister, setSearchRegister] = useState("");
  const [registerUser, setRegisterUser] = useState<IUser[]>([{
    id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    is_confirmed: ""
  }]);
       
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/get-register-user`)
      .then((response) => {
        setRegisterUser(response.data[0]);
        console.log(response.data[0]);
        localStorage.setItem('registerid', `${registerUser[0].id}`);
      })
      .catch((error) => {
        if (error) {
          toast.error(error.response?.data?.error || 'An error occurred.');
        }
      })
  }, [])

  const sorting = (registerCol: keyof IUser) => {
    const sortedData = [...registerUser].sort((a, b) =>
      order === 'Asc' ? (a[registerCol] > b[registerCol] ? 1 : -1) : (a[registerCol] < b[registerCol] ? 1 : -1)
    );
    setRegisterUser(sortedData);
    setOrder(order === 'Asc' ? 'Dsc' : 'Asc');
  };
  
  return (
    <div className="p-2">
      <div className='d-flex justify-content-end py-3'>
        <div className='input-group w-auto'>
          <input className="form-control " type="search" placeholder="Search" aria-label="Search"
            onChange={(e) => setSearchRegister(e.target.value)}></input>
        </div>
      </div>
      <table className="table table-hover  table-bordered ">
        <thead>
          <tr className="backgroundColor">
            <th scope="col">Index
            </th>
            <th scope="col" onClick={() => sorting("first_name")}>First name
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App" ></i>}
            </th>
            <th scope="col" onClick={() => sorting("last_name")}>Last name
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App"></i>}
            </th>
            <th scope="col" onClick={() => sorting("email")}>Email
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App"></i>}
            </th>
            <th scope="col" onClick={() => sorting("phone")}>Phone
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App" ></i>}
            </th>
            <th scope="col">Confirm Register</th>
          </tr>
        </thead>
        <tbody>
          {
            registerUser
              .filter((item) => {
                return searchRegister === '' ? true : item.first_name.includes(searchRegister);
              })
              .map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.is_confirmed}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  )
}

