import { useState } from "react";
import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom";
import { api } from "../utilities";

export const ticketLoader2 = async ({ params }) => {
  const response = await api.get(
    `companies/${params.id}/ticket/${params.ticket_id}`
  );
  return response.data;
};

// Updates ticket information by first collecting user inputs and then calling and API PUT method. Reroutes back to company page on submission
export default function UpdateTicket() {
  const ticket = useLoaderData();
  const [feature, setFeature] = useState(ticket.feature);
  const [note, setNote] = useState(ticket.notes);
  const [employee, setEmployee] = useState(`${ticket.assigned_to}`);
  const [status, setStatus] = useState(ticket.status);
  const { company, isSprintChanged } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(feature, note, employee);
    let response = await api.put(
      `companies/${company.id}/ticket/${ticket.id}/`,
      {
        feature: feature,
        notes: note,
        assigned_to: employee,
        status: status,
      }
    );
    isSprintChanged()
    navigate("/company");
  };

  return (
    <div className="bg-gray-600 h-1/2 w-1/3 m-auto rounded-lg p-6">
      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-white underline underline-offset-4 text-center">
            {`Update ticket: ${ticket.id}`}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  autoComplete="off"
                  id="feature"
                  name="feature"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 mb-3 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                  placeholder="Problem Feature"
                />
                <label
                  htmlFor="feature"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                >
                  Problem Feature
                </label>
              </div>
              <div className="relative">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  autoComplete="off"
                  id="note"
                  name="note"
                  type="note"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                  placeholder="Problem Note"
                />
                <label
                  htmlFor="note"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                >
                  Note
                </label>
                <div className="mt-4">
                  <label className="text-white ">Assign To:</label>
                  <select
                    name="selectedEmployee"
                    defaultValue={ticket.assigned_to}
                    onClick={(e) => setEmployee(e.target.value)}
                    className="w-4/6 text-black mx-4 rounded pl-1"
                  >
                    <option key={100} value={null}></option>
                    {company &&
                      company.employees.map((employee, index) => (
                        <option key={index} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-white ">Status: </label>
                  <select
                    name="selectedStatus"
                    defaultValue={ticket.status}
                    onClick={(e) => setStatus(e.target.value)}
                    className="w-4/6 text-black mx-4 rounded pl-1"
                  >
                    <option key={1} value={"na"}>
                      Back Log
                    </option>
                    <option key={2} value={"ip"}>
                      In Progress
                    </option>
                    <option key={3} value={"te"}>
                      Testing
                    </option>
                    <option key={4} value={"qa"}>
                      Verified
                    </option>
                    <option key={5} value={"ok"}>
                      Approved
                    </option>
                  </select>
                </div>
              </div>
              <div className="relative flex justify-evenly">
                <button
                  className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-10 py-1 hover:bg-pink-500"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-10 py-1 hover:bg-pink-500"
                  onClick={() => navigate("/company")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
