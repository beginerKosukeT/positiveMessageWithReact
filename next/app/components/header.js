"use client"
import * as React from 'react';
import Image from "next/image"
import Link from "next/link"
import Menu from "./menu"

const Header = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <header>
            <Menu open={open} setOpen={setOpen}/>
            <Image src="/utils/list.svg" width={50} height={50} alt="header-image" onClick={toggleDrawer(true)} className='menu-position' priority />
            <Link href="/">
                <Image src="/logo.jpeg" width={2880} height={847} alt="header-image" className='logo-position' priority />
            </Link>
        </header>
    )
}

export default Header
