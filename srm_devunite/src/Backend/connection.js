import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:3005",
    headers:{
        "Authorization":`Bearer ${'be5e408e-df04-4784-9afb-6ys84ye26d93fbd370'}`}
});