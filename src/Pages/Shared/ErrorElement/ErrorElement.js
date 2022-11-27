import React from 'react';

import NotFound from '../../../Assets/404/404-error-with-character-error-design-template-vector-20568716.jpg'

const ErrorElement = () => {
    return (
        <div className='flex justify-center items-center mt-24'>
           <div>
            <img className='w-96' src={NotFound} alt="404 Page" />
            </div> 
        </div>
    );
};

export default ErrorElement;