export interface Produit {
  id: number;
  libelle: string;
  code: string;
  description: string;
  image: string;
  succursales: ProduitSuccursale[];
  caracteristiques: Caracteristique[];
}

export interface amis {
  id: 3,
  quantite: 20,
  prix_unitaire: 800,
  prix_en_gros: 600,
  succursale: succursaleInfo
}

export interface succursaleInfo {
  id: number,
  nom: string
  adresse: string,
  telephone: string,
  promo: number,
}

export interface ProduitSuccursale {
  id: number;
  nom: string;
  promo: number;
  quantite: number;
  prix_unitaire: number;
  prix_en_gros: number;
}

export interface Caracteristique {
  id: number;
  libelle: string;
  description: string;
  valeur: string;
  unite: number;
}