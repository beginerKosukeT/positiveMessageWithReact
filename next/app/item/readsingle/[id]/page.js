"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import useAuth from "../../../utils/useAuth"

const ReadSingleItem = (context) => {
    const [singleItem, setSingleItem] = useState({})
    const [load, setLoad] = useState(false)
    const [liked, setLiked] = useState(false)
    const loginUser = useAuth()

    useEffect(() => {
        const getSingleItem = async (id) => {
            //投稿の詳細を取得
            const itemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" })
            const itemJsonData = await itemResponse.json()
            const singleItem = itemJsonData.singleItem
            setSingleItem(singleItem)
            //お気に入り登録状況を確認
            const likeResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/checklike`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    like: {
                        email: loginUser.email,
                        itemId: context.params.id,
                    },
                    liked: liked,
                })
            })
            const likeJsonData = await likeResponse.json()
            const like = likeJsonData.like
            if (like.length !== 0) { setLiked(true) }
            setLoad(true)
        }
        getSingleItem(context.params.id)
    }, [context])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/like`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    like: {
                        email: loginUser.email,
                        itemId: context.params.id,
                    },
                    liked: liked,
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            if (jsonData.success) {
                setLiked(!liked)
            }
        } catch (err) {
            alert("お気に入り登録の更新失敗")
        }
    }

    if (load) {
        return (
            <div className="grid-container-si">
                <div>
                    <Image src={singleItem.image} width={500} height={500} alt="item-image" priority />
                </div>
                <div>
                    <h1>{singleItem.title}</h1>
                    <div className="display-flex align-items">
                        <h3>{singleItem.author}</h3>
                        <div className="margin-left-auto">
                            <form onSubmit={handleSubmit}>
                                <button>
                                    <Image src={liked ? "/utils/hand-thumbs-up-fill.svg" : "/utils/hand-thumbs-up.svg"} width={20} height={20} alt="like" priority />
                                </button>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <p>{singleItem.message}</p>
                    <div>
                        <Link href={`/item/update/${context.params.id}`}>アイテム編集</Link>
                        <Link href={`/item/delete/${context.params.id}`}>アイテム削除</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

export default ReadSingleItem