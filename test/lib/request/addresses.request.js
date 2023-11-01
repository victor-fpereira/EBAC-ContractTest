import 'dotenv/config';
import axios from 'axios';
import data from '../data/payload-address.json';

export const addressList = async () => {
    return await axios.post(`${process.env.BASE_URL}:${process.env.PORT}/graphql`, data, {
        headers: {
            Authorization: `${process.env.ADDRESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })
};
    
