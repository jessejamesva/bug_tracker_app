import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { router } from './Router'

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)
