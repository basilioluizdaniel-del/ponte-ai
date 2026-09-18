// PONTE.AI — página conectada ao Supabase
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '../../lib/supabase';

type Empresa = {
  id: number;
  nome: string;
  categoria: string;
  bairro: string | null;
  whatsapp: string;
  descricao: string | null;
  plano: string;
  ativo: boolean;
};

export default function Empresas() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarEmpresas() {
      setLoading(true);
      setErro('');

      const supabase = createClient();
      const { data, error } = await supabase
        .from('empresas')
        .select('id,nome,categoria,bairro,whatsapp,descricao,plano,ativo')
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      if (error) {
        setErro(error.message);
        setEmpresas([]);
      } else {
        setEmpresas((data || []) as Empresa[]);
      }

      setLoading(false);
    }

    carregarEmpresas();
  }, []);

  const empresasFiltradas = useMemo(() => {
    if (!query) return empresas;

    return empresas.filter((empresa) =>
      [empresa.nome, empresa.categoria, empresa.bairro || '', empresa.descricao || '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [empresas, query]);

  function whatsappUrl(numero: string) {
    const digits = numero.replace(/\D/g, '');
    const finalNumber = digits.startsWith('55') ? digits : `55${digits}`;
    return `https://wa.me/${finalNumber}`;
  }

  return (
    <main>
      <section>
        <div className="pill">NEGÓCIOS LOCAIS</div>
        <h1>Empresas e profissionais</h1>
        <p>Descubra serviços locais e fale diretamente pelo WhatsApp.</p>

        {query && (
          <p>
            Resultados para: <strong>{searchParams.get('q')}</strong>
          </p>
        )}

        {loading && <p>Carregando empresas...</p>}

        {erro && (
          <p role="alert">
            Não foi possível carregar as empresas: {erro}
          </p>
        )}

        {!loading && !erro && empresasFiltradas.length === 0 && (
          <p>Nenhuma empresa encontrada para esta busca.</p>
        )}

        <div className="list">
          {empresasFiltradas.map((empresa) => (
            <article className="business" key={empresa.id}>
              <div>
                <h3>{empresa.nome}</h3>
                <p>
                  {empresa.categoria}
                  {empresa.bairro ? ` • ${empresa.bairro}` : ''}
                </p>
                {empresa.descricao && <p>{empresa.descricao}</p>}
              </div>

              <a
                className="secondary"
                href={whatsappUrl(empresa.whatsapp)}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </article>
          ))}
        </div>

        <p className="note">
          Empresas cadastradas no PONTE.AI aparecem aqui automaticamente após serem
          aprovadas e marcadas como ativas.
        </p>
      </section>
    </main>
  );
}
