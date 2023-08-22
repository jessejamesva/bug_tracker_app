import Ticket from "./Ticket"

export default function TicketGroup(props) {
  const { ticketList, heading, companyId, color } = props
  return (
    <>
      <h2 
        className="b border-b-2 border-pink-800 text-2xl mx-4 text-white"
        style={{ borderColor: color }}
        >{heading}</h2>
      {ticketList.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          companyId={companyId}
          color={color}
        />          
      ))}  
    </>

  )
}