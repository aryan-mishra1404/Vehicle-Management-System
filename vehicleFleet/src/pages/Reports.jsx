import React, { useState } from 'react';
import OverallReport from '../components/OverallReport';
import Income from '../components/Income';
import Expense from '../components/Expense';

const Reports = () => {

    const [filterVehicle, setFilterVehicle] = useState("")
    const [dateValue, setDateValue] = useState(null);
    const handleFilterChange = (event) => {
        setFilterVehicle(event.target.value);
    };

    const [finalExpenses, setFinalExpenses] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    // the source and destination info can be added also;

    const [totalIncome, setTotalIncome] = useState(0);
    const [activeTab, setActiveTab] = useState('overallReport');

    const tabs = [
        { id: 'overallReport', label: 'Overall Report' },
        { id: 'income', label: 'Income' },
        { id: 'expense', label: 'Expense' },
    ];
    return (

        <div className="px-[7.5vmax] w-[100%] bg-secondary text-primaryColor">
            {/* Tabs */}
            <div className="border-b mb-6">
                <div className="flex gap-[2vmax]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-5 px-1 relative font-medium  text-sm text-secondaryColor ${activeTab === tab.id
                                && 'text-themeColor border-b-2 border-themeColor'

                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* <div className="w-[100%] box-border">
                <div className="flex items-center justify-between bg-white shadow-lg p-4 border rounded-md">
                    <h3 className="text-base font-normal">
                        No. of Records: <span className="text-xl font-medium">{filterVehicle}</span>
                    </h3>
                    <h3 className="text-base font-normal">
                        Total Expenses: ₹<span className="text-xl font-medium">{finalExpenses}</span>
                    </h3>
                </div>
            </div> */}


            {activeTab === "income" ? <Income totalRounds={totalRounds} setTotalRounds={setTotalRounds} totalIncome={totalIncome} setTotalIncome={setTotalIncome} /> : activeTab === "expense" && <Expense finalExpenses={finalExpenses} setFinalExpenses={setFinalExpenses} />}

        </div>
    )
}

export default Reports