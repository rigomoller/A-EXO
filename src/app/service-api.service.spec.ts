import { TestBed } from '@angular/core/testing';
import { ServiceApiService } from './service-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ServiceApiService', () => {
  let service: ServiceApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo necesario para pruebas HTTP
      providers: [ServiceApiService], // Proveedor del servicio
    });

    service = TestBed.inject(ServiceApiService); // Inyecta el servicio que se va a probar
    httpMock = TestBed.inject(HttpTestingController); // Inyecta el controlador HTTP para pruebas
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se crea correctamente
  });

  it('should perform a GET request and return mock data', () => {
    const mockResponse = {
      info: { count: 826 },
      results: [
        { name: 'Personaje 1', status: 'Alive', image: 'url1' },
        { name: 'Personaje 2', status: 'Dead', image: 'url2' },
      ],
    };

    // Llama al método del servicio que realiza la solicitud GET
    service.get().subscribe((data) => {
      expect(data).toEqual(mockResponse); // Verifica que la respuesta coincida con el mock
    });

    // Simula la solicitud HTTP y responde con datos simulados
    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character'); // Cambia a la URL real
    expect(req.request.method).toBe('GET'); // Verifica que sea una solicitud GET
    req.flush(mockResponse); // Envía la respuesta simulada
  });
});