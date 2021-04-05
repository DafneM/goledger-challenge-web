import React from 'react';

const Button = ({
    toDo, submit
}) => {
    return(
        <div>
            <button onClick={submit}
            style={{background: '#00B2EE', color:'white', fontFamily: 'Poppins', fontSize:'1rem', outline:'none', 
            borderRadius: '0.5rem', height: '40px', border: 'none', width: '150px', marginBottom: '0.5rem'}} >{toDo}</button>
        </div>
    );
}

export default Button;