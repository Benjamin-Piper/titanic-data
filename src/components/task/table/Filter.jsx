import React from "react";
import retrievePassengers from './PaidPassengers.js'
import { fetchRequest, process } from './PaidPassengers.js'

const Filter = function(props) {

    const filteredPassengers = [];

    // Step 1: Decide what needs changing.
    function changeFilterTo(option) {
        props.updateTableWith([["Loading. . ."]]);

        if (option === "All") {
            // Fetch as normal.
            retrievePassengers().then(data => {
                data.forEach(passenger => {
                    filteredPassengers.push(Array.from(passenger.values()));
                });
                props.updateTableWith(filteredPassengers);
            });
        } else {
            // Go through custom filtering.
            fetchRequest().then(data => {
                data.records.forEach(record => filterThrough(record.fields, option));
                props.updateTableWith(filteredPassengers);
            });
        }
    }

    // Step 2: Go and change it.
    function filterThrough(passenger, option) {
        const passengerPassesFilter = passenger[props.name] === option;

        if (passengerPassesFilter) {
            const newFilteredPassenger = process(passenger);

            // process(passenger) returns null if passenger has not paid.
            if (newFilteredPassenger !== null) {
                filteredPassengers.push(Array.from(newFilteredPassenger.values()));
            }
        }
    }

    return (
        <div className="MuiTypography-root MuiTypography-body1">
            <label>Filter by {props.name}: </label>
            <select onChange={event => changeFilterTo(event.target.value)}>
                <option key="option_0" value="All">All</option>
                {props.options.map((option, index) => <option key={`option_${index+1}`} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default Filter;