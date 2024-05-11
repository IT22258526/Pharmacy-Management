import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const res = await axios.post('/api/users/login', values); 
            if(res.status === 200) { 
                message.success('User login Successfully');
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    };


    useEffect(()=>{

        if(localStorage.getItem('auth')){
            localStorage.getItem('auth');
            navigate('/')
        }
            
        
    },[navigate]);








    return (
        <div className="login" style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/84/15/61/360_F_684156133_Ul66qNO45QevDrQ3d6H97WrgiZtZt2L9.jpg")', backgroundSize: 'cover' }}>
            <div className="login form">
                <h1>IVORY Dental Clinic</h1>
                <h3>Login Page</h3>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="userID"
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
                        <Button type="primary" htmlType="submit">
                            LOGIN
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
