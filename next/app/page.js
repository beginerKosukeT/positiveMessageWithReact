import Link from "next/link"
import Image from "next/image"

const getAllItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, { cache: "no-store" })
    const jsonData = await response.json()
    const allItems = jsonData.allItems
    return allItems
}

const ReadAllItems = async () => {
    const allItems = await getAllItems()
    if (allItems.length == 0) {
        return (
            <div>
                <h1 className="page-title">新作</h1>
                <div className="basic-font">
                    投稿がありません。
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="page-title">新作</h1>
                <div className="grid-container-in">
                    {allItems.map(item =>
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
}

export default ReadAllItems
