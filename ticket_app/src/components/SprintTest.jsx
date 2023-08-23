import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable,  } from "react-beautiful-dnd";
import { api } from "../utilities";
import Ticket from "./Ticket";



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
          taskIds: unassignedTickets.map((ticket) => ticket.id),
        },
        {
          id: "ip",
          title: "In Progress",
          taskIds: inProgressTickets.map((ticket) => ticket.id),
        },
        {
          id: "te",
          title: "Testing",
          taskIds: testingTickets.map((ticket) => ticket.id),
        },
        {
          id: "qa",
          title: "Verified",
          taskIds: verifiedTickets.map((ticket) => ticket.id),
        },
        {
          id: "ok",
          title: "Approved",
          taskIds: approvedTickets.map((ticket) => ticket.id),
        },
      ]);
    }
  }, [sprint, isSprintLoaded]);

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


      // Reorder task IDs within the source column
      const sourceColumn = columns.find(column => column.id === source.droppableId);
      const updatedSourceTaskIds = Array.from(sourceColumn.taskIds);
      updatedSourceTaskIds.splice(source.index, 1);
      
      // Insert the dragged task ID at the destination index within the destination column
      const destinationColumn = columns.find(column => column.id === destination.droppableId);
      const updatedDestinationTaskIds = Array.from(destinationColumn.taskIds);
      updatedDestinationTaskIds.splice(destination.index, 0, result.draggableId);
      
      // Update columns' taskIds
      const updatedColumns = columns.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, taskIds: updatedSourceTaskIds };
        }
        if (column.id === destination.droppableId) {
          return { ...column, taskIds: updatedDestinationTaskIds };
        }
        return column;
        });
      setColumns(updatedColumns);
    }    
  };  

  useEffect(() => {
    console.log("after move update", columns)
  }, [columns])
  

  return (
    <div className="SprintTest">
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {Object.values(columns).map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    border: "1px solid gray",
                    margin: "8px",
                    padding: "8px",
                    width: "200px",
                  }}
                >
                  <h2>{column.title}</h2>
                  {column.taskIds.map((taskId, index) => {
                    let task = sprint.tickets.find((ticket) => ticket.id === taskId);
                    if (!task) {
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
                                
                                ...provided.draggableProps.style,
                            }}
                            >
                            <Ticket
                              key={task.id}
                              ticket={task}
                              companyId={1}
                              isSprintChanged={isSprintChanged}
                              color="green"
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
