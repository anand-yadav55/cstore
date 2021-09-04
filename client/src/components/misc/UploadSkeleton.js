import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Box,Button} from '@material-ui/core';
import axios from 'axios';

export default function UploadSkeleton(props){
    function deleteFile(e, fileId){
        axios.post(`/api/files/delete/${fileId}`).then((res)=>{
            console.log(res)
            
        })
    }
    function handleView(e,filename){
        console.log(filename)
        axios.get(`/image/${filename}`)    
    }
    return <Box 
        pt={4} 
        id={props.id}>
            {props.filename}
        <Button id={props.id} onClick={(e)=>{deleteFile(e,props.id)}} variant='contained' color='secondary'>
            <DeleteForeverIcon/>
        </Button>
        <button onClick={(e)=>handleView(e,props.id)}>View</button>
    </Box>
}