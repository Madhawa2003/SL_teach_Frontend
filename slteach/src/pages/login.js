import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const handleLogin = () => {
    //     if (!email || !password) {
    //         setError('Both fields are required.');
    //         return;
    //     }

    //     if (email !== 'shan@gmail.com' || password !== '123456') {
    //         setError('Invalid email or password.');
    //         return;
    //     }

    //     // Handle successful login logic here
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     console.log('yes');
    //     setError('');
    // };



    const handleLogin = async () => {
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }
    
        try {
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message);
            }
    
            localStorage.setItem("token", data.token);
            setError('');
            console.log("Login successful");
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <>

        <div className='logincontainer'>
            <div className='imglogo'></div>
            <h1>Login</h1>
            <input className='txtemail'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} >Login</button><br />

            {error && <p>{error}</p>}
        </div>

        </>
    );
};

export default Login;
