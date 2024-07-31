import Link from "next/link"
import Image from "next/image"

const getBests = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/bests`, { cache: "no-store" })
    const jsonData = await response.json()
    const bests = jsonData.bests
    return bests
}

const Bests = async () => {
    const bests = await getBests()
    if (bests.length < 1) {
        return (
            <div>
                <h1 className="page-title">人気の投稿</h1>
                <div className="basic-font">
                    人気の投稿がありません。
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="page-title">人気の投稿</h1>
                <div className="grid-container-in">
                    {bests.map(item =>
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

export default Bests
