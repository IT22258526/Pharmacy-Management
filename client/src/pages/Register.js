
import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd"; // Importing components from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/api/users/register', values);
            if (response.status === 201) {
                message.success('User registered Successfully');
                navigate('/login');
            } else {
                message.error('Something went wrong');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                message.error('Validation error: ' + error.response.data.message);
            } else {
                message.error('Something went wrong');
                console.log(error);
            }
        }
    };


    useEffect(()=>{
        if(localStorage.getItem('auth')){
            localStorage.getItem('auth');
            navigate('/')
        }
    },[navigate]);


    return (
        <div className="register" style={{ backgroundImage: 'url("https://en.idei.club/uploads/posts/2023-06/thumbs/1687232071_en-idei-club-p-dentistry-background-dizain-23.jpg")', backgroundSize: 'cover' }}>
            <div className="Register-form">
                <h1>IVORY Dental Clinic</h1>
                <h3>Register Page</h3>
                <Form layout="vertical" onFinish={handleSubmit}>
    <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter the name' }]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        name="userId"  
        label="User ID"
        rules={[{ required: true, message: 'Please enter the userID' }]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter the password' }]}
    >
        <Input type="password" />
    </Form.Item>
    <div className="d-flex justify-content-between">
        <p>
            Already Registered?{' '}
            <Link to="/login">
                Login Here!
            </Link>
        </p>
        <Button type="primary" htmlType="submit">
            Register
        </Button>
    </div>
</Form>

            </div>
        </div>
    );
};

export default Register;
