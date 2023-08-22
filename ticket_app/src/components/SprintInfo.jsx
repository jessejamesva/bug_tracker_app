import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import TicketGroup from "./TicketGroup";
import Ticket from "./Ticket";
import DragMove from "./DragMove";

// Display board for all sprint tickets. Uses "isSprintLoaded" as boolean to display component. The bool value is created on the Company page and set in the NavBAr with the selection of the "Sprint" element. The getUnassinged function parses through the tickets and filters by status.
export default function SprintInfo() {
  const { sprint, isSprintLoaded, company } = useOutletContext();
  const [unassignedTickets, setUnassignedTickets] = useState([]);
  const [inProgressTickets, setInprogressTickets] = useState([]);
  const [testingTickets, setTestingTickets] = useState([]);
  const [verifiedTickets, setVerifiedTickets] = useState([])
  const [approvedTickets, setApprovedTickets] = useState([])
  // const navigate = useNavigate();

  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  function getUnassigned() {
    isSprintLoaded &&
      (
        setUnassignedTickets(
          sprint.tickets.filter((ticket) => ticket.status === "na")
        ),
        setInprogressTickets(
          sprint.tickets.filter((ticket) => ticket.status === "ip")
        ),
        setTestingTickets(
          sprint.tickets.filter((ticket) => ticket.status == "te")
        ),
        setVerifiedTickets(
          sprint.tickets.filter((ticket) => ticket.status == "qa")
        ),
        setApprovedTickets(
          sprint.tickets.filter((ticket) => ticket.status == "ok")
        )
      );
  }

  useEffect(() => {
    getUnassigned();
  }, [sprint, isSprintLoaded]);

  if (!isSprintLoaded) {
    return null;
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

      {/* Start of sprint information board */}
      
      <div className="mt-4 w-full h-full flex justify-around">
        <div className="basis-1/4 text-center">
          <TicketGroup
            heading="Back Log"
            ticketList={unassignedTickets}
            companyId={company.id}
            color="lightsalmon"
          />
        </div>
        <div className="basis-1/4 text-center">
          <TicketGroup
            heading="In Progress"
            ticketList={inProgressTickets}
            companyId={company.id}
            color="lightpink"
          />
        </div>
        <div className="basis-1/4 text-center">
          <TicketGroup
            heading="Testing"
            ticketList={testingTickets}
            companyId={company.id}
            color="skyblue"
          />
        </div>
        <div className="basis-1/4 text-center">
          <TicketGroup
            heading="Verified"
            ticketList={verifiedTickets}
            companyId={company.id}
            color="cadetblue"
          />
        </div>
        <div className="basis-1/4 text-center">
          <TicketGroup
            heading="Approved"
            ticketList={approvedTickets}
            companyId={company.id}
            color="yellowgreen"
          />
        </div>
        {/* <div className="basis-1/4 text-center bg-yellow-400">
          <h2 className="text-2xl underline  ">Unassinged</h2>
          {unassignedTickets.map((ticket) => (
            // <Ticket key={ticket.id} ticket={ticket}/>
            <DragMove key={ticket.id} onDragMove={handleDragMove}>
              <div
                style={{
                  transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
                }}
              >
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  companyId={company.id}
                />
              </div>
            </DragMove>
          ))}
        </div> */}
        {/* <div className="basis-1/4 text-center bg-pink-400">
          <h2 className="text-2xl underline">In Progress</h2>
          {inProgressTickets.map((ticket) => (
            <Ticket
            key={ticket.id}
            ticket={ticket}
            companyId={company.id}
          />
          ))}
        </div>
        <div className="text-2xl underline basis-1/4 text-center bg-indigo-400">
          Testing
        </div>
        <div className="text-2xl underline basis-1/4 text-center bg-blue-300">
          Verified
        </div> */}
        {/* <div className="text-2xl underline basis-1/4 text-center bg-green-400">
          Approved
        </div> */}
      </div>
    </div>
  );
}
