import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";

import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

describe("O serviço AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it("deve ser instanciado", () => {
    expect(service).toBeTruthy();
  });

  it("deve autentiicar o usuario", fakeAsync(() => {
    const fakeBody = {
      id: 1,
      nome: "Denir",
      email: "denir@alura.com",
    };

    const spy = spyOn(userService, "setToken").and.returnValue(null);

    service.authenticate("Denir", "1234").subscribe((response) => {
      expect(response.body).toEqual(fakeBody);
      expect(spy).toHaveBeenCalledWith('tokenTest');
    });
    const request = httpMock.expectOne((req) => {
      return req.method === "POST";
    });

    request.flush(fakeBody, { headers: { "x-access-token": "tokenTest" } });
    tick();
  }));
});
