import { Box, CircularProgress } from "@mui/material";
import './LoadingComponent.css';
// import '../animations/styles/ComponentAnimations.css';


export default function LoadingComponent(props) {

    let className = "loading-component-circular ";
    if (props.className) className += props.className;
    let size = props.size ? props.size : 20;
    let thickness = props.thickness ? props.thickness : 2;

    let content = <div id="FadeInChildrenContainer" className={"fade-in-animation"}>
        {props.children}
    </div>;

    if (props.returnNativeChildren) content = props.children;

    // if(props.explicit) {
    //     return props.isLoading ? 
    // }

    return props.isLoading ? <Box id="CircularProgressContainer" sx={props.sx}>
        <CircularProgress className={className} size={size} thickness={thickness} style={props.style}/>
    </Box> : content;

}