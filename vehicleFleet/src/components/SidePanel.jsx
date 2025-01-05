import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const SidePanel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("");



    const panelTabs = [
        {
            title: "Vehicle Registration",
            path: "/vehicles",
            outlinedsvg: <LocalShippingOutlinedIcon sx={{ fontSize: "1.5vmax" }} />,
            svg: <LocalShippingRoundedIcon sx={{ fontSize: "1.5vmax" }} />,
        },
        {
            title: "Documents",
            path: "/documents",
            outlinedsvg: <DescriptionOutlinedIcon sx={{ fontSize: "1.5vmax" }} />,
            svg: <DescriptionRoundedIcon sx={{ fontSize: "1.5vmax" }} />,
        },
        {
            title: "Locations",
            path: "/location",
            outlinedsvg: <LocationOnOutlinedIcon sx={{ fontSize: "1.5vmax" }} />,
            svg: <LocationOnIcon sx={{ fontSize: "1.5vmax" }} />,
        },
        {
            title: "Party Sheet",
            path: "/reports",
            outlinedsvg: <AssessmentOutlinedIcon sx={{ fontSize: "1.5vmax" }} />,
            svg: <AssessmentIcon sx={{ fontSize: "1.5vmax" }} />,
        },
    ];

    // Update activeTab based on the current path
    useEffect(() => {
        const currentTab = panelTabs.find((tab) => tab.path === location.pathname);
        // console.log(currentTab, "ctab");
        setActiveTab(currentTab?.title || "");
    }, [location.pathname]); // Run this whenever the route changes

    return (
        <div className="h-[92vh] w-[14%] bg-secondary border-r-2 flex flex-col py-4 text-base">
            {panelTabs.map((tab, index) => (
                <div
                    key={index}
                    className={`${activeTab === tab.title
                        ? "shadow-lg text-tertiaryColor bg-primary font-medium z-20"
                        : "text-tertiaryColor"
                        } flex items-end justify-between bg-secondary py-4 px-6 cursor-pointer whitespace-nowrap text-center`}
                    onClick={() => navigate(tab.path)} // Navigate to the tab's path
                >
                    <div>{tab.title}</div>
                    <div>{activeTab === tab.title ? tab.svg : tab.outlinedsvg}</div>
                </div>
            ))}
        </div>
    );
};

export default SidePanel;
