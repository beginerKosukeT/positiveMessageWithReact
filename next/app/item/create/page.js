"use client"
import { useState } from "react"
import useAuth from "../../utils/useAuth"
import ImgInput from "../../components/imgInput"
import { useRouter } from "next/navigation"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("")
    const router = useRouter()
    const loginUser = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        title: title,
                        author: loginUser.name,
                        image: image,
                        message: message,
                        email: loginUser.email
                    })
                })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
        } catch (err) {
            alert("新規投稿失敗")
        }
    }
    if (loginUser.email != "") {
        return (
            <div>
                <h1 className="page-title">新規投稿</h1>
                <ImgInput setImage={setImage} />
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={15} placeholder="本文" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem