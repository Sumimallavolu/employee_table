import './App.css';
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from './Modal';



function App() {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ employeeid: '', employeename: '', phoneno: '' });
    const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('tableData')) || []);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const localStorageKey = 'tableData';
    console.log(tableData, "tableData");
    //open
    const handleOpen = () => {
        setOpen(true);
    };

    //close
    const handleClose = () => {
        setOpen(false);
    };



    //form submiting function
    const handleFormSubmit = () => {
        if (formData.employeeid === "" || formData.employeename === "" || formData.phoneno === "") {
            window.alert("Please fill out all fields");
            return;
        }

       
        else if (editIndex !== null) {
            // If editIndex is not null, update the existing row
            const updatedData = [...tableData];
            updatedData[editIndex] = formData;
            setTableData(updatedData);
            localStorage.setItem('tableData', JSON.stringify(updatedData));
            setEditIndex(null);
        } else {
            // Otherwise, add a new row
            const updatedData = [...tableData, formData];
            setTableData(updatedData);
            localStorage.setItem('tableData', JSON.stringify(updatedData));
        }
        
        setFormData({ name: "", email: "", message: "" });
        setOpen(false);
    };



    //edit function
    const handleEdit = (index) => {
        setFormData(tableData[index]);
        setEditIndex(index);
        setOpen(true);
    };


    //delete function



    //
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(localStorageKey));
        if (storedData) {
            setTableData(storedData);
        }
    }, []);








    return (
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <div style={{ padding: '20px' }}>
                    <TextField
                        label="EmployeeId"
                        variant="outlined"
                        fullWidth
                        value={formData.employeeid}
                        onChange={(e) => setFormData({ ...formData, employeeid: e.target.value })}
                    />
                    <TextField
                        label="EmployeeName"
                        variant="outlined"
                        fullWidth
                        value={formData.employeename}
                        onChange={(e) => setFormData({ ...formData, employeename: e.target.value })}
                    />
                    <TextField
                        label="Mobile No"
                        variant="outlined"
                        fullWidth
                        value={formData.phoneno}
                        onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFormSubmit}
                        style={{ marginTop: '20px' }}
                    >

                        Save
                    </Button>

                </div>

            </Dialog>

            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>EmployeeId</TableCell>
                                <TableCell>EmployeeName</TableCell>
                                <TableCell>MobileNo</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.employeeid}</TableCell>
                                    <TableCell>{item.employeename}</TableCell>
                                    <TableCell>{item.phoneno}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEdit(index)}>

                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setDeleteIndex(index)
                                            }}>
                                            delete
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {openModal && <Modal closeModal={setOpenModal} deleteIndex={deleteIndex} tableData={tableData} setTableData={setTableData} />}

            </div>

        </div>
    );
}

export default App;