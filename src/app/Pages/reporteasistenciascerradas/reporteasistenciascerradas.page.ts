import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { FirestoreService } from '../../services/firestore.service';
import { Slides } from '../../Models/Slides';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { File } from '@ionic-native/file/ngx';
import { AsistenciaTecnica } from 'src/app/Models/AsistenciaTecnica';
@Component({
  selector: 'app-reporteasistenciascerradas',
  templateUrl: './reporteasistenciascerradas.page.html',
  styleUrls: ['./reporteasistenciascerradas.page.scss'],
})
export class ReporteasistenciascerradasPage implements OnInit {

  @ViewChild('barChart') barChart;
  bars: Chart;
  colorArray: Array<string>;
  mydate: any;
  mydateact: any;
  mydatefin: any;
  labels: Array<string>;
  datos: Array<number>;
  slidesprops: Slides;
  slideOptsOne: any;
  loadings: Loadings;
  usuari: boolean;
  tecni: boolean;
  barr: boolean;
  alerts: Alerts;
  condatos: boolean;
  errorfecha: boolean;
  parametro: string;
  data: Array<AsistenciaTecnica>;
  tablestyle= 'bootstrap';
  enableSummary = true;
  buscando: string;
  nuevorol: string;
  summaryPosition = 'bottom';
  titulo: string;
  columns = [
    { name: 'Asunto', summaryFunc: null },
    { name: 'Estado', summaryFunc: cells => this.summaryForGender(cells) },
    { name: 'Fecha', summaryFunc: null },
    { name: 'FechaCierre', summaryFunc: null },
    { name: 'idTecnico', summaryFunc: null },
    { name: 'idUsuario', summaryFunc: null },
    { name: 'Barrio', summaryFunc: null }
  ];

  constructor(private firestore: FirestoreService, private loadingctrl: LoadingController,
             private alertctrl: AlertController, private file: File, private plataforma: Platform) {
    this.labels = new Array<string>();
    this.datos = new Array<number>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
    this.condatos = false;
    this.errorfecha = false;
    this.data = new Array<AsistenciaTecnica>();
    this.ObtenerFechaActual(new Date);
    this.usuari = false;
    this.tecni = false;
    this.barr = false;
    
   }


   private summaryForGender(cells: string[]) {
    const apendientes = cells.filter(cell => cell === 'pendiente').length;
    const aejecucion = cells.filter(cell => cell === 'ejecucion').length;
    const acerradas = cells.filter(cell => cell === 'cerrado').length;

    return `Por asignar: ${apendientes}, ejecucion: ${aejecucion}, cerradas: ${acerradas}`;
  }

  ngOnInit() {
    this.mydate = moment(new Date()).format('YYYY-MM-DD');
    this.mydatefin = moment(new Date()).format('YYYY-MM-DD');
  }

  ionViewDidEnter() {
  }

  ObtenerFecha(date) {
    this.mydate = moment(date).format('YYYY-MM-DD');
 }

 ObtenerFechaActual(date) {
  this.mydateact = moment(date).format('YYYY-MM-DD');
}

 ObtenerFechaFin(date) {
  this.mydatefin = moment(date).format('YYYY-MM-DD');
  if(this.mydatefin < this.mydate){
   this.errorfecha = true;    
  }else{
    this.errorfecha = false;
  }
}
 buscarreporte(){
this.data = new Array<AsistenciaTecnica>();
if(this.parametro !== null && this.parametro !== undefined && this.parametro !== ''){
  this.loadings.presentLoading('Un momento por favor cargando el reporte...').then(() => {
  this.firestore.ReporteAsistenciasFechas(this.parametro, this.mydate, this.mydatefin, this.buscando ).then( (resp: any) => {
  resp.subscribe((re)=>{
    for (let index = 0; index < re.length; index++) {
      this.data.push(re[index].payload.doc.data());
    }
  });

  });;
  // this.labels = new Array<string>();
  // this.datos = new Array<number>();
  // this.colorArray = new Array<string>();
 
  //   this.firestore.ObtenerAsistenciasCerradasbyFecha(this.mydate).subscribe((resp) => {
  //     if(resp.docs.length > 0){
  //       this.labels.push('asistencias cerradas');
  //       this.datos.push(resp.docs.length);
  //       this.colorArray.push('rgba(0, 99, 132, 0.6)');
  //     }else{
  //     }
  // this.firestore.ObtenerAsistenciasPendientebyFecha(this.mydate).subscribe(resp1 => {
  //   if(resp1.docs.length > 0){
  //     this.labels.push('asistencias pendientes');
  //     this.datos.push(resp1.docs.length);
  //     this.colorArray.push('rgb(38, 300, 12)');
  //   }else{
  //   }

  // this.firestore.ObtenerAsistenciasEjecucionbyFecha(this.mydate).subscribe(resp2 => {
  //   if(resp2.docs.length > 0){
  //     this.labels.push('asistencias en ejecución');
  //     this.datos.push(resp2.docs.length);
  //     this.colorArray.push('rgb(38, 200, 33)');
  //   }else{
  //   }
  // this.createBarChart(this.labels, this.datos, this.colorArray);
  this.loadings.CerrarLoading();
  if(this.data.length > 0){
    this.condatos = true;
  }else{
    this.condatos = false;
  }
});
// });
// });
// });
}else{
  this.alerts.presentAlert(this.alertctrl, 'Error', 'Por favor elija un criterio de búsqueda', 'alertConfirm');
}
 }

 exportPdf(){
  const div = document.getElementById('prin');
  const options = { background: 'white', height: 845, width: 995 };
  domtoimage.toPng(div, options).then((dataUrl) => {
      //Initialize JSPDF
      const doc = new jsPDF.jsPDF('p', 'mm', 'a4');
      doc.setFontSize(15);//optional
        doc.setTextColor(40);//optional
        doc.text("Junta Administradora de Agua Potable de los Barrios Occidentales de Aloasí", 15, 22);// set your margins
        if(this.parametro === 'general'){
          this.titulo = 'General de Asistencias';
        }
        if(this.parametro === 'idUsuario'){
          this.titulo = 'por usuario:' + ' '+ this.buscando;
        }
        if(this.parametro === 'idTecnico'){
          this.titulo = 'por técnico:' + ' '+ this.buscando;
        }
        if(this.parametro === 'barrio'){
          this.titulo = 'por barrio:' + ' '+ this.buscando;
        }
        doc.text("Reporte " + this.titulo, 15, 30);// set your margins
        doc.text("Fecha Inicio:"+ this.mydate.toString(), 15, 35);// set your margins
        doc.text("Fecha Fin:"+ this.mydatefin.toString(), 15, 40);// set your margins
      //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 10, 50, 200, 200);
      doc.save('ReporteAsistencias-'+ this.mydateact.toString() +'.pdf');
  });
}

veropcion(val){
  this.data = new Array<AsistenciaTecnica>();
if(val === 'idUsuario'){
this.usuari = true;
this.barr = false;
this.tecni = false;
}
if(val === 'idTecnico'){
  this.usuari = false;
  this.barr = false;
  this.tecni = true;
  }
if(val === 'barrio'){
  this.usuari = false;
  this.barr = true;
  this.tecni = false;
  }
  if(val === 'general'){
    this.usuari = false;
    this.barr = false;
    this.tecni = false;
    }
}

generatePdfMobile(){
  const div = document.getElementById("prin");
  const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
  this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
  domtoimage.toPng(div, options).then((dataUrl) => {
    //Initialize JSPDF
    var doc = new jsPDF.jsPDF("p","mm","a4");
    doc.setFontSize(15);//optional
    doc.setTextColor(40);//optional
    doc.text("Junta Administradora de Agua Potable de los Barrios Occidentales de Aloasí", 15, 22);// set your margins
    if(this.parametro === 'general'){
      this.titulo = 'General de Asistencias';
    }
    if(this.parametro === 'idUsuario'){
      this.titulo = 'por usuario:' + ' '+ this.buscando;
    }
    if(this.parametro === 'idTecnico'){
      this.titulo = 'por técnico:' + ' '+ this.buscando;
    }
    if(this.parametro === 'barrio'){
      this.titulo = 'por barrio:' + ' '+ this.buscando;
    }
    doc.text("Reporte " + this.titulo, 15, 30);// set your margins
    doc.text("Fecha Inicio:"+ this.mydate.toString(), 15, 35);// set your margins
    doc.text("Fecha Fin:"+ this.mydatefin.toString(), 15, 40);// set your margins
    //Converting canvas to Image
    //Add image Canvas to PDF
    doc.addImage(dataUrl, 'PNG', 0, 50, 200, 200);
    
    let pdfOutput = doc.output();
    // using ArrayBuffer will allow you to put image inside PDF
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
    }


    //This is where the PDF file will stored , you can change it as you like
    // for more information please visit https://ionicframework.com/docs/native/file/
    const directory = this.file.externalApplicationStorageDirectory ;

    //Name of pdf
    const fileName = 'ReporteAsistencias-'+ this.mydateact.toString() +'.pdf';
    
    //Writing File to Device
    this.file.createFile(directory,fileName,true);
    this.file.writeFile(directory,fileName,buffer, {replace: true})
    .then((success)=> {
      this.loadings.CerrarLoading();
      this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Archivo Guardado en:'+ ' ' + directory.toString(), 'alertConfirm');
    })
    .catch((error)=> {
      this.loadings.CerrarLoading();
      this.alerts.presentAlert(this.alertctrl, 'Error:', error.message, 'alertsConfirm');
    });

  });
  });
}

GenerarReporte(){
  if(this.plataforma.is('android') || this.plataforma.is('ios')){
    this.generatePdfMobile();
  }else{
    this.exportPdf();
  }
}
  

  createBarChart(labels: string[], data: number[], colores: string[]) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Reporte General de Asistencias',
          data,
          backgroundColor: [
            'rgba(139, 150, 0, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#FFCE56',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ], // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
