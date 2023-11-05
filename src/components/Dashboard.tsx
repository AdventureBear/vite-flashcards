
//State Management
import  { useFlashCardState } from '../store.ts'
// import {useEffect, useState} from "react";
// import {Deck} from "../types.ts";

interface DashboardProps {
    selectDeck: (name: string) => void
}

const Dashboard = ({selectDeck}:DashboardProps) => {
    const deckList = useFlashCardState((state)=>state.deckList)
    const showDashboard = useFlashCardState((state)=>state.showDashboard)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)


    return (
        <>
            <div className={`bg-amber-50 p-8 ${showDashboard ? 'block' : 'hidden'}`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
                    <p className="font-bold  mb-2">
                        <span className="text-amber-100">Choose your Deck</span>
                    </p>

                        <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                            <p className="font-bold  mb-2">
                                <span className="text-amber-100">Deck List</span>
                            </p>

                            {deckList.map((name, i) => (
                                <div
                                    key={i}
                                    className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                                    onClick={()=>selectDeck(name)}
                                >
                                    <h2>{name}</h2>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-around">

                            <button
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800`}>
                               Just a button
                            </button>
                        </div>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> updateShowDashboard(false)}>Close</button>

                </div>
            </div>
        </>
    )
};

export default Dashboard;