import "./newUser.css";
import { Alert } from '@material-ui/lab';
import { useContext, useState } from "react"
import { createUser } from "../../context/userContext/apiCalls";
import { userContext } from "../../context/userContext/userContext";
export default function NewUser() {
    const [err, setErr] = useState({})
    const [form, setForm] = useState({ username: "", password: "", email: "" })

    const { dispatch } = useContext(userContext)
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const error = {}
        console.log(form)
        let valid = 0;
        if (form.username == "") {
            error.username = "Please input username"
            valid++;
        }
        if (form.password == "") {
            error.password = "Please input password"
            valid++;
        }
        if (form.email == "") {
            error.email = "Please input email"
            valid++;
        }

        if (valid == 0) {
            createUser(form, dispatch)
        } else {
            console.log(error)
            setErr(error)
        }
    }
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="john" onChange={handleFormChange} />
                    {err.username && <Alert severity="error">{err.username}</Alert>}
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="john@gmail.com" onChange={handleFormChange} />
                    {err.email && <Alert severity="error">{err.email}</Alert>}
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" onChange={handleFormChange} />
                    {err.password && <Alert severity="error">{err.password}</Alert>}
                </div>
                <button className="newUserButton" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
}