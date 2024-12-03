import React, { useEffect, useState } from 'react';
import OverallReport from '../components/OverallReport';
import Income from '../components/Income';
import Expense from '../components/Expense';

import * as XLSX from 'xlsx';
const Reports = () => {
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

        <div className="px-[6vmax] w-[86%] pt-4 bg-secondary text-primaryColor h-[92vh] overflow-hidden box-border">
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
            {activeTab === "overallReport" ? <OverallReport /> : activeTab === "income" ? <Income totalRounds={totalRounds} setTotalRounds={setTotalRounds} totalIncome={totalIncome} setTotalIncome={setTotalIncome} /> : activeTab === "expense" && <Expense finalExpenses={finalExpenses} setFinalExpenses={setFinalExpenses} />}
        </div>
    )
}

export default Reports