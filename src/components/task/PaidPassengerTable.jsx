import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

// https://www.smashingmagazine.com/2020/03/sortable-tables-react/
// sorting tables, also see clickable ting at the end



const ExampleTable = () => (
    <Card>
        <CardContent>
            <Typography>Example Table (how many cats and dogs we saw each day)</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                {tableHeadings.map((key, i) => <TableCell key={`heading_${i}`}>{key}</TableCell>)}
                    </TableRow>
                </TableHead>

                <TableBody>
                {
                    exampleData.map((data, ind) => <TableRow key={`exampleRow_${ind}`}>
                        {Object.values(data).map((d, i) => <TableCell key={`exampleCell_${i}`}>{d}</TableCell>)}
                        </TableRow>)
                }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default ExampleTable;
