import 'dotenv/config';
import axios from 'axios';
import data from '../../lib/data/payload-user.json';

export const userList = async () => {
    return await axios.post(`${process.env.BASE_URL}:${process.env.PORT}/graphql`, data, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4Njk4MzI1LCJleHAiOjE2OTg4NzExMjV9.bKD0vRYhUCCOlleczKjgrl1EXPqvQ4ZyHmEOkUJaR34',
            'Content-Type': 'application/json',
        }
    })
};
    
