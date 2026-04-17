import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lavoriCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lavori" }),
  schema: z.object({
    // Metadata principali
    cliente: z.string(),                    // "A.S. Roma"
    settore: z.string(),                    // "Sport, ecosistema B2B e B2C"
    durata: z.string(),                     // "Dal 2019 a oggi"
    ambito: z.string(),                     // "Affiancamento strategico continuativo, progettazione digitale"

    // Titolo e tesi del case
    titolo: z.string(),                     // "Accanto al club, prima del brief."
    tesi: z.string(),                       // Paragrafo di apertura

    // Flag
    inVetrina: z.boolean().default(false),  // Se true, appare nella vetrina (non solo archivio)
    ordineVetrina: z.number().optional(),   // Ordine di apparizione in vetrina (1-4)
    draft: z.boolean().default(false),      // Se true, non viene pubblicato

    // Immagine/Video hero
    heroImage: z.string().optional(),       // Path relativo all'immagine hero
    heroVideo: z.string().optional(),       // Path relativo al video hero se fornito
    heroImageAlt: z.string().optional(),

    // SEO
    descrizione: z.string(),                // Meta description della pagina singolo case
  }),
});

export const collections = {
  lavori: lavoriCollection,
};
