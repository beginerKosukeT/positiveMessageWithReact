import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"
import LoginUser from "./components/loginUser"

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Header />
                <LoginUser />
                {children}
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout
