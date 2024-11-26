import Link from "next/link";
import HomeCarousel from "./components/homeCarousel";

export default function Home() {
    return (
        <div>
            <main className="main-content">
                <section className="intro-section">
                    <h1>Bem-vindo ao Restaurante Universitário!</h1>
                    <p>Oferecendo refeições deliciosas para a comunidade da UPF.</p>
                </section>
                <HomeCarousel />
                <section className="menu-highlights">
                    <h2>Para fazer a sua reserva e conferir as novidades do menu</h2>
                    <h2>faça seu <Link href="/login" legacyBehavior><a className="highlight-link">login aqui</a></Link>!</h2> 
                    <p>Se ainda não tem uma conta, <Link href="/signup" legacyBehavior><a className="highlight-link">cadastre-se</a></Link>!</p>
                </section>
                <section className="working-hours">
                    <h3>Horários de Funcionamento</h3>
                    <p>Almoço: 11h30 - 14h00 | Janta: 18h30 - 20h00</p>
                </section>
            </main>
        </div>
    )
}
