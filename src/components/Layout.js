import Navbar from './Navbar';

function Layout({children}) {
    const token = localStorage.getItem("AuthId")
    return(
        <>
        {token?
        <Navbar />:<></>
    }   
    {children}
        </>
    )
}

export default Layout;