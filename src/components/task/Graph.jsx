import React, { PureComponent } from 'react';

import {fetchRequest} from './table/PaidPassengers.js'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const indexIncrementer = new Map([ ["C", 0], ["Q", 1], ["S", 2]])
// Helper: return the corresponding index of the location so that
//         data can be incremented
function readLocationOf(passenger) {
    const passengerHasPaid = passenger.fare > 0;
    if (passengerHasPaid) {
        return indexIncrementer.get(passenger.embarked);
    }
}


export default class Graph extends PureComponent {

    constructor(props) {
        super(props);

        this.xAxis = "name";
        this.barData = "amount";
        // Keep async data here.
        this.state = {data: []};
    }

    // This function will tell render() to update when the promise is fulfilled.
    componentDidMount() {
        const locations = ["Cherboug", "Queenstown", "Southampton"];
        const locationData = [0, 0, 0];
        const graphData = [];

        fetchRequest().then(data => {
            // Step 1: Get the statistics.
            data.records.forEach(record => {
                const index = readLocationOf(record.fields);
                locationData[index]++;
            });

            // Step 2: Format the stastics.
            locationData.forEach((location,index) => {
                const bar = {};
                bar[this.xAxis] = locations[index];
                bar[this.barData] = locationData[index];
                graphData.push(bar);
            })

            // Step 3: Render the statistics.
            this.setState({data: graphData});
        });
    }

    render() {
        return (
            <BarChart
            width={500}
            height={300}
            data={this.state.data}
            style={{margin: 'auto'}}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={this.xAxis} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={this.barData} fill="#8884d8" />
                
            </BarChart>
        );
    }
}