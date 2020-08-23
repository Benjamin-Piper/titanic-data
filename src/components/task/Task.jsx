import React, { Component } from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

import ExampleTable from "./ExampleTable";

// import data from "../../data";

// Use the following url to access the data
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000
// HINT: You should use "fetch".
// If you have trouble with this, you can access a subset of the data through the uncommenting import "data" file above
// console.log(data);

// To find out about the fields inside the data, you can have a look at the data dictionary in the data description
// on Kaggle here
//  https://www.kaggle.com/c/titanic/data

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
                { /* Replace this example table with your solution below. 
                You are more than welcome to organise your code into different files where appropriate. */}
                <ExampleTable />
            </div>
        );
    }
};

export default Task;

