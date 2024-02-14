import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios'
import '../App.css'
import AddClient from './AddClient';
import DeleteClientModel from './DeleteClientModel';
import EditClinetModel from './EditClinetModel';

const ListOfClient = () => {
    interface ClientDetails {
        id: number,
        name: string;
        location: string;
        country_name: string;
        domain_name: string;
    }

    const [searchClient, setsearchClient] = useState("");
    const [clientDetails, setClientDetails] = useState<ClientDetails[]>([]);
    const [entries, setEntries] = useState<number>(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-client`)
            .then((response) => {
                setClientDetails(response.data[0]);
                setEntries(response.data[0].length);
            })
            .catch((error) => {
                if (error) {
                    toast.error(error.response?.data?.error || 'An error occurred.');
                }
            })
    }, [entries]);

    const handleDelete = async (userId: number) => {
        setClientDetails((prevDetails) => prevDetails.filter((user) => user.id !== userId));
        setEntries(entries - 1);
    };

    const handleEdit = async (editedData: any) => {
        setClientDetails(prevClientDetails => {
            return prevClientDetails.map(user =>
                user.id === editedData.userId ? { ...user, ...editedData } : user
            );
        });
        window.location.reload()
    };
    const updateClient = (newClient : any) => {
        setClientDetails([...clientDetails,newClient.data.client])
        window.location.reload()
    }

    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <h4><b>Client List</b></h4>
                </div>
                <div className='card-body'>
                    <div className="d-md-flex justify-content-between d-sm-block">
                        <div className="d-flex p-4">
                            <span className="m-2">Show</span>
                            <select className="form-select" >
                                <option value="1">{entries}</option>
                            </select>
                            <span className="m-2">Entries</span>
                        </div>
                        <div className="d-flex">
                            <label htmlFor="search" className="mx-3 my-auto">Search : </label>
                            <div>
                                <input type="text" className="form-control my-4" id="search" placeholder="Search"
                                    onChange={(e) => setsearchClient(e.target.value)} />
                            </div>
                            <AddClient onUpdateClient={updateClient} />
                        </div>


                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr className='backgroundColor'>
                                    <th scope="col">Name</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Domain</th>
                                    <th scope="col" className="px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientDetails
                                    .filter((item) => {
                                        return searchClient === '' ? true : item.name.includes(searchClient);
                                    })
                                    .map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.location}</td>
                                            <td>{user.country_name}</td>
                                            <td>{user.domain_name}</td>
                                            <td className="d-flex">
                                                <div className="mx-3">
                                                    <EditClinetModel userId={user.id} intialClientInformation={user} onEdit={(editedData) => handleEdit(editedData)} />
                                                </div>
                                                <div>
                                                    <DeleteClientModel userId={user.id} onDelete={handleDelete} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListOfClient;