// ============================================================================
// FEEDBACK_SIMULATOR.JS — DISC DASHBOARD
// Simulador de Feedback por Perfil DISC
// ============================================================================

// ============================================================================
// BASE DE CONHECIMENTO DE FEEDBACK
// ============================================================================

const feedbackDatabase = {
    // ===== PERFIL D - DOMINÂNCIA =====
    D: {
        positivo: {
            desempenho: {
                script: "Quero reconhecer seus resultados excepcionais neste trimestre. Você superou a meta em 35%, demonstrando exatamente o tipo de performance que buscamos. Sua capacidade de entregar sob pressão e resolver problemas complexos rapidamente está fazendo diferença real no time. Continue assim.",
                tom: "Direto, objetivo e focado em resultados. Seja breve e específico. Perfis D valorizam reconhecimento baseado em fatos e números, não elogios genéricos.",
                evitar: [
                    "Discursos longos ou elogios excessivamente emotivos",
                    "Rodeios antes de chegar ao ponto principal",
                    "Comparações com outros colaboradores",
                    "Elogios sem dados concretos"
                ],
                dialogo: {
                    gestor: "João, seus resultados deste mês: 135% da meta, 3 novos clientes estratégicos fechados. Excelente trabalho. O que você precisa para manter esse ritmo?",
                    colaborador: "Obrigado. Preciso de mais autonomia nas negociações acima de R$ 50k.",
                    gestor: "Combinado. Você tem essa autonomia a partir de agora."
                }
            },
            comportamento: {
                script: "Sua liderança no projeto X foi determinante para o sucesso da entrega. Você tomou decisões rápidas quando a equipe estava travada, assumiu riscos calculados e manteve o foco nos objetivos. Esse tipo de iniciativa é o que esperamos de líderes aqui.",
                tom: "Assertivo e reconhecedor de poder/autonomia. Destaque decisões e impacto direto nos resultados.",
                evitar: [
                    "Focar em aspectos emocionais da equipe",
                    "Elogiar 'jeito gentil' ou 'paciência'",
                    "Sugerir que deveria ter consultado mais pessoas",
                    "Amenizar o elogio com ressalvas"
                ],
                dialogo: {
                    gestor: "Maria, sua decisão de reestruturar o processo salvou o projeto. Ousado, mas funcionou. Como você avaliou o risco?",
                    colaborador: "Analisei cenários, o risco de não fazer nada era maior.",
                    gestor: "Exato. Continue tomando essas decisões, você tem meu apoio."
                }
            },
            prazo: {
                script: "Entrega 3 dias antes do prazo, com qualidade acima do esperado. Isso é eficiência real. Sua gestão de tempo está permitindo que assumamos projetos mais ambiciosos. Conte comigo para desafios maiores.",
                tom: "Objetivo e prospectivo. Conecte o desempenho atual com oportunidades futuras.",
                evitar: [
                    "Minimizar o feito: 'Foi só fazer o básico'",
                    "Atribuir sorte ou ajuda de outros",
                    "Elogiar esforço ao invés de resultado",
                    "Pedir que 'não se cobre tanto'"
                ],
                dialogo: {
                    gestor: "Carlos, projeto entregue 72h antes. Sem erro. Como você otimizou?",
                    colaborador: "Cortei reuniões desnecessárias e automatizei 40% das tarefas.",
                    gestor: "Ótimo. Vou te escalar para o projeto Y, mais complexo. Aceita?"
                }
            },
            qualidade: {
                script: "Seu trabalho está impecável. Zero retrabalho, zero erros críticos nos últimos 3 meses. Essa consistência está elevando o padrão da equipe inteira. Você está no caminho certo para assumir responsabilidades maiores.",
                tom: "Reconheça excelência técnica com perspectiva de crescimento. Perfis D querem saber 'o que vem depois'.",
                evitar: [
                    "Elogiar apenas esforço: 'Você se dedicou tanto'",
                    "Focar em processo ao invés de resultado",
                    "Sugerir que mantenha 'só isso' sem evolução",
                    "Comparar com padrões mínimos"
                ],
                dialogo: {
                    gestor: "Ana, seu código está em produção há 90 dias. Zero bugs. Impressionante.",
                    colaborador: "Apliquei os novos padrões de teste que sugeri.",
                    gestor: "E funcionou. Quer liderar a implementação disso no time inteiro?"
                }
            },
            comunicacao: {
                script: "Sua apresentação para a diretoria foi cirúrgica: dados claros, proposta direta, antecipação de objeções. Você vendeu a ideia em 15 minutos. Esse é o padrão de comunicação executiva que precisamos.",
                tom: "Destaque eficácia e impacto. Perfis D valorizam comunicação que gera ação.",
                evitar: [
                    "Elogiar 'simpatia' ou 'carisma' ao invés de efetividade",
                    "Sugerir que foi 'sorte' ou 'momento certo'",
                    "Minimizar: 'Mas poderia ter sido mais detalhado'",
                    "Focar na forma ao invés do resultado"
                ],
                dialogo: {
                    gestor: "Pedro, a diretoria aprovou seu projeto. Sua defesa foi decisiva.",
                    colaborador: "Foquei no ROI e nos riscos de não fazer.",
                    gestor: "Perfeito. Você vai apresentar o próximo projeto estratégico também."
                }
            },
            iniciativa: {
                script: "Você identificou o problema, propôs solução e implementou sem precisar de aprovação para cada passo. Isso é ownership real. Esse tipo de proatividade acelera tudo. Continue agindo assim.",
                tom: "Reforce autonomia e confiança. Perfis D querem liberdade para agir.",
                evitar: [
                    "Sugerir que deveria ter 'pedido permissão antes'",
                    "Amenizar: 'Mas da próxima vez consulte mais gente'",
                    "Focar em possíveis riscos que não se materializaram",
                    "Elogiar timidamente"
                ],
                dialogo: {
                    gestor: "Júlia, você resolveu aquele gargalo do sistema sem eu nem saber que existia.",
                    colaborador: "Vi o problema, tinha a solução, implementei.",
                    gestor: "Exato. Essa é a atitude que quero. Continue assim."
                }
            },
            lideranca: {
                script: "Sua equipe entregou resultados 40% acima da média sob sua liderança. Você define objetivos claros, remove obstáculos rapidamente e não aceita mediocridade. Esse é o perfil de líder que queremos multiplicar aqui.",
                tom: "Reconheça resultados tangíveis da liderança. Perfis D querem ser medidos por entregas.",
                evitar: [
                    "Focar excessivamente em 'relacionamento com a equipe'",
                    "Sugerir que seja 'menos exigente'",
                    "Elogiar sem números concretos",
                    "Minimizar: 'Mas você precisa ser mais paciente'"
                ],
                dialogo: {
                    gestor: "Ricardo, sua área cresceu 40% em produtividade. Como você fez?",
                    colaborador: "Eliminei processos inúteis e dei autonomia para quem entrega.",
                    gestor: "Funcionou. Vou replicar seu modelo nas outras áreas."
                }
            },
            adaptacao: {
                script: "Quando mudamos a estratégia no meio do projeto, você se adaptou em 24h e liderou a equipe na nova direção. Sem resistência, sem drama. Essa agilidade mental é diferencial competitivo real.",
                tom: "Destaque velocidade de reação e liderança em mudanças. Perfis D adoram desafios novos.",
                evitar: [
                    "Amenizar: 'Sei que foi difícil para você'",
                    "Focar no 'esforço emocional' da mudança",
                    "Sugerir que foi traumático",
                    "Elogiar 'aceitação' ao invés de 'liderança na mudança'"
                ],
                dialogo: {
                    gestor: "Laura, pivotamos o projeto e você executou a mudança sem questionar.",
                    colaborador: "A estratégia anterior não fazia mais sentido. Mudei.",
                    gestor: "Exato. Essa flexibilidade estratégica é rara. Parabéns."
                }
            }
        },
        construtivo: {
            desempenho: {
                script: "Seus resultados estão 20% abaixo da meta há 2 meses. Isso impacta o time inteiro. Preciso que você identifique o que está travando e resolva nas próximas 2 semanas. Se precisar de recursos ou mudanças, me fale agora. O que você precisa para voltar ao padrão?",
                tom: "Direto, sem rodeios. Foque no problema e na solução, não em emoções. Perfis D respeitam franqueza.",
                evitar: [
                    "Começar com muitos elogios (parece falso)",
                    "Usar linguagem muito suave: 'Talvez você pudesse...'",
                    "Culpar fatores externos antes de abordar responsabilidade pessoal",
                    "Evitar números/fatos concretos"
                ],
                dialogo: {
                    gestor: "João, 80% da meta nos últimos 2 meses. Qual o problema?",
                    colaborador: "Pipeline fraco, mercado está difícil.",
                    gestor: "Outros vendedores estão a 110%. O que VOCÊ vai fazer diferente nas próximas 2 semanas?"
                }
            },
            comportamento: {
                script: "Preciso falar sobre algo que está impactando o time: você tem interrompido colegas em reuniões e descartado ideias sem análise. Isso está criando ambiente onde pessoas param de contribuir. Você é talentoso, mas liderança também é ouvir. Como você vai ajustar isso?",
                tom: "Direto sobre o impacto do comportamento. Use dados, não julgamentos. Foque na consequência prática.",
                evitar: [
                    "Acusar: 'Você é arrogante'",
                    "Generalizar: 'Você sempre faz isso'",
                    "Focar em 'sentimentos' ao invés de impacto no resultado",
                    "Ser passivo-agressivo"
                ],
                dialogo: {
                    gestor: "Maria, três pessoas relataram que você descarta ideias sem ouvir. Isso está matando inovação.",
                    colaborador: "Elas demoram demais para chegar no ponto.",
                    gestor: "Entendo. Mas você quer resultados? Elas têm insights valiosos. Você precisa ouvir antes de julgar."
                }
            },
            prazo: {
                script: "Segundo atraso crítico em 30 dias. Isso compromete outros projetos e a confiança da diretoria. Não quero justificativas, quero saber: o que você vai fazer para isso não acontecer de novo? Precisa de algo ou consigo entregar no prazo a partir de agora?",
                tom: "Foque no impacto organizacional. Perfis D não gostam de desapontar, mas também não de 'sermão'.",
                evitar: [
                    "Dramatizar: 'Estou muito decepcionado'",
                    "Aceitar desculpas sem plano de ação",
                    "Ser condescendente: 'Tudo bem, acontece'",
                    "Estender a conversa desnecessariamente"
                ],
                dialogo: {
                    gestor: "Carlos, segundo atraso. Outros projetos travaram por causa disso.",
                    colaborador: "A equipe não entregou no tempo.",
                    gestor: "Você é o líder. Qual o seu plano para garantir prazo na próxima?"
                }
            },
            qualidade: {
                script: "Últimas 3 entregas tiveram erros críticos que geraram retrabalho. Isso não é padrão seu. Velocidade sem qualidade não adianta. Preciso que você volte ao nível de excelência que sei que você tem. O que mudou? Como corrigimos?",
                tom: "Mostre que você conhece o potencial dele. Perfis D respondem a desafios de performance.",
                evitar: [
                    "Focar em 'se esforçar mais' ao invés de processo",
                    "Amenizar: 'Está quase bom'",
                    "Aceitar qualidade mediana como 'suficiente'",
                    "Comparar com outros negativamente"
                ],
                dialogo: {
                    gestor: "Ana, 3 bugs críticos em produção este mês. Isso não é você.",
                    colaborador: "Estou correndo demais, priorizando velocidade.",
                    gestor: "Velocidade sem qualidade é retrabalho. Quero que você volte ao seu padrão de excelência."
                }
            },
            comunicacao: {
                script: "Sua apresentação perdeu a diretoria em 5 minutos: muita informação, sem foco, sem proposta clara. Você tem boas ideias, mas se não comunicar com clareza, ninguém vai apoiar. Da próxima, menos dados, mais conclusão. Quer ajuda para estruturar?",
                tom: "Crítica técnica, com oferta de suporte. Perfis D querem melhorar, mas odeiam 'lição de moral'.",
                evitar: [
                    "Criticar estilo pessoal ao invés de efetividade",
                    "Dizer que foi 'embaraçoso' ou usar emoção",
                    "Focar no que outros pensaram",
                    "Dar feedback vago: 'Precisa melhorar'"
                ],
                dialogo: {
                    gestor: "Pedro, a diretoria não entendeu sua proposta. Muita informação.",
                    colaborador: "Mas tinha todos os dados que eles pediram.",
                    gestor: "Dados sim, clareza não. Próxima vez: 1 slide de decisão, resto em anexo. Combinado?"
                }
            },
            iniciativa: {
                script: "Você está esperando demais por direcionamento. Três situações esta semana onde você tinha autonomia para decidir, mas esperou minha aprovação. Eu te dei autoridade, você precisa usá-la. Onde está a trava?",
                tom: "Desafie a autonomia. Perfis D respondem quando você 'cobra' proatividade.",
                evitar: [
                    "Amenizar: 'Sem problemas, pode perguntar'",
                    "Reforçar dependência",
                    "Não deixar claro o nível de autonomia esperado",
                    "Ser paternalista"
                ],
                dialogo: {
                    gestor: "Júlia, você me pediu aprovação para algo que está no seu escopo decidir.",
                    colaborador: "Quis garantir que você concordava.",
                    gestor: "Eu te dei autonomia. Decida e me informe depois. Confio em você."
                }
            },
            lideranca: {
                script: "Sua equipe está estagnada há 3 meses sem evolução visível. Rotatividade aumentou, entregas caíram 15%. Você está focando demais em execução e pouco em desenvolver pessoas. Líderes multiplicam capacidade, não fazem tudo sozinhos. O que você vai mudar?",
                tom: "Mostre o impacto dos resultados da equipe. Perfis D lideram por resultados, não por hierarquia.",
                evitar: [
                    "Focar em 'ser mais carinhoso' com a equipe",
                    "Criticar 'dureza' sem mostrar impacto em resultados",
                    "Usar 'sentimentos da equipe' como único argumento",
                    "Ser paternalista sobre liderança"
                ],
                dialogo: {
                    gestor: "Ricardo, sua equipe caiu 15% em produtividade. Rotatividade subiu.",
                    colaborador: "Eles não estão entregando. Estou cobrando mais.",
                    gestor: "Cobrar mais não está funcionando. Você precisa desenvolver, não só cobrar. Mude a abordagem."
                }
            },
            adaptacao: {
                script: "Você está resistindo à mudança de estratégia. Entendo seu ponto, mas a decisão já foi tomada. Preciso que você execute com o mesmo compromisso que teria se fosse sua ideia. Não dá para ter dois caminhos. Você está dentro ou preciso encontrar alguém que esteja?",
                tom: "Firme e sem espaço para indefinição. Perfis D respeitam clareza de expectativa.",
                evitar: [
                    "Prolongar debate sobre decisão já tomada",
                    "Aceitar resistência passiva",
                    "Tentar 'convencer emocionalmente'",
                    "Ser ambíguo sobre expectativa"
                ],
                dialogo: {
                    gestor: "Laura, você está boicotando o novo processo. Preciso de compromisso total.",
                    colaborador: "Eu discordo da mudança. Acho que vamos perder eficiência.",
                    gestor: "Anotado. Mas a decisão é executar. Você executa ou não?"
                }
            }
        },
        desenvolvimento: {
            desempenho: {
                script: "Você está entregando o esperado, mas sei que tem potencial para mais. Quero te ver assumindo projetos estratégicos. Para isso, preciso que você desenvolva visão de longo prazo — você foca demais no curto prazo. Vamos trabalhar nisso nos próximos 3 meses. Topas?",
                tom: "Desafie com perspectiva de crescimento. Perfis D querem subir, use isso como motivador.",
                evitar: [
                    "Criticar performance atual sem mostrar caminho de evolução",
                    "Focar em 'lacunas' sem conectar com oportunidades",
                    "Ser vago sobre próximos passos",
                    "Sugerir desenvolvimento sem propósito claro"
                ],
                dialogo: {
                    gestor: "João, para você assumir diretoria, precisa pensar 12 meses à frente, não 30 dias.",
                    colaborador: "Como eu desenvolvo isso?",
                    gestor: "Próximo trimestre, você vai liderar o planejamento estratégico comigo. Vou te mentorear."
                }
            },
            comportamento: {
                script: "Você é extremamente eficaz, mas sua equipe te teme mais do que te respeita. Para você crescer como líder, precisa desenvolver inteligência emocional. Não estou pedindo para você mudar quem é, mas para adicionar uma habilidade que vai multiplicar seu impacto. Vamos trabalhar nisso?",
                tom: "Mostre como essa 'fraqueza' limita progressão. Perfis D desenvolvem o que vêem como estratégico.",
                evitar: [
                    "Pedir que seja 'mais sensível' sem contexto estratégico",
                    "Fazer parecer que personalidade é problema",
                    "Focar em 'sermeisbonzinho'",
                    "Não conectar desenvolvimento com objetivos de carreira"
                ],
                dialogo: {
                    gestor: "Maria, para você ser VP, precisa de times que entreguem sem você. Isso exige mais que cobrança.",
                    colaborador: "Tipo o quê?",
                    gestor: "Desenvolver autonomia na equipe. Vou te ensinar. Interessada?"
                }
            },
            prazo: {
                script: "Você entrega tudo no prazo, mas sempre no limite. Para crescer, precisa criar margem de segurança. Isso demonstra maturidade de gestão. Quero te ver entregando com folga, não correndo sempre. Vamos trabalhar previsibilidade nos próximos projetos.",
                tom: "Mostre que 'ganhar no limite' não é sustentável. Perfis D respeitam eficiência estratégica.",
                evitar: [
                    "Criticar sem reconhecer que ele cumpre prazos",
                    "Sugerir que ele 'se estresse menos' (emocional)",
                    "Não deixar claro o benefício de mudar",
                    "Focar em 'equilíbrio pessoal' ao invés de eficácia"
                ],
                dialogo: {
                    gestor: "Carlos, você entrega sempre, mas sempre na última hora. Quer escalar?",
                    colaborador: "Sim.",
                    gestor: "Então precisa entregar com margem. Líderes seniores não vivem em modo crise."
                }
            },
            qualidade: {
                script: "Sua velocidade é impressionante, mas você tem margem para melhorar qualidade sem perder ritmo. Vamos investir em processos que garantam zero defeito. Isso vai te posicionar para projetos mais visíveis. Está disposto a testar?",
                tom: "Conecte qualidade com oportunidades maiores. Perfis D fazem o que os posiciona melhor.",
                evitar: [
                    "Pedir para 'ir mais devagar' (eles odeiam)",
                    "Focar em perfeccionismo por perfeccionismo",
                    "Não mostrar ROI de qualidade",
                    "Ser paternalista sobre 'fazer direito'"
                ],
                dialogo: {
                    gestor: "Ana, se você reduzir bugs em 50%, eu te coloco no projeto flagship.",
                    colaborador: "Como eu faço isso?",
                    gestor: "Vamos implementar code review rigoroso. Aceita?"
                }
            },
            comunicacao: {
                script: "Você domina seu assunto, mas sua comunicação é técnica demais para audiências executivas. Para influenciar decisões estratégicas, você precisa simplificar mensagens. Vou te ajudar a desenvolver essa habilidade nos próximos meses. Combinado?",
                tom: "Mostre que comunicação é poder. Perfis D querem influência, use isso.",
                evitar: [
                    "Criticar forma de falar como 'defeito pessoal'",
                    "Pedir que seja 'mais carismático'",
                    "Não conectar comunicação com impacto/influência",
                    "Focar em estilo ao invés de efetividade"
                ],
                dialogo: {
                    gestor: "Pedro, para você chegar a VP, precisa convencer conselho. Seu conteúdo é bom, forma não.",
                    colaborador: "O que está errado?",
                    gestor: "Muito técnico. Executivos querem decisão, não detalhes. Vou te treinar."
                }
            },
            iniciativa: {
                script: "Você executa bem, mas espera demais por direção. Para crescer, precisa começar a propor, não só fazer. Nos próximos projetos, quero que você traga soluções, não problemas. Está pronto para esse nível?",
                tom: "Desafie a dar o próximo passo. Perfis D adoram quando você 'aposta' neles.",
                evitar: [
                    "Aceitar execução passiva como suficiente",
                    "Não deixar claro que isso limita crescimento",
                    "Ser vago sobre o que 'iniciativa' significa",
                    "Elogiar demais execução sem desafiar"
                ],
                dialogo: {
                    gestor: "Júlia, você quer ser gerente?",
                    colaborador: "Sim.",
                    gestor: "Então para de perguntar o que fazer. Próxima vez, me traga proposta, não pergunta."
                }
            },
            lideranca: {
                script: "Você lidera bem tecnicamente, mas não está multiplicando líderes. Para você chegar à diretoria, sua equipe precisa funcionar sem você. Vamos trabalhar delegação estratégica e desenvolvimento de sucessores nos próximos 6 meses.",
                tom: "Mostre que próximo nível exige time independente. Perfis D querem escalar.",
                evitar: [
                    "Criticar 'microgerenciamento' sem mostrar impacto em carreira",
                    "Focar em 'dar espaço' sem contexto estratégico",
                    "Sugerir que deixe de ser relevante",
                    "Não conectar delegação com progressão"
                ],
                dialogo: {
                    gestor: "Ricardo, seu time depende muito de você. Isso te prende.",
                    colaborador: "Mas eles precisam de mim.",
                    gestor: "Se eles não funcionam sem você, você não sobe. Vamos desenvolver autonomia deles."
                }
            },
            adaptacao: {
                script: "Você é ótimo executando estratégias definidas, mas precisa desenvolver flexibilidade. Mercado muda rápido, e quero você capaz de pivotar sem perder velocidade. Vamos te expor a projetos mais ambíguos nos próximos meses para você treinar isso.",
                tom: "Apresente como expansão de repertório. Perfis D gostam de 'novas armas'.",
                evitar: [
                    "Criticar rigidez como defeito pessoal",
                    "Pedir que seja 'mais flexível' sem contexto de por quê",
                    "Focar em 'aceitar incerteza' (emocionalmente)",
                    "Não mostrar benefício estratégico"
                ],
                dialogo: {
                    gestor: "Laura, você é ótima em ambientes estruturados. Mas futuro é incerto.",
                    colaborador: "E então?",
                    gestor: "Próximo projeto: sem escopo fechado. Você vai aprender a navegar ambiguidade."
                }
            }
        }
    },

    // ===== PERFIL I - INFLUÊNCIA =====
    I: {
        positivo: {
            desempenho: {
                script: "Parabéns pelo resultado fantástico! Você não só bateu a meta, mas fez isso com aquela energia contagiante que motiva todos ao redor. Seu entusiasmo transforma o ambiente, e os números provam que isso funciona. Continue brilhando assim!",
                tom: "Caloroso, entusiasta e expressivo. Perfis I valorizam reconhecimento emocional e público (sempre que possível).",
                evitar: [
                    "Feedback seco ou muito técnico sem emoção",
                    "Focar apenas em números sem reconhecer impacto humano",
                    "Dar feedback privado quando poderia ser público",
                    "Ser minimalista no elogio"
                ],
                dialogo: {
                    gestor: "Maria, você arrasou! 140% da meta E todo mundo adorou trabalhar contigo. Como você consegue?",
                    colaborador: "Ah, tentei deixar tudo mais leve e divertido!",
                    gestor: "E funcionou! Você é exemplo para o time todo. Parabéns mesmo!"
                }
            },
            comportamento: {
                script: "Seu jeito de interagir com a equipe é incrível! Você cria conexões genuínas, traz energia positiva e faz as pessoas se sentirem valorizadas. O clima melhorou muito desde que você entrou. Continue sendo essa pessoa inspiradora!",
                tom: "Reconheça habilidades sociais e impacto emocional. Perfis I querem saber que fazem diferença nas pessoas.",
                evitar: [
                    "Reduzir a 'apenas ser simpático'",
                    "Focar só em trabalho técnico sem reconhecer carisma",
                    "Sugerir que 'socializar demais' é problema",
                    "Ser frio no reconhecimento"
                ],
                dialogo: {
                    gestor: "Pedro, desde que você chegou, o pessoal fica até depois do horário sorrindo. Você tem um dom!",
                    colaborador: "Nossa, que legal! Eu só tento fazer o pessoal se sentir bem.",
                    gestor: "E você consegue! Isso é liderança também. Continue assim!"
                }
            },
            prazo: {
                script: "Entrega no prazo, e ainda por cima você trouxe a equipe toda junto! Você tem um talento especial de engajar pessoas e fazer acontecer sem perder a leveza. Todo projeto deveria ter alguém como você!",
                tom: "Celebre o resultado E o processo. Perfis I gostam de reconhecimento por 'como' fizeram, não só 'o quê'.",
                evitar: [
                    "Focar apenas no prazo sem reconhecer colaboração",
                    "Ser técnico demais: 'Cumprido dentro do SLA'",
                    "Não mencionar impacto positivo no time",
                    "Dar feedback rápido e cortar a conversa"
                ],
                dialogo: {
                    gestor: "Ana, projeto entregue e o pessoal dizendo que foi a experiência mais legal do ano!",
                    colaborador: "Sério? Eu fiz questão de todo mundo participar!",
                    gestor: "E deu super certo! Você transforma trabalho em diversão sem perder resultado. Incrível!"
                }
            },
            qualidade: {
                script: "Seu trabalho está impecável! Além de tecnicamente perfeito, você conseguiu fazer isso mantendo todo mundo motivado. Você prova que dá para ter excelência sem sacrificar o clima. Parabéns de verdade!",
                tom: "Equilibre reconhecimento técnico com impacto relacional. Perfis I querem ser vistos como completos.",
                evitar: [
                    "Só focar em aspectos técnicos friamente",
                    "Ignorar esforço de engajamento da equipe",
                    "Dar feedback breve demais",
                    "Ser muito objetivo sem calor humano"
                ],
                dialogo: {
                    gestor: "Carlos, zero erro E todo mundo feliz trabalhando contigo. Como você faz os dois?",
                    colaborador: "Ah, eu tento deixar o processo leve mas sem perder o foco!",
                    gestor: "Você consegue! Talento raro. Parabéns mesmo!"
                }
            },
            comunicacao: {
                script: "Sua apresentação foi sensacional! Você prendeu a atenção de todos, transmitiu as ideias com clareza e ainda deixou todo mundo empolgado. Você tem um dom natural para comunicação. Continue usando esse super poder!",
                tom: "Seja efusivo e específico. Perfis I adoram reconhecimento por carisma e impacto social.",
                evitar: [
                    "Elogiar 'conteúdo' sem reconhecer entrega/carisma",
                    "Ser técnico demais: 'Slides bem estruturados'",
                    "Minimizar: 'Foi ok'",
                    "Não mencionar reação da audiência"
                ],
                dialogo: {
                    gestor: "Julia, a sala inteira estava encantada! Você vendeu a ideia perfeitamente.",
                    colaborador: "Nossa, fiquei nervosa mas tentei conectar com eles!",
                    gestor: "E você arrasou! Todo mundo saiu querendo participar do projeto. Brilhante!"
                }
            },
            iniciativa: {
                script: "Adorei sua proatividade! Você não só resolveu o problema, mas envolveu todo mundo e transformou aquilo em uma oportunidade de colaboração. Você tem talento para fazer as coisas acontecerem de forma leve e inclusiva!",
                tom: "Celebre iniciativa E colaboração. Perfis I não gostam de ser vistos como 'lobos solitários'.",
                evitar: [
                    "Reconhecer só 'ter feito sozinho'",
                    "Ignorar como ele envolveu outros",
                    "Ser seco: 'Bom trabalho'",
                    "Focar apenas no resultado sem processo"
                ],
                dialogo: {
                    gestor: "Ricardo, você viu o problema e já montou um time para resolver. Que iniciativa!",
                    colaborador: "Pensei: 'vamos resolver isso juntos e tornar divertido!'",
                    gestor: "Funcionou perfeitamente! Você tem talento para mobilizar pessoas. Parabéns!"
                }
            },
            lideranca: {
                script: "Sua liderança é inspiradora! Sua equipe está engajada, produtiva e feliz. Você consegue extrair o melhor das pessoas sem pressão, só com entusiasmo genuíno. Isso é liderança de verdade. Continue assim!",
                tom: "Reconheça impacto humano da liderança. Perfis I querem saber que são amados e respeitados pela equipe.",
                evitar: [
                    "Focar só em resultados sem mencionar clima",
                    "Sugerir que é 'só carisma' sem substância",
                    "Ser técnico demais sobre gestão",
                    "Minimizar estilo de liderança relacional"
                ],
                dialogo: {
                    gestor: "Laura, pesquisa de clima: sua equipe é a mais feliz E a mais produtiva.",
                    colaborador: "Sério? Eu só tento criar um ambiente onde todo mundo quer estar!",
                    gestor: "E você consegue! Você é prova de que bom clima gera resultado. Incrível!"
                }
            },
            adaptacao: {
                script: "Você se adaptou à mudança com uma atitude incrível! Não só você abraçou o novo, como contagiou todo mundo com seu otimismo. Sua flexibilidade e energia positiva fizeram toda a diferença. Obrigado por liderar pelo exemplo!",
                tom: "Celebre atitude positiva e influência sobre outros. Perfis I querem ser vistos como catalisadores de mudança.",
                evitar: [
                    "Focar só em 'aceitar' sem reconhecer influência",
                    "Ser frio: 'Você se adaptou'",
                    "Ignorar como ele ajudou outros a se adaptarem",
                    "Não reconhecer energia positiva"
                ],
                dialogo: {
                    gestor: "Patrícia, você transformou uma mudança difícil em algo empolgante para todos!",
                    colaborador: "Tentei mostrar o lado bom e animar o pessoal!",
                    gestor: "E funcionou! Sua energia contagiante fez toda diferença. Você é incrível!"
                }
            }
        },
        construtivo: {
            desempenho: {
                script: "Preciso falar sobre resultados. Você é incrível conectando com pessoas, mas os números não estão vindo. Sei que você tem potencial, mas precisamos transformar esse carisma em entregas concretas. Vamos trabalhar juntos nisso? Como posso te ajudar?",
                tom: "Gentil mas claro. Perfis I precisam de suporte emocional mesmo em feedbacks difíceis.",
                evitar: [
                    "Ser frio ou muito direto (vai magoar demais)",
                    "Focar só em números sem reconhecer esforço social",
                    "Fazer parecer que carisma é inútil",
                    "Dar feedback sem oferecer suporte"
                ],
                dialogo: {
                    gestor: "João, você é querido por todos, mas sua meta está 30% abaixo. O que está acontecendo?",
                    colaborador: "Ah, tenho focado muito em relacionamento com clientes...",
                    gestor: "Entendo, e isso é valioso! Mas precisamos converter isso em fechamento. Vamos trabalhar técnicas de venda juntos?"
                }
            },
            comportamento: {
                script: "Você é incrível socializando, mas tem momentos onde você fala demais e não dá espaço para outros contribuírem. Seu carisma é um super poder, mas precisamos equilibrar para que todos brilhem. Consegue tentar ouvir um pouco mais nas próximas reuniões?",
                tom: "Cuidadoso e encorajador. Perfis I são sensíveis a críticas sociais.",
                evitar: [
                    "Ser duro: 'Você monopoliza conversas'",
                    "Fazer parecer que ser comunicativo é defeito",
                    "Crítica pública sobre comportamento social",
                    "Não equilibrar com reconhecimento"
                ],
                dialogo: {
                    gestor: "Maria, você traz energia ótima, mas algumas pessoas estão sentindo que não conseguem falar.",
                    colaborador: "Nossa, sério? Eu não percebi...",
                    gestor: "Sem problemas! Você só precisa dar mais espaço. Tente ouvir primeiro nas próximas reuniões, ok?"
                }
            },
            prazo: {
                script: "Sei que você se empenha muito, mas temos tido atrasos. Você se envolve com mil coisas ao mesmo tempo e acaba perdendo foco. Vamos trabalhar priorização juntos? Preciso que você entregue no prazo, mas sem perder seu jeito leve de ser.",
                tom: "Apoiador e colaborativo. Perfis I respondem melhor a 'vamos resolver juntos'.",
                evitar: [
                    "Acusar: 'Você é desorganizado'",
                    "Focar só em falha sem empatia",
                    "Fazer parecer que o problema é 'ser muito social'",
                    "Dar ultimato sem suporte"
                ],
                dialogo: {
                    gestor: "Pedro, segundo atraso. Percebi que você assume muitas coisas ao mesmo tempo.",
                    colaborador: "É, eu não consigo dizer não quando o pessoal pede ajuda...",
                    gestor: "Entendo! Mas precisamos focar. Vou te ajudar a priorizar, ok? Vamos fazer isso juntos."
                }
            },
            qualidade: {
                script: "Seu trabalho tem tido alguns erros que não são do seu padrão. Sei que você se preocupa com o time e o clima, mas a qualidade técnica também é importante. Vamos rever seu processo para garantir que você brilhe em tudo? Você é capaz disso!",
                tom: "Encorajador e confiante. Perfis I precisam acreditar que você acredita neles.",
                evitar: [
                    "Focar apenas em erros sem empatia",
                    "Fazer parecer que ele é incompetente",
                    "Ser muito técnico e frio",
                    "Não oferecer suporte ou caminho"
                ],
                dialogo: {
                    gestor: "Ana, alguns erros nos últimos trabalhos. Você está sobrecarregada?",
                    colaborador: "Um pouco... tenho ajudado muito o pessoal e acabei correndo no meu.",
                    gestor: "Entendo! Vamos reorganizar sua agenda para você ter tempo de qualidade no seu trabalho, ok?"
                }
            },
            comunicacao: {
                script: "Sua comunicação é sempre empolgante, mas às vezes você perde o foco e a mensagem fica confusa. Você tem carisma de sobra, agora só precisa direcionar melhor. Vamos trabalhar em estruturar suas ideias? Vai deixar você ainda mais incrível!",
                tom: "Construtivo e animador. Mostre que você quer amplificar algo que já é bom.",
                evitar: [
                    "Criticar entusiasmo ou empolgação",
                    "Fazer parecer que carisma não basta (dói neles)",
                    "Ser muito técnico sobre estrutura",
                    "Focar só no negativo"
                ],
                dialogo: {
                    gestor: "Carlos, sua energia é ótima, mas às vezes o pessoal não sabe qual é o ponto principal.",
                    colaborador: "Ah, eu me empolgo e vou falando...",
                    gestor: "Exato! Vamos trabalhar em começar pelo ponto principal? Vai potencializar ainda mais seu talento!"
                }
            },
            iniciativa: {
                script: "Você é ótimo em colaborar, mas tem esperado demais para tomar iniciativa sozinho. Confio muito em você, e queria te ver propondo mais ideias. Seu potencial é enorme, só precisa de mais confiança. Vamos tentar? Estou aqui para te apoiar!",
                tom: "Encorajador e confiante. Perfis I precisam sentir que você acredita neles.",
                evitar: [
                    "Criticar por 'não fazer sozinho' (eles valorizam colaboração)",
                    "Fazer parecer que dependência é fraqueza",
                    "Ser seco: 'Seja mais proativo'",
                    "Não oferecer segurança emocional"
                ],
                dialogo: {
                    gestor: "Julia, você tem ótimas ideias mas raramente propõe sozinha. Por quê?",
                    colaborador: "Tenho medo de propor algo errado...",
                    gestor: "Suas ideias são valiosas! Próxima vez, traga suas propostas. Eu vou te apoiar, prometo!"
                }
            },
            lideranca: {
                script: "Sua equipe te adora, mas alguns projetos não estão avançando. Você é ótimo criando conexão, mas liderança também é cobrar resultado. Não precisa deixar de ser você, apenas equilibrar carinho com direcionamento. Vamos trabalhar isso juntos?",
                tom: "Equilibrado entre reconhecimento e desenvolvimento. Perfis I temem ser vistos como 'fracos'.",
                evitar: [
                    "Criticar por 'ser muito amigo da equipe'",
                    "Sugerir que precisa ser 'durão'",
                    "Fazer parecer que calor humano é problema",
                    "Não dar exemplos práticos"
                ],
                dialogo: {
                    gestor: "Ricardo, sua equipe te ama mas resultados caíram 20%. O que está acontecendo?",
                    colaborador: "Não quero pressionar demais, o clima é tão bom...",
                    gestor: "Entendo! Mas cobrar com clareza não estraga clima. Vou te ensinar a fazer os dois, ok?"
                }
            },
            adaptacao: {
                script: "Sei que mudanças são difíceis, e você tem mostrado alguma resistência. Entendo que você se apega às pessoas e ao jeito que as coisas são, mas precisamos seguir em frente. Conto com seu otimismo para ajudar o time nessa transição. Você consegue fazer isso?",
                tom: "Empático mas firme. Perfis I respondem quando você apela ao papel social deles.",
                evitar: [
                    "Ignorar preocupações emocionais com mudança",
                    "Ser frio: 'É assim e pronto'",
                    "Não dar espaço para expressão de sentimentos",
                    "Fazer ultimato sem suporte"
                ],
                dialogo: {
                    gestor: "Laura, percebi que você está resistindo à mudança. O que te preocupa?",
                    colaborador: "Tenho medo de perder a conexão que temos no time...",
                    gestor: "Entendo! Mas você pode ser a ponte que mantém essa conexão na nova estrutura. Conta comigo?"
                }
            }
        },
        desenvolvimento: {
            desempenho: {
                script: "Você tem um talento incrível para conectar com pessoas. Agora quero te ver usar isso para gerar resultados ainda maiores! Vamos trabalhar em técnicas de fechamento e gestão de tempo para você brilhar ainda mais. Está animado para esse próximo nível?",
                tom: "Empolgante e prospectivo. Perfis I adoram 'próxima aventura'.",
                evitar: [
                    "Focar só em 'corrigir fraquezas'",
                    "Ser muito técnico sobre desenvolvimento",
                    "Não mostrar entusiasmo com potencial dele",
                    "Fazer parecer que precisa mudar essência"
                ],
                dialogo: {
                    gestor: "João, imagina você com todo esse carisma + técnicas de vendas consultivas? Imparável!",
                    colaborador: "Nossa, seria incrível! Como eu faço?",
                    gestor: "Vamos te treinar nos próximos 3 meses. Você vai arrasar ainda mais!"
                }
            },
            comportamento: {
                script: "Seu carisma é seu super poder, mas quero te ajudar a adicionar profundidade. Vamos desenvolver sua escuta ativa para você conectar ainda mais com as pessoas? Você vai ficar ainda mais incrível quando souber quando falar E quando ouvir!",
                tom: "Apresente como evolução, não correção. Perfis I adoram 'se tornar versão melhor'.",
                evitar: [
                    "Criticar excesso de comunicação diretamente",
                    "Fazer parecer que ser extrovertido é problema",
                    "Ser muito sério sobre desenvolvimento",
                    "Não celebrar o que já é bom"
                ],
                dialogo: {
                    gestor: "Maria, você já arrasa conectando. Quer aprender a conectar ainda mais profundamente?",
                    colaborador: "Claro! Como?",
                    gestor: "Escuta ativa. Vai multiplicar seu impacto. Vamos trabalhar isso juntos?"
                }
            },
            prazo: {
                script: "Você tem energia de sobra! Agora vamos canalizar isso para gestão de tempo. Quero te ver mantendo sua leveza mas entregando tudo no prazo. Vamos trabalhar priorização — você vai ficar ainda mais eficaz! Animado para isso?",
                tom: "Positivo e colaborativo. Perfis I não gostam de sentir que estão 'em problema'.",
                evitar: [
                    "Criticar desorganização duramente",
                    "Fazer parecer que diversão e prazo são incompatíveis",
                    "Ser técnico demais sobre gestão",
                    "Não mostrar que você vai apoiar"
                ],
                dialogo: {
                    gestor: "Pedro, vamos te ensinar gestão ágil de tempo. Vai liberar você para se divertir MAIS!",
                    colaborador: "Nossa, como assim?",
                    gestor: "Trabalho focado = mais tempo livre. Vou te ensinar, vai ser legal!"
                }
            },
            qualidade: {
                script: "Você já é rápido e carismático, agora vamos adicionar 'impecável' nessa lista! Quero te ajudar a criar hábitos de qualidade que vão te posicionar para projetos ainda maiores. Você merece crescer, vamos trabalhar isso juntos?",
                tom: "Motivacional e futuro. Perfis I se movem por visão inspiradora.",
                evitar: [
                    "Focar só em erros passados",
                    "Ser técnico demais sobre processos",
                    "Não conectar qualidade com oportunidades",
                    "Fazer parecer entediante"
                ],
                dialogo: {
                    gestor: "Ana, imagina você com zero erros + seu carisma? Imparável para projetos VIP!",
                    colaborador: "Adoraria! Como eu chego lá?",
                    gestor: "Vamos implementar checklist divertido. Você vai curtir, prometo!"
                }
            },
            comunicacao: {
                script: "Sua comunicação é contagiante! Agora vamos trabalhar estrutura para você influenciar ainda mais. Imagine suas ideias + organização clara? Você vai se tornar referência! Vamos nessa jornada juntos?",
                tom: "Empolg ante e reconhecedor. Perfis I adoram ser vistos como 'influenciadores'.",
                evitar: [
                    "Criticar estilo de comunicação",
                    "Focar só em 'falar menos'",
                    "Ser muito técnico sobre retórica",
                    "Não celebrar talento natural"
                ],
                dialogo: {
                    gestor: "Carlos, você já prende atenção. Agora vamos te ensinar storytelling estruturado. Vai ser show!",
                    colaborador: "Sério? Eu adoro histórias!",
                    gestor: "Então você vai adorar esse treinamento! Vamos?"
                }
            },
            iniciativa: {
                script: "Você é ótimo em colaboração, agora quero ver você liderando propostas também! Você tem potencial para ser referência, só precisa de mais confiança para propor. Vamos trabalhar isso? Eu acredito muito em você!",
                tom: "Encorajador e confiante. Perfis I precisam sentir que alguém acredita neles.",
                evitar: [
                    "Criticar dependência de aprovação social",
                    "Fazer parecer que colaboração é fraqueza",
                    "Ser técnico sobre autonomia",
                    "Não dar segurança emocional"
                ],
                dialogo: {
                    gestor: "Julia, suas ideias são incríveis! Quero ver você propondo mais. Topa?",
                    colaborador: "Mas e se errarem?",
                    gestor: "Eu te apoio! Errar propondo é melhor que não tentar. Vamos?"
                }
            },
            lideranca: {
                script: "Você tem um dom natural para inspirar pessoas! Agora vamos adicionar direcionamento estratégico. Imagina você motivando a equipe E entregando resultados estratégicos? Você vai ser liderança completa! Vamos trabalhar isso?",
                tom: "Visão inspiradora de futuro. Perfis I querem ser 'grandes líderes'.",
                evitar: [
                    "Criticar por 'ser muito amigo'",
                    "Fazer parecer que calor humano é fraqueza",
                    "Ser técnico demais sobre gestão",
                    "Não celebrar talento relacional"
                ],
                dialogo: {
                    gestor: "Ricardo, você já inspira. Agora vamos te ensinar a direcionar também. Vai ser poderoso!",
                    colaborador: "Nossa, adoraria! Como?",
                    gestor: "Vamos trabalhar OKRs de forma divertida. Você vai curtir!"
                }
            },
            adaptacao: {
                script: "Você tem um otimismo contagiante! Vamos trabalhar em transformar mudanças em oportunidades de engajar ainda mais pessoas. Você pode ser o catalisador de transformações positivas! Animado para esse papel?",
                tom: "Empolgante e social. Mostre como ele pode ser 'herói' da mudança.",
                evitar: [
                    "Focar em 'aceitar mudança' passivamente",
                    "Ser técnico sobre gestão de mudanças",
                    "Não apelar ao papel social dele",
                    "Fazer parecer entediante"
                ],
                dialogo: {
                    gestor: "Laura, imagina você liderando transformações com seu entusiasmo? Revolucionário!",
                    colaborador: "Seria incrível! Eu posso fazer isso?",
                    gestor: "Claro! Você nasceu para inspirar mudanças. Vamos te preparar!"
                }
            }
        }
    },

    // ===== PERFIL S - ESTABILIDADE =====
    S: {
        positivo: {
            desempenho: {
                script: "Quero agradecer sua dedicação consistente. Você entrega resultados sólidos mês após mês, com uma confiabilidade que é rara. Seu trabalho traz estabilidade para toda a equipe, e isso tem valor imenso. Muito obrigado por tudo.",
                tom: "Caloroso, genuíno e tranquilo. Perfis S valorizam reconhecimento sincero mais que efusivo.",
                evitar: [
                    "Reconhecimento excessivamente público ou dramático",
                    "Focar só em velocidade/agressividade (não é valor deles)",
                    "Comparar com outros colaboradores",
                    "Ser rápido demais no reconhecimento (parecer superficial)"
                ],
                dialogo: {
                    gestor: "João, quero te agradecer pessoalmente. Você é a base sólida dessa equipe.",
                    colaborador: "Ah, obrigado... eu só faço meu trabalho...",
                    gestor: "Mas você faz com uma constância e qualidade que fazem diferença real. Obrigado mesmo."
                }
            },
            comportamento: {
                script: "Seu jeito paciente e colaborativo cria um ambiente onde todos se sentem seguros. Você ouve antes de julgar, apoia colegas e nunca cria conflitos desnecessários. Essa é uma qualidade de liderança silenciosa que valorizo muito.",
                tom: "Reconheça qualidades relacionais de forma calorosa. Perfis S querem saber que fazem diferença positiva.",
                evitar: [
                    "Minimizar: 'Você é muito legal'",
                    "Focar só em 'não dar problema'",
                    "Ser superficial ou genérico",
                    "Reconhecimento apenas público (pode constranger)"
                ],
                dialogo: {
                    gestor: "Maria, você é a pessoa que mantém a harmonia do time. Percebe isso?",
                    colaborador: "Eu tento não complicar as coisas...",
                    gestor: "Você faz muito mais que isso. Você cria segurança. Isso é valioso. Obrigado."
                }
            },
            prazo: {
                script: "Sua confiabilidade é excepcional. Todo prazo cumprido, sem drama, sem correria. Você planeja bem e entrega consistentemente. Isso me dá tranquilidade e permite que eu foque em outras coisas. Muito obrigado por ser essa âncora.",
                tom: "Reconheça confiabilidade e previsibilidade. Perfis S valorizam ser 'rocha' para outros.",
                evitar: [
                    "Focar em velocidade (não é o ponto forte deles)",
                    "Sugerir que 'poderia ser mais rápido'",
                    "Não reconhecer planejamento e cuidado",
                    "Ser rápido e superficial no reconhecimento"
                ],
                dialogo: {
                    gestor: "Pedro, eu durmo tranquilo sabendo que você está cuidando daquilo. Sério.",
                    colaborador: "Eu só tento fazer direitinho...",
                    gestor: "E você faz. Sua confiabilidade é um presente. Obrigado."
                }
            },
            qualidade: {
                script: "Seu trabalho tem uma atenção aos detalhes e um cuidado que são admiráveis. Você não entrega só para cumprir, entrega com capricho. Isso faz diferença enorme na nossa reputação. Obrigado por esse compromisso com a excelência.",
                tom: "Reconheça cuidado e dedicação. Perfis S colocam coração no trabalho.",
                evitar: [
                    "Focar só em 'cumprir prazo'",
                    "Ser técnico demais: 'Zero defeitos'",
                    "Não reconhecer esforço e dedicação",
                    "Elogiar rapidamente e mudar de assunto"
                ],
                dialogo: {
                    gestor: "Ana, seu trabalho é sempre impecável. Você coloca cuidado em tudo.",
                    colaborador: "Obrigada... eu não gosto de entregar mal feito...",
                    gestor: "E nota-se. Seu comprometimento com qualidade é raro e valioso. Obrigado."
                }
            },
            comunicacao: {
                script: "Sua forma de comunicar é respeitosa e cuidadosa. Você escolhe as palavras, pensa antes de falar e nunca machuca ninguém. Isso cria um ambiente seguro. Sua gentileza autêntica faz diferença no nosso dia a dia.",
                tom: "Reconheça sensibilidade e cuidado nas relações. Perfis S valorizam harmonia.",
                evitar: [
                    "Focar em 'falar pouco' como algo negativo",
                    "Sugerir que deveria ser 'mais assertivo'",
                    "Não valorizar escuta ativa",
                    "Ser genérico sobre comunicação"
                ],
                dialogo: {
                    gestor: "Carlos, você é a pessoa que todo mundo procura quando precisa ser ouvido. Sabe disso?",
                    colaborador: "Ah, eu só tento ajudar...",
                    gestor: "E você ajuda muito. Sua presença tranquiliza. Isso é um dom. Obrigado."
                }
            },
            iniciativa: {
                script: "Você tem assumido mais responsabilidades sem fazer alarde. Você vê o que precisa ser feito e faz, sem esperar reconhecimento. Essa humildade e comprometimento são raros. Quero que saiba que eu vejo e valorizo muito isso.",
                tom: "Reconheça contribuições silenciosas. Perfis S não se promovem, precisam que outros vejam.",
                evitar: [
                    "Focar em 'deveria ser mais visível'",
                    "Comparar com perfis mais extrovertidos",
                    "Não reconhecer iniciativas discretas",
                    "Ser superficial"
                ],
                dialogo: {
                    gestor: "Julia, percebi que você tem resolvido coisas antes mesmo de virarem problema.",
                    colaborador: "Ah, eu só faço o que precisa...",
                    gestor: "Mas você faz sem precisar de holofote. Isso é maturidade. Obrigado."
                }
            },
            lideranca: {
                script: "Sua liderança é tranquila mas extremamente eficaz. Você desenvolve pessoas com paciência, cria ambiente seguro e entrega resultados consistentes. Você lidera pelo exemplo e pelo cuidado. Isso é liderança real.",
                tom: "Reconheça estilo de liderança servidora. Perfis S lideram apoiando, não comandando.",
                evitar: [
                    "Sugerir que deveria ser 'mais forte' ou 'mais duro'",
                    "Focar em 'falta de carisma'",
                    "Não valorizar desenvolvimento de pessoas",
                    "Comparar com líderes extrovertidos"
                ],
                dialogo: {
                    gestor: "Ricardo, sua equipe tem a menor rotatividade e maior satisfação. Como você faz?",
                    colaborador: "Eu tento cuidar de cada um...",
                    gestor: "E você consegue. Você lidera com coração. Isso é raro e valioso."
                }
            },
            adaptacao: {
                script: "Sei que mudanças não são fáceis para você, mas você abraçou essa com maturidade e ainda ajudou colegas a se adaptarem. Você transformou sua preocupação em apoio para
