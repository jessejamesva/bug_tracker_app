import axios from "axios"

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/" // replace with actual path in production
})

export const roleList = [
    { id: "pm", role: "Project Manager" },
    { id: "se", role: "Software Engineer" },
    { id: "ta", role: "Test Analyst" },
    { id: "qa", role: "QA Specialist" },
    { id: "ro", role: "Read Only" },
  ];
