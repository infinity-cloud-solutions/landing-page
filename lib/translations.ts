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
      title: 'TU NEGOCIO TRABAJA',
      titleTop: 'TU NEGOCIO TRABAJA',
      titleReveal: 'aunque tú no estés',
      subtitle:
        'Eliminamos el trabajo manual que frena tu negocio — para que crezcas sin contratar más.',
      primaryCta: 'Habla con un experto',
      secondaryCta: 'Ver servicios',
      trust: ['+120 proyectos entregados', 'Soluciones activas en +12 industrias', 'Resultados medibles desde la semana 2'],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Herramientas de IA que hacen el trabajo pesado por ti',
      intro:
        'Herramientas prácticas que ahorran tiempo, eliminan errores y hacen crecer tu negocio.',
      items: [
        {
          title: 'Soporte en Automático',
          description: 'Responde a tus clientes al instante, sin contratar más personal.',
        },
        {
          title: 'Adiós a la Captura Manual',
          description: 'Tus sistemas se sincronizan solos. Cero transferencias a mano.',
        },
        {
          title: 'Conoce tus Números Primero',
          description: 'Ve qué funciona y qué te cuesta dinero antes de que sea tarde.',
        },
        {
          title: 'Opera 24/7, Sin Contratar',
          description: 'Tareas repetitivas que se ejecutan solas, de día y de noche.',
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
          description: 'Definimos exactamente qué automatizar y cómo, con un plan claro y sin sorpresas.',
        },
        {
          title: 'Implementación',
          description: 'Construimos e integramos tus automatizaciones para que funcionen de inmediato.',
        },
        {
          title: 'Escalamiento',
          description: 'Medimos resultados y ajustamos para que sigas creciendo sin reiniciar desde cero.',
        },
      ],
    },
    results: {
      eyebrow: 'Resultados',
      title: 'Métricas reales de eficiencia y crecimiento',
      caseStudyLabel: 'Caso real',
      metrics: [
        { label: 'Horas ahorradas por semana', value: 35, suffix: '+' },
        { label: 'Reducción de costos operativos', value: 60, suffix: '%' },
        { label: 'Velocidad de entrega', value: 4, suffix: 'x' },
        { label: 'Disponibilidad de flujos', value: 24, suffix: '/7' },
      ],
      testimonial: {
        quote:
          'Antes vivíamos apagando incendios. Hoy recuperamos más de 35 horas a la semana y redujimos costos en un 60% — en menos de 8 semanas.',
        author: 'Ricardo Hernández',
        role: 'Director General, Productos Ortopédicos HRR',
        challengeLabel: 'El reto',
        resultLabel: 'El resultado',
        challenge:
          'Pedidos gestionados en WhatsApp, datos duplicados en hojas de cálculo y sin visibilidad real de qué entraba y qué salía. Cada semana era apagar incendios.',
        outcome:
          'Operación confiable, escalable y medible. Más de 35 horas semanales recuperadas y costos operativos reducidos en un 60%.',
        duration: '8 semanas',
        attribution: 'Director General · Productos Ortopédicos HRR · México',
      },
    },
    about: {
      eyebrow: 'Por qué Infinity',
      title: 'Tu operación, en manos de expertos que conocen México',
      cards: [
        {
          title: 'Hecho en México 🇲🇽',
          description: 'Conocemos el contexto operativo local y construimos con cercanía real.',
          icon: 'flag',
        },
        {
          title: 'Cercanía y Acompañamiento',
          description: 'Tienes a alguien real que responde tus preguntas, no un ticket de soporte.',
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
      title: 'Hablemos sobre tu negocio',
      description: 'Rellena el formulario. Un experto te contacta en menos de 24 horas para agendar una llamada gratuita.',
      infoTitle: 'Infinity AI Cloud Solutions',
      infoSubtitle: 'Tu equipo de IA y automatización, en México.',
      infoItems: [
        { icon: 'mail', label: 'hola@infinitycloudsolutions.com', href: 'mailto:hola@infinitycloudsolutions.com' },
        { icon: 'chat', label: 'WhatsApp · +52 55 XXXX XXXX', href: 'https://wa.me/52XXXXXXXXXX' },
        { icon: 'location_on', label: 'Ciudad de México, MX', href: '' },
      ],
      fields: {
        name: 'Nombre',
        email: 'Correo electrónico',
        company: 'Empresa',
        phone: 'Teléfono',
        message: 'Mensaje',
      },
      submit: 'Agendar llamada gratuita',
      loading: 'Enviando...',
      success: '¡Mensaje enviado! Te contactamos en las próximas 24 horas.',
      error: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Todo lo que necesitas saber antes de empezar',
      items: [
        {
          q: '¿Cuánto tiempo tarda la implementación?',
          a: 'La mayoría de los proyectos se implementan en 4 a 8 semanas. Empezamos con un diagnóstico de 1 semana, y los primeros flujos automatizados suelen estar activos desde la semana 2.',
        },
        {
          q: '¿Necesito conocimientos técnicos para trabajar con ustedes?',
          a: 'No. Tú nos explicas cómo funciona tu negocio y nosotros nos encargamos de todo lo técnico. Al final recibes un sistema listo para usar, con capacitación incluida.',
        },
        {
          q: '¿Cuánto cuesta automatizar mi negocio?',
          a: 'Cada proyecto es diferente según su alcance y complejidad. Comenzamos con un diagnóstico gratuito para entender tu operación y presentarte una propuesta clara con costo definido, sin sorpresas.',
        },
        {
          q: '¿Con qué herramientas trabajan?',
          a: 'Nos integramos con las herramientas que ya usas: WhatsApp, Google Workspace, CRMs, ERPs, sistemas de facturación y más. No necesitas cambiar lo que ya funciona.',
        },
        {
          q: '¿Qué pasa si algo falla después de la entrega?',
          a: 'Incluimos soporte post-implementación en todos los proyectos. Tienes un contacto directo para cualquier incidencia, sin tickets ni tiempos de espera largos.',
        },
        {
          q: '¿Solo trabajan con empresas grandes?',
          a: 'Trabajamos principalmente con PyMEs. Nuestras soluciones están diseñadas para el tamaño y contexto operativo de los negocios medianos y pequeños en México.',
        },
      ],
    },
    footer: {
      tagline: 'Tecnología que trabaja por ti, para que tu negocio crezca sin caos.',
      privacy: 'Privacidad',
      terms: 'Términos',
      rights: '© 2026 Infinity AI Cloud Solutions',
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
      title: 'YOUR BUSINESS RUNS',
      titleTop: 'YOUR BUSINESS RUNS',
      titleReveal: 'even when you\'re not there',
      subtitle:
        'We eliminate the manual work holding your business back — so you can grow without hiring more.',
      primaryCta: 'Talk to an expert',
      secondaryCta: 'View services',
      trust: ['120+ projects delivered', 'Active in 12+ industries', 'Results from week 2'],
    },
    services: {
      eyebrow: 'Services',
      title: 'AI tools that do the heavy lifting for you',
      intro:
        'Practical tools that save time, eliminate errors, and grow your business.',
      items: [
        {
          title: 'Support on Autopilot',
          description: 'Respond to customers instantly — no extra staff needed.',
        },
        {
          title: 'No More Manual Data Entry',
          description: 'Your systems sync automatically. Zero manual handoffs.',
        },
        {
          title: 'Know Your Numbers First',
          description: "See what's working — and what's costing you — before it's too late.",
        },
        {
          title: '24/7 Operations, No Hiring',
          description: 'Repetitive tasks that run themselves, day and night.',
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
          description: 'We define exactly what to automate and how, with a clear plan and no surprises.',
        },
        {
          title: 'Implementation',
          description: 'We build and integrate your automations so they work from day one.',
        },
        {
          title: 'Scale',
          description: 'We measure results and adjust so you keep growing without starting over.',
        },
      ],
    },
    results: {
      eyebrow: 'Results',
      title: 'Real efficiency and growth metrics',
      caseStudyLabel: 'Client case',
      metrics: [
        { label: 'Hours saved per week', value: 35, suffix: '+' },
        { label: 'Operational cost reduction', value: 60, suffix: '%' },
        { label: 'Delivery speed', value: 4, suffix: 'x' },
        { label: 'Workflow availability', value: 24, suffix: '/7' },
      ],
      testimonial: {
        quote:
          'We used to spend every week firefighting. Now we recovered 35+ hours a week and cut costs by 60% — in under 8 weeks.',
        author: 'Ricardo Hernández',
        role: 'General Director, Productos Ortopédicos HRR',
        challengeLabel: 'The Challenge',
        resultLabel: 'The Result',
        challenge:
          'Orders managed over WhatsApp, duplicated data across spreadsheets, and no real visibility into what was coming in or going out. Every week was firefighting.',
        outcome:
          'Reliable, scalable, measurable system. 35+ weekly hours recovered and 60% reduction in operational costs.',
        duration: '8 weeks',
        attribution: 'General Director · Productos Ortopédicos HRR · Mexico',
      },
    },
    about: {
      eyebrow: 'Why Infinity',
      title: 'Your operation, in the hands of experts who know Mexico',
      cards: [
        {
          title: 'Made in Mexico 🇲🇽',
          description: 'We understand local operations and build with practical proximity.',
          icon: 'flag',
        },
        {
          title: 'Close Partnership',
          description: 'You have a real person answering your questions — not a support ticket.',
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
      title: "Let's talk about your business",
      description: 'Fill in the form. An expert will reach out within 24 hours to schedule your free call.',
      infoTitle: 'Infinity AI Cloud Solutions',
      infoSubtitle: 'Your AI and automation team, based in Mexico.',
      infoItems: [
        { icon: 'mail', label: 'hello@infinitycloudsolutions.com', href: 'mailto:hello@infinitycloudsolutions.com' },
        { icon: 'chat', label: 'WhatsApp · +52 55 XXXX XXXX', href: 'https://wa.me/52XXXXXXXXXX' },
        { icon: 'location_on', label: 'Mexico City, MX', href: '' },
      ],
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        phone: 'Phone',
        message: 'Message',
      },
      submit: 'Schedule a free call',
      loading: 'Sending...',
      success: "Message sent! You'll hear from us within 24 hours.",
      error: 'Message could not be sent. Please try again or email us directly.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Everything you need to know before starting',
      items: [
        {
          q: 'How long does implementation take?',
          a: 'Most projects go live in 4 to 8 weeks. We start with a 1-week discovery, and the first automated workflows are typically running by week 2.',
        },
        {
          q: 'Do I need technical knowledge to work with you?',
          a: 'No. You explain how your business works and we handle everything technical. You receive a ready-to-use system with training included.',
        },
        {
          q: 'How much does automating my business cost?',
          a: 'Every project is different depending on scope and complexity. We start with a free discovery to understand your operation and give you a clear proposal with a defined cost — no surprises.',
        },
        {
          q: 'What tools do you work with?',
          a: 'We integrate with the tools you already use: WhatsApp, Google Workspace, CRMs, ERPs, invoicing systems, and more. No need to replace what already works.',
        },
        {
          q: 'What happens if something breaks after delivery?',
          a: 'Post-implementation support is included in all projects. You have a direct contact for any issue — no tickets, no long waits.',
        },
        {
          q: 'Do you only work with large companies?',
          a: 'We work primarily with SMBs. Our solutions are designed for the size and operational context of small and medium businesses in Mexico.',
        },
      ],
    },
    footer: {
      tagline: 'Technology that works for you — so your business scales without the chaos.',
      privacy: 'Privacy',
      terms: 'Terms',
      rights: '© 2026 Infinity AI Cloud Solutions',
      madeIn: 'Made in Mexico 🇲🇽',
      chatCta: 'Talk to an expert',
    },
  },
} as const

export default translations
