import { TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AlertModule } from "src/app/shared/componets/alert/alert.module";
import { LoadingModule } from "src/app/shared/componets/loading/loading.module";
import { MenuModule } from "src/app/shared/componets/menu/menu.module";
import { UserService } from "../user/user.service";
import { HeaderComponent } from "./header.component";

describe("O componente header", () => {
  let component: HeaderComponent;
  let userService: UserService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        providers: [UserService],
        imports: [
          RouterTestingModule.withRoutes([]),
          MenuModule,
          AlertModule,
          LoadingModule,
        ],
      }).compileComponents;
    })
  );

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    spyOn(userService, "getUser").and.returnValue(
      of({
        name: "Denir",
        email: "denirgmail.com",
        id: 1,
      })
    );

    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Deve ser instanciado", () => {
    expect(component).toBeTruthy();
  });

  it("deve realizar o logout", () => {
    const spy = spyOn(userService, "logout").and.returnValue(null);
    const navigateSpy = spyOn(router, "navigate");
    component.logout();
    expect(spy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([""]);
  });
});
