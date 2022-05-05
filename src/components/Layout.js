import { getItemFromLocalStorage } from '../SecureLS';
import Navbar from './Navbar';

function Layout({children}) {
    const token = getItemFromLocalStorage("AuthId")
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