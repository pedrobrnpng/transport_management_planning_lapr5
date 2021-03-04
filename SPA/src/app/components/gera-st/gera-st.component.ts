import { Component, OnInit } from '@angular/core';
import { GeraStService } from 'src/app/services/gera-st.service';

@Component({
  selector: 'app-gera-st',
  templateUrl: './gera-st.component.html',
  styleUrls: ['./gera-st.component.css']
})
export class GeraStComponent implements OnInit {

  constructor(private gerasStService: GeraStService) { }

  ngOnInit(): void {
  }

  async geraStAutomaticamente() {
    var res= await this.gerasStService.geraStAutomaticamente();
  }

}
