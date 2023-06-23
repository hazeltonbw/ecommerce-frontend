import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../api";

export const loader = async () => {
    try {
        return api.get("/");
    } catch (err) {
        return { error: err, message: "Error fetching main page." };
    }
};

function Root() {
    return (
        <div className="flex min-h-full w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Root;
