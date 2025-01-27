import React, { useState, useCallback ,useEffect, useRef} from "react";

const App = () => {
  const [length,setLength] = useState(8)
  const [numberAllowed,SetNumberAllowed] = useState(false)
  const [characterAllowed,SetCharacterAllowed] = useState(false)
  const [Password, SetPassword] = useState("")

  // useRef
  const passwordRef = useRef()

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "12345678"
    if(characterAllowed) str += "!@#$%&*(){}_-+="
    for(let i=1; i <=length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    SetPassword(pass)
  } , [length,numberAllowed,characterAllowed,SetPassword])


  const copyPasswordToClipboard = ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(Password)
  }


  useEffect(()=>{
    PasswordGenerator()
  },[length,numberAllowed,characterAllowed,PasswordGenerator])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
         type="text"
         value={Password}
         className="outline-none w-full py-1 px-3"
         placeholder="password"
         readOnly 
         ref={passwordRef}
         /> 
         <button
         onClick={copyPasswordToClipboard}
        className="bg-red-500  px-2 shrink-0 text-white">copy</button>
      </div>
      <div className="flex text-sm gap-x-2"> 
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          min={6}
          max ={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
          /> 
          <label>length:{length}</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked= {numberAllowed}
          id = "numberInput"
          onChange={()=>{
            SetNumberAllowed((prev)=> !prev)
          }}
          />
          <label>number:{numberAllowed}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked= {characterAllowed}
          id = "charInput"
          onChange={()=>{
            SetCharacterAllowed((prev)=> !prev)
          }}
          />
          <label>character:{SetCharacterAllowed}</label>
        </div>

      </div>

    </div>
    </>
      
    
  );
}

export default App;