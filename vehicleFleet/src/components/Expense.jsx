import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from '../components/Modal';
import Calendar from './Calendar';

const initialExpenseData = [
    { id: 1, date: '2024-11-15', vehicleNumber: 'MH12AB1234', hsd: 50, hsdAmount: 5000, cash: 1000, totalAmount: 6050 },
    { id: 2, date: '2024-11-16', vehicleNumber: 'UP01RS4321', hsd: 40, hsdAmount: 4000, cash: 1500, totalAmount: 5500 },
    { id: 3, date: '2024-11-17', vehicleNumber: 'UP32GH5678', hsd: 60, hsdAmount: 6000, cash: 2000, totalAmount: 8000 },
];

const initialMiscellaneousData = [
    { id: 1, date: '2024-11-16', vehicleNumber: 'MH12AB1234', type: 'Insurance', amount: 5000 },
    { id: 2, date: '2024-11-17', vehicleNumber: 'UP01RS4321', type: 'Tax', amount: 3000 },
    { id: 3, date: '2024-11-18', vehicleNumber: 'UP32GH5678', type: 'Servicing', amount: 7000 },
];

const Expense = ({ finalExpenses, setFinalExpenses }) => {
    const [expenseData, setExpenseData] = useState(initialExpenseData);
    const [miscellaneousData, setMiscellaneousData] = useState(initialMiscellaneousData);

    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [dateState, setDateState] = useState([
        {
            startDate: '',
            endDate: '',
            key: 'selection',
        },
    ]);

    const [filteredExpenseData, setFilteredExpenseData] = useState([]);
    const [filteredMiscellaneousData, setFilteredMiscellaneousData] = useState([]);

    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalMiscellaneousAmount, setTotalMiscellaneousAmount] = useState(0);



    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddMiscModalOpen, setIsAddMiscModalOpen] = useState(false);
    const [tableStructure, setTableStructure] = useState({
        sno: "",
        date: "",
        vehicleNumber: "",
        type: "",
        amount: "",
    })

    useEffect(() => {
        const filteredExpenses = expenseData.filter((expense) => {
            const isVehicleMatch = selectedVehicle ? expense.vehicleNumber === selectedVehicle : true;
            const isDateInRange =
                (!dateState[0]?.startDate ||
                    !dateState[0]?.endDate ||
                    (new Date(expense.date) >= new Date(dateState[0].startDate) &&
                        new Date(expense.date) <= new Date(dateState[0].endDate)));
            return isVehicleMatch && isDateInRange;
        });
        setFilteredExpenseData(filteredExpenses);

        const filteredMisc = miscellaneousData.filter((misc) => {
            const isVehicleMatch = selectedVehicle ? misc.vehicleNumber === selectedVehicle : true;
            const isDateInRange =
                (!dateState[0]?.startDate ||
                    !dateState[0]?.endDate ||
                    (new Date(misc.date) >= new Date(dateState[0].startDate) &&
                        new Date(misc.date) <= new Date(dateState[0].endDate)));
            return isVehicleMatch && isDateInRange;
        });
        setFilteredMiscellaneousData(filteredMisc);
    }, [expenseData, miscellaneousData, selectedVehicle, dateState]);

    useEffect(() => {
        const totalExpense = filteredExpenseData.reduce((sum, row) => sum + row.totalAmount, 0);
        const totalMisc = filteredMiscellaneousData.reduce((sum, row) => sum + row.amount, 0);
        setTotalExpenses(totalExpense);
        setTotalMiscellaneousAmount(totalMisc);
    }, [filteredExpenseData, filteredMiscellaneousData]);

    useEffect(() => {
        setFinalExpenses(totalExpenses + totalMiscellaneousAmount)
    }, [totalExpenses, totalMiscellaneousAmount])
    const handleAddExpense = (newExpense) => {
        const newEntry = { ...newExpense, id: expenseData.length + 1 };
        // setExpenseData((prevData) => [...prevData, newEntry]);
    };

    const handleAddMiscellaneous = (newMisc) => {
        const newEntry = { ...newMisc, id: miscellaneousData.length + 1 };
        // setMiscellaneousData((prevData) => [...prevData, newEntry]);
    };

    const expenseColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'hsd', headerName: 'HSD (L)', flex: 1 },
        { field: 'hsdAmount', headerName: 'HSD Amount', flex: 1 },
        { field: 'cash', headerName: 'Cash', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
    ];

    const miscColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
    ];

    const expenseStructure = {
        date: "",
        vehicleNumber: "",
        hsd: "",
        hsdAmount: "",
        cash: "",
        totalAmount: "",
        miscellaneous: "",
        others: "",
        miscellaneousAmount: "",
    }

    const vehicleOptions = ['MH12AB1234', 'UP01RS4321', 'UP32GH5678'];
    const miscellaneousOptions = ["Driver Salary", "Vehicle Insurance", "Vehicle Permit", "Vehicle Fitness", "Installments", "Income Tax", "Vehicle Pollution", "Maintainance", "Tyres", "Others"]

    return (
        <div className="w-[100%] box-border">
            <div className="flex items-center justify-between bg-white shadow-lg p-4 border rounded-md">
                <h3 className="text-base font-normal">
                    No. of Records: <span className="text-xl font-medium">{filteredExpenseData.length + filteredMiscellaneousData.length}</span>
                </h3>
                <h3 className="text-base font-normal">
                    Total Expenses: ₹<span className="text-xl font-medium">{finalExpenses}</span>
                </h3>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className='flex items-center gap-4 w-[50%]'>

                    <FormControl fullWidth>
                        <InputLabel id="filter-vehicle-label">Vehicle</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-vehicle-label"
                            value={selectedVehicle}
                            label="Vehicle"
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="MH12AB1234">MH12AB1234</MenuItem>
                            <MenuItem value="UP01RS4321">UP01RS4321</MenuItem>
                            <MenuItem value="UP32GH5678">UP32GH5678</MenuItem>
                        </Select>
                    </FormControl>
                    <Calendar dateState={dateState} setDateState={setDateState} />
                </div>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Expense
                </Button>
            </div>

            <div className='h-auto max-h-[60vh] overflow-auto'>

                <Box sx={{ width: '100%', height: 'auto', maxHeight: '50vh' }}>
                    <h3 className="text-lg font-medium pb-2">Main Expenses</h3>
                    <DataGrid rows={filteredExpenseData} columns={expenseColumns} pageSize={5} />
                </Box>

                <Box sx={{ width: '100%', height: 'auto', maxHeight: '50vh', marginTop: '4vmax' }}>
                    <h3 className="text-lg font-medium pb-2">Miscellaneous Expenses</h3>
                    <DataGrid rows={filteredMiscellaneousData} columns={miscColumns} pageSize={5} />
                </Box>

            </div>

            {/* {selectedRow && (
                <ModalComponent
                    modalTitle="Edit Document"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vehicle={selectedRow}
                    onSave={handleUpdateDocument}
                />
            )} */}

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add Expense"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    structure={expenseStructure}
                    vehicles={vehicleOptions}
                    miscellaneousOptions={miscellaneousOptions}
                    onSave={handleAddExpense}
                    isForExpense={true}
                />
            )}

            {/* {isAddMiscModalOpen && (
                <ModalComponent
                    modalTitle="Add Miscellaneous Expense"
                    isOpen={isAddMiscModalOpen}
                    onClose={() => setIsAddMiscModalOpen(false)}
                    onSave={handleAddMiscellaneous}
                /> */}

        </div>
    );
};

export default Expense;
