"use client"
import { useState, useEffect } from "react" 
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [load, setLoad] = useState(false) 

    const loginUser = useAuth() 

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"}) 
            const jsonData = await response.json() 
            const singleItem = jsonData.singleItem     
            setTitle(singleItem.title)
            setAuthor(singleItem.author)
            setImage(singleItem.image)
            setMessage(singleItem.message)
            setEmail(singleItem.email)
            setLoad(true)  
        }
        getSingleItem(context.params.id) 
    }, [context])

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, { 
                method: "PUT",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    image: image,
                    message: message,
                    email: loginUser.email 
                })
            })
            const jsonData = await response.json()  
            alert(jsonData.message)           
        }catch(err){
            alert("アイテム編集失敗")  
        }
    } 

    if(load){ 
        if(loginUser.email === email){
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required/>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="作者" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={15} placeholder="本文" required></textarea>
                    <button>保存</button>
                </form>
            </div>
        )
        }else{                               
            return <h1>権限がありません</h1>    
        }   
    }else{                                  
        return <h1>Loading...</h1>          
    }     
}

export default UpdateItem