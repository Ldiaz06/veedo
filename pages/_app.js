import Layout from '../components/Layout';
//import '../styles/globals.css'; // Aqu� puedes agregar tus estilos globales

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;