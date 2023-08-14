export default function TicketInfo(props) {
    const { ticket } = props
    return (
        <div className="mx-40">
            {ticket && <h3>Ticket: {ticket.feature}</h3>}
        </div>
    )
}