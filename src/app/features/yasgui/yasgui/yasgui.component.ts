import { Component, OnInit } from '@angular/core';
import { ConfigInitService } from 'src/app/config-init-service';
const DEFAULT_QUERY = `  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX cv: <http://rdfs.org/resume-rdf/cv.rdfs#>
  PREFIX baseCv: <http://rdfs.org/resume-rdf/base.rdfs#>
  
  CONSTRUCT {?s ?p ?o}
  WHERE {
    graph <https://bittich.be/graphs/public>{
      ?s ?p ?o
    }
  }
`;
@Component({
  selector: 'app-yasgui',
  templateUrl: './yasgui.component.html',
  styleUrls: ['./yasgui.component.scss'],
})
export class YasguiComponent implements OnInit {
  constructor(private configService: ConfigInitService) {}

  ngOnInit(): void {
    import('@triply/yasgui').then((module) => {
      const Yasgui = module.default;
      const element = document?.getElementById('yasgui');
      const endpointUrl = this.configService.getConfig()['SPARQL_ENDPOINT'];
      const defaultQuery = this.configService.getConfig()['SPARQL_DEFAULT_QUERY'] || DEFAULT_QUERY;
      Yasgui.Yasqe.defaults.value = defaultQuery;
      const yasgui = new Yasgui(element, {
        requestConfig: {
          endpoint: endpointUrl,
          defaultGraphs: [],
          method: 'POST',
        },
        autofocus: true,
      });
    });
  }
}
