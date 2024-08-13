"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"


const SearchItems = () => {
    const [keyword, setKeyword] = useState("")
    const [foundItems, setFoundItems] = useState([])

    const getFoundItems = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/search`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword: keyword
                })
            })

        const jsonData = await response.json()
        const foundItems = jsonData.foundItems
        setFoundItems(foundItems)
    }

    return (
        <div>
            <h1 className="page-title">検索</h1>
            <form onSubmit={getFoundItems}>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" name="keyword" placeholder="キーワード" required />
                <button className={foundItems.length === 0 ? "" : "margin-bottom"}>検索</button>
            </form>
            <div className="grid-container-in">
                {foundItems.map(item =>
                    <Link href={`/item/readsingle/${item._id}`} key={item._id} >
                        <div className="display-flex">
                            <Image src={item.image} width={750} height={500} alt="item-image" priority />
                            <div>
                                <h2>{item.title}</h2>
                                <h3>{item.author}</h3>
                                <p>{item.message.substring(0, 10)}...</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default SearchItems
