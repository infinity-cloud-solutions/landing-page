export type Locale = "es" | "en";

export const translations = {
  es: {
    nav: {
      services: "Servicios",
      process: "Proceso",
      results: "Resultados",
      about: "Nosotros",
      contact: "Contacto",
      cta: "Agenda tu consulta"
    },
    hero: {
      badge: "Automatización e IA para PyMEs en México",
      title: "Hacemos que tu negocio opere mejor con automatización inteligente",
      subtitle:
        "Diseñamos, implementamos y optimizamos flujos con IA para ahorrar tiempo, reducir costos y acelerar crecimiento.",
      primaryCta: "Enviar mensaje",
      secondaryCta: "Ver servicios",
      trust: ["+2 años en el mercado", "Implementación end-to-end", "Enfoque práctico para PyMEs"]
    },
    services: {
      eyebrow: "Qué hacemos",
      title: "Servicios diseñados para impacto real",
      intro:
        "Soluciones aplicadas que conectan operación, ventas y atención para que tu equipo haga más con menos fricción.",
      items: [
        {
          title: "Asistentes con IA",
          description: "Chatbots y asistentes internos para atención, soporte y operación diaria."
        },
        {
          title: "Automatización de procesos",
          description: "Flujos automáticos entre formularios, CRM, correo, hojas de cálculo y más."
        },
        {
          title: "Analítica y tableros",
          description: "Visibilidad de KPIs en tiempo real para tomar decisiones con datos."
        },
        {
          title: "Soluciones a medida",
          description: "Arquitectura e integración personalizada para retos específicos de tu negocio."
        }
      ]
    },
    process: {
      eyebrow: "Cómo trabajamos",
      title: "Un proceso claro, rápido y medible",
      steps: [
        {
          title: "Diagnóstico",
          description: "Mapeamos tus procesos actuales e identificamos cuellos de botella prioritarios."
        },
        {
          title: "Diseño",
          description: "Definimos la arquitectura y el plan de implementación orientado a resultados."
        },
        {
          title: "Implementación",
          description: "Construimos, integramos y documentamos la solución en tu operación real."
        },
        {
          title: "Optimización",
          description: "Medimos impacto y ajustamos para mejorar rendimiento de forma continua."
        }
      ]
    },
    results: {
      eyebrow: "Resultados",
      title: "Transformación operativa que sí se nota",
      metrics: [
        { label: "Horas ahorradas por semana", value: 35, suffix: "+" },
        { label: "Reducción de tareas manuales", value: 60, suffix: "%" },
        { label: "Tiempo de respuesta más rápido", value: 4, suffix: "x" }
      ],
      testimonials: [
        {
          quote:
            "Pasamos de procesos dispersos a una operación conectada. El impacto fue visible en semanas.",
          author: "Cliente PyME",
          role: "Dirección Operativa"
        },
        {
          quote:
            "La implementación fue clara y sin fricción. Ahora tenemos control y trazabilidad en cada flujo.",
          author: "Cliente Servicios",
          role: "Gerencia General"
        }
      ]
    },
    about: {
      eyebrow: "Por qué Infinity Cloud Solutions",
      title: "Tecnología aplicada con contexto local",
      story:
        "Somos un equipo especializado en automatización e IA para pequeñas y medianas empresas en México. Combinamos visión estratégica y ejecución técnica para resolver problemas de negocio concretos.",
      differentiators: [
        "Enfoque práctico: priorizamos valor antes que complejidad",
        "Acompañamiento cercano durante toda la implementación",
        "Soluciones escalables adaptadas al mercado mexicano"
      ]
    },
    contact: {
      eyebrow: "Contacto",
      title: "Cuéntanos tu reto y te contactamos",
      description:
        "Envíanos un mensaje y nuestro equipo te responderá por correo para iniciar la conversación.",
      fields: {
        name: "Nombre",
        email: "Correo electrónico",
        company: "Empresa",
        phone: "Teléfono",
        message: "Mensaje"
      },
      submit: "Enviar mensaje",
      loading: "Enviando...",
      success: "Mensaje enviado. Te contactaremos pronto.",
      error: "No se pudo enviar tu mensaje. Intenta de nuevo."
    },
    footer: {
      tagline: "Automatización e IA para PyMEs en México",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      services: "Services",
      process: "Process",
      results: "Results",
      about: "About",
      contact: "Contact",
      cta: "Book a consultation"
    },
    hero: {
      badge: "Automation and AI for small businesses in Mexico",
      title: "We help your business run smarter with purposeful automation",
      subtitle:
        "We design, implement, and optimize AI-powered workflows to save time, cut costs, and unlock growth.",
      primaryCta: "Send message",
      secondaryCta: "View services",
      trust: ["2+ years in market", "End-to-end implementation", "Practical SMB-focused approach"]
    },
    services: {
      eyebrow: "What we do",
      title: "Services designed for measurable impact",
      intro:
        "Applied solutions that connect operations, sales, and support so your team can do more with less friction.",
      items: [
        {
          title: "AI Assistants",
          description: "Chatbots and internal assistants for customer service, support, and daily operations."
        },
        {
          title: "Process Automation",
          description: "Automated flows across forms, CRM, email, spreadsheets, and business tools."
        },
        {
          title: "Analytics & Dashboards",
          description: "Real-time KPI visibility for faster, better decision-making."
        },
        {
          title: "Custom Solutions",
          description: "Tailored architecture and integrations for your most specific business challenges."
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      title: "A clear, fast, and measurable process",
      steps: [
        {
          title: "Discovery",
          description: "We map your current workflows and identify the highest-impact bottlenecks."
        },
        {
          title: "Design",
          description: "We define architecture and an implementation roadmap focused on outcomes."
        },
        {
          title: "Implementation",
          description: "We build, integrate, and document the solution in your real operation."
        },
        {
          title: "Optimization",
          description: "We measure impact and iterate continuously to improve performance."
        }
      ]
    },
    results: {
      eyebrow: "Results",
      title: "Operational transformation you can actually feel",
      metrics: [
        { label: "Hours saved per week", value: 35, suffix: "+" },
        { label: "Manual tasks reduced", value: 60, suffix: "%" },
        { label: "Faster response time", value: 4, suffix: "x" }
      ],
      testimonials: [
        {
          quote:
            "We moved from fragmented operations to connected systems. The impact was visible in weeks.",
          author: "SMB Client",
          role: "Operations Director"
        },
        {
          quote:
            "Implementation was clear and frictionless. We now have visibility and traceability across every flow.",
          author: "Services Client",
          role: "General Manager"
        }
      ]
    },
    about: {
      eyebrow: "Why Infinity Cloud Solutions",
      title: "Applied technology with local market context",
      story:
        "We are a team specialized in automation and AI for small and medium businesses in Mexico. We combine strategic vision with technical execution to solve concrete business problems.",
      differentiators: [
        "Practical-first approach: value before complexity",
        "Close collaboration from kickoff to handoff",
        "Scalable solutions adapted to the Mexican market"
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Share your challenge and we will reach out",
      description:
        "Send us a message and our team will reply by email to start the conversation.",
      fields: {
        name: "Name",
        email: "Email",
        company: "Company",
        phone: "Phone",
        message: "Message"
      },
      submit: "Send message",
      loading: "Sending...",
      success: "Message sent. We will contact you soon.",
      error: "We could not send your message. Please try again."
    },
    footer: {
      tagline: "Automation and AI for small businesses in Mexico",
      rights: "All rights reserved."
    }
  }
} as const

export default translations
