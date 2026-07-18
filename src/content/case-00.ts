import type { GameCase } from "@/domain/types";

export const case00 = {
  id: "case-00",
  code: "07-14-C",
  title: "El pasajero de las 07:14",
  initialTitle: "Inconsistencia residencial",
  fatigue: "D2",
  initialDrift: "+11:00",
  objectives: [
    {
      id: "obj-tutorial-kitchen",
      text: "Encuentra algo que no encaje.",
      completionCondition: {
        type: "claimUnlocked",
        id: "claim-tutorial-coffee",
      },
    },
    {
      id: "obj-tutorial-registry",
      text: "Contraste la marca doméstica con un registro independiente.",
      completionCondition: {
        type: "claimUnlocked",
        id: "claim-tutorial-official-alone",
      },
    },
    {
      id: "obj-tutorial-table",
      text: "Coloque ambas marcas en La Mesa y emita una observación firme.",
      completionCondition: {
        type: "observationUnlocked",
        id: "obs-tutorial-second-person",
      },
    },
    {
      id: "obj-camera-unlocked",
      text: "Determine qué ocurre en la casa durante las 07:14.",
      completionCondition: {
        type: "observationUnlocked",
        id: "obs-alternate-room",
      },
    },
    {
      id: "obj-identity",
      text: "Determine quién ocupa la segunda continuidad.",
      completionCondition: {
        type: "observationUnlocked",
        id: "obs-discordance",
      },
    },
    {
      id: "obj-continuity-cut",
      text: "Reconstruya el corte de continuidad.",
      completionCondition: {
        type: "timelineCompleted",
        id: "case-00-timeline",
      },
    },
    {
      id: "obj-review",
      text: "Verifique si existe evidencia independiente del testimonio de Ena.",
      completionCondition: {
        type: "observationUnlocked",
        id: "obs-tutorial-second-person",
      },
    },
  ],
  evidence: [
    {
      id: "e-01",
      code: "E-01",
      title: "Declaración de Ena",
      type: "document",
      source: "Entrevista de campo",
      description: "Acta tomada en cocina, con respiración irregular entre respuestas.",
      inspection: {
        summary: "Declaración mecanografiada y corregida por la Mesa de recepción.",
        instructions: "Toque las frases subrayadas para levantar afirmaciones de memoria.",
        sections: [
          {
            id: "ena-front",
            title: "Anverso / entrevista",
            side: "front",
            body:
              "Ena Var declara convivencia matrimonial con Toma Narel. Refiere veinte años de rutina compartida, salida diaria hacia la línea 07:14 y dificultad para fijar el rostro de Toma cuando él no se encuentra en la habitación.",
          },
          {
            id: "ena-back",
            title: "Reverso / nota de campo",
            side: "back",
            body:
              "La declarante reconoce la voz, los hábitos y la silla de Toma. Al solicitar descripción facial, corrige tres veces la misma línea y deja el campo sin completar.",
          },
        ],
      },
      hotspots: [
        {
          id: "hs-ena-marriage",
          label: "veinte años",
          description: "La duración del matrimonio aparece estable en tres respuestas.",
          claimId: "claim-memory-marriage",
          sectionId: "ena-front",
        },
        {
          id: "hs-ena-train",
          label: "07:14",
          description: "Ena ubica la partida de Toma en la misma hora cada mañana.",
          claimId: "claim-memory-train",
          sectionId: "ena-front",
        },
        {
          id: "hs-ena-face",
          label: "rostro omitido",
          description: "El reverso registra fallas repetidas al describir el rostro.",
          claimId: "claim-memory-face",
          sectionId: "ena-back",
        },
      ],
      claims: [
        {
          id: "claim-memory-marriage",
          evidenceId: "e-01",
          text: "Ena recuerda veinte años de matrimonio con Toma.",
          category: "memory",
          prompt: "Formule el recuerdo de convivencia con la menor inferencia posible.",
          formulations: [
            {
              id: "f-ena-marriage-precise",
              text: "Ena recuerda veinte años de matrimonio con Toma.",
              precise: true,
            },
            {
              id: "f-ena-marriage-wide",
              text: "Ena prueba legalmente que estuvo casada con Toma.",
              precise: false,
            },
            {
              id: "f-ena-marriage-vague",
              text: "Ena cree haber conocido a Toma hace tiempo.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-memory-train",
          evidenceId: "e-01",
          text: "Toma sale cada mañana a las 07:14.",
          category: "memory",
          prompt: "Registre la rutina declarada sin confirmar aún su existencia material.",
          formulations: [
            {
              id: "f-ena-train-precise",
              text: "Toma sale cada mañana a las 07:14.",
              precise: true,
            },
            {
              id: "f-ena-train-wide",
              text: "El tren de las 07:14 funciona cada mañana.",
              precise: false,
            },
            {
              id: "f-ena-train-vague",
              text: "Ena asocia a Toma con una salida ferroviaria.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-memory-face",
          evidenceId: "e-01",
          text: "Ena no puede fijar el rostro de Toma cuando él no está.",
          category: "memory",
          prompt: "Formule la falla de memoria sin convertirla en diagnóstico.",
          formulations: [
            {
              id: "f-ena-face-precise",
              text: "Ena no puede fijar el rostro de Toma cuando él no está.",
              precise: true,
            },
            {
              id: "f-ena-face-wide",
              text: "Ena no recuerda ningún dato de Toma.",
              precise: false,
            },
            {
              id: "f-ena-face-vague",
              text: "El rostro de Toma parece extraño.",
              precise: false,
            },
          ],
        },
      ],
    },
    {
      id: "e-02",
      code: "E-02",
      title: "Registro civil",
      type: "document",
      source: "Instituto de Integridad Civil",
      description: "Certificado oficial con presión residual bajo el campo de estado civil.",
      statusFlags: ["remnant"],
      inspection: {
        summary: "Hoja oficial con una línea estable y una huella de impresión retirada.",
        instructions: "Revise anverso y reverso. La presión visible puede formularse como marca.",
        sections: [
          {
            id: "civil-front",
            title: "Anverso / estado civil",
            side: "front",
            body:
              "Ena Var figura como soltera desde su nacimiento. No consta matrimonio, convivencia registrada ni disolución administrativa asociada a Toma Narel.",
          },
          {
            id: "civil-back",
            title: "Reverso / presión",
            side: "back",
            body:
              "Bajo luz rasante aparece la presión de una línea eliminada. El papel conserva una doble impresión desplazada sin tinta legible.",
          },
        ],
      },
      hotspots: [
        {
          id: "hs-tutorial-official-alone",
          label: "vive oficialmente sola",
          description: "Dato administrativo suficiente para cotejar la cocina.",
          claimId: "claim-tutorial-official-alone",
          sectionId: "civil-front",
        },
        {
          id: "hs-civil-single",
          label: "soltera desde nacimiento",
          description: "Dato oficial reconocido por el Instituto.",
          claimId: "claim-record-single",
          sectionId: "civil-front",
        },
        {
          id: "hs-civil-erased",
          label: "línea eliminada",
          description: "La hoja conserva presión sin texto visible.",
          claimId: "claim-record-erased-line",
          sectionId: "civil-back",
        },
      ],
      claims: [
        {
          id: "claim-tutorial-official-alone",
          evidenceId: "e-02",
          text: "Ena vive oficialmente sola.",
          category: "record",
          prompt: "Extraiga el dato administrativo sin interpretar todavía la cocina.",
          formulations: [
            {
              id: "f-tutorial-alone-precise",
              text: "Ena vive oficialmente sola.",
              precise: true,
            },
            {
              id: "f-tutorial-alone-wide",
              text: "Ena nunca estuvo acompañada en su casa.",
              precise: false,
            },
            {
              id: "f-tutorial-alone-vague",
              text: "El registro civil no menciona a Toma.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-record-single",
          evidenceId: "e-02",
          text: "Ena figura como soltera desde su nacimiento.",
          category: "record",
          prompt: "Extraiga únicamente el dato oficial verificable.",
          formulations: [
            {
              id: "f-civil-single-precise",
              text: "Ena figura como soltera desde su nacimiento.",
              precise: true,
            },
            {
              id: "f-civil-single-wide",
              text: "Ena nunca convivió con nadie.",
              precise: false,
            },
            {
              id: "f-civil-single-vague",
              text: "El registro no ayuda a identificar a Toma.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-record-erased-line",
          evidenceId: "e-02",
          text: "El documento conserva la presión de una línea eliminada.",
          category: "record",
          remnant: true,
          prompt: "Registre la alteración como dato del soporte, no como lectura de contenido.",
          formulations: [
            {
              id: "f-civil-erased-precise",
              text: "El documento conserva la presión de una línea eliminada.",
              precise: true,
            },
            {
              id: "f-civil-erased-wide",
              text: "El documento prueba que el nombre de Toma fue borrado.",
              precise: false,
            },
            {
              id: "f-civil-erased-vague",
              text: "Hay una anomalía en el reverso del registro.",
              precise: false,
            },
          ],
        },
      ],
    },
    {
      id: "e-03",
      code: "E-03",
      title: "Mesa de desayuno",
      type: "scene",
      source: "Casa de Ena",
      asset: "assets/case-00/breakfast-table-inspection.png",
      description: "Escena estática levantada antes de la hora de deriva.",
      inspection: {
        summary: "Mesa pequeña con dos servicios, una silla fuera de línea y residuos térmicos.",
        instructions: "Toque cada pieza etiquetada. La escena admite huellas y un dato de memoria.",
        sections: [
          {
            id: "breakfast-scene",
            title: "Plano fijo / cocina",
            body:
              "La taza de té está frente al asiento habitual de Ena. La taza de café conserva humedad reciente. La segunda silla está separada del borde de la mesa con marca de arrastre corta.",
          },
        ],
      },
      hotspots: [
        {
          id: "hs-tutorial-second-cup",
          label: "segunda taza de cafÃ©",
          description: "Borde hÃºmedo y cafÃ© reciente frente a un lugar ocupado.",
          claimId: "claim-tutorial-coffee",
          sectionId: "breakfast-scene",
          layout: { x: 67, y: 28, width: 18, height: 13 },
        },
        {
          id: "hs-cup-ring",
          label: "marca circular de taza",
          description: "El aro queda separado del servicio habitual de Ena.",
          sectionId: "breakfast-scene",
          layout: { x: 58, y: 36, width: 17, height: 10 },
        },
        {
          id: "hs-coffee-pot",
          label: "cafetera",
          description: "La cafetera conserva volumen suficiente para mÃ¡s de una taza.",
          sectionId: "breakfast-scene",
          layout: { x: 37, y: 13, width: 25, height: 18 },
        },
        {
          id: "hs-second-service",
          label: "segundo plato y cubiertos",
          description: "El servicio opuesto conserva migas y utensilios desplazados.",
          sectionId: "breakfast-scene",
          layout: { x: 65, y: 43, width: 32, height: 16 },
        },
        {
          id: "hs-shifted-chair",
          label: "silla desplazada",
          description: "La silla inferior no estÃ¡ alineada con el borde de la mesa.",
          sectionId: "breakfast-scene",
          layout: { x: 50, y: 61, width: 46, height: 30 },
        },
        {
          id: "hs-tea-cup",
          label: "taza de té",
          description: "Ena identifica esta taza como propia y rechaza el café.",
          claimId: "claim-memory-no-coffee",
          sectionId: "breakfast-scene",
        },
        {
          id: "hs-coffee-cup",
          label: "taza de café",
          description: "La taza conserva marca húmeda y borde usado.",
          claimId: "claim-consequence-second-cup",
          sectionId: "breakfast-scene",
        },
        {
          id: "hs-second-chair",
          label: "segunda silla",
          description: "El polvo marca un desplazamiento reciente.",
          claimId: "claim-consequence-chair",
          sectionId: "breakfast-scene",
        },
      ],
      claims: [
        {
          id: "claim-tutorial-coffee",
          evidenceId: "e-03",
          text: "Alguien más tomó café esta mañana.",
          category: "consequence",
          prompt: "Formule la marca de la segunda taza sin nombrar a quien falta.",
          formulations: [
            {
              id: "f-tutorial-coffee-belief",
              text: "Ena cree que vive acompañada.",
              precise: false,
            },
            {
              id: "f-tutorial-coffee-precise",
              text: "Alguien más tomó café esta mañana.",
              precise: true,
            },
            {
              id: "f-tutorial-coffee-object",
              text: "Hay dos tazas sobre la mesa.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-consequence-second-cup",
          evidenceId: "e-03",
          text: "Una segunda taza fue utilizada recientemente.",
          category: "consequence",
          prompt: "Formule la huella material sin asignar todavía identidad.",
          formulations: [
            {
              id: "f-cup-precise",
              text: "Una segunda taza fue utilizada recientemente.",
              precise: true,
            },
            {
              id: "f-cup-wide",
              text: "Toma bebió café antes de salir.",
              precise: false,
            },
            {
              id: "f-cup-vague",
              text: "Hay otra taza sobre la mesa.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-memory-no-coffee",
          evidenceId: "e-03",
          text: "Ena no consume café.",
          category: "memory",
          prompt: "Registre el hábito declarado por Ena.",
          formulations: [
            {
              id: "f-no-coffee-precise",
              text: "Ena no consume café.",
              precise: true,
            },
            {
              id: "f-no-coffee-wide",
              text: "Nadie en la casa consume café.",
              precise: false,
            },
            {
              id: "f-no-coffee-vague",
              text: "La taza de té pertenece a Ena.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-consequence-chair",
          evidenceId: "e-03",
          text: "La segunda silla fue desplazada esta mañana.",
          category: "consequence",
          prompt: "Extraiga la marca de movimiento reciente.",
          formulations: [
            {
              id: "f-chair-precise",
              text: "La segunda silla fue desplazada esta mañana.",
              precise: true,
            },
            {
              id: "f-chair-wide",
              text: "Alguien se sentó frente a Ena durante veinte años.",
              precise: false,
            },
            {
              id: "f-chair-vague",
              text: "La silla está desordenada.",
              precise: false,
            },
          ],
        },
      ],
    },
    {
      id: "e-04",
      code: "E-04",
      title: "Cámara de arrastre",
      type: "sequence",
      source: "Levantamiento de campo",
      description: "Secuencia fotográfica con cuatro fotogramas alrededor del paso del tren.",
      statusFlags: ["altered"],
      inspection: {
        summary: "Tira de cámara con continuidad interrumpida entre 07:12 y 07:14.",
        instructions: "Cambie de fotograma y marque el intervalo que conserva una alteración.",
        frames: [
          {
            id: "frame-0709",
            time: "07:09",
            text: "Ena aparece sola junto a la mesa. Dos tazas permanecen en el plano.",
          },
          {
            id: "frame-0712",
            time: "07:12",
            text: "Una segunda sombra cae sobre la mesa sin cuerpo asociado visible.",
            claimId: "claim-consequence-shadow",
          },
          {
            id: "frame-0714",
            time: "07:14",
            text: "La habitación queda registrada vacía durante el paso del tren.",
            claimId: "claim-record-empty-room",
          },
          {
            id: "frame-0715",
            time: "07:15",
            text: "Ena vuelve al plano. La segunda taza ya no aparece.",
            claimId: "claim-consequence-missing-cup",
          },
        ],
      },
      hotspots: [
        {
          id: "hs-seq-shadow",
          label: "07:12 sombra",
          description: "El fotograma conserva sombra sin cuerpo.",
          claimId: "claim-consequence-shadow",
        },
        {
          id: "hs-seq-empty",
          label: "07:14 vacío",
          description: "El plano no registra cuerpos durante el paso del tren.",
          claimId: "claim-record-empty-room",
        },
        {
          id: "hs-seq-cup",
          label: "07:15 taza ausente",
          description: "La segunda taza desaparece entre fotogramas.",
          claimId: "claim-consequence-missing-cup",
        },
      ],
      claims: [
        {
          id: "claim-consequence-shadow",
          evidenceId: "e-04",
          text: "Una sombra aparece sin un cuerpo que la produzca.",
          category: "consequence",
          prompt: "Formule lo visible en el fotograma sin asignar sujeto.",
          formulations: [
            {
              id: "f-shadow-precise",
              text: "Una sombra aparece sin un cuerpo que la produzca.",
              precise: true,
            },
            {
              id: "f-shadow-wide",
              text: "Toma aparece fuera del campo de la cámara.",
              precise: false,
            },
            {
              id: "f-shadow-vague",
              text: "La luz cambia durante la grabación.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-record-empty-room",
          evidenceId: "e-04",
          text: "La habitación fue registrada vacía durante el paso del tren.",
          category: "record",
          prompt: "Registre el hecho capturado por la secuencia.",
          formulations: [
            {
              id: "f-empty-room-precise",
              text: "La habitación fue registrada vacía durante el paso del tren.",
              precise: true,
            },
            {
              id: "f-empty-room-wide",
              text: "Ena abandona la casa durante el paso del tren.",
              precise: false,
            },
            {
              id: "f-empty-room-vague",
              text: "La cámara pierde continuidad a las 07:14.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-consequence-missing-cup",
          evidenceId: "e-04",
          text: "La segunda taza desaparece durante el intervalo.",
          category: "consequence",
          prompt: "Formule la diferencia material entre fotogramas.",
          formulations: [
            {
              id: "f-missing-cup-precise",
              text: "La segunda taza desaparece durante el intervalo.",
              precise: true,
            },
            {
              id: "f-missing-cup-wide",
              text: "Toma retira la segunda taza al salir.",
              precise: false,
            },
            {
              id: "f-missing-cup-vague",
              text: "La mesa cambia después del tren.",
              precise: false,
            },
          ],
        },
      ],
    },
    {
      id: "e-05",
      code: "E-05",
      title: "Grabación magnética",
      type: "audio",
      source: "Cocina de Ena",
      description: "Cinta doméstica con pausas y una frase remanente de pista inferior.",
      statusFlags: ["remnant"],
      inspection: {
        summary: "Audio conservado en cinta. La transcripción sustituye la escucha obligatoria.",
        instructions: "Revise la transcripción. Las pausas también son material de inspección.",
        transcript: [
          { id: "tr-01", time: "00:03", speaker: "Ena", text: "¿Dormiste bien?" },
          { id: "tr-02", time: "00:08", text: "[pausa de respuesta no registrada]" },
          {
            id: "tr-03",
            time: "00:12",
            speaker: "Ena",
            text: "Te dejé el café donde siempre.",
          },
          { id: "tr-04", time: "00:19", text: "[pausa de respuesta no registrada]" },
          { id: "tr-05", time: "00:22", speaker: "Ena", text: "No, hoy no voy contigo." },
          { id: "tr-06", time: "00:27", speaker: "Ena", text: "Ya sé." },
          {
            id: "tr-07",
            time: "00:31",
            speaker: "Ena",
            text: "No vuelvas a traerla aquí.",
          },
          {
            id: "tr-08",
            time: "00:34",
            text: "[pista inferior] Kiru todavía no debe subir.",
            claimId: "claim-remnant-kiru",
          },
        ],
      },
      hotspots: [
        {
          id: "hs-audio-pauses",
          label: "pausas",
          description: "Los silencios encajan con respuestas no capturadas.",
          claimId: "claim-consequence-pauses",
        },
        {
          id: "hs-audio-kiru",
          label: "pista inferior",
          description: "La frase no pertenece a la conversación principal.",
          claimId: "claim-remnant-kiru",
        },
      ],
      claims: [
        {
          id: "claim-consequence-pauses",
          evidenceId: "e-05",
          text: "Ena mantiene una conversación con pausas compatibles con respuestas.",
          category: "consequence",
          prompt: "Registre la conducta audible sin inventar la segunda voz.",
          formulations: [
            {
              id: "f-pauses-precise",
              text: "Ena mantiene una conversación con pausas compatibles con respuestas.",
              precise: true,
            },
            {
              id: "f-pauses-wide",
              text: "La cinta contiene respuestas claras de Toma.",
              precise: false,
            },
            {
              id: "f-pauses-vague",
              text: "Ena habla sola en la cocina.",
              precise: false,
            },
          ],
        },
        {
          id: "claim-remnant-kiru",
          evidenceId: "e-05",
          text: 'La cinta contiene la frase: "Kiru todavía no debe subir".',
          category: "anomaly",
          remnant: true,
          prompt: "Formule la frase remanente como contenido de cinta, no como explicación.",
          formulations: [
            {
              id: "f-kiru-precise",
              text: 'La cinta contiene la frase: "Kiru todavía no debe subir".',
              precise: true,
            },
            {
              id: "f-kiru-wide",
              text: "Toma advierte que Kiru no debe subir al tren.",
              precise: false,
            },
            {
              id: "f-kiru-vague",
              text: "La cinta menciona a Kiru.",
              precise: false,
            },
          ],
        },
      ],
    },
  ],
  observations: [
    {
      id: "obs-tutorial-second-person",
      text: "Existe actividad doméstica atribuible a una segunda persona no registrada.",
      strength: "firm",
    },
    {
      id: "obs-biography-conflict",
      text: "La memoria afectiva de Ena y su biografía oficial describen continuidades incompatibles.",
      strength: "firm",
    },
    {
      id: "obs-second-resident",
      text: "La rutina doméstica contiene consecuencias atribuibles a una segunda persona.",
      strength: "confirmed",
    },
    {
      id: "obs-alternate-room",
      text: "Durante las 07:14, la cámara registró una versión distinta de la habitación.",
      strength: "confirmed",
    },
    {
      id: "obs-discordance",
      text: "La identidad de Toma fue eliminada del registro, pero permanece en memoria y consecuencia.",
      strength: "discordance",
    },
  ],
  contrastRules: [
    {
      id: "contrast-tutorial",
      requiredClaimIds: ["claim-tutorial-coffee", "claim-tutorial-official-alone"],
      relation: "contradicts",
      observationId: "obs-tutorial-second-person",
      feedbackIncorrect:
        "Kiru: La Mesa necesita enfrentar una huella doméstica con un registro, no solo ordenar papeles.",
    },
    {
      id: "contrast-camera-room",
      requiredClaimIds: ["claim-record-empty-room", "claim-consequence-missing-cup"],
      relation: "supports",
      observationId: "obs-alternate-room",
      unlockCondition: {
        type: "observationUnlocked",
        id: "obs-tutorial-second-person",
      },
      feedbackIncorrect:
        "Maru: Las dos piezas describen algo extraño, pero todavía no demuestran la misma continuidad.",
    },
    {
      id: "contrast-identity-erased",
      requiredClaimIds: [
        "claim-record-erased-line",
        "claim-memory-marriage",
        "claim-consequence-second-cup",
      ],
      relation: "contradicts",
      observationId: "obs-discordance",
      unlockCondition: {
        type: "observationUnlocked",
        id: "obs-alternate-room",
      },
      feedbackIncorrect:
        "Kiru: Eso explica la rutina. No explica por qué su nombre desapareció.",
    },
  ],
  timeline: [
    { id: "t1", text: "Ena prepara dos desayunos.", correctIndex: 0 },
    { id: "t2", text: "La segunda silla se desplaza.", correctIndex: 1 },
    { id: "t3", text: "Aparece una segunda sombra.", correctIndex: 2 },
    { id: "t4", text: "Se escucha el tren.", correctIndex: 3 },
    { id: "t5", text: "La habitación queda vacía.", correctIndex: 4 },
    { id: "t6", text: "Ena reaparece sin la segunda taza.", correctIndex: 5 },
  ],
  hypotheses: [
    {
      id: "hypothesis-dominant",
      title: "Continuidad ferroviaria descartada",
      description:
        "Toma perteneció a una continuidad ferroviaria descartada y permanece como huérfano causal.",
      status: "dominant",
      requiredObservationIds: [
        "obs-biography-conflict",
        "obs-second-resident",
        "obs-alternate-room",
        "obs-discordance",
      ],
      slots: [
        {
          id: "slot-record",
          category: "record",
          requiredClaimId: "claim-record-erased-line",
        },
        {
          id: "slot-memory",
          category: "memory",
          requiredClaimId: "claim-memory-marriage",
        },
        {
          id: "slot-consequence",
          category: "consequence",
          requiredClaimId: "claim-consequence-second-cup",
        },
        {
          id: "slot-anomaly",
          category: "anomaly",
          requiredClaimId: "claim-remnant-kiru",
        },
      ],
    },
  ],
  verdicts: [
    {
      id: "verdict-close",
      title: "Cierre de concordancia",
      description:
        "Reconocer la continuidad vigente y retirar elementos que sostienen la identidad residual.",
      consequences: [
        "Ena perderá progresivamente sus recuerdos de Toma.",
        "La zona reducirá su fatiga.",
        "El ferrocarril perderá un punto de fijación.",
      ],
      endingSceneId: "ending-close",
    },
    {
      id: "verdict-stabilize",
      title: "Estabilización residual",
      description: "Reconocer provisionalmente a Toma como identidad residual.",
      consequences: [
        "Ena conservará su memoria.",
        "La casa seguirá fatigada.",
        "La continuidad ferroviaria ganará estabilidad.",
      ],
      endingSceneId: "ending-stabilize",
    },
  ],
  product: {
    universe: "Concordancia",
    title: "Concordancia: Estación 0",
    arc: "Estación 0",
  },
  tutorial: {
    initialObjective: "Encuentra algo que no encaje.",
    dialogue: [
      { speaker: "Ena", text: "Toma acaba de tomar el tren." },
      { speaker: "Maru", text: "La línea lleva cuarenta años cerrada." },
      { speaker: "Kiru", text: "Entonces algo aquí no encaja." },
    ],
    cupClaimId: "claim-tutorial-coffee",
    registryEvidenceId: "e-02",
    registryClaimId: "claim-tutorial-official-alone",
    mesaObservationId: "obs-tutorial-second-person",
    cameraEvidenceId: "e-04",
  },
} satisfies GameCase;

export type Case00 = typeof case00;
