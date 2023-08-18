import { useLoaderData, useNavigate } from "react-router-dom"
import { api } from "../utilities"



// ticket loader runs API call before TicketInfo
export const ticketLoader = async ({ params }) => {
    const response = await api.get(
        `companies/${params.id}/ticket/${params.ticket_id}`
    )
    return response.data
}

// This component shows information for a single ticket with two buttons, for update and delete
export default function TicketInfo() {
    const ticket = useLoaderData()
    const navigate = useNavigate()    
    
    return (
        <div className="bg-gray-600 h-1/2 w-1/3 m-auto rounded text-white">
            <div className="max-w-md mx-10">
                <div className="text-xl text-center font-semibold mt-4">
                    <h1>{ticket.feature}</h1>
                </div>
                <div className="text-lg my-4">
                    <h1>Notes: {ticket.notes ? ticket.notes : "None"}</h1>
                    <h1>Assigned To: {ticket.assigned_to ? ticket.assigned_to : "None"}</h1>
                    <h1>Status: {ticket.status}</h1>
                </div>
                <div className="flex mb-4 w-full justify-evenly">
                    <button onClick={() => {navigate(`update`)}} className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400">Update</button>
                    <button className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400">Delete</button>
                </div>

            </div>
            
        </div>
    )
}