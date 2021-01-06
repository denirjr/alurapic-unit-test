import { async, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { UserService } from "../user/user.service";
import { FooterComponent } from "./footer.component";

describe("O componente footer", () => {
  let component: FooterComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserService],
      declarations: [FooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, "getUser").and.returnValue(
      of({
        name: "Denir",
        email: "denir@gmail.com",
        id: 1,
      })
    );
    const fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve ser instanciado", () => {
    expect(component).toBeTruthy();
  });
});
