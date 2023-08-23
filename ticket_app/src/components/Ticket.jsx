import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { FaRectangleList, FaTrashCan } from "react-icons/fa6";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Ticket(props) {
  const { feature, notes, id } = props.ticket;
  const { color, isSprintChanged } = props;

  const navigate = useNavigate();

  const handleDelete = async () => {
    let response = await api.delete(
      `companies/${props.companyId}/ticket/${id}/`
    );
    console.log(response.data);
    if (response.status === 204) {
      alert("Ticket Deleted");
    }
    isSprintChanged();
    navigate("/company");
  };

  return (
    <div
      className="border border-1 border-white shadow-lg shadow-black rounded-md m-5 p-3"
      style={{ backgroundColor: color }}
    >
      <h2 className="uppercase">{feature}</h2>
      <h2 className="text-xs capitalize">{notes}</h2>
      <h2 className="text-xs">id: {id}</h2>
      <div className="flex justify-between static">
        <FaRectangleList
          className="cursor-pointer text-lg"
          onClick={() => {
            navigate(`${props.companyId}/ticket/${id}/update`);
          }}
        />
        <Popup
          trigger={<FaTrashCan className="cursor-pointer text-lg" />}
          position="center center"
          modal
          closeOnDocumentClick
          contentStyle={{
            padding: "10px",
            borderRadius: "10px",
            width: "300px",
            textAlign: "center",
          }}
        >
          {(close) => (
            <div className="">
              <h2 className="text-lg">Delete ?</h2>
              <div className="flex justify-evenly">
                <button
                  onClick={() => {
                    handleDelete();
                    close();
                  }}
                  className="bg-pink-900 text-white p-2 px-8 rounded-md hover:bg-pink-400"
                >
                  Yes
                </button>
                <button
                  className="bg-pink-900 text-white p-2 px-8 rounded hover:bg-pink-400"
                  onClick={close}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

export default React.memo(Ticket);
