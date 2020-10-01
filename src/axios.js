import axios from "axios"

const instance=axios.create({
    baseURL:"http://localhost:5001/clone-3b84b/us-central1/api"   //API URL(cloud functions)
});
export default instance;