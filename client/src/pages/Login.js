import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';

const Login = () => {
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

        //from submit
        const submitHandler= async (values) => {
            try {
                setLoading(true);
                const {data} = await axios.post('/users/login',values);
                setLoading(false);
                message.success('Login Success');
                localStorage.setItem('user', JSON.stringify({...data.user, password:''}));
                navigate("/")
            } catch (error) {
                setLoading(false);
                message.error(error.response?.data?.message || 'Login failed');
            }
        };

    //prevent for login user
    useEffect(() => {
      if(localStorage.getItem("user")){
        navigate("/")  
      }
    },[navigate]);
  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click Here to register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login