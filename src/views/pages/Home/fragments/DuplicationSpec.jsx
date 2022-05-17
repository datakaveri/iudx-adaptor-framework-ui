import React from "react";

export default function DuplicationSpec(){
    return(
        <div className="app">
        <h1 className='Title'>Duplicate Specs</h1>
        <hr/>
        <label htmlFor="dupDropDown">
            Type </label>
            <br />
            <select id="dupDropDown">
            <option value="TimeBased">Time Based</option>
            <option value="ExtraKeyBased">Extra Key Based</option>
            </select>
       
        </div>
    )
}