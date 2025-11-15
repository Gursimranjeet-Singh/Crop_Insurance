import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import Main from './component/Main/Main'
import Dashboard from './component/Dashboard/Dashboard'
import Form from "./component/Form/Form"
import ChatBot from "./component/ChatBot/ChatBot"

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Form />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </>
  )
};

export default App
