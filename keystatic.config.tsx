import { config, collection, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export default config({
  // Modalità GitHub in produzione, Local in development
  storage: import.meta.env.DEV 
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'andreabellamio',     // Da sostituire con username GitHub reale
          name: 'mandarino-site',         // Nome del repository
        },
      },

  // Autenticazione — chi può accedere al pannello
  // Con GitHub OAuth, solo chi ha accesso al repository
  ui: {
    brand: {
      name: 'Mandarino',
    },
    navigation: {
      Contenuti: ['lavori', 'pensiero'],
    },
  },

  collections: {

    // ================================================
    // COLLEZIONE LAVORI (case study)
    // ================================================
    lavori: collection({
      label: 'Lavori',
      slugField: 'cliente',
      path: 'src/content/lavori/*',
      format: { contentField: 'contenuto' },

      schema: {
        cliente: fields.slug({
          name: {
            label: 'Nome cliente',
            description: 'Es: A.S. Roma, Avio Interiors, Todis',
          },
        }),

        settore: fields.text({
          label: 'Settore',
          description: 'Es: Sport, ecosistema B2B e B2C',
        }),

        durata: fields.text({
          label: 'Durata del rapporto',
          description: 'Es: Dal 2019 a oggi',
        }),

        ambito: fields.text({
          label: 'Ambito di lavoro',
          description: 'Es: Affiancamento strategico, progettazione digitale',
        }),

        titolo: fields.text({
          label: 'Titolo del case',
          description: 'La frase forte che racconta il case. Es: Accanto al club, prima del brief.',
        }),

        tesi: fields.text({
          label: 'Tesi di apertura',
          description: 'Il paragrafo breve che appare nella card e in cima al case.',
          multiline: true,
        }),

        heroImage: fields.image({
          label: 'Immagine hero',
          description: 'Immagine principale del case. Verrà mostrata grande in cima alla pagina.',
          directory: 'public/assets/lavori',
          publicPath: '/assets/lavori/',
        }),

        heroImageAlt: fields.text({
          label: 'Descrizione immagine hero (alt text)',
          description: 'Descrizione testuale per accessibilità e SEO.',
        }),

        coverImage: fields.image({
          label: 'Immagine di copertina (per la vetrina)',
          description: 'Consigliato: 1280x800px (16:10). Appare nelle card della homepage e della pagina Lavori.',
          directory: 'public/assets/lavori',
          publicPath: '/assets/lavori/',
        }),

        coverImageAlt: fields.text({
          label: 'Descrizione immagine copertina (alt text)',
          description: 'Descrizione per accessibilità.',
        }),

        inVetrina: fields.checkbox({
          label: 'Mostra in vetrina',
          description: 'Se attivo, il case appare nella griglia principale della pagina Lavori.',
          defaultValue: false,
        }),

        ordineVetrina: fields.number({
          label: 'Ordine in vetrina',
          description: 'Numero da 1 a 4. Determina l\'ordine di apparizione nella griglia.',
        }),

        descrizione: fields.text({
          label: 'Meta description (SEO)',
          description: 'Descrizione per i motori di ricerca. Max 155 caratteri.',
          multiline: true,
        }),

        draft: fields.checkbox({
          label: 'Bozza (non pubblicare)',
          defaultValue: false,
        }),

        // Il corpo del case — editor visuale MDX
        contenuto: fields.mdx({
          label: 'Contenuto del case',
          description: 'Il corpo narrativo del case. Puoi inserire testo, immagini, gallery e video.',
          components: {

            // Componente immagine singola
            MediaImmagine: block({
              label: 'Immagine',
              schema: {
                src: fields.image({
                  label: 'Immagine',
                  directory: 'public/assets/lavori',
                  publicPath: '/assets/lavori/',
                }),
                alt: fields.text({
                  label: 'Descrizione (alt text)',
                }),
                didascalia: fields.text({
                  label: 'Didascalia (opzionale)',
                }),
                dimensione: fields.select({
                  label: 'Dimensione',
                  options: [
                    { label: 'Normale (larghezza testo)', value: 'normale' },
                    { label: 'Grande (900px)', value: 'grande' },
                    { label: 'Piena (larghezza massima)', value: 'piena' },
                  ],
                  defaultValue: 'grande',
                }),
              },
            }),

            // Componente gallery
            MediaGallery: block({
              label: 'Gallery (più immagini)',
              schema: {
                immagini: fields.array(
                  fields.object({
                    src: fields.image({
                      label: 'Immagine',
                      directory: 'public/assets/lavori',
                      publicPath: '/assets/lavori/',
                    }),
                    alt: fields.text({ label: 'Descrizione (alt text)' }),
                    didascalia: fields.text({ label: 'Didascalia (opzionale)' }),
                  }),
                  {
                    label: 'Immagini',
                    itemLabel: (props) => props.fields.alt.value || 'Immagine',
                  }
                ),
                colonne: fields.select({
                  label: 'Numero di colonne',
                  options: [
                    { label: '2 colonne', value: '2' },
                    { label: '3 colonne', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                didascalia: fields.text({
                  label: 'Didascalia generale (opzionale)',
                }),
              },
            }),

            // Componente video
            MediaVideo: block({
              label: 'Video',
              schema: {
                tipo: fields.select({
                  label: 'Tipo di video',
                  options: [
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Vimeo', value: 'vimeo' },
                    { label: 'Video nativo (mp4)', value: 'nativo' },
                  ],
                  defaultValue: 'youtube',
                }),
                id: fields.text({
                  label: 'ID video (YouTube o Vimeo)',
                  description: 'Es: per https://youtu.be/dQw4w9WgXcQ inserisci dQw4w9WgXcQ',
                }),
                src: fields.text({
                  label: 'Path video nativo',
                  description: 'Solo per video mp4. Es: /assets/lavori/todis/video.mp4',
                }),
                didascalia: fields.text({
                  label: 'Didascalia (opzionale)',
                }),
              },
            }),

          },
        }),
      },
    }),

    // ================================================
    // COLLEZIONE PENSIERO (articoli)
    // ================================================
    pensiero: collection({
      label: 'Pensiero',
      slugField: 'titolo',
      path: 'src/content/pensiero/*',
      format: { contentField: 'contenuto' },

      schema: {
        titolo: fields.slug({
          name: {
            label: 'Titolo',
            description: 'Il titolo dell\'articolo.',
          },
        }),

        sottotitolo: fields.text({
          label: 'Sottotitolo (opzionale)',
          description: 'Appare sotto il titolo in corsivo.',
        }),

        data: fields.date({
          label: 'Data di pubblicazione',
          description: 'Formato: YYYY-MM-DD',
        }),

        tempoLettura: fields.number({
          label: 'Tempo di lettura (minuti)',
          description: 'Stima del tempo di lettura. Appare nella lista articoli.',
        }),

        descrizione: fields.text({
          label: 'Meta description (SEO)',
          description: 'Descrizione per i motori di ricerca. Max 155 caratteri.',
          multiline: true,
        }),

        draft: fields.checkbox({
          label: 'Bozza (non pubblicare)',
          defaultValue: false,
        }),

        // Il corpo dell'articolo — editor MDX con componenti media
        contenuto: fields.mdx({
          label: 'Contenuto dell\'articolo',
          description: 'Scrivi l\'articolo. Usa ## per i titoli delle sezioni.',
          components: {

            // Componente immagine singola
            MediaImmagine: block({
              label: 'Immagine',
              schema: {
                src: fields.image({
                  label: 'Immagine',
                  directory: 'public/assets/pensiero',
                  publicPath: '/assets/pensiero/',
                }),
                alt: fields.text({
                  label: 'Descrizione (alt text)',
                }),
                didascalia: fields.text({
                  label: 'Didascalia (opzionale)',
                }),
                dimensione: fields.select({
                  label: 'Dimensione',
                  options: [
                    { label: 'Normale (larghezza testo)', value: 'normale' },
                    { label: 'Grande (900px)', value: 'grande' },
                    { label: 'Piena (larghezza massima)', value: 'piena' },
                  ],
                  defaultValue: 'grande',
                }),
              },
            }),

            // Componente gallery
            MediaGallery: block({
              label: 'Gallery (più immagini)',
              schema: {
                immagini: fields.array(
                  fields.object({
                    src: fields.image({
                      label: 'Immagine',
                      directory: 'public/assets/pensiero',
                      publicPath: '/assets/pensiero/',
                    }),
                    alt: fields.text({ label: 'Descrizione (alt text)' }),
                    didascalia: fields.text({ label: 'Didascalia (opzionale)' }),
                  }),
                  {
                    label: 'Immagini',
                    itemLabel: (props) => props.fields.alt.value || 'Immagine',
                  }
                ),
                colonne: fields.select({
                  label: 'Numero di colonne',
                  options: [
                    { label: '2 colonne', value: '2' },
                    { label: '3 colonne', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                didascalia: fields.text({
                  label: 'Didascalia generale (opzionale)',
                }),
              },
            }),

            // Componente video
            MediaVideo: block({
              label: 'Video',
              schema: {
                tipo: fields.select({
                  label: 'Tipo di video',
                  options: [
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Vimeo', value: 'vimeo' },
                    { label: 'Video nativo (mp4)', value: 'nativo' },
                  ],
                  defaultValue: 'youtube',
                }),
                id: fields.text({
                  label: 'ID video (YouTube o Vimeo)',
                  description: 'Es: per https://youtu.be/dQw4w9WgXcQ inserisci dQw4w9WgXcQ',
                }),
                src: fields.text({
                  label: 'Path video nativo',
                  description: 'Solo per video mp4. Es: /assets/pensiero/video.mp4',
                }),
                didascalia: fields.text({
                  label: 'Didascalia (opzionale)',
                }),
              },
            }),

          },
        }),
      },
    }),

  },
});
