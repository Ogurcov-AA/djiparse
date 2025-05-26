import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const style = {
    overflow: 'auto',
    height: '100%',
    // width: '100%',
    border: '2px solid black',
    borderRadius: '1%',
    padding: '5px'

}

const DataTableView = (props) => {
    const [rows, setRows] = useState([])


    useEffect(() => {
        if(props.rows.length> 0) {
            setRows(props.rows)
            console.log(props.rows[500])
        }
    }, [props.rows]);


    function parseSecondToMinute(second) {
        return `${Math.floor(second / 60)}m ${+(second%60).toFixed(1)}s`
    }

    return (
        <div style={style}>
            <TableContainer component={Paper}>
                <Table sx={{ width:'100%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {parseSecondToMinute(row.osd.flyTime)}
                                </TableCell>

                                <TableCell align="right">{row.battery.chargeLevel}</TableCell>
                                <TableCell align="right">{row.battery.cellVoltageDeviation}</TableCell>
                                <TableCell align="right">{row.battery.temperature}</TableCell>
                                <TableCell align="right">{row.osd.flycState}</TableCell>
                                <TableCell align="right">{row.app.tip}</TableCell>
                                {/*<TableCell align="right">{row.osd.height}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTableView;