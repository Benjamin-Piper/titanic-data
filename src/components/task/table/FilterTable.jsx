import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

import retrievePassengers from './PaidPassengers.js'

const tableStyling = {
    height: '520px',
    overflowY: 'scroll'
}

class PaidPassengerTable extends React.Component {
    constructor(props) {
        super(props);
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
            passengers.forEach((passenger,index) => {
                const row = Array.from(passenger.values());
                passengerRows.push(row);
            });
            this.setState({rows: passengerRows});
        });
    }

    render() {
        return (
            <Card style={tableStyling}>
                <CardContent>
                    <Typography>List of paid passengers abroad the RMS Titanic</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.headings.map((heading,index) => <TableCell key={`heading_${index}`}>{heading}</TableCell>)}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                        {
                            this.state.rows.map((row, index) => {
                                let background = {};
                                if (index % 2 == 1) {
                                    background = {backgroundColor: '#F2F2F2'}; // odd = light grey
                                } else {
                                    background = {backgroundColor: '#FFFFFF'} // even = white
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