import { add, sub } from 'date-fns';

export const jobs = [
  {
    name: 'Soporte tecnico',
    requirements:
      'Conocimiento de Excel. Experiencia previa en el área y buen manejo de quipos de trabajo',
    benefits: 'Posibilidad de crecimiento dentro de la empresa',
    objectives:
      'Asistir en las actividades administrativas del día a día. Manejo de herramientas de PC como excel, word, mail, trello, jira. Atención al cliente por teléfono. ',
    responsibilities: 'Atención al cliente',
    start_date: sub(new Date(), { months: 5, days: 1 }),
    end_date: sub(new Date(), { months: 1, days: 1 }),
    status: 'closed',
    full_time: false,
    presency: 'remote',
    salary_range_low: 100,
    salary_range_high: 300,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Dirección',
    requirements:
      'Experiencia previa. Buen manejo de grupos. Organiazación y productividad',
    benefits: 'Salario. Gimnacio. Aportes',
    objectives: 'Dirigir el sector de empleados.',
    responsibilities:
      'Tareas diarias de coordinación. Dirección, liderazgo, organización, coordinación de eventos. Deberá responder ante las necesidades de los empleados y resolver los problemas que se presenten',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 9, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 400,
    salary_range_high: 900,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Voluntariado',
    requirements: 'Ganas de ayudar',
    benefits: 'Gran experiencia en el area de voluntareado',
    objectives: 'Participar de actividades de Techo como voluntario',
    responsibilities: 'Voluntariado',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 2, days: 7 }),
    status: 'open',
    full_time: false,
    presency: 'full_presency',
    salary_range_low: 0,
    salary_range_high: 0,
    condition: 'volunteer',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Tech-leader',
    requirements: 'Conocimientos de JS, React y Redux',
    benefits:
      'Posibilidad de crecimiento en la empresa. Descuentos en gimnacio',
    objectives: 'Dirigir el equipo de tecnología',
    responsibilities:
      'Dirección de equipos de desarrollo tecnológico. Participación en decisiones generales en relación al área. Manejo de reuniones diarias para control de actividades del equipo. Mantenimiento de la página web de TECHO y manejo del grupo de desarrolladores con sprints semanales y reuniones diarias',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 4, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'remote',
    salary_range_low: 500,
    salary_range_high: 700,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Community Manager',
    requirements:
      'Experiencia previa en el área, manejo de ilustrator para creación de material, disponibilidad horaria full-time. Creatividad y buen manejo de diseños',
    benefits: 'Aportes',
    objectives: 'Colaborar en el equipo de community managment',
    responsibilities:
      'Manejo de las redes. Armado de flyers y material de difusión. Planificación diaria de posteo de material y contenido de las redes sociales. Mejora del material de marca y rediseño de flyers y mockUps',
    start_date: sub(new Date(), { months: 2, days: 1 }),
    end_date: add(new Date(), { months: 1, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'semi_presency',
    salary_range_low: 200,
    salary_range_high: 400,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Catering',
    requirements: 'Experiencia previa en el área',
    benefits: 'obra social',
    objectives: 'Manejar el catering de la empresa en eventos',
    responsibilities:
      'Ser parte del equipo de catering. Cocinar para grupos grandes de personas. Elavorar recetas simples de llevar a cabo en grandes grupos y eventos. Coordinación del grupo de cocineros y voluntarios en el área de la cocina',
    start_date: sub(new Date(), { months: 2, days: 4 }),
    end_date: add(new Date(), { months: 6, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 10000,
    salary_range_high: 15000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Secretaría',
    requirements: 'Manejo de office con experiencia previa',
    benefits: 'Obra social',
    objectives: 'Atención al público',
    responsibilities:
      'Manejo de distintos medios de comunicación con los clientes: teléfono, mail, redes sociales, etc. Actualización de datos en la redes sociales. Horario estricto para atención al público.',
    start_date: sub(new Date(), { months: 4, days: 4 }),
    end_date: add(new Date(), { months: 9, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 30000,
    salary_range_high: 35000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Mantenimiento en Electricidad',
    requirements:
      'Experiencia previa y certificacion de electricista. Independencia para transportarse. Equipamiento propio',
    benefits: 'Obra social, aportes y bono por puntualidad',
    objectives: 'Mantenimiento de los distintos edificios de la organización',
    responsibilities:
      'Mantenimiento y arreglo de la conexión eléctrica en los distintos edificios según la necesidad. Flexibilidad de transporte dentro del área asignada y posibilidad de crecimiento con la toma de nuevas áreas.',
    start_date: sub(new Date(), { months: 0, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 0,
    salary_range_high: 0,
    condition: 'volunteer',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Recruiting',
    requirements: 'Certificado de recursos humanos',
    benefits: 'Obra social',
    objectives: 'Persona encargada de la seleccion de voluntarios y empleados',
    responsibilities:
      'Selección de voluntarios para las distintas tareas. Manejo de entrevistas para nuevos empleados',
    start_date: sub(new Date(), { months: 0, days: 4 }),
    status: 'closed',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 45000,
    salary_range_high: 46000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Seguridad',
    requirements: 'Portacion arma legal y certificado de seguridad',
    benefits: 'Salario y aportes',
    objectives: 'Encargarse de la seguridad del personal',
    responsibilities:
      'Asegurar la seguridad de los empleados y voluntarios en diversos eventos',
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 37402,
    salary_range_high: 67093,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Voluntariado',
    requirements: 'Ganas de ayudar',
    benefits: 'Gran experiencia en el area de voluntareado',
    objectives: 'Participar de actividades de Techo como voluntario',
    responsibilities: 'Voluntariado',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 2, days: 7 }),
    status: 'open',
    full_time: false,
    presency: 'full_presency',
    salary_range_low: 0,
    salary_range_high: 0,
    condition: 'volunteer',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Secretaría',
    requirements: 'Manejo de office con experiencia previa',
    benefits: 'Obra social',
    objectives: 'Atención al público',
    responsibilities:
      'Manejo de distintos medios de comunicación con los clientes: teléfono, mail, redes sociales, etc. Actualización de datos en la redes sociales.',
    start_date: sub(new Date(), { months: 3, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 30000,
    salary_range_high: 35000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Secretaría',
    requirements: 'Manejo de office con experiencia previa',
    benefits: 'Obra social',
    objectives: 'Atención al público',
    responsibilities:
      'Manejo de distintos medios de comunicación con los clientes: teléfono, mail, redes sociales, etc. Actualización de datos en la redes sociales.',
    start_date: sub(new Date(), { months: 3, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 30000,
    salary_range_high: 35000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Tech-leader',
    requirements: 'Conocimientos de JS, React y Redux',
    benefits:
      'Posibilidad de crecimiento en la empresa. Descuentos en gimnacio',
    objectives: 'Dirigir el equipo de tecnología',
    responsibilities:
      'Dirección de equipos de desarrollo tecnológico. Participación en decisiones generales en relación al área. Manejo de reuniones diarias para control de actividades del equipo. Mantenimiento de la página web de TECHO y manejo del grupo de desarrolladores con sprints semanales y reuniones diarias',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 4, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'remote',
    salary_range_low: 500,
    salary_range_high: 700,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Asistencia',
    requirements: 'Certificado de recursos humanos',
    benefits: 'Obra social',
    objectives: 'Persona encargada de la seleccion de voluntarios y empleados',
    responsibilities:
      'Selección de voluntarios para las distintas tareas. Manejo de entrevistas para nuevos empleados',
    start_date: sub(new Date(), { months: 3, days: 4 }),
    status: 'closed',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 45000,
    salary_range_high: 46000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Seguridad',
    requirements: 'Certificado de recursos humanos',
    benefits: 'Obra social',
    objectives:
      'Persona encargada de la seguridad y custodia de los mepleados del edificio ',
    responsibilities:
      'Selección de voluntarios para las distintas tareas. Manejo de entrevistas para nuevos empleados',
    start_date: sub(new Date(), { months: 3, days: 4 }),
    status: 'closed',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 45000,
    salary_range_high: 46000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Seguridad',
    requirements: 'Certificado de recursos humanos',
    benefits: 'Obra social',
    objectives:
      'Persona encargada de la seguridad y custodia de los mepleados del edificio ',
    responsibilities:
      'Selección de voluntarios para las distintas tareas. Manejo de entrevistas para nuevos empleados',
    start_date: sub(new Date(), { months: 3, days: 4 }),
    status: 'closed',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 45000,
    salary_range_high: 46000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Catering',
    requirements: 'Experiencia previa en el área',
    benefits: 'obra social',
    objectives: 'Manejar el catering de la empresa en eventos',
    responsibilities:
      'Ser parte del equipo de catering. Cocinar para grupos grandes de personas. Elavorar recetas simples de llevar a cabo en grandes grupos y eventos.',
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 10000,
    salary_range_high: 15000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Secretaría',
    requirements: 'Manejo de office con experiencia previa',
    benefits: 'Obra social',
    objectives: 'Atención al público',
    responsibilities:
      'Manejo de distintos medios de comunicación con los clientes: teléfono, mail, redes sociales, etc. Actualización de datos en la redes sociales.',
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 30000,
    salary_range_high: 35000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Mantenimiento en Electricidad',
    requirements:
      'Experiencia previa y certificacion de electricista. Independencia para transportarse. Equipamiento propio',
    benefits: 'Obra social, aportes y bono por puntualidad',
    objectives: 'Mantenimiento de los distintos edificios de la organización',
    responsibilities:
      'Mantenimiento y arreglo de la conexión eléctrica en los distintos edificios según la necesidad. Flexibilidad de transporte dentro del área asignada y posibilidad de crecimiento con la toma de nuevas áreas.',
    start_date: sub(new Date(), { months: 0, days: 4 }),
    end_date: add(new Date(), { months: 3, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 0,
    salary_range_high: 0,
    condition: 'volunteer',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Soporte tecnico',
    requirements:
      'Conocimiento de Excel. Experiencia previa en el área y buen manejo de quipos de trabajo',
    benefits: 'Posibilidad de crecimiento dentro de la empresa',
    objectives:
      'Asistir en las actividades administrativas del día a día. Manejo de herramientas de PC como excel, word, mail, trello, jira. Atención al cliente por teléfono. ',
    responsibilities: 'Atención al cliente',
    start_date: sub(new Date(), { months: 5, days: 1 }),
    end_date: sub(new Date(), { months: 1, days: 1 }),
    status: 'closed',
    full_time: false,
    presency: 'remote',
    salary_range_low: 100,
    salary_range_high: 300,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Dirección',
    requirements:
      'Experiencia previa. Buen manejo de grupos. Organiazación y productividad',
    benefits: 'Salario. Gimnacio. Aportes',
    objectives: 'Dirigir el sector de empleados.',
    responsibilities:
      'Tareas diarias de coordinación. Dirección, liderazgo, organización, coordinación de eventos. Deberá responder ante las necesidades de los empleados y resolver los problemas que se presenten',
    start_date: sub(new Date(), { months: 1, days: 1 }),
    end_date: add(new Date(), { months: 9, days: 7 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 400,
    salary_range_high: 900,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Coordinación de Gestión de Proyectos',
    requirements: `
      Profesional graduado/a o en último año de ingeniería, arquitectura, logística o carreras afines. Experiencia en gestión de proyectos y personas.
      Experiencia en diseño y gestión de proyectos sociales. Conocimientos de vivienda, hábitat, habitabilidad y desarrollo social. Conocimiento en
      herramientas de diseño arquitectónico. (Autocad, Google sketchup y Revit (deseable no indispensable)
      `,
    benefits: 'Salario. Gimnasio. Aportes',
    objectives: `
      Liderar la ejecución de los proyectos de vivienda
      y hábitat a nivel nacional, garantizando el diseño,
      la calidad y la ejecución en tiempo de las
      actividades planificadas.
      Consolidar un equipo que responda a las
      necesidades del país
      Solicitud y seguimiento de materiales y
      herramientas para los proyectos de
      infraestructura comunitaria
      Encargado de la evaluación de los proyectos
      ejecutados
      Liderar junto a la coordinación de compras y
      contabilidad, la estrategia de proveeduría para el
      abastecimiento de materiales
      Generar alianzas con proveedores que permitan
      brindar materiales de calidad y una reducción de
      costos a la vez.
      Realizar informes de los proyectos al finalizar,
      para tener documentación adecuada sobre la
      planificación y ejecución de los mismos par la
      rendición de cuentas
      Ingles medio (no indispensable)
      Manejo de herramientas básicas de Microsoft Office, Drive. Herramientas presupuestarias y de gestión de proyectos
      Permanencia de un mínimo de 1 año en el rol
      `,
    responsibilities: `
      Liderar la ejecución de los proyectos de vivienda
      y hábitat a nivel nacional, garantizando el diseño,
      la calidad y la ejecución en tiempo de las
      actividades planificadas.
      Consolidar un equipo que responda a las
      necesidades del país
      Solicitud y seguimiento de materiales y
      herramientas para los proyectos de
      infraestructura comunitaria
      Encargado de la evaluación de los proyectos
      ejecutados
      Liderar junto a la coordinación de compras y
      contabilidad, la estrategia de proveeduría para el
      abastecimiento de materiales
      Generar alianzas con proveedores que permitan
      brindar materiales de calidad y una reducción de
      costos a la vez.
      Realizar informes de los proyectos al finalizar,
      para tener documentación adecuada sobre la
      planificación y ejecución de los mismos par la
      rendición de cuentas
      `,
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 5, days: 1 }),
    status: 'open',
    full_time: false,
    presency: 'remote',
    salary_range_low: 1000,
    salary_range_high: 2000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Dirección Comercial',
    requirements: `
        Mínimo de 3 años de experiencia relacionada y / o capacitación en recaudación de fondos estratégica en organizaciones sin fines de lucro; o una
        combinación equivalente de educación y experiencia.
        Profesional universitario graduado (o con cierre de pensum) en Economía, administración de empresas, mercadeo o carreras afines.    
        Experiencia comprobada en la construcción de patrocinios / relaciones corporativas sostenibles a más de $ 10,000
        Manejo de KPI financieros y flujos de ingresos.
        Mentalidad estratégica, innovadora y orientada a resultados
        Conocimiento y manejo de marketing digital
        Experiencia liderando equipos de trabajo
        Excelentes habilidades interpersonales, de comunicación y negociación; experto en redes y hablar en público. Cartera de Contactos - (Deseable)
        Inglés avanzado
      `,
    benefits: 'Salario. Gimnasio. Aportes',
    objectives: `
        Liderar la ejecución de los proyectos de vivienda
        y hábitat a nivel nacional, garantizando el diseño,
        la calidad y la ejecución en tiempo de las
        actividades planificadas.
        Consolidar un equipo que responda a las
        necesidades del país
        Solicitud y seguimiento de materiales y
        herramientas para los proyectos de
        infraestructura comunitaria
        Encargado de la evaluación de los proyectos
        ejecutados
        Liderar junto a la coordinación de compras y
        contabilidad, la estrategia de proveeduría para el
        abastecimiento de materiales
        Generar alianzas con proveedores que permitan
        brindar materiales de calidad y una reducción de
        costos a la vez.
        Realizar informes de los proyectos al finalizar,
        para tener documentación adecuada sobre la
        planificación y ejecución de los mismos par la
        rendición de cuentas
        Ingles medio (no indispensable)
        Manejo de herramientas básicas de Microsoft Office, Drive. Herramientas presupuestarias y de gestión de proyectos
        Permanencia de un mínimo de 1 año en el rol
      `,
    responsibilities: `
        Trabajar con el equipo pais y la Gerencia Centroamerica para identificar
        las necesidades y los objetivos de financiación, y diseñar estrategias de
        desarrollo que conduzcan a un flujo de financiación sostenible y
        diversificado.
        Crear e implementar junto a la Gerencia General de Centroamérica y la
        Dirección General país una estrategia de recaudación de fondos que
        incluya donaciones individuales e importantes, fundaciones,
        corporaciones y entidades gubernamentales que se adapte a los
        objetivos de crecimiento en expansión de TECHO.
        Administrar y mejorar la infraestructura de recaudación de fondos de
        TECHO pais y garantizar que el equipo, los sistemas, los procesos y las
        actividades satisfagan las necesidades de desarrollo en curso.
        Trabajar con miembros del equipo, y en algunos casos gestionarlos
        activamente, para la preparación, redacción de y el diseño de material
        de propuestas, para comercializar y comunicar las iniciativas de TECHO
        de manera que mejore la marca de la organización para segmentos
        clave de donantes.
        Desarrollar e implementar un programa de fidelización dirigido a
        cultivar vínculos más profundos con donantes existentes y potenciales.
        Trabajar con el equipo de finanzas para generar informes y evaluaciones
        de programas para los financiadores.
        Ser portavoz en nombre de la misión de TECHO, aumentando la
        visibilidad y comprensión de su trabajo e impacto.
        Asesorar y desarrollar equipo utilizando un enfoque colaborativo y de
        apoyo de manera constante.  
        Velar por el cumplimiento de las metas de desarrollo,
        responsabilidades, objetivos establecidos, prioridades establecidas,
        revisiones anuales de desempeño con la Dirección Pais y Gerencia
        General de Centroamerica.
      `,
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 5, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 800,
    salary_range_high: 1000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Dirección de Fondos',
    requirements: `
        Mínimo de 3 años de experiencia relacionada y / o capacitación en recaudación de fondos estratégica en organizaciones sin fines de lucro; o una
        combinación equivalente de educación y experiencia.
        Profesional universitario graduado (o con cierre de pensum) en Economía, administración de empresas, mercadeo o carreras afines.    
        Experiencia comprobada en la construcción de patrocinios / relaciones corporativas sostenibles a más de $ 10,000
        Manejo de KPI financieros y flujos de ingresos.
        Mentalidad estratégica, innovadora y orientada a resultados
        Conocimiento y manejo de marketing digital
        Experiencia liderando equipos de trabajo
        Excelentes habilidades interpersonales, de comunicación y negociación; experto en redes y hablar en público. Cartera de Contactos - (Deseable)
        Inglés avanzado
      `,
    benefits: 'Salario. Gimnasio. Aportes',
    objectives: `
        Responsable de la estrategia de recaudación de fondos y alianzas corporativas en el mercado panameño
        -Responsable principal de desarrollar estrategias de levantamiento de fondos a través de donantes individuales y de fidelizar a los socios.
        -Responsable de ejecutar una estrategia de fidelización para mantener nuevas alianzas locales
        -Responsable de mantener actualizado el kit de venta de los programas y proyectos regionales
      `,
    responsibilities: `
        Maximización de la recaudación de fondos de
        cada una de las unidades de financiamiento a
        nivel local, involucrando a individuos y empresas.
        Unidades de financiamiento: Alianzas corporativas
        anuales, eventos y donantes individuales.
        Fidelización de experiencias exitosas junto a
        empresas, generación de nuevos contactos y
        oportunidades de financiamiento locales con una
        visión regional.
        Implementar el plan de socios y la estrategia de
        fidelización del donante, desarrollando estrategias
        de upgrades (aumento de cuota), retención,
        recuperación, captación y conversión.
        Diseño de la estrategia de venta de productos
        relacionados con Alianzas Corporativas Anuales /
        Voluntariado Corporativo Local - con visión
        regional.
        Gestionar las relaciones comerciales locales (y
        regionales que se reciban), velando por la venta
        de proyectos, negociaciones eficaces con las
        empresas y fidelización de cada una de ellas.
        Visión constante de apertura de mercado (nuevas
        empresas).
        Monitoreo y evaluación, en conjunto con la
        Gerencia General, de la ejecución de la
        Planificación Estratégica comercial, del Plan
        Operativo comercial y del Presupuesto.
        Liderar las instancias de reunión de seguimiento
        con la Dirección de Sede y Gerencia General de
        Centroamérica para brindar la información
        actualizada del trabajo realizado.
      `,
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 5, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 800,
    salary_range_high: 1000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Apoyo de Arquitectura para Diagnósticos Inmobiliarios',
    requirements: `
        Manejo básico de Microsoft Office (Word, Excel y Powerpoint).
        Interés y motivación por trabajar con familias en extrema pobreza.
        Manejo de la normativa de arquitectura y construcción
        Manejo de herramientas de arquitectura (Sketchup, Autocad, Adobe suits)
        Manejo de Google Earth
        Disponibilidad de salir a terreno, siempre y cuando el contexto nacional lo permita
        Experiencia en realización de diagnósticos socioterritoriales a diferentes escalas.
        Deseable conocimiento de herramientas innovadoras de diagnóstico socio-territorial
        Deseable conocimiento de las temáticas de pobreza y desigualdad.
        Deseable manejo de la Política Habitacional Chilena
        Área: Ingeniería Civil y Construcción/Arquitectura
        Nivel mínimo de educación: Universitario (Graduado)
      `,
    benefits: 'Salario. Gimnasio. Aportes',
    objectives: `
        Desarrollar  diagnósticos socioterritoriales en diversos campamentos en el norte de Chile, a partir de un trabajo colaborativo con SERVIU, apoyando al equipo de proyectos de la Inmobiliaria Social
    `,
    responsibilities: `
    Analizar características urbanas y factibilidad técnicas desde la arquitectura en terrenos pre-seleccionados para el desarrollo de proyectos habitacionales con SERVIU
    Realizar planimetría de los territorios y campamentos a estudiar para proyectos con SERVIU
    Realizar análisis socio-territoriales a través de trabajo de campo y fuentes secundarias de  terrenos pre-seleccionados a múltiples escalas para proyectos con SERVIU
    Revisar críticamente informes, políticas públicas e Instrumentos Planificación Territorial (IPT) de los proyectos a realizar con SERVIU
    Formular estrategias de proyecto para propuestas urbano-habitacionales en fase inicial de los proyectos a realizar con SERVIU
    Apoyar actividades llevadas a cabo con comunidades con las cuales trabaja la Inmobiliaria Social de TECHO para proyectos SERVIU  
      `,
    start_date: sub(new Date(), { months: 1, days: 4 }),
    end_date: add(new Date(), { months: 5, days: 1 }),
    status: 'open',
    full_time: true,
    presency: 'full_presency',
    salary_range_low: 800,
    salary_range_high: 1000,
    condition: 'contract',
    created_at: new Date(),
    updated_at: new Date(),
  },
];
