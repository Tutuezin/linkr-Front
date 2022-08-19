import { useState, useEffect } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';
import styled from "styled-components"


export default function NewPost({posts, setPosts, localToken, imageProfile,getTrendingData}) {
    const [url, setUrl] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    async function addNewPost() {   
        setLoading(true)

        let body = {
            url: url,
            comment: comment
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        }

        const promise = axios.post("http://localhost:4000/newpost", body, config);
        promise
        .then(res =>{
            setLoading(false)
            setUrl("");
            setComment("")
            updatePosts();
            getTrendingData();
        })
        .catch(err => {
            setLoading(false)
            console.log(err);
            alert("Houve erro ao publicar o seu link")
        })
        
    }

    function updatePosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        }
        const promise = axios.get("http://localhost:4000/getposts", config)
        promise
        .then(res =>{
            setPosts(res.data)
            setLoading(false);
           
           
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            setLoading(false);
        })
    }

    return (
        <>
        <NewPostBody>
            <img src={imageProfile} />
           <InputNewPost>
                <Title>
                    <h2> What are you going to share today?</h2>
                </Title>
                {(loading === false) && (<InputsView>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://.." />
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Awesome article about #javascript" />
                    <Hability type='submit' onClick={addNewPost}> Publish</Hability>
                </InputsView>)}
                {(loading === true) && (<InputsView>
                    <input disabled type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://.." />
                    <input disabled type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Awesome article about #javascript" />
                    <Desability color={'#000000'} opacity={0.7} disabled> Publishing...</Desability>
                </InputsView>)}
                
           </InputNewPost> 
        </NewPostBody>
        </>
    )
}


const NewPostBody = styled.div`

padding: 20px;
width: 60%;
height: 30vh;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
display: flex;
margin-bottom: 30px;
    img{
    width: 50px;
    height: 50px;
    left: 433px;
    border-radius: 26.5px;
}
`

const InputNewPost = styled.div`
width: 100%;
margin-left:20px;

    input {
    padding:10px;
    width: 100%;
    height: 30px;
    left: 501px;
    top: 313px;
    background: #EFEFEF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    margin-top: 5px;
}
`

const InputsView = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Title = styled.div` 
width: 100%;
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 20px;
line-height: 24px;
color: #707070;

`

const Hability = styled.button`
        width: 30%;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        margin-top: 5px;
`
const Desability = styled.button`
        width: 30%;
        height: 31px;
        background: gray;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        margin-top: 5px;
`