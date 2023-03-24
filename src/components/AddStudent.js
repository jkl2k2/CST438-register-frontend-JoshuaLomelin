import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

// jshint ignore: start
export default class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    onSubmit = () => {
        console.log("Submit attempt");
        console.log("Beginning submission with state:");
        console.log(this.state);

        fetch(`http://localhost:8080/student?email=${this.state.email}&name=${this.state.name}`, { method: 'post' })
            .then(response => {
                if (response.ok) {
                    console.log('--Server backend response OK--');
                    toast.success("Successfully added student to database", {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    console.log('--Server backend response NOT OK--');
                    console.log(response.status + " " + response.statusText);
                    toast.error("Error adding student to database", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Register a new student</h1>
                <form>
                    <div style={
                        {
                            margin: 20
                        }
                    }>
                        <input
                            name="name"
                            type="text"
                            placeholder="Student Full Name"
                            onChange={this.handleChange}
                            value={this.name}
                        />
                    </div>

                    <input
                        name="email"
                        type="text"
                        placeholder="Student Email Address"
                        onChange={this.handleChange}
                        value={this.email}
                    />
                </form>

                <div style={
                    {
                        marginTop: 20
                    }
                }>
                    <Button variant="outlined" onClick={this.onSubmit}>Add Student</Button>
                </div>

                <div style={
                    {
                        marginTop: 20
                    }
                }>
                    <Button variant="outlined" component={Link} to={{ pathname: '/' }} >Back</Button>
                </div>
            </div >
        )
    }
}