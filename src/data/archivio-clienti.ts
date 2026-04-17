export interface ClienteArchivio {
  nome: string;
  settore: string;
  anno?: string;
}

export const archivioClienti: ClienteArchivio[] = [
  // Sport
  { nome: "Watford FC", settore: "Sport", anno: "2018" },
  { nome: "US Latina Calcio", settore: "Sport" },

  // Food
  { nome: "San Lidano", settore: "Food" },
  { nome: "Desco", settore: "Food" },
  { nome: "Gruppo Francia Mozzarella", settore: "Food" },
  { nome: "Consorzio Olio EVO Sabina DOP", settore: "Food" },

  // Retail / GDO
  { nome: "Alex Perfume", settore: "Retail" },
  { nome: "Risparmio Casa", settore: "Retail / GDO" },

  // Manifatturiero / Tech
  { nome: "KingLED", settore: "Manifatturiero" },
  { nome: "Innovatech", settore: "Tech" },

  // Associazioni / Istituzionale
  { nome: "Fipe Confcommercio", settore: "Associazioni" },
  { nome: "iFORUM", settore: "Istituzionale" },
  { nome: "Camera di Commercio", settore: "Istituzionale" },
  { nome: "Comune di Latina", settore: "Istituzionale" },

  // Servizi / Altro
  { nome: "Unicredit", settore: "Finanza" },
  { nome: "Microsoft", settore: "Tech" },
  { nome: "Save the Children", settore: "No profit" },
];

export function groupBySector(
  clienti: ClienteArchivio[]
): Record<string, ClienteArchivio[]> {
  return clienti.reduce((acc, cliente) => {
    const settore = cliente.settore;
    if (!acc[settore]) acc[settore] = [];
    acc[settore].push(cliente);
    return acc;
  }, {} as Record<string, ClienteArchivio[]>);
}
