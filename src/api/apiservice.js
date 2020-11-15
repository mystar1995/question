import axios from 'axios';

export function getdata(url)
{
    return axios.get(url);
}