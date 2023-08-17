import { useParams, useLoaderData } from "react-router-dom"
import { api } from "../utilities"
// import axios from "axios"

export const ticketLoader = async ({ params }) => {
    console.log("loader started")
    const response = await api.get(
        `companies/${params.id}/ticket/${params.ticket_id}`
    )
    return response.data
}

export default function TicketInfo() {
    // const {id, ticket_id} = useParams()
    const ticket = useLoaderData()
    
    
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
                    {/* <h1>Due Date: {ticket.due_date ? ticket.due_date : "None"}</h1> */}
                </div>
                <div className="flex mb-4 w-full justify-evenly">
                    <button className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400">Update</button>
                    <button className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400">Delete</button>
                </div>

            </div>
            
        </div>
    )
}