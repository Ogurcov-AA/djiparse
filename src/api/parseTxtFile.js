import axios from "axios";
import axiosConfig from './axiosConfig.json'

export function parseTxtFile(file) {
    return axios.post(axiosConfig.parse.parseTxt,  {
        file: file
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}