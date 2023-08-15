// import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import TicketInfo from "./TicketInfo"
import { useState } from "react"
import { useEffect } from "react"


export default function SprintInfo() {
    const { sprint, isSprintLoaded } = useOutletContext()
    const [unassignedTickets, setUnassignedTickets] = useState([])
 
    
    function getUnassigned() {
        (isSprintLoaded && setUnassignedTickets(sprint.tickets.filter((ticket) => ticket.status === "na")))
        // (isSprintLoaded && console.log("sprint"))
    }
    
    useEffect(() => {
        getUnassigned()
    }, [isSprintLoaded])
    
    if (!isSprintLoaded) {
        return null
    }

    return (
        <div className=" lg w-full h-screen">
            <div className="flex mt-4 bg-pink-100 h-20 w-full justify-around align-middle py-4">
                <h2 className="my-auto text-4xl font-bold">Sprint: {sprint.name}</h2>
                <div>
                    <h3>{`Start date: ${sprint.start_date}`}</h3>
                    <h3>{`End date: ${sprint.end_date}`}</h3>
                </div>                
            </div>
            <div className="mt-4 w-full h-full flex justify-between gap-8">
                <div className="basis-1/4 text-center bg-yellow-400">
                    <h2 className="text-2xl underline  ">Unassinged</h2>
                    {unassignedTickets.map((ticket, index) => (
                        <h3 key={index}>{ticket.feature}</h3>    
                    ))}
                </div>
                <div className="text-2xl underline basis-1/4 text-center bg-pink-400">In Progress</div>
                <div className="text-2xl underline basis-1/4 text-center bg-indigo-400">Testing</div>
                <div className="text-2xl underline basis-1/4 text-center bg-blue-300">Verified</div>
                <div className="text-2xl underline basis-1/4 text-center bg-green-400">Approved</div>
            </div>
        </div>
    )
}

    
