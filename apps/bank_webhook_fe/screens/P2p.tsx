import React from 'react'
import Card from "@repo/ui/card"
import {useSearchParams} from "react-router-dom"
const p2p = () => {
    const [searchParams]=useSearchParams()
const token= searchParams.get("token");
const amt= searchParams.get("amt");
const recipient=searchParams.get("recipient")
  return (
    <div>
 <Card transfer="User" amt={amt} recipient={recipient} token={token} />
    </div>
  )
}

export default p2p