import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

import retrievePassengers from './PaidPassengers.js';
import Filter from './Filter';

const tableStyling = {
    height: '500px',
    overflowY: 'scroll'
}

class PaidPassengerTable extends React.Component {
    constructor(props) {
        super(props);

        this.updateTableWith = this.updateTableWith.bind(this);
        // Keep async data here.
        this.state = {
            headings: [],
            rows: [["Loading. . ."]]
        }
    }
    
    // This function will tell render() to update when the promise is fulfilled.
    componentDidMount() {
        retrievePassengers().then(passengers => {
            const passengerHeadings = Array.from(passengers[0].keys());
            this.setState({headings: passengerHeadings});

            const passengerRows = [];
            passengers.forEach(passenger => {
                const row = Array.from(passenger.values());
                passengerRows.push(row);
            });
            this.setState({rows: passengerRows});
        });
    }

    // Filter componenet will call this.
    updateTableWith(filteredRows) {
        this.setState({rows: filteredRows});
    }

    render() {
        return (
            <Card style={tableStyling}>
                <CardContent>
                    <Typography style={{marginBottom: '20px'}}>List of paid passengers abroad the RMS Titanic</Typography>
                    <Filter name="survived" updateTableWith ={this.updateTableWith} options={["Yes","No"]} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.headings.map((heading,index) => <TableCell key={`heading_${index}`}>{heading}</TableCell>)}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                        {
                            this.state.rows.map((row, index) => {
                                const indexIsOdd = index % 2 === 1;
                                let background = {};

                                if (indexIsOdd) {
                                    background = {backgroundColor: "#f2f2f2"}; // grey
                                } else {
                                    background = {backgroundColor: "#ffffff"}; // white
                                }
                                return (
                                    <TableRow key={`row_${index}`} style={background}>
                                        {row.map((value, index) => <TableCell key={`cell_${index}`}>{value}</TableCell>)}
                                    </TableRow>
                                )     
                            })
                        }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

export default PaidPassengerTable;