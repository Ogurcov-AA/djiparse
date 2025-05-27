import React, {useState} from 'react';
import {Button, Input} from "@mui/material";
import './mainPage.css'
import {parseTxtFile} from "../../api/parseTxtFile";
import DataTableView from "../../components/table/DataTableView";
import LeafletMap from "../../components/map/LeafletMap";
import { DJILog } from "dji-log-parser-js";


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
        if (file[0]) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const bytes = new Uint8Array(e.target.result);
                const parser = new DJILog(bytes);

                try {
                    // console.log(parser.keychainsRequestWithCustomParams(4,4))
                    // let ke = parser.keychainsRequest()
                    const keychains = await parser.fetchKeychains("5d066664b1391cef6fc17067b444ee4");
                    // console.log(parser.keychainsRequest().keychainsArray)
                    console.log(parser.frames(keychains))
                }
                catch(e) {
                    console.log(e)
                }

                // const frames = parser.frames();
                // console.log(frames)
            };
            reader.readAsArrayBuffer(file[0]);
        }
    }



    return (
        <div className={'main-page-wrapper'}>
        <div className={'load-file'}>
            <Input type={'file'} onChange={(e) => setFile(e.target.files)}></Input>
            <Button onClick={() => handleParseFile(file)} variant={'contained'}>Загрузить отчет</Button>
        </div>
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