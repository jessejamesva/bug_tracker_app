import TicketInfo from "./TicketInfo"

export default function SprintInfo(props) {
    const { sprint } = props
    return (
        <div className="mx-30">
            {sprint && <h3 className="mx-32 text-sky-500">{`Sprint: ${sprint.name}`}</h3>}
            {sprint && (sprint.tickets.map((ticket) =>
               <TicketInfo key={ticket.id} ticket={ticket} />            
            ))}
        </div>
    )
}