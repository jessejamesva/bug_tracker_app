import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

// ticket loader runs API call before TicketInfo
export const quoteLoader = async () => {
  const response = await axios.get("https://api.adviceslip.com/advice");
  return response.data;
};

// This component shows information for a single ticket with two buttons, for update and delete
export default function Quote() {
  const startQuote = useLoaderData();
  const revalidator = useRevalidator();
  const [quote, setQuote] = useState(startQuote)
  const navigate = useNavigate();
  console.log(quote.slip.advice)

  const handleClick = async () => {
    const newQuote = await quoteLoader()
    setQuote(newQuote)
    console.log(quote.slip.advice)

  };

  return (
    <div className="bg-gray-600  bgh-1/2 w-1/3 m-auto rounded text-white">
      <div className="max-w-md mx-10">
        <div className="text-xl text-center font-semibold mt-4">
          <h1>Here is a Quote</h1>
        </div>
        <div className="text-lg my-4">
          <h1>Quote: {quote ? quote.slip.advice : "None"}</h1>
        </div>
        <div className="flex mb-4 w-full justify-evenly">
          <button
            onClick={handleClick}
            className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400"
          >
            Again?
          </button>
          <button
            onClick={() => {
              navigate("/company")
            }}
            className="w-1/4 bg-pink-900 rounded p-1 hover:bg-pink-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
