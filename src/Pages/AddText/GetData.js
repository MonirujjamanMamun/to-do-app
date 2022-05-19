import React from 'react';

const GetData = () => {
    const handelForm = event => {
        event.preventDefault();
        const text = event.target.text.value;
        const description = event.target.description.value;
        const data = { text: text, description: description }

        fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('data added')
            })
    }
    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handelForm}>
                <h1 className='text-2xl my-5'>Add Your Task</h1>
                <div>
                    <input type="text" name='text' placeholder="Name" className="input input-bordered w-full max-w-xs" />
                    <textarea name='description' className="textarea input-bordered mt-8" rows="4" cols="40" placeholder="Description"></textarea>

                </div>
                <div>
                    <input type="submit" value='Log In' className="btn text-white mt-3 max-w-xs" />
                </div>
            </form>
        </div>
    );
};

export default GetData;