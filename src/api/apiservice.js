import axios from 'axios';

//get questions from url
export function getdata(url)
{
    return axios.get(url);
}