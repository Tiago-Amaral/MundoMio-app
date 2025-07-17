import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  Lock,
  BarChart3,
  Gamepad2,
  Settings,
  Trash2,
  ArrowLeft,
  Bell,
  Star,
  Trophy,
  Shield,
  Clock,
  TrendingUp,
  Eye,
  Calendar
} from 'lucide-react';

const ParentsArea: React.FC = () => {
  // --- Estados do Componente ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- Hooks de Contexto (Funcionalidade Original) ---
  const { user, updateUser } = useUser();
  const {
    totalPoints,
    achievements,
    gameProgress,
    storyProgress,
  } = useProgress();

  // --- Dados para a UI (Meta de Pontos) ---
  const weeklyGoal = 500;
  const progressPercentage = Math.min((totalPoints / weeklyGoal) * 100, 100);

  // --- Dados Estáticos para Atividades Recentes (Placeholder) ---
  const atividadeRecente = [
    { id: 1, atividade: "História: A Aventura do Dragão Amigável", tempo: "15 min", data: "Hoje, 14:30", tipo: "historia", pontos: 50 },
    { id: 2, atividade: "Desenho Criativo: Castelo Mágico", tempo: "20 min", data: "Hoje, 10:15", tipo: "desenho", pontos: 30 },
    { id: 3, atividade: "Jogo: Alfabeto Mágico", tempo: "12 min", data: "Ontem, 16:45", tipo: "jogo", pontos: 40 },
  ];

  // --- Dados Estáticos para Estatísticas Semanais (Placeholder) ---
  const estatisticasSemanais = {
    tempoTotal: "2h 30min",
    atividadesCompletas: 8,
    pontosGanhos: 320,
    metaSemanal: 400,
  };

  // --- Dados Estáticos para Configurações (Placeholder) ---
  const configuracoes = {
    tempoMaximoDiario: 60,
    notificacoes: true,
    relatorioPais: true,
    filtroConteudo: "moderado",
  };
  const [configAtual, setConfigAtual] = useState(configuracoes);

  // --- Funções do Componente (Funcionalidade Original) ---
  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Por favor, tente novamente.');
    }
  };

  const resetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // --- TELA DE LOGIN (Estilo Original Mantido) ---
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

  // --- PAINEL PRINCIPAL (Estilo da Imagem) ---
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Superior com Perfil do Usuário */}
      <header className="bg-white shadow-sm p-4">
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
            <button className="text-gray-500 hover:text-gray-800">
              <Bell size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Header do Painel */}
        <div className="flex items-center mb-6">
          <button className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Painel dos Responsáveis</h2>
            <p className="text-md text-gray-500">Acompanhe o progresso e gerencie a experiência da criança</p>
          </div>
        </div>

        {/* Sistema de Abas */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-2 flex space-x-2 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              <BarChart3 size={16} className="mr-2" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('atividades')}
              className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'atividades' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              <Eye size={16} className="mr-2" /> Atividades
            </button>
            <button
              onClick={() => setActiveTab('relatorios')}
              className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'relatorios' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              <Calendar size={16} className="mr-2" /> Relatórios
            </button>
            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'configuracoes' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              <Settings size={16} className="mr-2" /> Configurações
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div>
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Cards Coloridos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                    <Clock size={24} className="opacity-80" />
                    <div>
                      <p className="text-3xl font-bold">{estatisticasSemanais.tempoTotal}</p>
                      <p className="text-sm opacity-90">Tempo Semanal</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                    <TrendingUp size={24} className="opacity-80" />
                    <div>
                      <p className="text-3xl font-bold">{estatisticasSemanais.atividadesCompletas}</p>
                      <p className="text-sm opacity-90">Atividades</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                    <BarChart3 size={24} className="opacity-80" />
                    <div>
                      <p className="text-3xl font-bold">{estatisticasSemanais.pontosGanhos}</p>
                      <p className="text-sm opacity-90">Pontos</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                    <Shield size={24} className="opacity-80" />
                    <div>
                      <p className="text-3xl font-bold">100%</p>
                      <p className="text-sm opacity-90">Segurança</p>
                    </div>
                  </div>
                </div>
                {/* Card de Meta Semanal */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Meta Semanal de Pontos</h3>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold text-gray-800">{totalPoints} / {weeklyGoal} pontos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-800 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {totalPoints < weeklyGoal
                      ? `Faltam ${weeklyGoal - totalPoints} pontos para atingir a meta!`
                      : 'Meta semanal atingida! Parabéns!'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'atividades' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Atividades Recentes</h3>
                <div className="space-y-4">
                  {atividadeRecente.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${item.tipo === "historia" ? "bg-purple-500" :
                              item.tipo === "desenho" ? "bg-orange-500" :
                                "bg-green-500"
                            }`}
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">{item.atividade}</h4>
                          <p className="text-sm text-gray-500">{item.data}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center bg-gray-200 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                          {item.tempo}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">+{item.pontos} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'relatorios' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Tempo por Categoria</h3>
                  {/* Placeholder para os gráficos de tempo por categoria */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Histórias</span>
                      <div className="bg-gray-200 rounded-full w-2/3 h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-gray-700">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Desenho</span>
                      <div className="bg-gray-200 rounded-full w-2/3 h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-gray-700">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Jogos</span>
                      <div className="bg-gray-200 rounded-full w-2/3 h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-gray-700">25%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <TrendingUp className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Progresso Excelente!</h3>
                  <p className="text-gray-600">A criança está se desenvolvendo muito bem em todas as áreas.</p>
                </div>
              </div>
            )}

            {activeTab === 'configuracoes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Controles Parentais</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Tempo Máximo Diário</h4>
                        <p className="text-sm text-gray-500">Limite de uso por dia</p>
                      </div>
                      <div className="bg-gray-200 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                        {configAtual.tempoMaximoDiario} min
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Notificações</h4>
                        <p className="text-sm text-gray-500">Alertas de atividade</p>
                      </div>
                      <div className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${configAtual.notificacoes ? 'bg-green-500' : 'bg-red-500'}`}>
                        {configAtual.notificacoes ? 'Ativo' : 'Inativo'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Relatório para Pais</h4>
                        <p className="text-sm text-gray-500">Resumo semanal por email</p>
                      </div>
                      <div className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${configAtual.relatorioPais ? 'bg-green-500' : 'bg-red-500'}`}>
                        {configAtual.relatorioPais ? 'Ativo' : 'Inativo'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Segurança e Privacidade</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Filtro de Conteúdo</h4>
                        <p className="text-sm text-gray-500">Nível de moderação</p>
                      </div>
                      <div className="bg-gray-200 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                        {configAtual.filtroConteudo}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Dados Coletados</h4>
                        <p className="text-sm text-gray-500">Apenas progresso educacional</p>
                      </div>
                      <div className="bg-green-500 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
                        Seguro
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Conformidade LGPD</h4>
                        <p className="text-sm text-gray-500">Proteção de dados garantida</p>
                      </div>
                      <div className="bg-green-500 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
                        ✓ Ativo
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h3>
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