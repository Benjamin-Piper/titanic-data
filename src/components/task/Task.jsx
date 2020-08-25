import React, { Component } from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import Graph from "./Graph";
import PaidPassengerTable from "./table/PaidPassengerTable"

class Task extends Component {

    render() {
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>
                            <b>Fetch the following URL in the comments to access the data. </b>
                        </Typography>

                        <Typography>
                            If you have trouble with doing this, you can access some data through by importing the "data".
                        </Typography>

                        <Typography>
                            An example table with some random data has been provided.
                            Replace the example table with your solution below.
                        </Typography>
                    </CardContent>
                </Card>

                {/* My submitted task */}
                <PaidPassengerTable />
                <div style={{marginTop: '50px'}}>
                    <Typography style={ {textAlign: 'center'} }>Where did they all board from?</Typography>
                    <Graph />
                </div>
            </div>
        );
    }
};

export default Task;

