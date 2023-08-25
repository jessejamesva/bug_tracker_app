import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable,  } from "react-beautiful-dnd";
import { api } from "../utilities";
import Ticket from "./Ticket";
import SprintHeading from "./SprintHeading";



export default function SprintTest() {
  const { sprint, isSprintLoaded, isSprintChanged, company } = useOutletContext();
  const navigate = useNavigate() 
  const [movedTicket, setMovedTicket] = useState({}) 
  const [columns, setColumns] = useState([
    {
      id: "unassigned",
      title: "Unassigned",
      taskIds: [],
    },
    {
      id: "inProgress",
      title: "In Progress",
      taskIds: [],
    },
    {
      id: "testing",
      title: "Testing",
      taskIds: [],
    },
    {
      id: "verified",
      title: "Verified",
      taskIds: [],
    },
    {
      id: "approved",
      title: "Approved",
      taskIds: [],
    },
  ]);

  useEffect(() => {
    if (isSprintLoaded) {
      const unassignedTickets = sprint.tickets.filter((ticket) => ticket.status === "na");
      const inProgressTickets = sprint.tickets.filter((ticket) => ticket.status === "ip");
      const testingTickets = sprint.tickets.filter((ticket) => ticket.status === "te");
      const verifiedTickets = sprint.tickets.filter((ticket) => ticket.status === "qa");
      const approvedTickets = sprint.tickets.filter((ticket) => ticket.status === "ok");

      setColumns([
        {
          id: "na",
          title: "Back Log",
          color: "lightsalmon",
          taskIds: unassignedTickets.map((ticket) => ticket.id),
        },
        {
          id: "ip",
          title: "In Progress",
          color: "lightpink",
          taskIds: inProgressTickets.map((ticket) => ticket.id),
        },
        {
          id: "te",
          title: "Testing",
          color: "skyblue",
          taskIds: testingTickets.map((ticket) => ticket.id),
        },
        {
          id: "qa",
          title: "Verified",
          color: "cadetblue",
          taskIds: verifiedTickets.map((ticket) => ticket.id),
        },
        {
          id: "ok",
          title: "Approved",
          color: "yellowgreen",
          taskIds: approvedTickets.map((ticket) => ticket.id),
        },
      ]);
    }
  }, [sprint, isSprintLoaded, isSprintChanged]);

  const updateTicket = async (id, destination) => {
    const ticket = sprint.tickets.find((ticket) => ticket.id === id)
    setMovedTicket(ticket)
    // console.log(ticket)
    const {feature, notes, assigned_to} = ticket
    let response = await api.put(
      `companies/${company.id}/ticket/${ticket.id}/`,
      {
        feature: feature,
        notes: notes,
        assigned_to: assigned_to,
        status: destination,
      }
    );
    isSprintChanged()
  };
  

  const onDragEnd = (result) => {
    console.log(result);
    console.log("before move", columns)
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      console.log("Don't Change")
    } else {
      console.log(`Change ticket from ${source.droppableId} to ${destination.droppableId}`)
      updateTicket(parseInt(draggableId), destination.droppableId)
      navigate("/company/test")


      // // Reorder task IDs within the source column
      // const sourceColumn = columns.find(column => column.id === source.droppableId);
      // const updatedSourceTaskIds = Array.from(sourceColumn.taskIds);
      // updatedSourceTaskIds.splice(source.index, 1);
      
      // // Insert the dragged task ID at the destination index within the destination column
      // const destinationColumn = columns.find(column => column.id === destination.droppableId);
      // const updatedDestinationTaskIds = Array.from(destinationColumn.taskIds);
      // updatedDestinationTaskIds.splice(destination.index, 0, result.draggableId);
      
      // // Update columns' taskIds
      // const updatedColumns = columns.map((column) => {
      //   if (column.id === source.droppableId) {
      //     return { ...column, taskIds: updatedSourceTaskIds };
      //   }
      //   if (column.id === destination.droppableId) {
      //     return { ...column, taskIds: updatedDestinationTaskIds };
      //   }
      //   return column;
      //   });
      // setColumns(updatedColumns);
    }    
  };  

  useEffect(() => {
    console.log("after move update", columns)
  }, [columns])
  
  if (isSprintLoaded) {
    return null
  }
  
  return (
    <div className="SprintTest w-full">
      <SprintHeading sprint={sprint} isSprintLoaded={isSprintLoaded} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {Object.values(columns).map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flexBasis: "20%",
                    margin: "8px",
                    marginTop: "15px",
                    // padding: "1px",
                    minHeight: "300px",
                    // width: "200px",
                  }}
                >
                  <h2 
                    className="text-center text-2xl border-b-[3px] pb-2 text-black drop-shadow-lg"
                    style={{ borderColor: `${column.color}` }}
                    >
                    {column.title}
                  </h2>
                  {column.taskIds.map((taskId, index) => {
                    let task = sprint.tickets.find((ticket) => ticket.id === taskId);
                    if (!task && movedTicket) {
                      task = movedTicket
                    }

                    return (
                        <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                        >
                        {(provided, snapshot) => (
                            <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isdragging={snapshot.isDragging.toString()}
                            style={{                                
                                textAlign: "center",
                                ...provided.draggableProps.style,
                            }}
                            >
                            <Ticket
                              // ref={provided.innerRef}
                              key={task.id}
                              ticket={task}
                              companyId={company.id}
                              isSprintChanged={isSprintChanged}
                              color={`${column.color}`}
                            /> 
                            </div>
                        )}
                        </Draggable>

                    )
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
