import React from 'react';
import Navbar from '../Comp/Navbar';
import './Home.css';
import '../App.css';


const Home = () => {
    return (
        <>
            <Navbar/>
            <div className='maincontainer'>
                <div className='AdminPoster'>
                    <h1>ADMIN DASHBOARD</h1>
                </div>
                <div>
                    
                </div>

                <div className='bodySection'>
                    <div className='que'>
                        <h2>Class Count</h2>
                        <h2>Active Classes</h2>
                        <h2>Coming Soon</h2>
                       
                    </div>

                    <div className='ans'>
                        <h2>8</h2>
                        <h2>March 13</h2>
                        <h2>10</h2>
                        
                    </div>

                </div>

            </div>
        </>

    );
};

export default Home;