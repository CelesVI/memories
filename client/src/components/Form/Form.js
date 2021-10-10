import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';

//GET the current id

const Form = ({ currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);
    
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(currentId) {
            dispatch(updatePost(currentId, postData));    
        }else{
            dispatch(createPost(postData));  
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(' ,') })}/>
            <div className={classes.fileInput}>
                <FileBase>
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({... postData, selectedFile: base64})}
                </FileBase>
            </div>
            <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullwidth>Submit</Button>
            <Button variant="container" color="secondary" size="small" onClick={clear} fullwidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;