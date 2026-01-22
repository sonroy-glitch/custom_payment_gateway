import react, { useState } from 'react'
import Card from "@repo/ui/card"
import {Route,Routes} from "react-router-dom"
import  Merchant from "../screens/Merchant"
import P2p from "../screens/P2p"
function App() {
  // const [count, setCount] = useState(0)

  return (
   <Routes>
    <Route path="/" element={<Merchant/>}/>
    <Route path="/p2p" element={<P2p/>}/>

   </Routes>
  )
}

export default App
