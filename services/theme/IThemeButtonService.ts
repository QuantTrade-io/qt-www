import { IThemeButton } from "~/models/theme/IThemeButton";

export interface IThemeButtonService {
  defaultTheme: number;
  getThemeButtonById(id: number): IThemeButton;
}
