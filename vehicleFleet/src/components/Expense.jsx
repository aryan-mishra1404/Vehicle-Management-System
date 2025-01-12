import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from '../components/Modal';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import { id } from 'date-fns/locale';
const initialExpenseData = [
    { id: 1, date: "15-11-2024", vehicleNumber: "MH12AB1234", owner: "Gopal Logistic", hsd: 50, hsdAmount: 5000, cash: 1000, totalAmount: 6050, petrolPump: "Puri P.Pump" },
    { id: 2, date: "16-11-2024", vehicleNumber: "UP01RS4321", owner: "Sheetal Meel", hsd: 40, hsdAmount: 4000, cash: 1500, totalAmount: 5500, petrolPump: "S.B P.Pump" },
    { id: 3, date: "17-11-2024", vehicleNumber: "UP32GH5678", owner: "RK Sharma", hsd: 60, hsdAmount: 6000, cash: 2000, totalAmount: 8000, petrolPump: "Sambhal P.Pump" },
    { id: 4, date: "18-11-2024", vehicleNumber: "DL04EF1234", owner: "Anil Mishra", hsd: 55, hsdAmount: 5500, cash: 1800, totalAmount: 7300, petrolPump: "Delhi P.Pump" },
];

const initialMiscellaneousData = [
    { id: 1, date: "16-11-2024", vehicleNumber: "MH12AB1234", owner: "Gopal Logistic", type: "Insurance", amount: 5000 },
    { id: 2, date: "17-11-2024", vehicleNumber: "UP01RS4321", owner: "Sheetal Meel", type: "Tax", amount: 3000 },
    { id: 3, date: "18-11-2024", vehicleNumber: "UP32GH5678", owner: "RK Sharma", type: "Servicing", amount: 7000 },
    { id: 4, date: "19-11-2024", vehicleNumber: "DL04EF1234", owner: "Anil Mishra", type: "Permit Renewal", amount: 4500 },
];


const Expense = ({ finalExpenses, setFinalExpenses }) => {
    const { vehicleData } = useSelector((state) => state.vehicleData);

    const [expenseData, setExpenseData] = useState(null);
    const [mainExpenseData, setMainExpenseData] = useState(initialExpenseData);
    const [miscellaneousData, setMiscellaneousData] = useState(initialMiscellaneousData);

    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
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
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


    useEffect(() => {
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`); // Converts to yyyy-mm-dd format
        };

        const filteredExpenses = mainExpenseData.filter((expense) => {
            const isVehicleNumberMatch = selectedVehicle === "" || selectedVehicle === "All" || expense.vehicleNumber === selectedVehicle;

            const expenseDate = parseDate(expense.date);
            const startDate = parseDate(dateState[0]?.startDate);
            const endDate = parseDate(dateState[0]?.endDate);

            const isDateInRange =
                (!dateState[0]?.startDate || !dateState[0]?.endDate || // If startDate or endDate are not provided, ignore date range check
                    (expenseDate >= startDate && expenseDate <= endDate));

            // const isDateInRange =
            //     (!dateState[0]?.startDate ||
            //         !dateState[0]?.endDate ||
            //         (new Date(expense.date) >= new Date(dateState[0].startDate) &&
            //             new Date(expense.date) <= new Date(dateState[0].endDate)));
            return isVehicleNumberMatch && isDateInRange;
        }) || [];
        const updatedFilteredDataWithId = filteredExpenses.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setFilteredExpenseData(updatedFilteredDataWithId);

        const filteredMisc = miscellaneousData.filter((misc) => {
            const isVehicleNumberMatch = selectedVehicle === "" || selectedVehicle === "All" || misc.vehicleNumber === selectedVehicle;

            const miscDate = parseDate(misc.date);
            const startDate = parseDate(dateState[0]?.startDate);
            const endDate = parseDate(dateState[0]?.endDate);

            const isDateInRange =
                (!dateState[0]?.startDate || !dateState[0]?.endDate || // If startDate or endDate are not provided, ignore date range check
                    (miscDate >= startDate && miscDate <= endDate));

            return isVehicleNumberMatch && isDateInRange;
        }) || [];

        const updatedFilteredMiscDataWithId = filteredMisc.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setFilteredMiscellaneousData(updatedFilteredMiscDataWithId);
    }, [mainExpenseData, miscellaneousData, selectedVehicle, dateState]);

    useEffect(() => {
        const totalExpense = filteredExpenseData.reduce((sum, row) => sum + row.totalAmount, 0);
        const totalMisc = filteredMiscellaneousData.reduce((sum, row) => sum + Number(row.amount), 0);
        setTotalExpenses(totalExpense);
        setTotalMiscellaneousAmount(totalMisc);
    }, [filteredExpenseData, filteredMiscellaneousData]);

    useEffect(() => {
        setFinalExpenses(totalExpenses + totalMiscellaneousAmount)
    }, [totalExpenses, totalMiscellaneousAmount])

    const handleClose = () => {
        setIsUpdateModalOpen(false);
        setSelectedRow(null);
    };


    const handleDelete = (selectedData) => {
        console.log("check data", selectedData)
        const updatedMainExpenseData = mainExpenseData.filter((data) => data.id !== selectedData.id)
        const updatedMiscData = miscellaneousData.filter((data) => data.id !== selectedData.id)
        setMiscellaneousData(updatedMiscData);
        setMainExpenseData(updatedMainExpenseData);
    }

    const handleEdit = (row) => {
        console.log(row, "selected Row");
        setSelectedRow(row); // Set the remaining properties
        setIsUpdateModalOpen(true);
    };

    const handleUpdateDocument = (editedExpense) => {
        console.log("Edited Doc!!", editedExpense)
        const { date, vehicleNumber, miscellaneous, others, miscellaneousAmount, owner } = editedExpense;
        const updatedExpenseData = { ...editedExpense, totalAmount: Number(editedExpense.hsdAmount) + Number(editedExpense.cash) }
        // const updatedMiscData = { ...editedExpense, totalAmount: Number(editedExpense.hsdAmount) + Number(editedExpense.cash) }
        const type = others ? others : miscellaneous;
        const updatedMiscData = {
            ...editedExpense,
            type,
            date,
            vehicleNumber,
            owner,
            amount: miscellaneousAmount,
        };


        setMainExpenseData((prevVehicleData) =>
            prevVehicleData.map((v) => (v.id === updatedExpenseData.id ? updatedExpenseData : v))
        );
        setMiscellaneousData((prevVehicleData) =>
            prevVehicleData.map((v) => (v.id === updatedMiscData.id ? updatedMiscData : v))
        );
    };

    const handleAddExpense = (newExpense) => {
        const { date, vehicleNumber, miscellaneous, others, miscellaneousAmount, owner } = newExpense;

        const data = { ...newExpense, id: expenseData?.length + 1 }
        setExpenseData(data);

        const type = others ? others : miscellaneous;
        const miscellaneousEntry = {
            ...newExpense,
            id: miscellaneousData.length + 1,
            type,
            date,
            vehicleNumber,
            owner,
            amount: miscellaneousAmount,
        };

        const newEntry = {
            ...newExpense,

            id: mainExpenseData.length + 1,
            totalAmount: Number(newExpense.hsdAmount) + Number(newExpense.cash),
        };

        setMainExpenseData((prevData) => [...prevData, newEntry]);

        setMiscellaneousData((prevData) => [...prevData, miscellaneousEntry]);
    };

    const handleFilterChange = (event) => {
        // console.log(event.target.value)
        setSelectedVehicle(event.target.value);
    };

    const expenseColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'owner', headerName: 'Owners', flex: 1 },
        { field: 'petrolPump', headerName: 'Petrol Pump', flex: 1 },
        { field: 'hsd', headerName: 'HSD (L)', flex: 1 },
        { field: 'hsdAmount', headerName: 'HSD Amount', flex: 1 },
        { field: 'cash', headerName: 'Cash', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => { console.log("params: ", params); handleEdit(params.row) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { console.log("params: ", params); handleDelete(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const miscColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'owner', headerName: 'Owners', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => { console.log("params: ", params); handleEdit(params.row) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { console.log("params: ", params); handleDelete(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const expenseStructure = {
        expenseId: "",
        id: "",
        date: "",
        vehicleNumber: "",
        owner: "",
        hsd: "",
        hsdAmount: "",
        petrolPump: "",
        cash: "",
        miscellaneous: "",
        others: "",
        miscellaneousAmount: "",
    }

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

            <div className='flex items-center justify-between py-4'>
                <div className='w-[60%] flex items-center justify-between gap-4'>

                    <FormControl sx={{ width: "50%" }}>
                        <InputLabel id="filter-vehicle-label">Vehicles</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-vehicle-label"
                            value={selectedVehicle}
                            label="Vehicles"
                            onChange={handleFilterChange}
                        >
                            {vehicleData?.Vehicles.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Calendar dateState={dateState} setDateState={setDateState} />
                </div>

                <Button
                    variant="contained"
                    onClick={() => setIsAddModalOpen(true)}
                    startIcon={<AddIcon className='w-[5vmax] h-[5vmax]' />}
                    sx={{ height: '100%', fontSize: ".9vmax" }}
                >
                    Add data
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

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add Expense"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    structure={expenseStructure}
                    vehicleOptions={vehicleData.Vehicles}
                    ownerOptions={vehicleData.Owners}
                    petrolPumpOptions={vehicleData.PetrolPumps}
                    miscellaneousOptions={vehicleData.MiscellaneousOptions}
                    onSave={handleAddExpense}
                    isForExpense={true}
                />
            )}

            {selectedRow && (
                <ModalComponent
                    modalTitle="Add Expense"
                    isOpen={isUpdateModalOpen}
                    onClose={handleClose}
                    structure={selectedRow}
                    vehicleOptions={vehicleData.Vehicles}
                    ownerOptions={vehicleData.Owners}
                    petrolPumpOptions={vehicleData.PetrolPumps}
                    miscellaneousOptions={vehicleData.MiscellaneousOptions}
                    onSave={handleUpdateDocument}
                    isForExpense={true}
                />)}

        </div>
    );
};

export default Expense;
