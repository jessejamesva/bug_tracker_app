import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import DragMove from "./DragMove"


// Display board for all sprint tickets. Uses "isSprintLoaded" as boolean to display component. The bool value is created on the Company page and set in the NavBAr with the selection of the "Sprint" element. The getUnassinged function parses through the tickets and filters by status. 
export default function SprintInfo() {
    const { sprint, isSprintLoaded, company } = useOutletContext()
    const [unassignedTickets, setUnassignedTickets] = useState([])
    const [inProgressTickets, setInprogressTickets] = useState([])
    const navigate = useNavigate()

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    })

    const handleDragMove = (e) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        })
    }
 
    
    function getUnassigned() {
        (isSprintLoaded && (
            setUnassignedTickets(sprint.tickets.filter((ticket) => ticket.status === "na")),
            setInprogressTickets(sprint.tickets.filter((ticket) => ticket.status === 'ip'))
        ))
    }
    

    useEffect(() => {
        getUnassigned()
    }, [sprint, isSprintLoaded])
    
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
                    {unassignedTickets.map((ticket) => (
                        <DragMove key={ticket.id} onDragMove={handleDragMove}>
                            <div style={{
                                transform: `translate(${translate.x}px) translate(${translate.y}px)`
                            }}
                            >
                            <h3 onClick={() => {navigate(`${company.id}/ticket/${ticket.id}`)}} key={ticket.id}>{ticket.feature}</h3>    

                            </div>
                        </DragMove>
                    ))}
                </div>
                <div className="basis-1/4 text-center bg-pink-400">
                    <h2 className="text-2xl underline">In Progress</h2>
                    {inProgressTickets.map((ticket) => (
                        <h3 onClick={() => {navigate(`${company.id}/ticket/${ticket.id}`)}} key={ticket.id}>{ticket.feature}</h3>
                    ))}
                </div>
                <div className="text-2xl underline basis-1/4 text-center bg-indigo-400">Testing</div>
                <div className="text-2xl underline basis-1/4 text-center bg-blue-300">Verified</div>
                <div className="text-2xl underline basis-1/4 text-center bg-green-400">Approved</div>
            </div>
        </div>
    )
}

    
