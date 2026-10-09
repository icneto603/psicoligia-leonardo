document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbar();
  initFaq();
  initServiceButtons();
  initAuthModals();
  initBookingForm();
});

function initYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initNavbar() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (!menuToggle || !navMenu || !menuIcon) return;

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

function initFaq() {
  document.querySelectorAll('.faq-item__header').forEach(button => {
    button.addEventListener('click', () => {
      const currentItem = button.parentElement;
      const isActive = currentItem.classList.contains('faq-item--active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('faq-item--active');
      });

      if (!isActive) {
        currentItem.classList.add('faq-item--active');
      }
    });
  });
}

const detalhesServicos = {
  'Ansiedade e Estresse': 'Através da Terapia Cognitivo-Comportamental (TCC), trabalhamos a identificação e reestruturação de pensamentos disfuncionais, exercícios práticos de regulação emocional e manejo do estresse.',
  'Depressão e Autoestima': 'Acompanhamento focado em ressignificar crenças limitantes, combater pensamentos automáticos negativos e reestabelecer o autocuidado.',
  'Relacionamentos': 'Foco no aprimoramento da comunicação assertiva, limites saudáveis e resolução construtiva de conflitos.',
  'Terapia Online': 'Sessões por videochamada com total flexibilidade e sigilo conforme diretrizes do CFP.',
  'Educação Especial e Inclusão': 'Avaliação, orientação e acompanhamento psicológico fundamentados no mestrado em Educação Especial pela UFSCar.',
  'Autoconhecimento e Luto': 'Espaço seguro para processar perdas, vivenciar o luto de forma saudável e encarar transições de vida.'
};

function initServiceButtons() {
  document.querySelectorAll('.card-service__action').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceTitle = btn.dataset.service;
      const descricao = detalhesServicos[serviceTitle] || 'Acompanhamento psicológico personalizado.';

      Swal.fire({
        title: serviceTitle,
        html: `<p style="text-align: justify; font-size: 0.95rem; line-height: 1.6; color: #57534e; margin-bottom: 1.25rem;">${descricao}</p><strong>Deseja agendar uma avaliação para esta área?</strong>`,
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
    });
  });
}

function initAuthModals() {
  const btnLogin = document.getElementById('btnLogin');
  const btnCadastro = document.getElementById('btnCadastro');

  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
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
            text: 'Login realizado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#0d9488'
          });
        }
      });
    });
  }

  if (btnCadastro) {
    btnCadastro.addEventListener('click', () => {
      Swal.fire({
        title: 'Novo Cadastro',
        html: `
          <div style="text-align: left; margin-top: 1rem;">
            <label style="display:block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem; color: #292524;">Nome Completo</label>
            <input type="text" id="swal-cad-nome" class="swal2-input" placeholder="Seu nome" style="margin: 0 0 0.8rem 0; width: 100%;">
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
          const email = document.getElementById('swal-cad-email').value;
          const senha = document.getElementById('swal-cad-senha').value;
          if (!nome || !email || !senha) {
            Swal.showValidationMessage('Preencha todos os campos obrigatórios.');
            return false;
          }
          return { nome, email, senha };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Cadastro Concluído!',
            text: 'Sua conta foi criada com sucesso.',
            icon: 'success',
            confirmButtonColor: '#0d9488'
          });
        }
      });
    });
  }
}

function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const modalidade = document.getElementById('modalidade').value;

    Swal.fire({
      title: 'Solicitação Enviada!',
      html: `Obrigado, <strong>${nome}</strong>.<br>Recebemos o seu pedido para a modalidade <strong>${modalidade}</strong>. Entraremos em contato em breve.`,
      icon: 'success',
      confirmButtonColor: '#0d9488',
      confirmButtonText: 'Excelente'
    });

    bookingForm.reset();
  });
}