import LoginUserer from "./components/loginUser"

const Template = ({ children }) => {
    return (<>
        <LoginUserer />
        {children}
    </>)
}

export default Template
