import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/home.css";
import "@/styles/reservation.css";
import "@/styles/menu.css";
import "@/styles/login.css";
import "@/styles/admin.css";
import "@/styles/itensForm.css";
import "@/styles/reservasPage.css";
import type { AppProps } from "next/app";
import NavbarTop from "./components/navbarTop";
import { Container } from "react-bootstrap";
import NavbarBottom from './components/navbarBottom';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavbarTop></NavbarTop>
        <Container className='custom-container' fluid>
          <Component {...pageProps} />
        </Container>
      <NavbarBottom></NavbarBottom>
    </div>
  )
}
