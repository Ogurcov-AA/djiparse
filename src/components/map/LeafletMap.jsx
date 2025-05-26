import React, {useEffect, useRef, useState} from 'react';

import {MapContainer, Polyline, Popup, TileLayer, useMap} from 'react-leaflet'
import './leaflet-styling/leaflet.css'
import * as L from "leaflet";
import {IconButton, MobileStepper, Slider} from "@mui/material";
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import {Marker} from '@adamscybot/react-leaflet-component-marker'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import LoadingComponent from "../loadingComponent/LoadingComponent";

const limeOptions = {color: 'darkgreen'}

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
//     iconUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
//     shadowUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
// });

const LeafletMap = (props) => {
    const [position, setPosition] = useState(null)
    const [homePosition, setHomePosition] = useState(null)
    const [line, setLine] = useState([])
    const [linePosition, setLinePosition] = useState(0)
    const [isPlayVideo, setIsPlayVideo] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    let playerInterval = useRef()

    useEffect(() => {
        setHomePosition([props.firstFrame.home.latitude, props.firstFrame.home.longitude])
        setPosition([props.firstFrame.home.latitude, props.firstFrame.home.longitude])
    }, [props.firstFrame]);

    useEffect(() => {
        if(homePosition && position)
            setIsLoading(false)

    }, [position, homePosition]);

    useEffect(() => {
        if (props.rows) {
            const lineCord = props.rows.map(item => {
                return [item.osd.latitude, item.osd.longitude]
            })

            setLine(lineCord.filter(item => {
                if (item[0] !== 0 && item[1] !== 0)
                    return item
            }))

        }
    }, [props.rows]);

    useEffect(() => {
        // movePoint()
    }, [line]);

    function movePoint(startIndex) {
        let index = startIndex
        setIsPlayVideo(true)
        playerInterval.current = setInterval(() => {
            if (line.length > index) {
                setPosition(line[index])
                setLinePosition(index)
                // props.onChangePositionLine(index)
                index++
            } else {
                handleStop()
            }
        }, 100)
    }

    function handlePlay() {
        movePoint(linePosition)
    }

    function handleStop() {
        clearInterval(playerInterval.current)
        setIsPlayVideo(false)
    }

    function changePosition(e) {
        handleStop()
        setPosition(line[e.target.value])
        setLinePosition(e.target.value)
    }

    return (
        <LoadingComponent isLoading={isLoading} returnNativeChildren size={100}>
            <MapContainer attributionControl={false} center={position} zoom={15} scrollWheelZoom={true}
                          style={{minWidth: '500px', minHeight: '300px'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {line.length > 0 &&
                    <Polyline pathOptions={limeOptions} positions={line}/>
                }
                <Marker position={homePosition}
                        icon={<HomeIcon sx={{color: 'green', width: '30px', height: '30px'}}/>}
                >

                </Marker>
                <Marker position={position} icon={<PlaceRoundedIcon sx={{color: 'blue'}}/>}>
                </Marker>
            </MapContainer>
            <div style={{display: 'flex', alignItems: 'center'}}>

                {!isPlayVideo ?
                    <IconButton aria-label="play" onClick={handlePlay}>
                        <PlayCircleFilledWhiteRoundedIcon fontSize="inherit"/>
                    </IconButton>
                    :
                    <IconButton aria-label="play" onClick={handleStop}>
                        <StopCircleRoundedIcon fontSize="inherit"/>
                    </IconButton>

                }


                <Slider aria-label="Volume" value={linePosition} max={line.length - 1} onChange={changePosition}/>
            </div>
        </LoadingComponent>
    );
};

export default LeafletMap;