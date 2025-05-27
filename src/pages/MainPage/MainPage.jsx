import React, {useState} from 'react';
import {Button, Input} from "@mui/material";
import './mainPage.css'
import {parseTxtFile} from "../../api/parseTxtFile";
import DataTableView from "../../components/table/DataTableView";
import LeafletMap from "../../components/map/LeafletMap";
import { DJILog } from "dji-log-parser-js";
import axios from "axios";


const MainPage = () => {
    const [file, setFile] = useState()
    const [rows, setRows] = useState([])
    const [position, setPosition] = useState(0)

    function handleClickToLoadReport() {
        if(file[0]) {
            parseTxtFile(file[0]).then(res => {
                setRows(
                    res.data
                        // .filter(item => {
                    // if(item.osd.longitude !== 0 && item.osd.latitude !== 0)
                    //     return item
                // })
        )
            })
        }
    }

    function handleChangeLinePosition(value){
        setPosition(value)
    }

    function handleParseFile(file) {

        parseTxtFile(file[0]).then(res => {
            setRows(res.data)
        })

    }



    return (
        <div className={'main-page-wrapper'}>
        <div className={'load-file'}>
            <Input type={'file'} onChange={(e) => setFile(e.target.files)}></Input>
            <Button onClick={() => handleParseFile(file)} variant={'contained'}>Загрузить отчет</Button>
        </div>
            <iframe src="https://embed.windy.com/embed2.html?lat=55.75&lon=37.61&detailLat=55.75&detailLon=37.61&width=650&height=450&zoom=5" width="650" height="450"></iframe>
            {rows.length > 0 &&
                <div style={{display: 'flex', flexDirection: 'column', flex:1, borderRadius: '10px', gap:'10px'}}>
                    <div style={{display: 'block', height: '50%', width: '100%'}}>
                        <LeafletMap firstFrame={rows[1232]} rows={rows} onChangePositionLine={handleChangeLinePosition}/>
                    </div>
                <DataTableView rows={rows} linePosition={position}/>
                </div>
            }

        </div>
    );
};

export default MainPage;