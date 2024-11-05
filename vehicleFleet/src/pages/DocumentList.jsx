import React, { useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
const initialdocuments = [
    { id: 1, documentType: 'LIBRETE', vehicleName: 'Mazda Millenia', lastIssueDate: '2023-08-12', expiryDate: '2024-08-13', chargePaid: 560000, vendor: 'C.K. MOTORS', commission: 40000 },
    { id: 2, documentType: 'INSPEÇÃO', vehicleName: 'TATA SCHOOL BUS 0017', lastIssueDate: '2023-12-16', expiryDate: '2026-01-15', chargePaid: 4000, vendor: 'Saeed Brothers', commission: 0 },
    { id: 3, documentType: 'SEGURO DO VEICULO', vehicleName: 'TATA SCHOOL BUS 0017', lastIssueDate: '2023-11-24', expiryDate: '2024-11-23', chargePaid: 60000, vendor: 'Saeed Brothers', commission: 0 },
    { id: 4, documentType: 'Vehicle Road Worthiness', vehicleName: 'TATA SCHOOL BUS 0017', lastIssueDate: '2022-02-25', expiryDate: '2027-02-25', chargePaid: 6000, vendor: 'Saeed Brothers', commission: 0 },
    { id: 5, documentType: 'Vehicle Route Permit', vehicleName: 'Volkswagen-70957', lastIssueDate: '2017-12-29', expiryDate: '1986-12-06', chargePaid: 92, vendor: 'Saeed Brothers', commission: 9 },
    // Add more rows here...
];
const DocumentList = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialdocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDocument, setFilterDocument] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilterDocument(event.target.value);
    };



    const filteredDocuments = documents.filter((document) =>
        document.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDocument === '' || document.vehicleName === filterDocument)
    );



    const columns = [
        { field: 'id', headerName: 'Sl', width: 70 },
        { field: 'documentType', headerName: 'Document type', width: 150 },
        {
            field: 'vehicleName',
            headerName: 'Vehicle name',
            width: 200,
            sortable: true,
        },
        { field: 'lastIssueDate', headerName: 'Last issue date', width: 150 },
        { field: 'expiryDate', headerName: 'Expiry date', width: 150 },
        { field: 'chargePaid', headerName: 'Charge paid', width: 150 },
        { field: 'vendor', headerName: 'Vendor', width: 150 },
        { field: 'commission', headerName: 'Commission', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button startIcon={<EditIcon />} sx={{ color: 'green' }} />
                    <Button startIcon={<DeleteIcon />} sx={{ color: 'red' }} />
                </>
            ),
        },
    ];



    // const filteredRows = rows.filter((row) => row.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='w-[86%] flex justify-center  pt-[5vmax] box-border    '>

            <Box sx={{ width: "89%", height: 550 }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="filter-vehicle-label">Vehicles</InputLabel>
                            <Select
                                labelId="filter-vehicle-label"
                                value={filterDocument}
                                label="Vehicles"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Mazda Millenia">Mazda Millenia </MenuItem>
                                <MenuItem value="TATA SCHOOL BUS 0017">TATA SCHOOL BUS 0017</MenuItem>
                                <MenuItem value="Volkswagen-70957">Volkswagen-70957</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ height: '100%' }}>
                            Add Document
                        </Button>
                    </Grid>
                </Grid>
                <DataGrid
                    rows={filteredDocuments}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>

        </div>
    );
};

export default DocumentList;
