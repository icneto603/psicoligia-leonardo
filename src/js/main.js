document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano no rodapé
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Toggle do Menu Responsivo
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (menuToggle && navMenu && menuIcon) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('navbar__menu--open');
      const isOpen = navMenu.classList.contains('navbar__menu--open');
      menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('navbar__menu--open');
        menuIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Formulário de Agendamento
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleFormSubmit);
  }
});

// Accordion FAQ
function toggleFaq(buttonElement) {
  const faqItem = buttonElement.parentElement;
  const isActive = faqItem.classList.contains('faq-item--active');

  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('faq-item--active');
  });

  if (!isActive) {
    faqItem.classList.add('faq-item--active');
  }
}

// Detalhes dos Serviços
const detalhesServicos = {
  'Ansiedade e Estresse': 'Através da Terapia Cognitivo-Comportamental (TCC), trabalhamos a identificação e reestruturação de pensamentos disfuncionais, exercícios práticos de regulação emocional, técnicas de respiração e estratégias para o manejo de crises de ansiedade e estresse no dia a dia.',
  'Depressão e Autoestima': 'Acompanhamento focado em ressignificar crenças limitantes, combater pensamentos automáticos negativos e reestabelecer o autocuidado, a autocompaixão e o fortalecimento do valor próprio.',
  'Relacionamentos': 'Foco no aprimoramento da comunicação assertiva, estabelecimento de limites saudáveis, resolução construtiva de conflitos e superação da dependência emocional para construção de relacionamentos equilibrados.',
  'Terapia Online': 'Sessões individuais por videochamada com total flexibilidade e sigilo, permitindo o atendimento de onde você estiver com a mesma eficácia científica das sessões presenciais.',
  'Educação Especial e Inclusão': 'Unindo a prática clínica à formação acadêmica com mestrado na área pela UFSCar, ofereço avaliação, orientação e acompanhamento direcionados para indivíduos e famílias em contextos inclusivos.',
  'Autoconhecimento e Luto': 'Um espaço seguro de acolhimento para processar perdas, vivenciar o luto de forma saudável, encarar transições importantes da vida e ampliar a consciência sobre seus valores e objetivos.'
};

function solicitarInfo(servico) {
  const descricao = detalhesServicos[servico] || 'Acompanhamento psicológico personalizado focado nas suas necessidades.';

  Swal.fire({
    title: servico,
    html: `<p style="text-align: justify; font-size: 0.95rem; line-height: 1.6; color: #57534e; margin-bottom: 1.25rem;">${descricao}</p><strong>Deseja agendar uma avaliação inicial para esta especialidade?</strong>`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#0d9488',
    cancelButtonColor: '#57534e',
    confirmButtonText: 'Sim, agendar!',
    cancelButtonText: 'Fechar'
  }).then((result) => {
    if (result.isConfirmed) {
      const target = document.querySelector('#agendamento');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

function abrirModalLogin() {
  Swal.fire({
    title: 'Área do Paciente',
    html: `
      <div style="text-align: left; margin-top: 1rem;">
        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">CPF</label>
        <input type="text" id="swal-cpf" class="swal2-input" placeholder="000.000.000-00" style="margin: 0 0 1rem 0; width: 100%;">
        
        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">Senha</label>
        <input type="password" id="swal-senha" class="swal2-input" placeholder="Sua senha" style="margin: 0; width: 100%;">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Entrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0d9488',
    cancelButtonColor: '#57534e',
    preConfirm: () => {
      const cpf = document.getElementById('swal-cpf').value;
      const senha = document.getElementById('swal-senha').value;
      if (!cpf || !senha) {
        Swal.showValidationMessage('Por favor, informe o CPF e a senha.');
        return false;
      }
      return { cpf, senha };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Boas-vindas!',
        text: 'Login realizado com sucesso. Seja bem-vindo(a) à sua área exclusiva.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0d9488'
      });
    }
  });
}

function abrirModalCadastro() {
  Swal.fire({
    title: 'Novo Cadastro',
    html: `
      <div style="text-align: left; margin-top: 1rem;">
        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">Nome Completo</label>
        <input type="text" id="swal-cad-nome" class="swal2-input" placeholder="Seu nome" style="margin: 0 0 0.8rem 0; width: 100%;">

        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">CPF</label>
        <input type="text" id="swal-cad-cpf" class="swal2-input" placeholder="000.000.000-00" style="margin: 0 0 0.8rem 0; width: 100%;">

        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">E-mail</label>
        <input type="email" id="swal-cad-email" class="swal2-input" placeholder="seuemail@exemplo.com" style="margin: 0 0 0.8rem 0; width: 100%;">

        <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">Senha</label>
        <input type="password" id="swal-cad-senha" class="swal2-input" placeholder="Crie uma senha" style="margin: 0; width: 100%;">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Cadastrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0d9488',
    cancelButtonColor: '#57534e',
    preConfirm: () => {
      const nome = document.getElementById('swal-cad-nome').value;
      const cpf = document.getElementById('swal-cad-cpf').value;
      const email = document.getElementById('swal-cad-email').value;
      const senha = document.getElementById('swal-cad-senha').value;

      if (!nome || !cpf || !email || !senha) {
        Swal.showValidationMessage('Por favor, preencha todos os campos do cadastro.');
        return false;
      }
      return { nome, cpf, email, senha };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Cadastro Concluído!',
        text: 'Sua conta foi criada com sucesso! Você já pode realizar o login.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0d9488'
      });
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const modalidade = document.getElementById('modalidade').value;

  Swal.fire({
    title: 'Solicitação Enviada!',
    html: `Obrigado, <strong>${nome}</strong>.<br>Recebemos seu pedido para atendimento na modalidade <strong>${modalidade}</strong>. Entraremos em contato via WhatsApp/E-mail em até 24h.`,
    icon: 'success',
    confirmButtonColor: '#0d9488',
    confirmButtonText: 'Excelente'
  });

  document.getElementById('bookingForm').reset();
}