import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  Lock,
  BarChart3,
  Settings,
  ArrowLeft,
  Bell,
  Shield,
  Clock,
  TrendingUp,
  Eye,
  Calendar,
  ChevronDown 
} from 'lucide-react';

const ParentsArea: React.FC = () => {
  // --- Estados do Componente ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o dropdown mobile

  // --- Hooks de Contexto ---
  const { user } = useUser();
  const { totalPoints } = useProgress();

  // --- Dados para a UI (Placeholders) ---
  const weeklyGoal = 500;
  const progressPercentage = Math.min((totalPoints / weeklyGoal) * 100, 100);
  const atividadeRecente = [
    { id: 1, atividade: "História: A Aventura do Dragão Amigável", tempo: "15 min", data: "Hoje, 14:30", tipo: "historia", pontos: 50 },
    { id: 2, atividade: "Desenho Criativo: Castelo Mágico", tempo: "20 min", data: "Hoje, 10:15", tipo: "desenho", pontos: 30 },
    { id: 3, atividade: "Jogo: Alfabeto Mágico", tempo: "12 min", data: "Ontem, 16:45", tipo: "jogo", pontos: 40 },
  ];
  const estatisticasSemanais = {
    tempoTotal: "2h 30min",
    atividadesCompletas: 8,
    pontosGanhos: 320,
  };
  const configuracoes = {
    tempoMaximoDiario: 60,
    notificacoes: true,
    relatorioPais: true,
    filtroConteudo: "moderado",
  };

  // Array para gerenciar as abas de forma mais limpa
  const tabs = [
    { value: 'dashboard', label: 'Dashboard', Icon: BarChart3 },
    { value: 'atividades', label: 'Atividades', Icon: Eye },
    { value: 'relatorios', label: 'Relatórios', Icon: Calendar },
    { value: 'configuracoes', label: 'Configurações', Icon: Settings },
  ];

  const currentTab = tabs.find(tab => tab.value === activeTab);

  // --- Funções do Componente ---
  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Por favor, tente novamente.');
    }
  };
  
  // --- TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
          <div className="p-6 text-center">
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Área dos Responsáveis</h2>
            <p className="text-gray-600 pt-2">Digite a senha para gerenciar o progresso.</p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleAuthentication} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha (dica: 1234)"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium h-10 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
              >
                Acessar Painel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- PAINEL PRINCIPAL ---
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500">Nível 1 · {totalPoints} Pontos</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-800"><Bell size={20} /></button>
            <button className="text-gray-500 hover:text-gray-800"><Settings size={20} /></button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4 text-gray-700 hover:text-gray-900"><ArrowLeft size={24} /></button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Painel dos Responsáveis</h2>
            <p className="text-md text-gray-500">Acompanhe o progresso e gerencie a experiência da criança</p>
          </div>
        </div>
        
        <div>
          {/* INÍCIO DO MENU RESPONSIVO */}
          <div className="mb-6">
            {/* Menu Dropdown para Telas Pequenas (Mobile) */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white rounded-lg shadow-sm p-3 w-full flex items-center justify-between border border-gray-200"
              >
                <div className="flex items-center">
                  {currentTab && <currentTab.Icon size={16} className="mr-2 text-blue-600" />}
                  <span className="text-sm font-semibold text-blue-600">{currentTab?.label}</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {tabs.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setActiveTab(value);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center p-3 text-sm font-semibold text-gray-700 hover:bg-slate-50 text-left"
                    >
                      <Icon size={16} className="mr-3" /> {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Fixo para Telas Maiores (Desktop) */}
            <div className="hidden md:flex bg-white rounded-lg shadow-sm p-2 space-x-2 border border-gray-200">
              {tabs.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === value ? 'bg-slate-100 text-blue-600' : 'text-gray-500 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} className="mr-2" /> {label}
                </button>
              ))}
            </div>
          </div>
          {/* FIM DO MENU RESPONSIVO */}
          
          <div>
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-xl shadow-lg text-center bg-black text-white">
                    <Clock size={24} className="mx-auto mb-2" />
                    <p className="text-3xl font-bold">{estatisticasSemanais.tempoTotal}</p>
                    <p className="text-sm opacity-90 font-semibold">Tempo Semanal</p>
                  </div>
                  <div className="p-6 rounded-xl shadow-lg text-center bg-black text-white">
                    <TrendingUp size={24} className="mx-auto mb-2" />
                    <p className="text-3xl font-bold">{estatisticasSemanais.atividadesCompletas}</p>
                    <p className="text-sm opacity-90 font-semibold">Atividades</p>
                  </div>
                  <div className="p-6 rounded-xl shadow-lg text-center bg-black text-white">
                    <BarChart3 size={24} className="mx-auto mb-2" />
                    <p className="text-3xl font-bold">{estatisticasSemanais.pontosGanhos}</p>
                    <p className="text-sm opacity-90 font-semibold">Pontos</p>
                  </div>
                  <div className="p-6 rounded-xl shadow-lg text-center bg-black text-white">
                    <Shield size={24} className="mx-auto mb-2" />
                    <p className="text-3xl font-bold">100%</p>
                    <p className="text-sm opacity-90 font-semibold">Segurança</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Meta Semanal de Pontos</h3>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold text-gray-800">{totalPoints} / {weeklyGoal} pontos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {totalPoints < weeklyGoal ? `Faltam ${weeklyGoal - totalPoints} pontos para atingir a meta!` : 'Meta semanal atingida! Parabéns!'}
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'atividades' && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Atividades Recentes</h3>
                <div className="space-y-4">
                  {atividadeRecente.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${item.tipo === "historia" ? "bg-purple-500" : item.tipo === "desenho" ? "bg-orange-500" : "bg-green-500"}`}
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">{item.atividade}</h4>
                          <p className="text-sm text-gray-500">{item.data}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center bg-gray-200 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-800">{item.tempo}</div>
                        <p className="text-sm text-gray-500 mt-1">+{item.pontos} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'relatorios' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Tempo por Categoria</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Histórias</span>
                      <div className="w-1/2 bg-gray-200 rounded-full h-2.5"><div className="bg-black h-2.5 rounded-full" style={{ width: '45%' }}></div></div>
                      <span className="text-gray-700 font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Desenho</span>
                      <div className="w-1/2 bg-gray-200 rounded-full h-2.5"><div className="bg-black h-2.5 rounded-full" style={{ width: '30%' }}></div></div>
                      <span className="text-gray-700 font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Jogos</span>
                      <div className="w-1/2 bg-gray-200 rounded-full h-2.5"><div className="bg-black h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                      <span className="text-gray-700 font-semibold">25%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 flex flex-col justify-center items-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Evolução Semanal</h3>
                  <TrendingUp className="w-16 h-16 text-green-500 my-4" />
                  <p className="font-semibold text-gray-800">Progresso Excelente!</p>
                  <p className="text-gray-600 text-sm">A criança está se desenvolvendo muito bem em todas as áreas.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'configuracoes' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Controles Parentais</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Tempo Máximo Diário</h4>
                          <p className="text-sm text-gray-500">Limite de uso por dia</p>
                        </div>
                        <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                          {configuracoes.tempoMaximoDiario} min
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Notificações</h4>
                          <p className="text-sm text-gray-500">Alertas de atividade</p>
                        </div>
                        {/* MODIFICADO: Cor alterada de verde para preto */}
                        <div className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${configuracoes.notificacoes ? 'bg-black' : 'bg-red-500'}`}>
                          {configuracoes.notificacoes ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Relatório para Pais</h4>
                          <p className="text-sm text-gray-500">Resumo semanal por email</p>
                        </div>
                        {/* MODIFICADO: Cor alterada de verde para preto */}
                        <div className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${configuracoes.relatorioPais ? 'bg-black' : 'bg-red-500'}`}>
                          {configuracoes.relatorioPais ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Segurança e Privacidade</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Filtro de Conteúdo</h4>
                          <p className="text-sm text-gray-500">Nível de moderação</p>
                        </div>
                        <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                          {configuracoes.filtroConteudo}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Dados Coletados</h4>
                          <p className="text-sm text-gray-500">Apenas progresso educacional</p>
                        </div>
                        {/* MODIFICADO: Cor alterada de verde para preto */}
                        <div className="bg-black rounded-full px-3 py-1 text-sm font-semibold text-white">
                          Seguro
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Conformidade LGPD</h4>
                          <p className="text-sm text-gray-500">Proteção de dados garantida</p>
                        </div>
                        {/* MODIFICADO: Cor alterada de verde para preto */}
                        <div className="bg-black rounded-full px-3 py-1 text-sm font-semibold text-white">
                          ✓ Ativo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100">
                      Exportar Relatório
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100">
                      Redefinir Configurações
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100">
                      Contatar Suporte
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentsArea;