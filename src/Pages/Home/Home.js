import React from 'react';


const Home = () => {
    return (
        <div className='flex items-center justify-center'>
            <div>
                <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <textarea class="textarea input-bordered" placeholder="Description"></textarea>
            </div>
        </div>
    );
};

export default Home;