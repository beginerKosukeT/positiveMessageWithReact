"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import checkLoginUser from "../../../utils/checkLoginUser"
import { useRouter } from "next/navigation"

const ReadSingleItem = (context) => {
    const [singleItem, setSingleItem] = useState({})
    const [load, setLoad] = useState(false)
    const [iliked, setIliked] = useState(false)
    const [allLikeCount, setAllLikeCount] = useState(0)
    const [speaking, setSpeaking] = useState(false)
    const [userId, setUserId] = useState("")//投稿者のUserId
    const [loginUser, setLoginUser] = useState({
        _id: "",
        name: "",
        email: "",
        icon: ""
    })
    const router = useRouter()
    // 読み上げ
    const speak = (message, speaking) => {
        if (speaking) {
            setSpeaking(false)
            speechSynthesis.pause()
        } else {
            if (speechSynthesis.paused) {
                setSpeaking(true)
                speechSynthesis.resume()
            } else {
                setSpeaking(true)
                const uttr = new SpeechSynthesisUtterance(message);
                uttr.lang = 'ja-JP';
                uttr.rate = 1.1;
                uttr.pitch = 0.9;
                speechSynthesis.speak(uttr);
                uttr.addEventListener("end", (event) => {
                    setSpeaking(false)
                });
            }
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const loginUser = await checkLoginUser()
            setLoginUser({
                _id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email,
                icon: loginUser.icon
            })
        }

        const getSingleItem = async (id) => {
            //投稿の詳細を取得
            const itemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" })
            const itemJsonData = await itemResponse.json()
            const singleItem = itemJsonData.singleItem
            setSingleItem(singleItem)
            try {
                //投稿作者のUserUD取得
                const userIdResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: singleItem.email,
                    })
                })
                const userIdJsonData = await userIdResponse.json()
                setUserId(userIdJsonData.userId)
                //ログインユーザー取得
                const lu = await checkLoginUser()
                //likesテーブルのお気に入り登録状況確認
                const likeResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/like`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: lu.email,
                        itemId: id,
                    })
                })
                const likeJsonData = await likeResponse.json()
                if (likeJsonData.myLikeCount > 0) { setIliked(true) }
                setAllLikeCount(likeJsonData.allLikeCount)
                setLoad(true)
            } catch (error) {
                router.push("/user/login")
            }
        }

        checkToken()
        getSingleItem(context.params.id)
    }, [context])

    // itemsテーブルのlikeNumber更新
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loginUser._id === "") {
            router.push("/user/login")
            alert("ログインが必要です。")
        }else{
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/like`, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        like: {
                            email: loginUser.email,
                            itemId: context.params.id,
                        },
                        iliked: iliked,
                    })
                })
                const jsonData = await response.json()
                alert(jsonData.message)
                if (jsonData.success) {
                    setIliked(!iliked)
                }
                setAllLikeCount(jsonData.likeCountRevised)
            } catch (err) {
                alert("お気に入り登録の更新失敗")
            }
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
                    <div className="display-flex align-items-center">
                        <h3>
                            <Link href={`/item/author/${userId}`}>
                                {singleItem.author}
                            </Link>
                        </h3>
                        <div className="margin-left-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="display-flex align-items-center">
                                    <Image src={speaking ? "/utils/pause-fill.svg" : "/utils/play-fill.svg"} width={30} height={30} className="margin-right"
                                        onClick={() => speak(singleItem.message, speaking)} alt="item-image" priority />
                                    <button className="display-flex align-items-center">
                                        <Image src={iliked ? "/utils/hand-thumbs-up-fill.svg" : "/utils/hand-thumbs-up.svg"}
                                            width={20} height={20} alt="like" priority />
                                        <div>{allLikeCount}</div>
                                    </button>
                                </div>
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
        return <h1 className="margin-top">Loading...</h1>
    }
}

export default ReadSingleItem