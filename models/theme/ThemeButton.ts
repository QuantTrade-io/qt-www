import { TypeThemeButton } from "~/types/TypeThemeButton";

import { BaseData } from "../base/BaseData";
import { IThemeButton } from "./IThemeButton"
import { ButtonColor, ButtonRounding, ButtonSize } from "./EThemeButton";

export class ThemeButton extends BaseData<ThemeButton> implements IThemeButton {
    /**
     * Class that acts like an object, which contains styling semantics for a button.
     *
     * @remarks
     * This class is a so-called 'model', which purpose is to represent the button styling withing the application.
     * The ThemeButton extends the BaseData model and implements an interface called IThemeButton.
     *
     * @param TypeThemeButton - That contains the following ENUMS: ButtonRounding, ButtonSize, ButtonColor
     * @returns The implemented model of a ThemeButton which can be used throughout the codebase in order to style buttons
     *
     */
    base: string = "inline-block";
    rounding: ButtonRounding;
    size: ButtonSize;
    color: ButtonColor;

    constructor(data: TypeThemeButton) {
        super(data);
        this.rounding = data.rounding;
        this.size = data.size;
        this.color = data.color;
    }

    public getTailwindClass() {
        return `${this.base} ${this.rounding} ${this.size} ${this.color}`
    }
}