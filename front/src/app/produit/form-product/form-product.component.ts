import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AnimationService } from 'src/app/service/animation.service';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {




  //attribute
  namePage:string= "Ajout produit"
  selectedImageUrl: string = ""
  productForm!: FormGroup;
  imageFile: File | undefined
  userAuth:any
  marques: any[] = []
  unites: any[] = []
  categories: any[] = []
  caracts: any[] = []
  value!: string[]
  typeInput!: number
  selectValue!: string[]
  valueradio!: string[]
  inputTypes: number[] = [];

  constructor(private fb: FormBuilder, private _productService: VenteService, private animation: AnimationService) {
    this.productForm = fb.group({
      libelle: "",
      prixUnitaire: 0,
      prixEnGros: 0,
      quantite: 0,
      marque: ["choisir une marque"],
      categorie: ["choisir un categorie"],
      description: "",
      caracteristique: this.fb.array([],
        [Validators.required]
      ),
    })
  }
  ngOnInit(): void {
    this.getAll()
    const element1 = document.getElementById('reveal_container'); 
    const element2 = document.getElementById('parent'); 

    if (element1 && element2) {
      console.log('breukh');
      
      this.animation.transitionPage(element1, element2);
    }

    const user = localStorage.getItem('userAuth')
    this.userAuth = JSON.parse(user!)
    
    
  }



  get caracteristique(): FormArray {
    return this.productForm.get('caracteristique') as FormArray;
  }


  selectImage($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    this.imageFile = inputElement.files?.[0]
    if (!this.isValidImage(this.imageFile!.type)) {
      console.log("nono");
      return
    }
    const imageUrl = URL.createObjectURL(this.imageFile!);
    this.selectedImageUrl = imageUrl
    console.log(this.selectedImageUrl);

  }

  deleteItem(i: number) {
    this.caracteristique.removeAt(i);
  }

  onSelectValue(event: Event, index: number) {
    let element = event.target as HTMLSelectElement
    const caract_id = element.value
    this._productService.getvalueByCaract(+caract_id).pipe(
      tap({
        next: (res: any) => {
          if (typeof res == 'object') {
            this.caracteristique.at(index).get('typeInput')?.setValue(0);
            this.caracteristique.at(index).get('typeValeur')?.setValue('input');
          }
          if (typeof res == "string") {
            this.value = res.split(',');
            if (this.value.length > 2) {
              this.caracteristique.at(index).get('typeInput')?.setValue(1);
              this.caracteristique.at(index).get('typeValeur')?.setValue('select');
            }
            if (this.value.length == 2) {
              this.caracteristique.at(index).get('typeInput')?.setValue(2);
              this.caracteristique.at(index).get('typeValeur')?.setValue('radio');
            }
            console.log(this.value);
          }
          console.log(typeof res);
        },
        complete: () => {
          console.log('observable terminé');
        },
        error: (err) => {
          console.error("Une erreur s'est produite :", err);
        }
      })
    ).subscribe()
  }



  isValidImage(name: string): boolean {
    const extention: string[] = ['jpeg', 'png', 'jpg', 'gif']
    return extention.includes(name.substring(6))
  }

  validInput(name: string) {
    const regex = /^[0-9]*$/;
    let inputValue = this.productForm.value[name];
    if (!regex.test(inputValue)) {
      this.productForm.get(name)?.patchValue(inputValue.replace(/[^0-9]/g, ''));
    }
  }

  getMarque($event: Event) {
    let element = $event.target as HTMLSelectElement
    const categorie_id = element.value
    console.log(categorie_id);

    this._productService.getCategorieByMarque(+categorie_id).pipe(
      tap({
        next: (res: any) => {
          console.log(res.marques);
          this.marques = res.marques
        },
        complete: () => {
          console.log('observable terminé');

        },
        error: (err) => {
          console.error("Une erreur s'est produite :", err);
        }
      })
    ).subscribe()
  }


  getAll() {
    this._productService.all().pipe(
      tap({
        next: (res: any) => {
          console.log(res.data);
          this.categories = res.data.categories
          this.unites = res.data.unite
          this.caracts = res.data.caracts
        },
        complete: () => {
          console.log('observable terminé');
        },
        error: (err) => {
          console.error("Une erreur s'est produite :", err);
        }
      })
    ).subscribe()
  }

  addProduct() {
    const idSuccursale = this.userAuth.succursale_id

    const formData = new FormData();
    formData.append('libelle', this.productForm.get('libelle')?.value);
    formData.append('prixUnitaire', this.productForm.get('prixUnitaire')?.value.toString());
    formData.append('prixEnGros', this.productForm.get('prixEnGros')?.value.toString());
    formData.append('quantite', this.productForm.get('quantite')?.value.toString());
    formData.append('marque', this.productForm.get('marque')?.value.toString());
    formData.append('categorie', this.productForm.get('categorie')?.value.toString());
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('succursale', idSuccursale.toString());

    const caracteristiqueArray = this.productForm.get('caracteristique') as FormArray;
    const caracteristiques = [];
    
    for (let i = 0; i < caracteristiqueArray.length; i++) {
      const caracteristique = caracteristiqueArray.at(i).get('caract')?.value;
      const valeur = caracteristiqueArray.at(i).get('valeur')?.value;
      caracteristiques.push({ caract: caracteristique, valeur: valeur });
    }
    
    formData.append('caracteristiques', JSON.stringify(caracteristiques));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    console.log(FormData);
    
    this._productService.add(formData).pipe(
      tap({
        next:(res)=>{
            console.log(res);
        },
        complete:()=>{
          console.log('observable terminer 🚀');
        },
        error:(err)=>{
          console.error(err);
        }
      })
    ).subscribe()


  }


  addCaracts() {
    const newRow = this.fb.group({
      caract: ['Choisie une caractéristique'],
      valeur: [''],
      typeInput: [0],
      typeValeur: ['input']
    })

    this.caracteristique.push(newRow)




  }



}
