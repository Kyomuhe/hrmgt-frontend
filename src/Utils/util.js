import { toast } from "sonner";
import { ServerUrl } from "../config/config";
import axios from "axios";

export const showToast =(message, type) =>{
    switch(type){
        case 'success':
            return toast.success(message,{
                duration: 4000,
                style:{background: 'green', color: 'white'}
            });

        case 'error':
            return toast.error(message,{
                duration:4000,
                style: {background: 'red',color:'white'}
            });

        default:
            return toast(message);


    }
}

export const makeRequest =async (ACTION, SERVICE, data)=>{
    try{
        let url = ServerUrl
        const payload ={ACTION, SERVICE, ...data};
        console.log('request payload', JSON.stringify(payload));

        let config = {
            headers :{"content-Type": "application/json"}
        };

        const response = await axios.post(url, payload, config);
        return response.data;

    }catch(error){
    console.error("An error occured while making the request:",error);
    if(error.response){
        throw error.response.data || error;
    }else{
        throw new Error(error.message)
    }
    }
}