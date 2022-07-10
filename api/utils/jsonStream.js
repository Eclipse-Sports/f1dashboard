import axios from "axios";

async function inputJsonStream(url) {
    axios.fetch(url).then(response => {
        var streamReader = response.body.getReader();
        var chunks = [];
        var done = fals
        e;
        while (!done) {
            ({value, done}) = await streamReader.read();
            if (done) {
                return chunks;
            }
            chunks.push(value);
        }
    });
}

export {inputJsonStream};