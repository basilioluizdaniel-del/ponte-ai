import './styles.css';
export const metadata={title:'PONTE.AI | Ponte Nova',description:'Empresas, profissionais e orçamentos de Ponte Nova em um só lugar.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><header><a className="brand" href="/">PONTE<span>.AI</span></a><nav><a href="/empresas">Empresas</a><a href="/orcamento">Pedir orçamento</a></nav></header>{children}<footer>© 2026 PONTE.AI • Feito para Ponte Nova, MG</footer></body></html>}
