import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <h1>Perfil y URLs Personalizadas</h1>
                    <ul>
                        <li>
                            <Link href="/registro">Registro</Link>
                        </li>
                        <li>
                            <Link href="/usuarios">Lista de Usuarios</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>© 2024 - Proyecto de Luis</p>
            </footer>
        </div>
    );
};

export default Layout;
