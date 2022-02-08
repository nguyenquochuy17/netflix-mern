import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { movieContext } from "../../context/movieContext/movieContext";
import { deleteMovie, getMovie } from "../../context/movieContext/apiCalls";
export default function ProductList() {
    const { movies, dispatch } = useContext(movieContext)

    useEffect(() => {
        if (movies.length == 0) {
            getMovie(dispatch)
        }
    }, [dispatch])

    const handleDelete = (id) => {
        deleteMovie(id, dispatch)
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 100 },
        {
            field: "movie",
            headerName: "Movie",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "genre", headerName: "Genre", width: 200 },
        {
            field: "year",
            headerName: "Year",
            width: 120,
        },
        {
            field: "limit",
            headerName: "Limit",
            width: 160,
        },
        {
            field: "limit",
            headerName: "Limit",
            width: 160,
        },
        {
            field: "isSeries",
            headerName: "isSeries",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={movies}
                disableSelectionOnClick
                columns={columns}
                pageSize={14}
                checkboxSelection
                getRowId={(r) => r._id}
            />
        </div>
    );
}