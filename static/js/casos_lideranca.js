(() => {
// ============================================================================
// CASOS_LIDERANCA.JS — DISC DASHBOARD
// Biblioteca com 30 Casos Práticos de Liderança
// ============================================================================

// ============================================================================
// BANCO DE CASOS (30 CASOS COMPLETOS)
// ============================================================================

const bancoCasos = [
  {
    "id": 1,
    "perfil": "D",
    "tema": "feedback",
    "complexidade": "intermediario",
    "titulo": "O Líder que Não Aceita Limites",
    "contexto": "Carlos é gerente comercial com perfil D altamente acentuado. Ele é extremamente orientado para resultados e não aceita 'não' como resposta. Recentemente, sua equipe começou a apresentar sinais de burnout: rotatividade aumentou 40% em 6 meses, dois colaboradores pediram transferência alegando 'clima tóxico', e a produtividade caiu 15% apesar da pressão constante. Carlos não entende: 'Eu só cobro resultados, é meu trabalho'. Em reuniões, ele interrompe frequentemente, descarta sugestões sem análise e celebra apenas números, nunca pessoas. O RH precisa intervir.",
    "perguntas": [
      "Quais comportamentos descritos estão prejudicando a liderança de Carlos e que condições os reforçam?",
      "Como dar feedback para um líder D sem gerar resistência?",
      "Que estratégias Carlos pode usar para equilibrar resultados com bem-estar da equipe?",
      "Como adaptar metas para perfis D sem comprometer a humanização da gestão?"
    ],
    "pontosChave": [
      "Separe cobrança legítima de interrupção, humilhação e metas sem recursos.",
      "Use evidências de entrega e escuta da equipe para revisar a forma de gestão.",
      "Ajuste prioridades e condições de trabalho; a letra DISC não explica nem justifica o comportamento."
    ]
  },
  {
    "id": 2,
    "perfil": "D",
    "tema": "delegacao",
    "complexidade": "avancado",
    "titulo": "Delegação ou Abandono?",
    "contexto": "Marina, diretora de operações com perfil D, acredita fortemente em 'empowerment'. Ela delega projetos estratégicos dizendo apenas: 'Resolva e me mostre o resultado'. Não faz follow-ups, não oferece recursos nem orientação. Resultado: 3 projetos falharam no último trimestre por falta de alinhamento estratégico. A equipe se sente perdida, mas Marina interpreta como 'falta de proatividade'. Ela defende: 'Eu dou autonomia total, o problema é que ninguém toma iniciativa'.",
    "perguntas": [
      "Qual é a diferença entre empowerment eficaz e abandono disfarçado?",
      "Como perfis D podem equilibrar autonomia da equipe com suporte necessário?",
      "Que estrutura de delegação seria ideal para Marina implementar?",
      "Como treinar líderes D a fazerem follow-ups sem microgerenciar?"
    ],
    "pontosChave": [
      "Delegar exige resultado esperado, autoridade, recursos e pontos de acompanhamento.",
      "A autonomia deve considerar competências e riscos da tarefa, não somente estilo.",
      "Verifique se a pessoa compreendeu a entrega e sabe onde buscar apoio."
    ]
  },
  {
    "id": 3,
    "perfil": "D",
    "tema": "conflito",
    "complexidade": "basico",
    "titulo": "Confronto Direto Demais",
    "contexto": "Roberto, gerente de TI com perfil D, descobre que um desenvolvedor entregou código com bugs críticos. Em reunião com toda a equipe presente, ele diz em voz alta: 'Marcos, esse código é inaceitável. Você está há 5 anos aqui e entrega isso? Preciso que refaça TUDO até amanhã'. Marcos fica visivelmente constrangido, e o clima da reunião despenca. Depois, dois colegas de Marcos pedem reunião privada com RH relatando 'humilhação pública'.",
    "perguntas": [
      "Por que a abordagem de Roberto foi prejudicial, mesmo que o erro fosse real?",
      "Qual seria a forma correta de um líder D dar feedback negativo?",
      "Como treinar perfis D sobre 'elogiar em público, corrigir em particular'?",
      "Quais consequências esse tipo de comportamento gera a médio prazo?"
    ],
    "pontosChave": [
      "Converse sobre comportamentos observáveis em ambiente apropriado.",
      "Urgência não autoriza exposição humilhante em público.",
      "Combine mudança concreta e acompanhamento, com espaço para ouvir a outra parte."
    ]
  },
  {
    "id": 4,
    "perfil": "D",
    "tema": "mudanca",
    "complexidade": "intermediario",
    "titulo": "Mudança a Toque de Caixa",
    "contexto": "A empresa decide migrar todo o sistema de gestão para uma nova plataforma. Fernanda, diretora com perfil D, anuncia na segunda-feira: 'A partir de sexta-feira, todos usarão o novo sistema. Treinamento é às 16h de quinta, presença obrigatória'. Não houve consulta prévia, período de adaptação ou suporte pós-implementação. Na sexta-feira, o caos se instala: tickets de suporte sobem 300%, erros operacionais disparam, e colaboradores mais antigos ameaçam pedir demissão.",
    "perguntas": [
      "Quais princípios de gestão de mudanças Fernanda ignorou?",
      "Por que perfis D tendem a subestimar resistência a mudanças?",
      "Como comunicar mudanças de forma eficaz para diferentes perfis DISC?",
      "Que plano de ação Fernanda deveria ter feito?"
    ],
    "pontosChave": [
      "Explique razões, impactos e etapas da mudança antes da implantação.",
      "Investigue preocupações em vez de presumir má vontade.",
      "Teste ajustes e ofereça apoio durante a transição."
    ]
  },
  {
    "id": 5,
    "perfil": "D",
    "tema": "motivacao",
    "complexidade": "avancado",
    "titulo": "Competição Tóxica",
    "contexto": "Gustavo, líder comercial com perfil D, implementa um sistema de ranking público semanal. Os 3 melhores vendedores ganham bônus; os 3 piores são 'destacados em vermelho' no mural da empresa. Ele acredita que isso motiva todos a melhorarem. Resultado: colaboradores escondem leads uns dos outros, recusam-se a ajudar colegas e dois vendedores medianos pedem demissão dizendo 'prefiro ganhar menos em um lugar saudável'.",
    "perguntas": [
      "Por que a estratégia de Gustavo fracassou?",
      "Qual a diferença entre competição saudável e competição destrutiva?",
      "Como perfis D podem criar ambientes competitivos sem toxicidade?",
      "Que outros motivadores Gustavo poderia usar além de competição?"
    ],
    "pontosChave": [
      "Examine se os incentivos estimulam colaboração ou competição destrutiva.",
      "Reconheça contribuições individuais sem sabotar objetivos coletivos.",
      "Pergunte o que as pessoas valorizam; preferências não são determinadas por uma letra."
    ]
  },
  {
    "id": 6,
    "perfil": "D",
    "tema": "comunicacao",
    "complexidade": "basico",
    "titulo": "E-mails de Uma Linha",
    "contexto": "Paula, gerente de projetos com perfil D, envia e-mails extremamente curtos: 'Reunião 10h. Compareçam.' ou 'Projeto atrasado. Expliquem.' Ela não dá contexto, não explica objetivos e ignora respostas que fazem perguntas. A equipe se sente perdida e desmotivada. Em pesquisa de clima, 80% dos comentários negativos mencionam 'falta de comunicação clara da gestão'.",
    "perguntas": [
      "Por que a comunicação concisa de Paula é problemática?",
      "Qual o mínimo de informação que uma comunicação eficaz deve ter?",
      "Como treinar perfis D a comunicarem com mais contexto sem perder objetividade?",
      "Que ferramentas podem ajudar Paula a melhorar comunicação?"
    ],
    "pontosChave": [
      "Uma mensagem breve ainda precisa informar objetivo, responsável e prazo.",
      "Peça ao destinatário que confirme o entendimento quando a tarefa for ambígua.",
      "Escolha o nível de detalhe conforme a necessidade da atividade e do interlocutor."
    ]
  },
  {
    "id": 7,
    "perfil": "I",
    "tema": "feedback",
    "complexidade": "intermediario",
    "titulo": "O Líder que Evita Conflitos",
    "contexto": "Juliana, gerente de marketing com perfil I, é adorada pela equipe por ser carismática e positiva. Porém, quando precisa dar feedback negativo, ela adia indefinidamente ou 'disfarça' com elogios exagerados. Um designer está entregando trabalhos abaixo do esperado há 3 meses, mas Juliana nunca abordou diretamente. Agora o RH exige um plano de melhoria formal, e o designer está chocado: 'Ela sempre disse que meu trabalho era ótimo!'",
    "perguntas": [
      "Por que perfis I têm dificuldade em dar feedback negativo?",
      "Quais consequências a evitação de Juliana gerou?",
      "Como ensinar perfis I a darem feedback difícil sem perder a relação?",
      "Qual estrutura de feedback seria ideal para Juliana usar?"
    ],
    "pontosChave": [
      "Adiar feedback reduz a oportunidade de corrigir o problema.",
      "Escuta e respeito são compatíveis com limites e expectativas claras.",
      "Discuta o comportamento descrito sem atribuí-lo automaticamente ao perfil I."
    ]
  },
  {
    "id": 8,
    "perfil": "I",
    "tema": "delegacao",
    "complexidade": "basico",
    "titulo": "Promessas Demais, Entregas de Menos",
    "contexto": "Ricardo, líder de vendas com perfil I, é extremamente entusiasmado. Em reuniões com clientes, ele promete prazos impossíveis sem consultar a equipe. Depois delega tudo dizendo 'Tenho certeza que vocês conseguem!' com um sorriso. A equipe está exausta de fazer horas extras para cumprir promessas irreais de Ricardo. Dois colaboradores já foram ao RH reclamar de 'sobrecarga por compromissos que não criamos'.",
    "perguntas": [
      "Qual comportamento típico de I está causando o problema?",
      "Como perfis I podem equilibrar entusiasmo com realismo?",
      "Que processo Ricardo deveria seguir antes de prometer prazos?",
      "Como a equipe pode estabelecer limites com líderes I sem desmotivá-los?"
    ],
    "pontosChave": [
      "Valide capacidade e prazo com quem executará antes de prometer uma entrega.",
      "Comunicar limites de recursos também é responsabilidade da liderança.",
      "Entusiasmo não substitui planejamento e acordos verificáveis."
    ]
  },
  {
    "id": 9,
    "perfil": "I",
    "tema": "comunicacao",
    "complexidade": "intermediario",
    "titulo": "Reuniões que Não Terminam",
    "contexto": "Camila, gerente de RH com perfil I, adora reuniões. Mas elas sempre desviam do objetivo: ela conta histórias pessoais, faz piadas, pergunta sobre a vida de todos. Uma reunião de 30 minutos dura 2 horas e termina sem decisões claras. A equipe está frustrada porque perde tempo produtivo, e nada se resolve. Colaboradores começam a 'ter compromissos urgentes' para evitar reuniões de Camila.",
    "perguntas": [
      "Por que perfis I têm dificuldade em manter foco em reuniões?",
      "Como Camila pode equilibrar conexão humana com eficiência?",
      "Que estrutura de reunião seria ideal para perfis I seguirem?",
      "Qual papel um facilitador externo poderia ter?"
    ],
    "pontosChave": [
      "Defina objetivo, pauta, tempo e decisões esperadas da reunião.",
      "Reserve interação social sem retirar o espaço de execução e participação.",
      "Finalize com responsáveis e próximos passos registrados."
    ]
  },
  {
    "id": 10,
    "perfil": "I",
    "tema": "conflito",
    "complexidade": "avancado",
    "titulo": "Popularidade Acima da Verdade",
    "contexto": "Lucas, diretor com perfil I, descobre que um colaborador querido por todos está faltando muito e entregando pouco. Mas como ele é carismático e popular, Lucas não toma atitude. Outros colaboradores começam a se ressentir: 'Por que eu me esforço se fulano não faz nada e não acontece nada?'. A cultura de accountability está se deteriorando, mas Lucas teme confrontar o colaborador e 'estragar o clima'.",
    "perguntas": [
      "Qual o conflito interno de Lucas como líder I?",
      "Por que evitar ações disciplinares pode ser mais prejudicial que tomá-las?",
      "Como perfis I podem separar 'gostar da pessoa' de 'avaliar desempenho'?",
      "Que impacto essa situação tem na cultura organizacional?"
    ],
    "pontosChave": [
      "Explicite padrões de entrega e os aplique com coerência.",
      "Investigue recursos e dificuldades antes de atribuir baixo desempenho à pessoa.",
      "Empatia permite conversas difíceis; não significa adiar indefinidamente decisões necessárias."
    ]
  },
  {
    "id": 11,
    "perfil": "I",
    "tema": "motivacao",
    "complexidade": "basico",
    "titulo": "Só Elogios, Sem Desenvolvimento",
    "contexto": "Ana, líder de atendimento com perfil I, elogia todos constantemente: 'Você é incrível!', 'Melhor equipe do mundo!'. Mas nunca oferece feedback específico para crescimento. Na avaliação de desempenho, colaboradores perguntam: 'Em que preciso melhorar?' e Ana responde: 'Nada, você é perfeito!'. Resultado: a equipe não evolui, não sabe onde está seu potencial real, e três talentos saem para 'buscar desafios reais de desenvolvimento'.",
    "perguntas": [
      "Por que elogios genéricos demais são ineficazes?",
      "Qual a diferença entre reconhecimento genuíno e elogios vazios?",
      "Como perfis I podem dar feedback de desenvolvimento mantendo positividade?",
      "Que estrutura de feedback seria equilibrada para Ana usar?"
    ],
    "pontosChave": [
      "Reconhecimento útil descreve uma contribuição concreta e seu impacto.",
      "Feedback de desenvolvimento inclui oportunidades de melhoria e apoio.",
      "Verifique o que a pessoa considera relevante para sua aprendizagem."
    ]
  },
  {
    "id": 12,
    "perfil": "I",
    "tema": "mudanca",
    "complexidade": "intermediario",
    "titulo": "Mudança Empolgante, Planejamento Zero",
    "contexto": "Patrícia, gerente com perfil I, volta de um congresso empolgada com uma nova metodologia ágil. Na segunda-feira, anuncia: 'Vamos mudar tudo! Será incrível!'. Não fez análise de viabilidade, não planejou transição, não treinou ninguém. Após 2 semanas de caos, a metodologia é abandonada silenciosamente. A equipe perde confiança em 'novidades' de Patrícia e passa a ignorar iniciativas futuras.",
    "perguntas": [
      "Por que o entusiasmo de Patrícia se tornou um problema?",
      "Como perfis I podem canalizar entusiasmo para mudanças bem estruturadas?",
      "Que etapas Patrícia deveria ter seguido antes de implementar a mudança?",
      "Como recuperar credibilidade após mudanças malsucedidas?"
    ],
    "pontosChave": [
      "Avalie impactos, recursos e condições de adoção antes de anunciar mudanças.",
      "Um piloto pode testar premissas e revelar necessidade de ajustes.",
      "Acompanhe execução e aprendizagem, além da adesão inicial à ideia."
    ]
  },
  {
    "id": 13,
    "perfil": "S",
    "tema": "feedback",
    "complexidade": "intermediario",
    "titulo": "Guardar Ressentimentos em Silêncio",
    "contexto": "João, supervisor com perfil S, nunca expressa descontentamento. Quando colaboradores entregam atrasado ou com erros, ele apenas diz 'Tudo bem, não se preocupe'. Internamente, está esgotado e ressentido. Após 8 meses, ele explode em uma reunião, listando todas as falhas acumuladas. A equipe fica chocada: 'Por que você nunca disse nada antes?'. O clima de confiança é destruído.",
    "perguntas": [
      "Que fatores podem ter levado João a adiar o feedback, além de suas preferências comportamentais?",
      "Quais riscos o adiamento do feedback e a explosão posterior de João criaram?",
      "Como perfis S podem comunicar insatisfação sem gerar conflito?",
      "Que técnicas de comunicação assertiva ajudariam João?"
    ],
    "pontosChave": [
      "O adiamento de João e a exposição posterior devem ser discutidos como comportamentos.",
      "Converse sobre necessidades e expectativas antes de acumular episódios.",
      "Não conclua que toda pessoa com tendência S evita conflitos."
    ]
  },
  {
    "id": 14,
    "perfil": "S",
    "tema": "delegacao",
    "complexidade": "basico",
    "titulo": "Fazer Tudo Sozinho",
    "contexto": "Maria, coordenadora com perfil S, não delega porque 'não quer incomodar a equipe'. Ela faz horas extras todos os dias, assume tarefas que não são suas e está à beira do burnout. Enquanto isso, sua equipe tem capacidade ociosa e quer contribuir mais, mas Maria sempre responde: 'Já está tudo sob controle'. Produtividade da área está abaixo do potencial e Maria está sendo avaliada como 'gargalo operacional'.",
    "perguntas": [
      "Por que perfis S têm dificuldade em delegar?",
      "Quais prejuízos Maria e sua equipe estão sofrendo?",
      "Como perfis S podem ver delegação como ajuda, não sobrecarga?",
      "Que primeiros passos Maria deveria tomar para começar a delegar?"
    ],
    "pontosChave": [
      "Delegação pode distribuir capacidade e desenvolver a equipe.",
      "Acorde escopo, recursos e acompanhamento em vez de apenas transferir o problema.",
      "Investigue por que o líder centraliza; não presuma uma causa psicológica pelo perfil."
    ]
  },
  {
    "id": 15,
    "perfil": "S",
    "tema": "comunicacao",
    "complexidade": "intermediario",
    "titulo": "Ambiguidade por Gentileza",
    "contexto": "Pedro, gerente com perfil S, nunca é direto. Quando um relatório está errado, ele diz: 'Talvez a gente pudesse considerar dar uma olhadinha de novo, se não for incômodo...'. A equipe não entende o grau de urgência ou importância. Projetos críticos atrasam porque ninguém percebeu que era prioridade. Em feedback 360, comentário recorrente: 'Não sei o que Pedro realmente quer'.",
    "perguntas": [
      "Por que perfis S usam linguagem tão suave?",
      "Quais problemas operacionais isso causa?",
      "Como perfis S podem ser gentis E claros simultaneamente?",
      "Que estrutura de comunicação ajudaria Pedro?"
    ],
    "pontosChave": [
      "Gentileza e clareza podem coexistir na mesma mensagem.",
      "Troque indiretas por pedidos específicos com prazo e critério de conclusão.",
      "Confirme o entendimento sem julgar intenção ou personalidade."
    ]
  },
  {
    "id": 16,
    "perfil": "S",
    "tema": "conflito",
    "complexidade": "avancado",
    "titulo": "Mediador que Evita Tomar Partido",
    "contexto": "Dois colaboradores de Laura (líder S) estão em conflito aberto há semanas. Eles brigam por e-mail, não se falam e boicotam projetos um do outro. Laura tenta 'mediar' ouvindo ambos separadamente e dizendo a cada um: 'Eu entendo seu lado'. Mas nunca toma posição, não estabelece limites e não resolve o conflito. A situação escala até virar caso de RH, e Laura é questionada: 'Por que você não agiu antes?'.",
    "perguntas": [
      "Por que Laura evitou tomar atitudes firmes?",
      "Qual o papel do líder em conflitos entre subordinados?",
      "Como perfis S podem mediar sem 'agradar os dois lados' indefinidamente?",
      "Que ações concretas Laura deveria ter tomado?"
    ],
    "pontosChave": [
      "Estabeleça limites de convivência e condições de diálogo direto.",
      "Diferencie facilitar um acordo de ignorar o problema.",
      "Não use mediação informal como substituto de apuração quando há conduta grave."
    ]
  },
  {
    "id": 17,
    "perfil": "S",
    "tema": "mudanca",
    "complexidade": "intermediario",
    "titulo": "Resistência Silenciosa",
    "contexto": "A empresa implementa novo sistema de avaliação de desempenho. Roberto, gerente S, não concorda com a mudança, mas não expressa isso abertamente. Ele simplesmente não implementa na sua área. Quando cobrado, dá desculpas: 'Ainda estamos nos adaptando', 'A equipe está sobrecarregada'. Após 6 meses, sua área é a única que não usa o novo sistema, prejudicando análises corporativas.",
    "perguntas": [
      "Por que Roberto resistiu de forma passiva?",
      "Quais impactos sua resistência silenciosa causou?",
      "Como perfis S podem expressar discordância de forma construtiva?",
      "Como líderes superiores podem detectar e lidar com resistência passiva?"
    ],
    "pontosChave": [
      "Crie espaço para expor preocupações antes de interpretar resistência.",
      "Investigue impactos e barreiras concretas à mudança.",
      "Discordância não equivale automaticamente a sabotagem ou falta de compromisso."
    ]
  },
  {
    "id": 18,
    "perfil": "S",
    "tema": "motivacao",
    "complexidade": "basico",
    "titulo": "Reconhecimento Privado Demais",
    "contexto": "Carla, líder com perfil S, valoriza muito sua equipe mas só elogia em particular. Ela acredita que reconhecimento público 'constrange' as pessoas. Enquanto isso, outras áreas celebram conquistas publicamente, e a equipe de Carla sente que seu trabalho é invisível. Três talentos pedem transferência para áreas 'onde meu trabalho é reconhecido pela empresa'.",
    "perguntas": [
      "Por que Carla só reconhece em particular?",
      "Qual o impacto da falta de reconhecimento público?",
      "Como perfis S podem equilibrar discrição com visibilidade da equipe?",
      "Que formas de reconhecimento seriam eficazes sem constranger?"
    ],
    "pontosChave": [
      "Pergunte como cada pessoa prefere receber reconhecimento.",
      "Escolha forma e contexto adequados sem presumir preferência pela letra DISC.",
      "O reconhecimento deve ser específico e relacionado a uma contribuição real."
    ]
  },
  {
    "id": 19,
    "perfil": "C",
    "tema": "feedback",
    "complexidade": "intermediario",
    "titulo": "Crítica Técnica, Impacto Emocional",
    "contexto": "Marcos, analista sênior com perfil C promovido a líder, dá feedbacks extremamente técnicos e detalhados: 'Seu relatório tem 14 erros de formatação, 3 inconsistências metodológicas e 2 fontes desatualizadas'. Ele não elogia, não contextualiza, não pergunta se a pessoa entendeu. Equipe relata: 'Sinto que nunca faço nada certo'. Rotatividade na equipe de Marcos é 3x maior que média da empresa.",
    "perguntas": [
      "Por que o feedback de Marcos, mesmo preciso, é desmotivador?",
      "Como perfis C podem equilibrar precisão técnica com empatia?",
      "Que estrutura de feedback seria mais eficaz para Marcos?",
      "Qual o impacto de feedbacks puramente negativos repetidos?"
    ],
    "pontosChave": [
      "Precisão técnica não exige desconsiderar o interlocutor.",
      "Priorize pontos de maior impacto e combine suporte para a correção.",
      "Evite rótulos sobre a pessoa e discuta o comportamento ou a entrega."
    ]
  },
  {
    "id": 20,
    "perfil": "C",
    "tema": "delegacao",
    "complexidade": "avancado",
    "titulo": "Paralisia por Perfeccionismo",
    "contexto": "Beatriz, gerente de qualidade com perfil C, não delega projetos porque 'ninguém fará com o padrão que eu exijo'. Ela revisa todo trabalho da equipe múltiplas vezes, refaz partes inteiras e cria gargalos críticos. Projetos atrasam semanas esperando aprovação de Beatriz. Equipe está desmotivada: 'Para que me esforçar se ela vai refazer do jeito dela?'. Produtividade da área é 40% abaixo do esperado.",
    "perguntas": [
      "Por que perfis C têm dificuldade extrema em delegar?",
      "Quais prejuízos o perfeccionismo de Beatriz causa?",
      "Como perfis C podem definir 'bom o suficiente' sem perder qualidade essencial?",
      "Que estratégia de delegação progressiva funcionaria para Beatriz?"
    ],
    "pontosChave": [
      "Defina critérios de qualidade proporcionais ao risco da tarefa.",
      "Delegue com critérios de aceitação e revise os pontos de controle.",
      "Em atividades críticas, cumprir prazo não justifica ignorar requisitos de segurança ou qualidade."
    ]
  },
  {
    "id": 21,
    "perfil": "C",
    "tema": "comunicacao",
    "complexidade": "basico",
    "titulo": "E-mails de 3 Páginas",
    "contexto": "Sandra, analista com perfil C, envia e-mails extremamente longos com todos os detalhes, contextos históricos, referências e ressalvas. Um simples pedido de aprovação vira 3 páginas de texto denso. Gestores não leem (marcam como 'depois'), colaboradores se perdem na informação, e decisões urgentes atrasam. Sandra se frustra: 'Ninguém lê minhas análises completas!'.",
    "perguntas": [
      "Por que perfis C escrevem comunicações tão detalhadas?",
      "Qual o problema de excesso de informação?",
      "Como perfis C podem comunicar de forma concisa sem perder precisão?",
      "Que estrutura de comunicação (ex: pirâmide invertida) ajudaria Sandra?"
    ],
    "pontosChave": [
      "Use um resumo com decisão ou pedido e disponibilize detalhes necessários.",
      "Adapte o formato ao público e à complexidade da tarefa.",
      "Concisão não deve eliminar informação indispensável à execução."
    ]
  },
  {
    "id": 22,
    "perfil": "C",
    "tema": "conflito",
    "complexidade": "intermediario",
    "titulo": "Guerra de Dados",
    "contexto": "Dois gerentes (ambos perfil C) discordam sobre metodologia de análise de vendas. Cada um traz relatórios de 50 páginas provando que seu método é superior. Em reuniões, eles debatem detalhes estatísticos por horas sem chegar a consenso. Projetos que dependem da definição estão parados há 2 meses. Diretor intervém: 'Vocês são inteligentes demais para ficarem travados nisso'.",
    "perguntas": [
      "Por que perfis C entram em impasses analíticos?",
      "Como resolver conflitos quando ambos os lados têm argumentos técnicos válidos?",
      "Que critérios de decisão (além de perfeição técnica) poderiam ser usados?",
      "Como perfis C podem aceitar que algumas decisões são 'boa o suficiente'?"
    ],
    "pontosChave": [
      "Acorde critérios de comparação antes de disputar a melhor alternativa.",
      "Considere viabilidade, impactos, riscos e reversibilidade da decisão.",
      "Nem toda solução é aceitável: estabeleça requisitos mínimos antes de decidir."
    ]
  },
  {
    "id": 23,
    "perfil": "C",
    "tema": "mudanca",
    "complexidade": "avancado",
    "titulo": "Análise Sem Fim",
    "contexto": "Empresa precisa escolher fornecedor de software. Comitê liderado por perfil C solicita 'mais dados' há 6 meses: fazem 15 rodadas de comparações, criam planilhas com 200 critérios, pedem demonstrações adicionais. Enquanto isso, concorrentes já implementaram soluções e estão na frente. CEO intervém: 'Precisamos decidir AGORA, com informação disponível'.",
    "perguntas": [
      "Por que perfis C postergam decisões mesmo com dados suficientes?",
      "Qual o custo de 'mais análise' versus decisão com 80% de informação?",
      "Como perfis C podem reconhecer quando têm dados suficientes?",
      "Que papel líderes superiores devem ter em situações assim?"
    ],
    "pontosChave": [
      "Defina quais informações são necessárias e qual decisão será tomada.",
      "Avalie custo de esperar, riscos e possibilidade de revisar a escolha.",
      "Não use uma regra fixa de percentual de informação para qualquer tipo de decisão."
    ]
  },
  {
    "id": 24,
    "perfil": "C",
    "tema": "motivacao",
    "complexidade": "basico",
    "titulo": "Reconhecimento Ignorado",
    "contexto": "Empresa faz evento para premiar melhores colaboradores do ano. Felipe, analista C, ganha prêmio mas não comparece: 'Não gosto de holofotes'. Ele é promovido e quando anunciam publicamente, ele fica visivelmente desconfortável. Gestor não entende: 'Ele não valoriza o reconhecimento?'. Felipe só queria 'fazer o trabalho bem feito', não quer 'circo'.",
    "perguntas": [
      "Por que perfis C desvalorizam reconhecimento público?",
      "Como motivar perfis C se eles não ligam para celebrações?",
      "Que formas alternativas de reconhecimento seriam eficazes?",
      "Como líderes podem adaptar reconhecimento a diferentes perfis?"
    ],
    "pontosChave": [
      "Investigue preferências individuais de reconhecimento e desenvolvimento.",
      "Autonomia e desafios só ajudam quando são desejados e acompanhados de recursos.",
      "Não presuma que pessoas com tendência C rejeitam reconhecimento público."
    ]
  },
  {
    "id": 25,
    "perfil": "misto",
    "tema": "feedback",
    "complexidade": "avancado",
    "titulo": "Líder com Perfil Misto D/I - Carisma com Impaciência",
    "contexto": "Renata tem perfil misto D/I: carismática, ambiciosa e impaciente. Ela motiva a equipe com energia, mas explode quando resultados não vêm rápido. Em uma semana, ela elogia efusivamente um colaborador; na seguinte, critica duramente o mesmo por erro pequeno. Equipe relata: 'Não sabemos qual Renata vai aparecer hoje'. Clima é instável e ansioso.",
    "perguntas": [
      "Como perfis mistos D/I podem gerar inconsistência?",
      "Por que a imprevisibilidade de Renata prejudica a equipe?",
      "Como Renata pode equilibrar entusiasmo (I) com exigência (D)?",
      "Que estratégia de autoconhecimento ajudaria Renata?"
    ],
    "pontosChave": [
      "Separe energia e capacidade de mobilização de mudanças inconsistentes de prioridade.",
      "Crie critérios claros para decisões e comunicação dos acordos.",
      "Perfis combinados não permitem prever volatilidade ou resultado de gestão."
    ]
  },
  {
    "id": 26,
    "perfil": "misto",
    "tema": "delegacao",
    "complexidade": "intermediario",
    "titulo": "Líder S/C - Perfeccionismo Paralisante com Medo de Conflito",
    "contexto": "Antônio tem perfil S/C: detalhista, busca harmonia e evita riscos. Ele demora semanas para delegar porque quer ter certeza de que a pessoa está preparada, o processo está perfeito e nada dará errado. Quando delega, faz follow-ups excessivos mas com linguagem tão suave que ninguém percebe urgência. Projetos atrasam cronicamente na área de Antônio.",
    "perguntas": [
      "Como perfis S/C combinam problemas de delegação?",
      "Por que Antônio cria gargalos operacionais?",
      "Como perfis S/C podem acelerar delegação sem perder cuidado?",
      "Que suporte organizacional Antônio precisa?"
    ],
    "pontosChave": [
      "Defina limites de análise e condições para uma decisão responsável.",
      "Crie espaço para expressar dúvidas e testar alternativas com apoio.",
      "Não deduza ansiedade, medo ou necessidade de tratamento psicológico a partir do DISC."
    ]
  },
  {
    "id": 27,
    "perfil": "misto",
    "tema": "comunicacao",
    "complexidade": "basico",
    "titulo": "Líder D/C - Direto Demais e Crítico Demais",
    "contexto": "Gabriela tem perfil D/C: orientada a resultados e perfeccionista. Em reuniões, ela é extremamente direta apontando todos os erros técnicos sem filtro: 'Esse relatório está errado em 5 pontos, refaça'. Ela não entende por que equipe se sente atacada: 'Eu só estou sendo honesta e objetiva'. Turnover na equipe é altíssimo.",
    "perguntas": [
      "Como perfis D/C podem ser percebidos como duros demais?",
      "Por que precisão técnica (C) + franqueza (D) pode ser destrutiva?",
      "Como Gabriela pode manter padrões altos sem desmotivar?",
      "Que técnicas de comunicação empática ajudariam?"
    ],
    "pontosChave": [
      "Converse sobre exigência, forma de comunicação e efeito na equipe.",
      "Ajuste critérios e prioridades sem usar humilhação ou ataques pessoais.",
      "Um estilo combinado não comprova toxicidade; avalie condutas e condições concretas."
    ]
  },
  {
    "id": 28,
    "perfil": "misto",
    "tema": "conflito",
    "complexidade": "intermediario",
    "titulo": "Líder I/S - Quer Agradar Todos, Não Resolve Nada",
    "contexto": "Paula tem perfil I/S: sociável, empática e avessa a conflitos. Quando dois colaboradores brigam, ela passa semanas tentando agradar ambos, fazendo concessões excessivas a cada lado e prometendo coisas que não pode cumprir. Nenhum dos dois está satisfeito, o conflito permanece, e Paula está exausta emocionalmente tentando 'manter todos felizes'.",
    "perguntas": [
      "Como perfis I/S evitam confronto de todas as formas?",
      "Por que tentar agradar todos não resolve conflitos?",
      "Como Paula pode desenvolver coragem para tomar decisões impopulares?",
      "Que papel mediadores externos podem ter?"
    ],
    "pontosChave": [
      "Mapeie interesses e limites antes de buscar uma solução.",
      "Explique critérios e consequências das decisões de forma respeitosa.",
      "Cooperação não elimina a necessidade de posicionamento e acompanhamento."
    ]
  },
  {
    "id": 29,
    "perfil": "misto",
    "tema": "mudanca",
    "complexidade": "avancado",
    "titulo": "Líder D/I - Mudanças Empolgantes Demais, Rápido Demais",
    "contexto": "Rodrigo tem perfil D/I: adora inovação, tem muita energia e quer resultados rápidos. Ele implementa 5 mudanças estruturais em 3 meses: nova metodologia, novo sistema, nova estrutura de equipe, novo processo de vendas, nova estratégia de marketing. Equipe está em colapso, nada funciona direito porque não houve tempo de adaptação. Produtividade despenca 35%.",
    "perguntas": [
      "Por que perfis D/I implementam mudanças excessivas?",
      "Qual o impacto de mudanças simultâneas na equipe?",
      "Como Rodrigo pode canalizar energia para mudanças sustentáveis?",
      "Que processo de priorização ele deveria usar?"
    ],
    "pontosChave": [
      "Limite mudanças simultâneas à capacidade real de implementação.",
      "Teste propostas, comunique prioridades e acompanhe impactos.",
      "Use revisão por pares e governança sem presumir impulsividade por estilo."
    ]
  },
  {
    "id": 30,
    "perfil": "misto",
    "tema": "motivacao",
    "complexidade": "intermediario",
    "titulo": "Líder C/S - Reconhecimento Técnico, Não Emocional",
    "contexto": "Marcelo tem perfil C/S: valoriza qualidade e estabilidade. Ele reconhece trabalho bem feito de forma técnica: 'Seu código teve 0 bugs, eficiente'. Mas nunca expressa emoção, entusiasmo ou gratidão. Colaboradores sentem que são 'recursos' não pessoas. Comentário recorrente: 'Ele nunca diz que está feliz com meu trabalho, só que está correto'.",
    "perguntas": [
      "Por que perfis C/S têm dificuldade em expressar emoção positiva?",
      "Como ausência de afeto impacta motivação da equipe?",
      "Como Marcelo pode equilibrar precisão técnica com conexão humana?",
      "Que pequenas mudanças teriam grande impacto?"
    ],
    "pontosChave": [
      "Reconheça contribuições concretas e pergunte o que faz sentido para a equipe.",
      "Respeite formas diferentes de expressão sem confundir discrição com desinteresse.",
      "Ajuste a comunicação por diálogo e observação, não por previsão automática do perfil."
    ]
  }
];

let casosExibidos = [...bancoCasos];

// ============================================================================
// ELEMENTOS DOM
// ============================================================================

const filtroPerfil = document.getElementById('filtroPerfil');
const filtroTema = document.getElementById('filtroTema');
const filtroComplexidade = document.getElementById('filtroComplexidade');
const campoBuscaCasos = document.getElementById('campoBuscaCasos');
const gridCasos = document.getElementById('gridCasos');
const semResultados = document.getElementById('semResultados');
const casosFiltrados = document.getElementById('casosFiltrados');
const modalCaso = document.getElementById('lideranca-modalCaso');
const btnFecharModal = document.getElementById('lideranca-btnFecharModal');
const btnImprimirCaso = document.getElementById('lideranca-btnImprimirCaso');
const btnCompartilharCaso = document.getElementById('lideranca-btnCompartilharCaso');

// ============================================================================
// EVENT LISTENERS
// ============================================================================

filtroPerfil.addEventListener('change', filtrarCasos);
filtroTema.addEventListener('change', filtrarCasos);
filtroComplexidade.addEventListener('change', filtrarCasos);
campoBuscaCasos.addEventListener('input', filtrarCasos);

btnFecharModal.addEventListener('click', fecharModal);
modalCaso.addEventListener('click', (e) => {
    if (e.target === modalCaso) fecharModal();
});

btnImprimirCaso.addEventListener('click', () => window.DISC_IMPRIMIR());

btnCompartilharCaso.addEventListener('click', compartilharCaso);

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarCasos();
});

// ============================================================================
// FUNÇÃO: FILTRAR CASOS
// ============================================================================

function filtrarCasos() {
    const perfil = filtroPerfil.value;
    const tema = filtroTema.value;
    const complexidade = filtroComplexidade.value;
    const busca = campoBuscaCasos.value.toLowerCase();

    casosExibidos = bancoCasos.filter(caso => {
        const matchPerfil = perfil === 'todos' || caso.perfil === perfil;
        const matchTema = tema === 'todos' || caso.tema === tema;
        const matchComplexidade = complexidade === 'todas' || caso.complexidade === complexidade;
        const matchBusca = busca === '' ||
            caso.titulo.toLowerCase().includes(busca) ||
            caso.contexto.toLowerCase().includes(busca);

        return matchPerfil && matchTema && matchComplexidade && matchBusca;
    });

    renderizarCasos();
}

// ============================================================================
// FUNÇÃO: RENDERIZAR CASOS
// ============================================================================

function renderizarCasos() {
    gridCasos.innerHTML = '';

    if (casosExibidos.length === 0) {
        gridCasos.style.display = 'none';
        semResultados.style.display = 'block';
    } else {
        gridCasos.style.display = 'grid';
        semResultados.style.display = 'none';

        casosExibidos.forEach(caso => {
            const card = criarCardCaso(caso);
            gridCasos.appendChild(card);
        });
    }

    // Atualizar contador
    casosFiltrados.textContent = casosExibidos.length;
}

// ============================================================================
// FUNÇÃO: CRIAR CARD DE CASO
// ============================================================================

function criarCardCaso(caso) {
    const card = document.createElement('div');
    card.className = 'caso-card';

    const perfilNome = {
        'D': 'Dominância',
        'I': 'Influência',
        'S': 'Estabilidade',
        'C': 'Conformidade',
        'misto': 'Misto'
    };

    const complexidadeLabel = {
        'basico': 'Básico',
        'intermediario': 'Intermediário',
        'avancado': 'Avançado'
    };

    const temaLabel = {
        'feedback': 'Feedback',
        'conflito': 'Conflitos',
        'motivacao': 'Motivação',
        'delegacao': 'Delegação',
        'comunicacao': 'Comunicação',
        'mudanca': 'Mudanças'
    };

    card.innerHTML = `
        <div class="caso-header">
            <span class="caso-badge perfil-${caso.perfil}">${caso.perfil}</span>
            <span class="caso-numero">#${String(caso.id).padStart(2, '0')}</span>
        </div>
        <h3 class="caso-titulo">${caso.titulo}</h3>
        <p class="caso-descricao">${caso.contexto.substring(0, 150)}...</p>
        <div class="caso-tags">
            <span class="tag tag-tema">
                <i class="fas fa-tag"></i> ${temaLabel[caso.tema]}
            </span>
            <span class="tag tag-complexidade">
                <i class="fas fa-layer-group"></i> ${complexidadeLabel[caso.complexidade]}
            </span>
        </div>
        <div class="caso-footer">
            <button type="button" class="caso-btn btn-ler-caso">
                <i class="fas fa-book-reader"></i> Ler Caso Completo
            </button>
        </div>
    `;

    card.querySelector('.caso-btn').addEventListener('click', () => abrirModal(caso));
    return card;
}

// ============================================================================
// FUNÇÃO: ABRIR MODAL
// ============================================================================

function abrirModal(caso) {
    const perfilNome = {
        'D': 'Dominância (D)',
        'I': 'Influência (I)',
        'S': 'Estabilidade (S)',
        'C': 'Conformidade (C)',
        'misto': 'Perfis Mistos'
    };

    const complexidadeLabel = {
        'basico': 'Básico',
        'intermediario': 'Intermediário',
        'avancado': 'Avançado'
    };

    const temaLabel = {
        'feedback': 'Feedback',
        'conflito': 'Gestão de Conflitos',
        'motivacao': 'Motivação',
        'delegacao': 'Delegação',
        'comunicacao': 'Comunicação',
        'mudanca': 'Gestão de Mudanças'
    };

    // Preencher modal
    document.getElementById('lideranca-modalBadgePerfil').textContent = caso.perfil;
    document.getElementById('lideranca-modalBadgePerfil').className = `modal-badge perfil-${caso.perfil}`;
    document.getElementById('lideranca-modalTitulo').textContent = caso.titulo;
    document.getElementById('lideranca-modalTema').textContent = temaLabel[caso.tema];
    document.getElementById('lideranca-modalComplexidade').textContent = complexidadeLabel[caso.complexidade];
    document.getElementById('lideranca-modalContexto').textContent = caso.contexto;
    document.getElementById('lideranca-modalNotaDidatica').textContent = 'Caso fictício para discussão. Dados são ilustrativos. Analise os comportamentos e o contexto; o perfil DISC não determina como uma pessoa age.';

    // Perguntas
    const ulPerguntas = document.getElementById('lideranca-modalPerguntas');
    ulPerguntas.innerHTML = '';
    caso.perguntas.forEach(pergunta => {
        const li = document.createElement('li');
        li.textContent = pergunta;
        ulPerguntas.appendChild(li);
    });

    // Pontos-chave
    const ulPontos = document.getElementById('lideranca-modalPontos');
    ulPontos.innerHTML = '';
    caso.pontosChave.forEach(ponto => {
        const li = document.createElement('li');
        li.textContent = ponto;
        ulPontos.appendChild(li);
    });

    // Abrir modal
    modalCaso.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

// ============================================================================
// FUNÇÃO: FECHAR MODAL
// ============================================================================

function fecharModal() {
    modalCaso.classList.remove('ativo');
    document.body.style.overflow = '';
}

// ============================================================================
// FUNÇÃO: COMPARTILHAR CASO
// ============================================================================

function compartilharCaso() {
    const titulo = document.getElementById('lideranca-modalTitulo').textContent;
    const texto = `📚 Caso de Liderança: ${titulo}\n\nConfira este caso prático no DISC Dashboard para discussão em aula!`;

    if (navigator.share) {
        navigator.share({
            title: 'Caso de Liderança - DISC Dashboard',
            text: texto
        }).catch(() => copiarTexto(texto));
    } else {
        copiarTexto(texto);
    }
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert('✅ Caso copiado! Cole onde quiser compartilhar.');
    });
}

// ============================================================================
// FIM DO ARQUIVO
// ============================================================================

})();
