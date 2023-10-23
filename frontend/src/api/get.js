import axios from "axios";

const apiURL = "api";

async function GetResponse(apiName, params=[]) {
    const apiInput = params.join('/');
    const response = await axios.get(`${apiURL}/${apiName}/${apiInput}`);
    return response;
}

async function GetData(apiName, params=[]) {
    const response = await GetResponse(apiName, params);
    return response.data;
}

async function SetData(apiName, params) {
    const response = await GetResponse(apiName, params);
    return response
}

async function GetSynonyms(word) {
    const {data} = await GetResponse('get-synonyms', [word]);
    const uniqueSynonyms = [...new Set(data.map((synonym) => synonym.chars))];
    return uniqueSynonyms.sort();
}

async function HasWord(word) {
    const {data} = await GetResponse('get-word', [word]);
    return data.length > 0;
}

export {GetData, SetData, HasWord, GetSynonyms};
