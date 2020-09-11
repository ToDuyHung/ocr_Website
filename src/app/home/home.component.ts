import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { Map } from "mapbox-gl/dist/mapbox-gl"
import * as mapboxgl from "mapbox-gl/dist/mapbox-gl"
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgSrc: string = '../../assets/imgs/paper-placeholder.jpg';
  selectedImage: any = null;
  selectedImageName: string = "";
  isSubmitted: boolean;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 10.791350;
  lng = 106.713373;
  // markerLat = 10.791350;
  // markerLong = 106.713373;

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    apiUrl: new FormControl('', Validators.required)
  })

  constructor(
    private storage: AngularFireStorage,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    mapboxgl.accessToken = environment.mapboxAPI;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map = new mapboxgl.Marker()
    .setLngLat([this.lng, this.lat])
    .addTo(this.map);
  }

  onSubmit(formValue) {
    this.isSubmitted = true;

    if (this.formTemplate.valid) {
      let filePath: string = `images/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            console.log(formValue['apiUrl']);
            this.crudService.pushUrl(url,formValue['apiUrl']).subscribe(res => {
              this.crudService.pullLatLng(formValue['apiUrl']).subscribe(res => {
                console.log("request: ", res.lat, res.lng);
                this.lat = res.lat;
                this.lng = res.lng;
                this.ngOnInit();
              })
            });
          })
        })
      ).subscribe()
    }
  }



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.selectedImageName = this.selectedImage.name;
    }
    else {
      this.imgSrc = '../../assets/imgs/paper-placeholder.jpg';
      this.selectedImage = null;
      this.selectedImageName = "";
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      apiUrl: '',
    });

    this.imgSrc = '../../assets/imgs/paper-placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
