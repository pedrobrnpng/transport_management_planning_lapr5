import { VectorTileDataSource } from '@here/harp-vectortile-datasource';
import { StyleSet } from '@here/harp-datasource-protocol';
import No from 'src/app/models/no';
import { NoService } from './../../services/no.service';
import Percurso from 'src/app/models/percurso';
import { PercursoService } from 'src/app/services/percurso.service';
import { OnInit, Component } from '@angular/core';
import { MapAnchor, MapView, MapViewEventNames, PickResult } from '@here/harp-mapview';
import { MapControls, MapControlsUI } from '@here/harp-map-controls';
import { GeoJsonDataProvider, OmvDataSource } from '@here/harp-omv-datasource';
import { GeoBox, GeoCoordinates } from '@here/harp-geoutils';
import * as GeoJson from '@here/harp-datasource-protocol';
import * as GeoJSON from 'geojson';
import { Math as Utils, Vector } from 'src/app/utils/math';
import { LinhaService } from 'src/app/services/linha.service';
import Linha from 'src/app/models/linha';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import SunCalc from 'suncalc';
import config from 'src/app/config';
import { GUI } from "dat.gui";
import { Viagem } from 'src/app/models/viagem';
import { ViagemService } from 'src/app/services/viagem.service';
import * as TWEEN from "@tweenjs/tween.js"
import { MessageService } from 'src/app/services/message.service';


interface Line {
  id: string;
  value: GeoJson.LineString;
  color?: string;
  percurso?: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private nos: No[];
  mapView: MapView;
  private linhas: Line[] = [];
  private mapaLinhasCor: Map<string, string[]> = new Map<string, string[]>();
  mapControls: MapControls;
  private linhasList: Linha[] = [];
  private percursosList: Percurso[] = [];
  private modelos: Array<GLTF> = new Array<GLTF>();
  private viagens: Viagem[] = [];

  clock = new THREE.Clock();

  //GUI
  gui: GUI;
  date = new Date();
  guiOptions = {
    year: this.date.getFullYear(),
    month: this.date.getMonth(),
    day: this.date.getDate(),
    hours: this.date.getHours(),
    minutes: this.date.getMinutes(),
    tempo: this.date.getHours() + this.date.getMinutes() / 60,
    mostrador: `${this.date.getHours()}:${this.date.getMinutes()}`,
    intensity: 1.5,
    td_mode: false,
    fp_mode: false,
    simular: false
  };

  //LUZ
  sol: THREE.DirectionalLight;

  constructor(
    private percursoService: PercursoService,
    private noService: NoService,
    private linhasService: LinhaService,
    private viagemService: ViagemService,
    private messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getLinhas();
    this.getPercursos();
    this.getViagens();
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    this.mapView = new MapView({
      canvas,
      theme: {
        extends: "resources/berlin_tilezen_base.json",
        lights: [
          {
            type: "ambient",
            color: "#ffffff",
            name: "ambientLight",
            intensity: 1
          },
          {
            type: "directional",
            color: "#ffffff",
            name: "sol",
            intensity: 1,
            direction: {
              x: 1,
              y: 1,
              z: 1
            },
            castShadow: true
          }
        ],
        definitions: {
          defaultBuildingColor: { value: "#000000FF" }
        }
      },
      decoderUrl: './decoder.bundle.js',
      target: new GeoCoordinates(41.206306, -8.334868),
      zoomLevel: 11.4,
      enableShadows: true
    });

    //configurações iniciais
    this.mapView.geoMaxBounds = new GeoBox(new GeoCoordinates(41.069497, -8.751059), new GeoCoordinates(41.302769, -8.044483));
    this.mapView.minZoomLevel = 0.1;
    //resize da view do mapa
    this.mapView.resize(0.65 * window.innerWidth, 0.60 * window.innerHeight);
    window.addEventListener('resize', () => {
      this.mapView.resize(0.65 * window.innerWidth, 0.60 * window.innerHeight);
    });

    //carrega a área geográfica na view
    const omvDataSource = new OmvDataSource({
      baseUrl: config.mapa.hereApiUrl,
      authenticationCode: config.mapa.hereApiKey
    });
    this.mapView.addDataSource(omvDataSource)
      .then(() => this.letThereBeLight());

    //Controlos do mouse
    this.mapControls = new MapControls(this.mapView);
    this.mapControls.rotationMouseDeltaFactor = 0;
    this.mapControls.panEnabled = true;
    this.mapControls.rotateEnabled = false;
    this.mapControls.maxTiltAngle = 88;
    this.mapControls.tiltEnabled = false;

    this.mapView.addEventListener(MapViewEventNames.AfterRender, () => {
      this.mapView.heading=Math.fround(this.mapView.heading);
    })
    
    window.addEventListener("keydown", event => {
      if (this.guiOptions.fp_mode) {
        var heading = this.mapView.heading;
        var x = Math.cos(heading*(Math.PI / 180)) * 0.0001;
        var y = Math.sin(heading*(Math.PI / 180)) * 0.0001;
        var x1 = this.mapView.target.latitude;
        var y1 = this.mapView.target.longitude;
        switch (event.code) {
          case "KeyW":
            this.mapView.lookAt({ target: { latitude: (x1+x), longitude: (y1+y) }});
            this.mapView.update();
            break;
          case "KeyA":
            this.mapView.camera.rotateOnWorldAxis(new THREE.Vector3(0,0,1),0.0872664625997164649507535070551);
            this.mapView.update();
            break;
          case "KeyD":
            this.mapView.camera.rotateOnWorldAxis(new THREE.Vector3(0,0,1),-0.0872664625997164649507535070551);
            this.mapView.update();
            break;
          case "KeyS":
            this.mapView.lookAt({ target: { latitude: (x1-x), longitude: (y1-y) }});
            this.mapView.update();
            break;
          default:
            break;
        }
      }
    });
    const ui = new MapControlsUI(this.mapControls, { zoomLevel: 'input' });
    this.handleCamera(ui);
    canvas.parentElement?.appendChild(ui.domElement);

    //carrega os nós e linhas da base de dados
    this.carregarRede();

    //carrega os modelos 3d para o array modelos, e depois cria na view os  pontos com as respetivas coordenadas
    await this.loader().then(() => this.carregarModelos());

    //Adiciona os botões para controlo da iluminação
    this.addGUI();

    //Tooltip
    let element = document.getElementById("mouse-picked-result") as HTMLPreElement;
    let current: PickResult;
    canvas.addEventListener("mousemove", event => {
      const canvasPos = this.getCanvasPosition(event, canvas);
      this.handlePick(this.mapView, canvasPos.x, canvasPos.y, element, current);
    });

    this.mapView.setDynamicProperty("selection", []);
    this.mapView.update();
  }
  
  addGUI() {
    this.gui = new GUI({ autoPlace: false });
    var container = document.getElementById('gui');
    container.appendChild(this.gui.domElement);
    const luz = this.gui.addFolder("Luz");
    const luzSlider = luz.add(this.guiOptions, "intensity", 0, 1.5, 0.01);
    luzSlider.onChange(() => {
      this.atualizaPosicaoDoSol();
      luzSlider.updateDisplay();
    });
    const tempo = this.gui.addFolder("Tempo");
    const timeSlider = tempo.add(this.guiOptions, "tempo", 0, 24, 0.01);
    const timeIndicator = tempo.add(this.guiOptions, "mostrador");
    timeSlider.onChange(() => {
      this.guiOptions.hours = Math.floor(this.guiOptions.tempo);
      this.guiOptions.minutes = Math.floor((this.guiOptions.tempo - this.guiOptions.hours) * 60);

      this.atualizaPosicaoDoSol();
      timeIndicator.updateDisplay();
    });
    timeIndicator.onChange(() => {
      const time = this.guiOptions.mostrador.split(":");
      this.guiOptions.hours = parseInt(time[0], 10);
      this.guiOptions.minutes = parseInt(time[1], 10);

      this.atualizaPosicaoDoSol();
      timeSlider.updateDisplay();
    });
  }

  enableCastAndReceive(obj) {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  }

  letThereBeLight() {
    this.sol = this.mapView.lights.find(item => item instanceof THREE.DirectionalLight) as THREE.DirectionalLight
    if (this.sol === undefined) {
      throw new Error("Não Encontrado");
    }

    this.mapView.scene.children.forEach((e) => this.enableCastAndReceive(e));

    //Para Debug da luz
    //const helper = new THREE.DirectionalLightHelper(this.sol);
    //this.mapView.scene.add(helper);

    this.sol.color.setRGB(1, 1, 1);
    this.mapView.addEventListener(MapViewEventNames.MovementFinished, () => this.atualizaPosicaoDoSol());

    this.atualizaPosicaoDoSol();
  }

  atualizaPosicaoDoSol() {
    // guarda as coordenadas centrais da view
    const { latitude, longitude } = this.mapView.geoCenter;
    this.guiOptions.tempo = this.guiOptions.hours + this.guiOptions.minutes / 60;
    this.guiOptions.mostrador = `${this.guiOptions.hours}:${this.guiOptions.minutes}`

    const dirtyTime = new Date(
      this.guiOptions.year,
      this.guiOptions.month,
      this.guiOptions.day,
      this.guiOptions.hours,
      this.guiOptions.minutes,
      0
    );
    const dataAtual = dirtyTime.getTime(); // currentMillis

    const horarioSolar = SunCalc.getTimes(dataAtual, latitude, longitude);
    const posicaoSolar = SunCalc.getPosition(dataAtual, latitude, longitude);

    const azimute = posicaoSolar.azimuth;
    const altitude = posicaoSolar.altitude - Math.PI / 2;

    const r = this.mapView.targetDistance;

    this.sol.position.setX(r * Math.sin(altitude) * Math.sin(azimute));
    this.sol.position.setY(r * Math.sin(altitude) * Math.cos(azimute));
    this.sol.position.setZ(r * Math.cos(altitude) - r);
    this.sol.target.position.set(0, 0, -r);

    const nascerDoSol = dataAtual - horarioSolar.sunriseEnd.getTime();
    const porDoSol = horarioSolar.sunsetStart.getTime() - dataAtual;

    if (nascerDoSol > 0 && porDoSol > 0)
      this.sol.intensity = this.guiOptions.intensity;
    else
      this.sol.intensity = 0;

    this.mapView.update();

  }

  carregarRede() {
    this.noService.getNos().subscribe((data) => {
      this.nos = data;
      this.percursoService.percursosOrdenadosPorLinha().subscribe(percursos => {
        this.linhasService.getLinhas().subscribe(linhas => {
          this.criarLinhas(percursos);
          this.obterCores(linhas);
          const l = this.linhasRepetidas();
          this.separarlinhas(l);
          this.drawLines(l);
          this.loadNos();
        });
      });
    });
  }

  carregarModelos() {
    this.nos.forEach((e) => {
      var escala = 0;
      var altura = 0;
      var rotacao = 0;
      var model;

      if (e.modelo === undefined || e.modelo === '') {
        altura = 50;
        model = this.createEsfera();
        model.scale.setX(10);
        model.scale.setY(10);
        model.scale.setZ(10);
        model.anchor = new GeoCoordinates(e.xCoordinate, e.yCoordinate, altura);
        this.mapView.mapAnchors.add(model);
      } else {
        if (e.modelo === 'pontorendicao') {
          model = this.modelos[0].scene.children[0].clone();
          escala = 1;
          altura = 20;
          rotacao = Math.PI / 2;
        }
        if (e.modelo === 'paragem') {
          model = this.modelos[1].scene.children[0].clone();
          escala = 2;
        }
        if (e.modelo === 'estacaorecolha') {
          model = this.modelos[2].scene.children[0].clone();
          escala = 0.2;
        }
        model.scale.x = 1 * escala;
        model.scale.y = 1 * escala;
        model.scale.z = 1 * escala;
        model.rotation.x = 1 * rotacao;
        model.name = e.id_abreviature;

        model.anchor = new GeoCoordinates(e.xCoordinate, e.yCoordinate, altura);
        model.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
          o.visible = false
          o.name = e.id_abreviature;
          o.renderOrder = Number.MAX_SAFE_INTEGER - 1;
        });
        this.mapView.mapAnchors.add(model);
      }
    });
    this.mapView.update();
  }

  async loader() {
    await this.gltfLoader('assets/3dmodels/pontorendicao/scene.gltf');
    await this.gltfLoader('assets/3dmodels/paragem/scene.gltf');
    await this.gltfLoader('assets/3dmodels/estacaorecolha/scene.gltf');
    await this.gltfLoader('assets/3dmodels/autocarro/scene.gltf');
  };

  gltfLoader(path): Promise<GLTF> {
    const loader = new GLTFLoader();
    return new Promise(resolve => {
      loader.load(path, obj => {
        this.modelos.push(obj);
        resolve(obj);
      });
    });
  }

  createEsfera(): MapAnchor<THREE.Object3D> {
    const sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    const obj = new THREE.Object3D();
    sphere.renderOrder = Number.MAX_SAFE_INTEGER - 1;
    obj.add(sphere);
    return obj;
  }
  

  private async handleCamera(ui: MapControlsUI): Promise<void> {
    const elements = await document.getElementsByClassName('harp-gl_controls-button harp-gl_controls_button-bottom');
    console.log(elements);
    const compass = document.getElementById('harp-gl_controls-button_compass');
    var fpm;
    var sim;
    elements.item(1).addEventListener('click', async (evt) => {
      if (!this.guiOptions.td_mode) {
        this.mapView.removeDataSource(this.mapView.getDataSourceByName("Rede"));
        await this.mapView.mapAnchors.children.forEach((e) => { e.traverse((o) => { o.visible = true }); e.visible = true;})
        this.mapView.update();

        fpm=this.gui.add(this.guiOptions, "fp_mode").onChange(() => {
          if (this.guiOptions.fp_mode) {
            this.mapView.lookAt({ distance: 100, tilt: 85 });
            this.mapControls.zoomEnabled = false;
            this.mapControls.panEnabled = false;
            this.mapControls.rotateEnabled = false;
            this.mapControls.tiltEnabled = false;
          }
          else {
            this.mapView.lookAt({ target: { lat: 41.206306, lng: -8.334868 }, distance: 100000, tilt: 45, heading: 0 });
            this.mapControls.zoomEnabled = true;
            this.mapControls.panEnabled = true;
            this.mapControls.rotateEnabled = true;
            this.mapControls.tiltEnabled = true;
          }
        }).name("1ª pessoa");

        sim=this.gui.add(this.guiOptions, "simular").onChange(() => {
          this.clock.start();
          var lastUpdate = 0;
          if (this.guiOptions.simular) {
            this.viagensAtuais().then(() => {
              this.mapView.renderer.setAnimationLoop(() => {
                var delta  = this.clock.getElapsedTime() * 1000;
                if(delta - lastUpdate > 50){
                  lastUpdate = delta;
                  this.mapView.update();
                }
                TWEEN.update();
              })
            });
          }
          else {
            this.mapView.renderer.setAnimationLoop(null);
          }
        }).name("simular");

        this.mapView.heading = 0;
        ui.controls.tiltEnabled = !ui.controls.tiltEnabled;
        ui.controls.toggleTilt();

        this.guiOptions.td_mode=true;
      } else {
        if (!this.guiOptions.fp_mode) {
          await this.mapView.mapAnchors.children.forEach((e) => { e.visible = false;})
          this.mapView.update();
          this.loadNos();
          this.gui.remove(fpm);
          this.gui.remove(sim);
          this.guiOptions.td_mode=false;

          this.mapView.heading = 0;
          ui.controls.tiltEnabled = !ui.controls.tiltEnabled;
          ui.controls.toggleTilt();
        }
      }
    });
  }

  private async loadNos(): Promise<void> {
    await this.dropPoints('Rede', this.nos);
  }

  private async dropPoints(nome: string, noss: any): Promise<void> {
    const geoJsonDataProvider = new GeoJsonDataProvider(nome, this.createPoints(noss));

    const geoJsonDataSource = new OmvDataSource({
      dataProvider: geoJsonDataProvider,
      name: nome
    });
    await this.mapView.addDataSource(geoJsonDataSource).then(() => {
      const styles: StyleSet = [{
        when: '$geometryType == \'point\'',
        technique: 'circles',
        renderOrder: 1001,
        color: '#ff0000',
        size: 25
      }];
      geoJsonDataSource.setStyleSet(styles);
      this.mapView.update();
    });
  }

  private createPoints(positions: any[]): any {
    // @ts-ignore
    return GeoJSON.parse(positions, { Point: ['xCoordinate', 'yCoordinate'] });
  }

  private getNoByAbreviatura(abrev: string): No {
    return this.nos.find(ponto => ponto.id_abreviature === abrev);
  }

  private newLine(id: string, A: No, B: No, percurso: string): Line {
    return {
      id,
      value: {
        type: 'LineString',
        coordinates: [[A.yCoordinate, A.xCoordinate], [B.yCoordinate, B.xCoordinate]]
      },
      percurso
    };
  }

  private obterCores(linhas: Linha[]): void {
    linhas.forEach(linha => {
      const lineFound = this.linhas.find(line => line.id === linha.id);
      lineFound.color = linha.cor;
    });
  }

  private preencherMapaCores(): void {
    this.linhas.forEach(linha => {
      if (!this.mapaLinhasCor.has(linha.id)) {
        this.mapaLinhasCor.set(linha.id, [linha.percurso, linha.color]);
      }
    });
  }

  private criarLinhas(percursos: Percurso[]): void {
    percursos.forEach(percurso => {
      percurso.segmentosRede.forEach(segmento => {
        const A = this.getNoByAbreviatura(segmento.idNoInicio);
        const B = this.getNoByAbreviatura(segmento.idNoFim);
        this.linhas.push(this.newLine(percurso.idLinha, A, B, percurso.id));
      });
    });
  }

  private getRandomColor(): string {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private newFeature(line: Line): GeoJson.Feature {
    //var geo = new GeoJson.Fe
    return {
      type: 'Feature',
      geometry: line.value,
      id: line.id,
      title: line.percurso,
      properties: { line: line.id, percurso: line.percurso }
    };
  }

  private criarEstilos(): StyleSet {
    const styles: StyleSet = [];
    this.preencherMapaCores();
    this.mapaLinhasCor.forEach((value, key) => {
      styles.push(this.newLineStyle(key, value[0], value[1]));
    });
    return styles;
  }

  private newLineStyle(id: string, percurso: string, color: string): GeoJson.Style {
    return {
      when: ['all',
        ['==', ['geometry-type'], 'LineString'],
        ['==', ['get', 'line'], id]],
      renderOrder: 1000,
      technique: 'solid-line',
      color,
      opacity: 1,
      metricUnit: 'Pixel',
      // lineWidth: 5
      lineWidth: ['interpolate', ['linear'], ['zoom'],
        13, 3,
        14, 4.5,
        15, 7,
        16, 10
      ],
      fadeNear: 0.8,
      fadeFar: 0.9,
      clipping: false,
      id: percurso
    };
  }

  private async drawLines(linhas: Map<number, Line[]>): Promise<void> {

    const features: Array<GeoJson.Feature> = [];
    linhas.forEach(lines => {
      lines.forEach(linha => {
        features.push(this.newFeature(linha));
      });
    });

    const dataProvider = new GeoJsonDataProvider('Linhas', { type: 'FeatureCollection', features });
    const geoJsonDataSource = new VectorTileDataSource({ dataProvider, name: 'Linhas' });
    await this.mapView.addDataSource(geoJsonDataSource);
    geoJsonDataSource.setStyleSet(this.criarEstilos());
    this.mapView.update();
  }

  private reverseKey(key: number[][]): number[][] {
    return [[key[1][0], key[1][1]], [key[0][0], key[0][1]]];
  }

  private mapHasValue(map: Map<number, Line[]>, value: number[][]): number {
    let res = -1;
    Array.from(map.values()).forEach((element, i) => {
      if ((element[0].value.coordinates[0][0] === value[0][0] &&
        element[0].value.coordinates[0][1] === value[0][1] &&
        element[0].value.coordinates[1][0] === value[1][0] &&
        element[0].value.coordinates[1][1] === value[1][1])
        ||
        (element[0].value.coordinates[0][0] === value[1][0] &&
          element[0].value.coordinates[0][1] === value[1][1] &&
          element[0].value.coordinates[1][0] === value[0][0] &&
          element[0].value.coordinates[1][1] === value[0][1])) {
        res = i;
      }
    });
    return res;
  }

  private linhasRepetidas(): Map<number, Line[]> {
    const map = new Map<number, Line[]>();
    let i = 0;
    let flag = false;
    this.linhas.forEach((linha) => {
      const key = this.mapHasValue(map, linha.value.coordinates);
      if (key !== -1) {
        flag = false;
        map.get(key).forEach((value) => {
          if (value.id === linha.id) {
            flag = true;
          }
        });
        if (!flag) {
          map.get(key).push(linha);
        }
      }
      else {
        map.set(i, [linha]);
        i++;
      }
    });

    return map;
  }

  private newNo(xCoordinate: number, yCoordinate: number): No {
    return {
      xCoordinate,
      yCoordinate
    };
  }

  private separarlinhas(mapaLinhasRepetidas: Map<number, Line[]>): void {
    mapaLinhasRepetidas.forEach((linhas) => {
      let i = 0;
      let incremento: Vector = {
        x: 0,
        y: 0
      };
      const noA: No = this.newNo(linhas[0].value.coordinates[0][0], linhas[0].value.coordinates[0][1]);
      const noB: No = this.newNo(linhas[0].value.coordinates[1][0], linhas[0].value.coordinates[1][1]);
      incremento = this.calcularDesvio(noA, noB);
      linhas.forEach((linha, index) => {
        const x = incremento.x * i;
        const y = incremento.y * i;
        const newNoA: No = this.newNo(noA.xCoordinate + x, noA.yCoordinate + y);
        const newNoB: No = this.newNo(noB.xCoordinate + x, noB.yCoordinate + y);
        // this.nos.push({ xCoordinate: newNoA.yCoordinate, yCoordinate: newNoA.xCoordinate });
        // this.nos.push({ xCoordinate: newNoB.yCoordinate, yCoordinate: newNoB.xCoordinate });
        linha.value.coordinates = [[newNoA.xCoordinate, newNoA.yCoordinate], [newNoB.xCoordinate, newNoB.yCoordinate]];
        if (index % 2 === 0) {
          i += 1;
        }
        i *= -1;
      });
    });
  }

  calcularDesvio(noA: No, noB: No): Vector {
    const vector = Utils.vector({ x: noA.xCoordinate, y: noA.yCoordinate }, { x: noB.xCoordinate, y: noB.yCoordinate });
    const norma = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    return { x: (vector.y / norma) * 0.0001, y: (-vector.x / norma) * 0.0001 };
  }

  //Tooptip

  getCanvasPosition(
    event: MouseEvent | Touch,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } {
    const { left, top } = canvas.getBoundingClientRect();
    return { x: event.clientX - Math.floor(left), y: event.clientY - Math.floor(top) };
  }

  handlePick(mapViewUsed: MapView, x: number, y: number, element, current) {
    // get an array of intersection results from MapView
    let usableIntersections = mapViewUsed
      .intersectMapObjects(x, y)
      .filter(item => (item.intersection.object.type == "Points") ||
        (item.intersection.object.type == "Mesh" && item.intersection.object.userData.dataSource == "Linhas")
        || this.containsNo(item.intersection.object.name));
    if (usableIntersections.length > 1) {
      usableIntersections = usableIntersections.filter(item => item !== current);
    }

    if (usableIntersections.length === 0) {
      // Hide helper box
      element.style.visibility = "hidden";
      return;
    }

    // Get userData from the first result;
    current = usableIntersections[0];

    // Show helper box
    element.style.visibility = "visible";
    element.style.left = x + "px";
    element.style.top = y + "px";
    // Display userData inside of helper box
    if (current.intersection.object.type == "Mesh" && current.intersection.object.userData.dataSource == "Linhas") {
      const linha = this.findLinha(current.intersection.object.userData.technique.color);
      const percurso = this.findPercurso(current.intersection.object.userData.technique.id);
      element.innerText = "Código da linha: " + linha.id + "\n" + "Nome da linha: " + linha.nome
        + "\nCódigo de Percurso: " + percurso.id + "\nCaminho: " + this.getSegmentos(percurso)
        + "\nDistancia total: " + this.getDistanciaSegmentos(percurso) + " metros\nTempo de viagem: " +
        this.getTempoViagemSegmentos(percurso) + " minutos\nDirecao: " + percurso.direcao;
    } else if (current.intersection.object.type == "Points") {
      const no = this.nos[current.featureId];
      var viagem= this.getNextViagem(no.id_abreviature);
      if(viagem==null) {
        viagem = {
          codigo: "Não existe nenhuma viagem agendada",
          horaInicio: null
        }
      }
      element.innerText = "Abreviatura do nó: " + no.id_abreviature + "\nNome do nó: " + no.name + "\nTipo de nó: " + no.type
        + "\nCoordenadas do nó: " + no.xCoordinate + "," + no.yCoordinate + "\nViagem: "+viagem.codigo+"\nHora inicio: "
        + viagem.horaInicio;
    } else {
      const no = this.findNo(current.intersection.object.name);
      var viagem= this.getNextViagem(no.id_abreviature);
      if(viagem==null) {
        viagem = {
          codigo: "Não existe nenhuma viagem agendada",
          horaInicio: null
        }
      }
      element.innerText = "Abreviatura do nó: " + no.id_abreviature + "\nNome do nó: " + no.name + "\nTipo de nó: " + no.type
        + "\nCoordenadas do nó: " + no.xCoordinate + "," + no.yCoordinate + "\nViagem: "+viagem.codigo+"\nHora inicio: "
        + viagem.horaInicio;;
    }
  }

  containsNo(abrev: string) {
    var ver = false;
    this.nos.forEach(element => {
      if (element.id_abreviature == abrev) {
        ver = true;
      }
    });
    return ver;
  }

  findNo(abrev: string) {
    var no;
    this.nos.forEach(element => {
      if (element.id_abreviature == abrev) {
        no = element;
      }
    });
    return no;
  }

  findLinha(cor: string) {
    var linha;
    this.linhasList.forEach(element => {
      if (element.cor == cor) {
        linha = element;
      }
    });
    return linha;
  }

  findPercurso(id: string) {
    var percurso;
    this.percursosList.forEach(element => {
      if (element.id == id) {
        percurso = element;
      }
    });
    return percurso;
  }

  getLinhas() {
    this.linhasService.getLinhas().subscribe(
      (linhas) => {
        this.linhasList = linhas;
      }
    )
  }

  getPercursos() {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        this.percursosList = percursos;
      }
    )
  }

  getSegmentos(percurso: Percurso) {
    var segmentos = this.findNo(percurso.segmentosRede[0].idNoInicio).name;
    percurso.segmentosRede.forEach(element => {
      segmentos += " - " + this.findNo(element.idNoFim).name;
    });
    return segmentos;
  }

  getDistanciaSegmentos(percurso: Percurso) {
    var calc = 0;
    percurso.segmentosRede.forEach(element => {
      if (element.distancia.unidadeDistancia == "km") {
        calc += element.distancia.value * 1000;
      } else {
        calc += element.distancia.value;
      }
    });
    return calc;
  }

  getTempoViagemSegmentos(percurso: Percurso) {
    var calc = 0;
    percurso.segmentosRede.forEach(element => {
      if (element.tempoViagem.unidadeTempo == "h") {
        calc += element.tempoViagem.value * 60;
      } else if (element.tempoViagem.unidadeTempo == "s") {
        calc += element.tempoViagem.value / 60;
      } else {
        calc += element.tempoViagem.value
      }
    });
    return calc;
  }

  getNextViagem(no: string) {
    var dif, menor = Number.MAX_SAFE_INTEGER, menorViagem = null;
    var bol;
    this.viagens.forEach(element => {
      const percurso = this.findPercurso(element.idPercurso);
      percurso.segmentosRede.forEach(element => {
        if (element.idNoInicio == no || element.idNoFim == no) {
          bol = true;
        }
      });
      if (bol) {
        dif = new Date(element.horaInicio).valueOf() - Date.now();
        if (dif < menor && dif > 0) {
          menorViagem = element;
          menor = dif;
        }
      }
    });
    return menorViagem;
  }

  getViagens() {
    this.viagemService.getViagens().subscribe(
      (viagens) => {
        this.viagens = viagens;
      }
    )
  }

  getViagemAtual(): string{
    var v;
    this.viagens.forEach((viagem) => {
      var percurso = this.findPercurso(viagem.idPercurso);

      var total = this.getTempoViagemSegmentos(percurso);
      var horaInicio = new Date(viagem.horaInicio).getTime();
      var agora = Date.now().valueOf();
      var horaFim = new Date(viagem.horaInicio).getTime() + (total * 3600);
 
      if(horaInicio < agora && agora < horaFim){
        v = viagem.idPercurso;
      } 
    });
    return v;
  }

  async viagensAtuais(){
      const viagem = this.getViagemAtual();
      if(viagem === null || viagem === undefined) {
        this.messageService.log(`Não há viagens para esta hora`);
        return;
      }
      var percurso = this.findPercurso(viagem);

      var tocarro;
      tocarro = this.modelos[3].scene.children[0].clone(); 
      tocarro.traverse((o) => {
        o.renderOrder = Number.MAX_SAFE_INTEGER - 1;
        if (o instanceof THREE.Mesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });

      tocarro.rotation.x = 0;
      tocarro.scale.x = 2;
      tocarro.scale.y = 2;
      tocarro.scale.z = 2;

      var cont = 0;
      percurso.segmentosRede.forEach( (seg)=> {
        const inicio = this.findNo(seg.idNoInicio);
        const fim = this.findNo(seg.idNoFim);
        const origem = { x: inicio.xCoordinate, y: inicio.yCoordinate, z: 0 };
        const destino = { x: fim.xCoordinate, y: fim.yCoordinate, z: 0 };
        var tempoViagem = 0;
        tempoViagem = seg.tempoViagem.value * 100;
        cont += tempoViagem;
        var dy = destino.x - origem.x;
        var dx = Math.cos(Math.PI/180*origem.x)*(destino.y - origem.y);
        var rotacao = Math.atan2(dy, dx);

        if(seg.sequencia === 1) {
          tocarro.anchor = new GeoCoordinates(inicio.xCoordinate, inicio.yCoordinate,0);
          var first = new TWEEN.Tween(origem)
          .to(destino, tempoViagem)
          .onStart(() => {
            tocarro.rotation.z = rotacao;
          })
          .onUpdate(() => {
            tocarro.anchor.latitude = origem.x;
            tocarro.anchor.longitude = origem.y;
            tocarro.anchor.altitude = origem.z;
          });
          first.start();
        } 
        else {
          var next = new TWEEN.Tween(origem)
          .to(destino, tempoViagem)
          .delay(cont)
          .onStart(() => {
            tocarro.rotation.z = rotacao;
          })
          .onUpdate(() => {
            tocarro.anchor.latitude = origem.x;
            tocarro.anchor.longitude = origem.y;
            tocarro.anchor.altitude = origem.z;
          });
          next.start();
        }
      });
    this.mapView.mapAnchors.add(tocarro);  
  }
}
