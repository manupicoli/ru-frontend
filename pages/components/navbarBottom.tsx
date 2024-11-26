import { Navbar } from "react-bootstrap";
import { SocialIcon } from 'react-social-icons'

function NavbarBottom() {
    return (
        <Navbar className="custom-navbar" fixed="bottom">
            <span>Acompanhe nosso Instagram:</span>
            <SocialIcon 
            url="https://www.instagram.com/nutricao.upf?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            style={{ height: 25 }}
            />
        </Navbar>
    );
}

export default NavbarBottom;