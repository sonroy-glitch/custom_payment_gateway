import React,{useState} from 'react'
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader";
import {useNavigate} from "react-router-dom"
const jwtSecret="sr1435"
const Card = ({transfer,amt,recipient,userId,token}) => {
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate= useNavigate();
  var timeout;
  function passwordDebounced(e){
    clearTimeout(timeout);
    timeout=setTimeout(() => {
      setPassword(e)
    }, 1000);
  }
  async function run(){
    setLoading(true);
    var data = await axios.post(`http://localhost:4000/transaction`,{
      OnRampStatus:"Processing",
        type:"transact",
       token,
       provider:"hdfc",
       amount:Number(amt),
       passcode:password
    })
    if(data){
      if(data.status==200){
        alert("Transaction successful")
        navigate("http://localhost:3000/")
        setLoading(false)
      }
      else{
        // console.log(data)
        alert("Transaction not completed succesfully")
        setLoading(false)
        navigate("http://localhost:3000/")

      }
    }
  
  }
 
  return (
    loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#121212",
        }}
      >
        <ClipLoader color="red" size={25} />
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>
          HDFC BANK - {transfer} Transfer
        </h1>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Enter your pin below</h2>
        <h3 style={{ fontSize: "1rem", marginBottom: "20px" }}>
          You're paying <span style={{ fontWeight: "bold", color: "#4caf50" }}>{amt}</span> to{" "}
          <span style={{ fontWeight: "bold", color: "#4caf50" }}>{recipient}</span>
        </h3>
        <input
          type="password"
          placeholder="Passcode"
          onChange={(e) => passwordDebounced(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "10px",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#1e1e1e",
            color: "white",
            marginBottom: "20px",
            fontSize: "1rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          onClick={run}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onMouseDown={(e) => (e.target.style.transform = "translateY(0)")}
          onMouseUp={(e) => (e.target.style.transform = "translateY(-2px)")}
        >
          Pay
        </button>
      </div>
    )
  );
  
  
  
   
  
}

export default Card