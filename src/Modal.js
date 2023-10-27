import React, { useState, useEffect } from 'react'
import './Modal.css';

function Modal({ deleteIndex, closeModal,tableData,setTableData }) {
    const [editIndex, setEditIndex] = useState(null);
    const localStorageKey = 'tableData';
    console.log("deleteIndex", deleteIndex);
    const handleDelete = (index) => {

        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
        localStorage.setItem('tableData', JSON.stringify(updatedData));
        closeModal(false)
    };
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(localStorageKey));
        if (storedData) {
            setTableData(storedData);
        }
    }, []);


    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}>x</button>
                </div>
                <div className="body">
                    <p>are you want to delete the Employee data</p>
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} id='cancelBtn'>Cancel</button>
                    <button onClick={() => handleDelete(deleteIndex)}>Delete</button>
                </div>



            </div>
        </div>
    );
}

export default Modal;