import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";

import { SignUpComponent } from "./signup.component";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";

describe("O formulario Signup", () => {
  let component: SignUpComponent;
  let router: Router;
  let signUpService: SignUpService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [SignUpService, UserNotTakenValidatorService],
      imports: [
        HttpClientTestingModule,
        VMessageModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    signUpService = TestBed.inject(SignUpService);
    const fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve ser instanciado", () => {
    expect(component).toBeTruthy();
  });

  it("deve cadastrar um usuario", () => {
    const navigateSpy = spyOn(router, "navigate");
    spyOn(signUpService, "signup").and.returnValue(of(null));
    component.signupForm.get("email").setValue("denir@gmail.com");
    component.signupForm.get("fullName").setValue("Denir");
    component.signupForm.get("userName").setValue("denir");
    component.signupForm.get("password").setValue("123");
    component.signUp();

    expect(navigateSpy).toHaveBeenCalledWith([""]);
  });

  it("deve realizar o log caso ocorra algum erro", () => {
    spyOn(signUpService, "signup").and.returnValue(
      throwError("Erro de Servidor")
    );
    component.signupForm.get("email").setValue("denir@gmail.com");
    component.signupForm.get("fullName").setValue("Denir");
    component.signupForm.get("userName").setValue("denir");
    component.signupForm.get("password").setValue("123");
    const spyLog = spyOn(console, "log");
    component.signUp();

    expect(spyLog).toHaveBeenCalledWith("Erro de Servidor")
  });
});
