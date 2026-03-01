export type Locale = 'es' | 'en'

export const translations = {
  es: {
    nav: {
      services: 'Servicios',
      process: 'Cómo trabajamos',
      results: 'Resultados',
      about: 'Por qué Infinity',
      contact: 'Contacto',
      cta: 'Contactar',
    },
    hero: {
      badge: 'Transformación Inteligente para PyMEs',
      title: 'POSIBILIDADES INFINITAS',
      titleTop: 'POSIBILIDADES INFINITAS',
      titleReveal: 'con Automatización IA',
      subtitle:
        'Convertimos operaciones lentas en sistemas autónomos con IA y automatización aplicada a tu negocio.',
      primaryCta: 'Habla con un experto',
      secondaryCta: 'Ver servicios',
      trust: ['+120 proyectos entregados', 'Equipo experto en IA aplicada', 'Implementación end-to-end'],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Soluciones de automatización e IA que sí generan impacto',
      intro:
        'Diseñamos sistemas claros, escalables y medibles para optimizar procesos, reducir costos y mejorar la experiencia del cliente.',
      items: [
        {
          title: 'Asistentes Inteligentes',
          description: 'Automatiza soporte y ventas con agentes que atienden en tiempo real.',
        },
        {
          title: 'Orquestación de Flujos',
          description: 'Conecta CRM, formularios, email y operaciones sin intervención manual.',
        },
        {
          title: 'Analítica Predictiva',
          description: 'Visualiza métricas críticas y detecta oportunidades antes que la competencia.',
        },
        {
          title: 'Automatización Operativa',
          description: 'Integramos procesos internos para ejecutar tareas 24/7 sin fricción.',
        },
      ],
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'Implementación en 4 fases: simple, rápida y medible',
      steps: [
        {
          title: 'Diagnóstico',
          description: 'Analizamos tus procesos y detectamos cuellos de botella con mayor retorno.',
        },
        {
          title: 'Diseño',
          description: 'Definimos arquitectura, herramientas y roadmap de implementación.',
        },
        {
          title: 'Implementación',
          description: 'Construimos y conectamos tus automatizaciones con estándares de producción.',
        },
        {
          title: 'Escalamiento',
          description: 'Optimizamos continuamente para elevar rendimiento y resultados.',
        },
      ],
    },
    results: {
      eyebrow: 'Resultados',
      title: 'Métricas reales de eficiencia y crecimiento',
      metrics: [
        { label: 'Horas ahorradas por semana', value: 35, suffix: '+' },
        { label: 'Reducción de costos operativos', value: 60, suffix: '%' },
        { label: 'Velocidad de entrega', value: 4, suffix: 'x' },
        { label: 'Disponibilidad de flujos', value: 24, suffix: '/7' },
      ],
      testimonial: {
        quote:
          'Pasamos de procesos manuales y caóticos a una operación confiable, escalable y medible en menos de 8 semanas.',
        author: 'Ricardo G.',
        role: 'Director de Operaciones, Logística MX',
      },
    },
    about: {
      eyebrow: 'Por qué Infinity',
      title: 'Tecnología aplicada con enfoque humano y resultados medibles',
      cards: [
        {
          title: 'Hecho en México 🇲🇽',
          description: 'Conocemos el contexto operativo local y construimos con cercanía real.',
          icon: 'flag',
        },
        {
          title: 'Cercanía y Acompañamiento',
          description: 'Acompañamiento experto desde diagnóstico hasta escalamiento.',
          icon: 'support_agent',
        },
        {
          title: 'Seguridad de Datos',
          description: 'Buenas prácticas de seguridad y privacidad en cada implementación.',
          icon: 'security',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Conversemos sobre tu siguiente salto operativo',
      description: 'Completa el formulario y te respondemos por correo para agendar una llamada inicial.',
      infoTitle: 'Infinity AI Cloud Solutions',
      infoSubtitle: 'Tu aliado en automatización e inteligencia artificial aplicada.',
      infoItems: [
        { icon: 'mail', label: 'hola@infinitycloudsolutions.com' },
        { icon: 'call', label: '+52 55 0000 0000' },
        { icon: 'location_on', label: 'Ciudad de México, MX' },
      ],
      fields: {
        name: 'Nombre',
        email: 'Correo electrónico',
        company: 'Empresa',
        phone: 'Teléfono',
        message: 'Mensaje',
      },
      submit: 'Enviar mensaje',
      loading: 'Enviando...',
      success: 'Mensaje enviado. Te contactaremos pronto.',
      error: 'No se pudo enviar tu mensaje. Intenta nuevamente.',
    },
    footer: {
      tagline: 'Automatización, IA y crecimiento para empresas de alto desempeño.',
      privacy: 'Privacidad',
      terms: 'Términos',
      rights: '© 2025 Infinity AI Cloud Solutions',
      madeIn: 'Hecho en México 🇲🇽',
      chatCta: 'Habla con un experto',
    },
  },
  en: {
    nav: {
      services: 'Services',
      process: 'How we work',
      results: 'Results',
      about: 'Why Infinity',
      contact: 'Contact',
      cta: 'Contact us',
    },
    hero: {
      badge: 'Smart Transformation for SMBs',
      title: 'INFINITE POSSIBILITIES',
      titleTop: 'INFINITE POSSIBILITIES',
      titleReveal: 'with AI Automation',
      subtitle:
        'We transform slow operations into autonomous systems with practical AI and automation.',
      primaryCta: 'Talk to an expert',
      secondaryCta: 'View services',
      trust: ['120+ projects delivered', 'Applied AI specialists', 'End-to-end implementation'],
    },
    services: {
      eyebrow: 'Services',
      title: 'Automation and AI solutions built for real impact',
      intro:
        'We design clear, scalable, and measurable systems to optimize operations, reduce costs, and improve customer experience.',
      items: [
        {
          title: 'Intelligent Assistants',
          description: 'Automate support and sales with real-time AI agents.',
        },
        {
          title: 'Workflow Orchestration',
          description: 'Connect CRM, forms, email, and operations without manual handoffs.',
        },
        {
          title: 'Predictive Analytics',
          description: 'Track critical metrics and uncover opportunities ahead of competitors.',
        },
        {
          title: 'Operational Automation',
          description: 'Integrate internal processes to execute tasks 24/7 with consistency.',
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: '4-phase implementation: simple, fast, and measurable',
      steps: [
        {
          title: 'Discovery',
          description: 'We analyze your operation and prioritize the highest-ROI bottlenecks.',
        },
        {
          title: 'Design',
          description: 'We define architecture, tools, and implementation roadmap.',
        },
        {
          title: 'Implementation',
          description: 'We build and connect automations with production-grade standards.',
        },
        {
          title: 'Scale',
          description: 'We optimize continuously to improve performance and business outcomes.',
        },
      ],
    },
    results: {
      eyebrow: 'Results',
      title: 'Real efficiency and growth metrics',
      metrics: [
        { label: 'Hours saved per week', value: 35, suffix: '+' },
        { label: 'Operational cost reduction', value: 60, suffix: '%' },
        { label: 'Delivery speed', value: 4, suffix: 'x' },
        { label: 'Workflow availability', value: 24, suffix: '/7' },
      ],
      testimonial: {
        quote:
          'We moved from manual, fragmented operations to a reliable, scalable, and measurable system in under 8 weeks.',
        author: 'Ricardo G.',
        role: 'Operations Director, Logística MX',
      },
    },
    about: {
      eyebrow: 'Why Infinity',
      title: 'Applied technology with human focus and measurable outcomes',
      cards: [
        {
          title: 'Made in Mexico 🇲🇽',
          description: 'We understand local operations and build with practical proximity.',
          icon: 'flag',
        },
        {
          title: 'Close Partnership',
          description: 'Expert support from discovery through scale.',
          icon: 'support_agent',
        },
        {
          title: 'Data Security',
          description: 'Security and privacy best practices in every implementation.',
          icon: 'security',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s discuss your next operational leap',
      description: 'Complete the form and we’ll follow up by email to schedule a call.',
      infoTitle: 'Infinity AI Cloud Solutions',
      infoSubtitle: 'Your automation and applied AI partner.',
      infoItems: [
        { icon: 'mail', label: 'hello@infinitycloudsolutions.com' },
        { icon: 'call', label: '+52 55 0000 0000' },
        { icon: 'location_on', label: 'Mexico City, MX' },
      ],
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        phone: 'Phone',
        message: 'Message',
      },
      submit: 'Send message',
      loading: 'Sending...',
      success: 'Message sent. We will contact you soon.',
      error: 'Message could not be sent. Please try again.',
    },
    footer: {
      tagline: 'Automation, AI, and growth for high-performance teams.',
      privacy: 'Privacy',
      terms: 'Terms',
      rights: '© 2025 Infinity AI Cloud Solutions',
      madeIn: 'Made in Mexico 🇲🇽',
      chatCta: 'Talk to an expert',
    },
  },
} as const

export default translations
