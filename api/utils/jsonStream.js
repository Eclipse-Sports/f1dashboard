import axios from "axios";
import fs from "fs";


async function inputJsonStream(url, zipped = false) {
    axios.get(url).then(response => {
        console.warn(response);
        return response.data;
    })
    .then(rb => {
        var streamData = rb.getReader();
    });
}

export {inputJsonStream};