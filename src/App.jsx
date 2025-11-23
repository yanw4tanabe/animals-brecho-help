import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Cat, 
  Dog, 
  Bone, 
  Stethoscope, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  Share2, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';

// --- MOCK DATA ---

const animalsApadrinhamento = [
  {
    id: 1,
    nome: "Valente",
    foto: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop",
    necessidade: "Cirurgia Ortopédica",
    descricao: "Valente foi resgatado após um atropelamento. Ele precisa de uma cirurgia complexa na pata traseira para voltar a andar sem dor.",
    custoTotal: 2500,
    arrecadado: 850,
    urgencia: "alta",
    categoria: "Cirurgia",
    tags: ["Cirurgia", "Urgente"]
  },
  {
    id: 2,
    nome: "Luna",
    foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
    necessidade: "Tratamento Renal",
    descricao: "A doce Luna sofre de insuficiência renal crônica. Precisamos garantir sua ração especial e fluidoterapia mensal.",
    custoTotal: 400,
    arrecadado: 320,
    urgencia: "media",
    categoria: "Medicação",
    tags: ["Crônico", "Idoso"]
  },
  {
    id: 3,
    nome: "Pipoca",
    foto: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
    necessidade: "Alimentação Especial",
    descricao: "Resgatado com desnutrição severa, Pipoca precisa de suplementos vitamínicos e ração gastrointestinal.",
    custoTotal: 300,
    arrecadado: 50,
    urgencia: "alta",
    categoria: "Alimentação",
    tags: ["Nutrição", "Filhote"]
  },
  {
    id: 4,
    nome: "Thor",
    foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
    necessidade: "Quimioterapia",
    descricao: "Thor é um guerreiro lutando contra um TVT. Faltam 4 sessões de quimioterapia para sua cura completa.",
    custoTotal: 800,
    arrecadado: 100,
    urgencia: "alta",
    categoria: "Medicação",
    tags: ["Câncer", "Tratamento"]
  },
  {
    id: 5,
    nome: "Mia",
    foto: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop",
    necessidade: "Castração e Vacinas",
    descricao: "Mia e seus 3 filhotes precisam ser vacinados e ela precisa ser castrada para encontrar um lar.",
    custoTotal: 600,
    arrecadado: 550,
    urgencia: "baixa",
    categoria: "Cirurgia",
    tags: ["Prevenção", "Família"]
  },
  {
    id: 6,
    nome: "Barão",
    foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop",
    necessidade: "Hotelzinho / Lar Temporário",
    descricao: "O lar temporário do Barão venceu. Precisamos pagar um hotelzinho até ele ser adotado.",
    custoTotal: 450,
    arrecadado: 0,
    urgencia: "media",
    categoria: "Alimentação", // Simplificação para categoria
    tags: ["Abrigo", "Urgente"]
  }
];

const animalsAdocao = [
  {
    id: 101,
    nome: "Amora",
    especie: "cachorro",
    foto: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea92b5?q=80&w=800&auto=format&fit=crop",
    idade: "2 anos",
    porte: "Médio",
    sexo: "Fêmea",
    castrado: true,
    vacinado: true,
    temperamento: "Dócil, adora crianças e brincar de bolinha.",
    historia: "Amora foi encontrada amarrada em um portão. Apesar disso, não perdeu a fé na humanidade e ama abraços."
  },
  {
    id: 102,
    nome: "Frajola",
    especie: "gato",
    foto: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=800&auto=format&fit=crop",
    idade: "6 meses",
    porte: "Pequeno",
    sexo: "Macho",
    castrado: false,
    vacinado: true,
    temperamento: "Curioso, brincalhão e independente.",
    historia: "Resgatado de um motor de carro em dia de chuva. É um gatinho cheio de energia."
  },
  {
    id: 103,
    nome: "Belinha",
    especie: "cachorro",
    foto: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=800&auto=format&fit=crop",
    idade: "8 anos",
    porte: "Pequeno",
    sexo: "Fêmea",
    castrado: true,
    vacinado: true,
    temperamento: "Calma, companheira de sofá e carinhosa.",
    historia: "Sua tutora faleceu e ela ficou sozinha. Busca um lar tranquilo para passar sua aposentadoria."
  },
  {
    id: 104,
    nome: "Simba",
    especie: "gato",
    foto: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=800&auto=format&fit=crop",
    idade: "1 ano",
    porte: "Médio",
    sexo: "Macho",
    castrado: true,
    vacinado: true,
    temperamento: "Vocal, adora sachê e carinho no queixo.",
    historia: "Apareceu no nosso bazar miando por comida e nunca mais foi embora. Agora busca um lar definitivo."
  },
  {
    id: 105,
    nome: "Pudim",
    especie: "cachorro",
    foto: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=800&auto=format&fit=crop",
    idade: "4 anos",
    porte: "Grande",
    sexo: "Macho",
    castrado: true,
    vacinado: true,
    temperamento: "Protetor, leal e adora longas caminhadas.",
    historia: "Resgatado de maus tratos, hoje é um cão saudável e forte que precisa de espaço para correr."
  },
  {
    id: 106,
    nome: "Mimi",
    especie: "gato",
    foto: "https://images.unsplash.com/photo-1529778873920-4da4926a7071?q=80&w=800&auto=format&fit=crop",
    idade: "3 anos",
    porte: "Pequeno",
    sexo: "Fêmea",
    castrado: true,
    vacinado: true,
    temperamento: "Tímida no início, mas muito amorosa quando confia.",
    historia: "Vivia em uma colônia de gatos de rua. Precisa de um adotante paciente para adaptação."
  }
];

const depoimentos = [
  {
    id: 1,
    nome: "Mariana Souza",
    pet: "Bolinha",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    texto: "Adotar o Bolinha foi a melhor decisão da minha vida. O Animals Brechó me deu todo suporte na adaptação!"
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    pet: "Garfield",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    texto: "Apadrinhei o tratamento do Garfield e ver ele saudável hoje não tem preço. Trabalho incrível da equipe."
  },
  {
    id: 3,
    nome: "Ana & Pedro",
    pet: "Lola",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    texto: "O processo de adoção foi super responsável. Eles realmente se importam para onde o animal vai."
  }
];

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/30",
    secondary: "bg-teal-400 text-white hover:bg-teal-500 shadow-teal-400/30",
    outline: "border-2 border-white text-white hover:bg-white hover:text-orange-500",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    urgent: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/30"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, type = 'default' }) => {
  const styles = {
    default: "bg-gray-100 text-gray-600",
    urgente: "bg-red-100 text-red-600 animate-pulse",
    success: "bg-green-100 text-green-600",
    info: "bg-blue-100 text-blue-600"
  };
  
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${styles[type]}`}>
      {children}
    </span>
  );
};

const ProgressBar = ({ current, total }) => {
  const percentage = Math.min(100, (current / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-1 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-5 z-50 animate-bounce-in">
      <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center gap-3 pr-8">
        <CheckCircle className="text-green-500 w-6 h-6" />
        <div>
          <h4 className="font-bold text-gray-800">Sucesso!</h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// --- MODALS ---

const SponsorModal = ({ animal, onClose, onConfirm }) => {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  if (!animal) return null;

  const handleDonate = () => {
    onConfirm(amount === 'custom' ? Number(customAmount) : amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        {/* Image Side */}
        <div className="w-full md:w-2/5 h-48 md:h-auto relative">
          <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover md:rounded-l-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{animal.nome}</h2>
              <span className="text-white/90 text-sm bg-orange-500/80 px-2 py-1 rounded">{animal.necessidade}</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">A História de {animal.nome}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{animal.descricao}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
              <span>Meta: R$ {animal.custoTotal}</span>
              <span>Faltam: R$ {animal.custoTotal - animal.arrecadado}</span>
            </div>
            <ProgressBar current={animal.arrecadado} total={animal.custoTotal} />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">Escolha o valor da ajuda:</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[20, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => { setAmount(val); setCustomAmount(''); }}
                  className={`py-2 rounded-lg text-sm font-bold transition-colors ${amount === val ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  R$ {val}
                </button>
              ))}
              <button
                onClick={() => setAmount('custom')}
                className={`py-2 rounded-lg text-sm font-bold transition-colors ${amount === 'custom' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Outro
              </button>
            </div>
            {amount === 'custom' && (
              <input
                type="number"
                placeholder="Digite o valor"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDonate} className="flex-1">
              Confirmar Doação
            </Button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
            <Heart size={12} fill="currentColor" /> Pagamento seguro via PIX ou Cartão
          </p>
        </div>
      </div>
    </div>
  );
};

const AdoptModal = ({ animal, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });

  if (!animal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        {/* Gallery Side */}
        <div className="w-full md:w-1/2 bg-gray-100 md:rounded-l-3xl relative min-h-[300px]">
          <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover md:rounded-l-3xl" />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 p-6 text-white">
            <h2 className="text-3xl font-bold">{animal.nome}</h2>
            <p className="opacity-90">{animal.raca} • {animal.idade}</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="text-red-500" fill="currentColor" /> Quero Adotar
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 uppercase">Sexo</p>
              <p className="font-bold text-blue-800">{animal.sexo}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 uppercase">Porte</p>
              <p className="font-bold text-purple-800">{animal.porte}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 uppercase">Vacinas</p>
              <p className="font-bold text-green-800">{animal.vacinado ? 'Em dia' : 'Pendente'}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 uppercase">Castrado</p>
              <p className="font-bold text-orange-800">{animal.castrado ? 'Sim' : 'Não'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="Seu Nome Completo" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                required
                type="email" 
                placeholder="Seu Email" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                required
                type="tel" 
                placeholder="Seu WhatsApp" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                value={formData.telefone}
                onChange={e => setFormData({...formData, telefone: e.target.value})}
              />
            </div>
            <textarea 
              placeholder="Por que você quer adotar este pet?"
              rows="3"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none resize-none"
              value={formData.mensagem}
              onChange={e => setFormData({...formData, mensagem: e.target.value})}
            ></textarea>

            <Button type="submit" variant="secondary" className="w-full">
              Enviar Interesse
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  
  // Filters
  const [sponsorFilter, setSponsorFilter] = useState('Todos');
  const [adoptionFilter, setAdoptionFilter] = useState('Todos');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
  };

  const handleDonationConfirm = (amount) => {
    setSelectedSponsor(null);
    showToast(`Obrigado! Você iniciou uma doação de R$ ${amount} para ${selectedSponsor?.nome}.`);
  };

  const handleAdoptionConfirm = (data) => {
    setSelectedAdoption(null);
    showToast(`Pedido enviado! Entraremos em contato com você em breve, ${data.nome}.`);
  };

  // Filter logic
  const filteredSponsors = sponsorFilter === 'Todos' 
    ? animalsApadrinhamento 
    : animalsApadrinhamento.filter(a => a.categoria === sponsorFilter);

  const filteredAdoptions = adoptionFilter === 'Todos'
    ? animalsAdocao
    : animalsAdocao.filter(a => a.especie === adoptionFilter.toLowerCase() || (adoptionFilter === 'Pequeno' && a.porte === 'Pequeno'));

  return (
    <div className="font-sans text-gray-800 bg-gray-50 selection:bg-orange-200">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-xl text-white">
              <Dog size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-800' : 'text-white drop-shadow-md'}`}>
              Animals<span className="text-teal-400">Brechó</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Início', 'Apadrinhar', 'Adotar', 'Bazar', 'Sobre'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-bold hover:text-orange-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
            <Button variant={scrolled ? 'primary' : 'primary'} className="py-2 px-5 text-sm">
              Ajude Agora
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={scrolled ? 'text-gray-800' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t p-4 flex flex-col gap-4 animate-slide-down">
            {['Início', 'Apadrinhar', 'Adotar', 'Bazar', 'Sobre'].map((item) => (
              <a key={item} href="#" className="text-gray-600 font-bold py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Button className="w-full">Ajude Agora</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="início" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1600&auto=format&fit=crop" 
            alt="Cão feliz" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">ONG Sem Fins Lucrativos</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Transforme Vidas com <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Amor</span>.
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Cada ajuda conta. Apadrinhe tratamentos urgentes ou encontre seu novo melhor amigo de 4 patas. Financiado pelo nosso Bazar Beneficente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={() => document.getElementById('apadrinhar').scrollIntoView({behavior: 'smooth'})}>
                💰 Apadrinhe um Tratamento
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('adotar').scrollIntoView({behavior: 'smooth'})}>
                🐾 Adote um Pet
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-white/80">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-900 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Doador" />
                  </div>
                ))}
              </div>
              <p className="text-sm"><span className="font-bold text-white">+1.200</span> animais ajudados este ano</p>
            </div>
          </div>
        </div>
      </header>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Search size={40} />, title: "Escolha", desc: "Navegue pelos nossos murais de animais que precisam de cirurgia ou de um lar." },
              { icon: <Heart size={40} />, title: "Conecte-se", desc: "Conheça a história e as necessidades específicas de cada animal resgatado." },
              { icon: <CheckCircle size={40} />, title: "Transforme", desc: "Faça sua contribuição financeira ou inicie o processo de adoção responsável." }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-3xl hover:bg-gray-50 transition-colors group">
                <div className="inline-flex p-4 rounded-2xl bg-orange-100 text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Wall */}
      <section id="apadrinhar" className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adote um Custo 💰</h2>
            <p className="text-lg text-gray-600">Eles precisam de você agora. Escolha um caso urgente e ajude a pagar tratamentos veterinários.</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['Todos', 'Cirurgia', 'Medicação', 'Alimentação'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSponsorFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${sponsorFilter === cat ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSponsors.map((animal) => (
              <div key={animal.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {animal.urgencia === 'alta' && <Badge type="urgente">Urgente</Badge>}
                    <Badge type="default">{animal.categoria}</Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{animal.nome}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">{animal.descricao}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                      <span>R$ {animal.arrecadado} arrecadados</span>
                      <span>Meta: R$ {animal.custoTotal}</span>
                    </div>
                    <ProgressBar current={animal.arrecadado} total={animal.custoTotal} />
                  </div>

                  <Button onClick={() => setSelectedSponsor(animal)} className="w-full justify-center">
                    Apadrinhar {animal.nome}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Wall */}
      <section id="adotar" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Encontre seu Melhor Amigo 🐾</h2>
              <p className="text-lg text-gray-600">Eles já esperaram demais por um lar cheio de amor.</p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              {['Todos', 'Cachorro', 'Gato', 'Pequeno'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setAdoptionFilter(cat)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${adoptionFilter === cat ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAdoptions.map((animal) => (
              <div key={animal.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-72 group cursor-pointer" onClick={() => setSelectedAdoption(animal)}>
                  <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-teal-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-teal-600 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Ver Detalhes</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{animal.nome}</h3>
                      <p className="text-teal-500 font-medium text-sm">{animal.idade} • {animal.porte}</p>
                    </div>
                    <div className="bg-teal-50 p-2 rounded-full text-teal-600">
                      {animal.especie === 'cachorro' ? <Dog size={20} /> : <Cat size={20} />}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 my-4 text-gray-400">
                    <div className="flex flex-col items-center gap-1" title="Vacinado">
                       <Stethoscope size={18} className={animal.vacinado ? 'text-green-500' : ''} />
                       <span className="text-[10px] uppercase">Vacinas</span>
                    </div>
                    <div className="flex flex-col items-center gap-1" title="Castrado">
                       <div className={`w-4 h-4 rounded-full border-2 ${animal.castrado ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}></div>
                       <span className="text-[10px] uppercase">Castrado</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bone size={18} className="text-orange-400" />
                      <span className="text-[10px] uppercase">Brincalhão</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 italic">"{animal.temperamento}"</p>

                  <Button variant="secondary" className="w-full" onClick={() => setSelectedAdoption(animal)}>
                    Conhecer {animal.nome}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-teal-500/30">
            {[
              { num: "1.2k", label: "Resgatados" },
              { num: "850", label: "Cirurgias" },
              { num: "980", label: "Adoções" },
              { num: "5t", label: "Ração" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-5xl font-bold mb-2">{stat.num}</div>
                <div className="text-teal-200 uppercase tracking-wider text-sm font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bazar Section */}
      <section id="bazar" className="py-24 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full opacity-50 blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
                  alt="Bazar Beneficente" 
                  className="rounded-3xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
                   <ShoppingBag className="text-orange-500" size={32} />
                   <div>
                     <p className="font-bold text-gray-800">100% do lucro</p>
                     <p className="text-xs text-gray-500">revertido para os animais</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">Moda Sustentável & Solidária</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Compre no Bazar = Salve Vidas</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nosso bazar é a principal fonte de renda para manter as operações do Animals Brechó. 
                Você encontra roupas, acessórios e decoração com preços incríveis e, ao comprar, financia diretamente 
                a ração e os remédios dos nossos resgatados.
              </p>
              <ul className="space-y-4 mb-8">
                {['Roupas selecionadas e higienizadas', 'Preços a partir de R$ 5,00', 'Aceitamos doações de peças'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-teal-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary">
                Visitar o Bazar (Ver Endereço)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Finais Felizes ❤️</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depo) => (
              <div key={depo.id} className="bg-gray-50 p-8 rounded-3xl relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <img src={depo.foto} alt={depo.nome} className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover" />
                </div>
                <p className="text-gray-600 italic mb-6 mt-4">"{depo.texto}"</p>
                <h4 className="font-bold text-gray-900">{depo.nome}</h4>
                <span className="text-xs text-teal-500 uppercase font-bold">Adotou {depo.pet}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-20 pb-10" id="sobre">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Dog size={24} />
                <span className="text-xl font-bold">Animals<span className="text-teal-400">Brechó</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-gray-400">
                Proteção animal com transparência e amor. Desde 2018 resgatando, curando e encontrando lares.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors text-white"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><Facebook size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-orange-500 flex-shrink-0" size={18} />
                  <span>Rua dos Resgates, 123<br/>Centro, São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-orange-500" size={18} />
                  <span>(11) 99999-8888</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-orange-500" size={18} />
                  <span>ajuda@animalsbrecho.org</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#apadrinhar" className="hover:text-orange-400 transition-colors">Apadrinhar Tratamento</a></li>
                <li><a href="#adotar" className="hover:text-orange-400 transition-colors">Quero Adotar</a></li>
                <li><a href="#bazar" className="hover:text-orange-400 transition-colors">Doar para o Bazar</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Portal da Transparência</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-xs text-gray-500 mb-4">Receba histórias emocionantes e prestação de contas mensal.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Seu e-mail" className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-orange-500 outline-none" />
                <button className="bg-orange-500 px-4 rounded-lg hover:bg-orange-600 transition-colors"><ChevronRight size={16} color="white" /></button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2024 Animals Brechó. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1 mt-2 md:mt-0">Feito com <Heart size={10} className="text-red-500" fill="currentColor" /> para os animais</p>
          </div>
        </div>
      </footer>

      {/* Render Modals */}
      {selectedSponsor && (
        <SponsorModal 
          animal={selectedSponsor} 
          onClose={() => setSelectedSponsor(null)} 
          onConfirm={handleDonationConfirm}
        />
      )}

      {selectedAdoption && (
        <AdoptModal 
          animal={selectedAdoption} 
          onClose={() => setSelectedAdoption(null)} 
          onConfirm={handleAdoptionConfirm}
        />
      )}

      {/* Toast Notification */}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default App;
