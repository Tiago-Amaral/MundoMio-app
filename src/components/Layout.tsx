import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import UserProfile from "./UserProfile";

import "./../styles/global.css";

const Layout: React.FC = () => {
	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
			<div className="hidden md:block">
				<Sidebar />
			</div>
			<div className="flex-1 flex flex-col ">
				<div className="p-4 flex justify-end">
					<UserProfile />
				</div>
				<main className="flex-grow p-4 md:p-8 pb-24 md:pb-8 ">
					<Outlet />
				</main>
				<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg ">
					<Sidebar />
				</div>
			</div>
		</div>
	);
};

export default Layout;
