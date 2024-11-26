import { Tab, Tabs } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function NavbarTop() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [activeKey, setActiveKey] = useState("home");
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        setIsAdmin(false);
        setIsLogged(false);

        console.log("Logged out");
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token) {
            setIsLogged(true);
        }
        if (role === "admin") {
            setIsAdmin(true);
        }
    }, []);

    useEffect(() => {
        if (router.pathname === "/") {
            setActiveKey("home");
        } else if (router.pathname === "/reservas") {
            setActiveKey("reservation");
        } else if (router.pathname === "/login") {
            setActiveKey("login");
        } else if (router.pathname === "/signup") {
            setActiveKey("signup");
        } else if (router.pathname === "/admin") {
            setActiveKey("admin");
        } else if (router.pathname === "/profile") {
            setActiveKey("profile");
        }
    }, [router.pathname]);

    return (
        <Tabs activeKey={activeKey} 
            onSelect={(k) => setActiveKey(k!)} 
            transition={false} 
            className="custom-navbar" >
            <Tab eventKey="home" title={
                <Link href="/" passHref legacyBehavior>
                    Home
                </Link>
            }>
            </Tab>
            {isLogged && <Tab eventKey="reservation" title={
                <Link href="/reservas" passHref legacyBehavior>
                    Faça sua reserva
                </Link>
            }>
            </Tab>}
            {!isLogged && <Tab eventKey="login" title={
                <Link href="/login" passHref legacyBehavior>
                    Login
                </Link>
            }>
            </Tab>}
            {!isLogged && <Tab eventKey="signup" title={
                <Link href="/signup" passHref legacyBehavior>
                    Sign up
                </Link>
            }>
            </Tab>}
            {isAdmin && <Tab eventKey="admin" title={
                <Link href="/admin" passHref legacyBehavior>
                    Admin
                </Link>
            }>
            </Tab>}
            {/* {isLogged && !isAdmin && <Tab eventKey="profile" title={
                <Link href="/profile" passHref legacyBehavior>
                    Meu perfil
                </Link>
            }>
            </Tab>
            } */}
            {isLogged && <Tab eventKey="logout" title={
                <Link href="/login" onClick={handleLogout} passHref>
                    Logout
                </Link>
            }>
            </Tab>}
        </Tabs>
    );
}

export default NavbarTop;
