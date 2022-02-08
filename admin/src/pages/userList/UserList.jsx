import "./userList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext/userContext";
import { deleteUser, getUser } from "../../context/userContext/apiCalls";
const UserList = () => {
    const { users, dispatch } = useContext(userContext)

    useEffect(() => {
        if (users.length == 0) {
            getUser(dispatch)
        }
    }, [dispatch])
    const handleDelete = (id) => {
        deleteUser(id, dispatch)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.profilePic || "https://source.unsplash.com/random/1000x1000?sig=1"} alt="" />
                        {params.row.username}
                    </div>
                )
            }

        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/${params.row._id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        }
    ];

    return (
        <div className="userList">
            <div style={{ height: "90vh", width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowId={(r) => r._id}
                />
            </div>
        </div>
    )
};

export default UserList;
