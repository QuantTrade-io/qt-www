import { makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { IThemeButtonService } from "./IThemeButtonService";

import { ThemeButton } from "~/models/theme/ThemeButton";
import {
  EButtonColor,
  EButtonRounding,
  EButtonSize,
} from "~/models/theme/EThemeButton";

export class ThemeButtonService implements IThemeButtonService {
  /**
   * Class that holds all the logic for creating and maintaining TailwindCSS properties for styling a button.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides styling for buttons.
   * The ThemeButtonServices implements the IThemeButtonService.
   *
   */
  static themes = [
    new ThemeButton({
      id: 1,
      rounding: EButtonRounding.half,
      size: EButtonSize.xxs,
      color: EButtonColor.transparent,
    }),
    new ThemeButton({
      id: 2,
      rounding: EButtonRounding.full,
      size: EButtonSize.m,
      color: EButtonColor.mblue,
    }),
    new ThemeButton({
      id: 3,
      rounding: EButtonRounding.full,
      size: EButtonSize.xxs,
      color: EButtonColor.mblue,
    }),
    new ThemeButton({
      id: 4,
      rounding: EButtonRounding.half,
      size: EButtonSize.m,
      color: EButtonColor.transparent,
    }),
    new ThemeButton({
      id: 5,
      rounding: EButtonRounding.half,
      size: EButtonSize.m,
      color: EButtonColor.mblue,
    }),
    new ThemeButton({
      id: 6,
      rounding: EButtonRounding.half,
      size: EButtonSize.full,
      color: EButtonColor.mblue,
    }),
    new ThemeButton({
      id: 7,
      rounding: EButtonRounding.half,
      size: EButtonSize.full,
      color: EButtonColor.border,
    }),
    new ThemeButton({
      id: 8,
      rounding: EButtonRounding.half,
      size: EButtonSize.m,
      color: EButtonColor.pink,
    }),
    new ThemeButton({
      id: 9,
      rounding: EButtonRounding.half,
      size: EButtonSize.full,
      color: EButtonColor.transparent,
    }),
    new ThemeButton({
      id: 10,
      rounding: EButtonRounding.half,
      size: EButtonSize.full,
      color: EButtonColor.cblue,
    }),
    new ThemeButton({
      id: 11,
      rounding: EButtonRounding.half,
      size: EButtonSize.s,
      color: EButtonColor.red,
    }),
  ];

  @observable
  defaultTheme = 1;

  getThemeButtonById(id: number | string): ThemeButton {
    const themeButton = ThemeButtonService.themes.find(
      (button) => button.id === id
    );

    if (!themeButton) {
      return ThemeButtonService.themes[0];
    }

    return themeButton;
  }
}

export const themeButtonService = new ThemeButtonService();
if (typeof window !== "undefined") {
  makeAutoObservable(themeButtonService, {}, { autoBind: true });
  makePersistable(themeButtonService, {
    name: "ThemeButtonService",
    properties: ["defaultTheme"],
    storage: localStorage,
  });
}
