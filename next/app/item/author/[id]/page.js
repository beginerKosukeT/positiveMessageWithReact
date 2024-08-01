import Link from "next/link"
import Image from "next/image"

const getAuthorsItems = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/author/${id}`, { cache: "no-store" })
    const jsonData = await response.json()
    return jsonData
}

const ReadAllItems = async (context) => {
    const jsonData = await getAuthorsItems(context.params.id)

    if (jsonData.author) {
        return (
            <div>
                <h1 className="page-title">{jsonData.author.name}の投稿</h1>
                <div className="basic-font">
                    投稿がありません。
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="page-title">{jsonData.authorsItems[0].author}の投稿</h1>
                <div className="grid-container-in">
                    {jsonData.authorsItems.map(item =>
                        <Link href={`/item/readsingle/${item._id}`} key={item._id} >
                            <div className="display-flex">
                                <Image src={item.image} width={100} height={100} alt="item-image" priority />
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
