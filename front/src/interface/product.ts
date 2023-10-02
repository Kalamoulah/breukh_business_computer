
    export interface Product {
        libelle: string
        code: string
        description: string
        succursale: string
        prix:number
        // stock: number
        defaultPrice?: number;
        quantite?: number,
        total?:number
        caracteristiques: Caracteristique[]
      }
      
      export interface Caracteristique {
        libelle: string
        valeur: number
        unite: string
      }

    
      

   
      