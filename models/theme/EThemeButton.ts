export enum EButtonRounding {
  /**
   * This is the ButtonRounding Enum.
   *
   * @remarks
   * This Enum takes care over all the possible Roundings you can use troughout the project.
   *
   * @param none - sharp edges
   * @param half - medium rounded edges
   * @param full - fully roundes edges
   *
   */
  none = "",
  half = "rounded-lg",
  full = "rounded-full",
}

export enum EButtonSize {
  /**
   * This is the ButtonSize Enum.
   *
   * @remarks
   * This Enum takes care over all the possible sizing you can use troughout the project.
   * This means the padding on the X and Y side, but also the font size (which therefor is bound to the button size)
   *
   *
   * @param xxs - extra extra small
   * @param xs - extra small
   * @param s - small
   * @param m - medium
   * @param l - large
   * @param xl - extra large
   * @param cirkel - padding on all 4 sides are equalt which makes this button theme a cirkel
   *
   */
  xxs = "py-1 px-2 text-xs min-w-[80px]",
  xs = "px-2.5 py-1.5 text-xs",
  s = "px-3 py-2 text-sm",
  m = "px-4 py-2 text-sm min-w-[120px]",
  l = "px-4 py-2 text-base",
  xl = "px-6 py-3 text-base",
  cirkel = "p-2 text-sm",
  full = "w-full p-2 text-xs lg:text-sm",
}

export enum EButtonColor {
  /**
   * This is the ButtonColor Enum.
   *
   * @remarks
   * This Enum takes care over all the possible color combinations that can be applied to a button.
   * This means that anything related to the borders, background and text color are determined in this part
   *
   * @param transparent - no border & white background, on hover shows light grey background, text color is black.
   * @param white - grey border & white background, on hover tthe border turns darker grey, text color is black.
   * @param black - black color, on hover this turns into grey, text color is white
   * @param mblue - midnight blue color, on hover turns into crayonBlue, text color is white.
   * @param cblue - crayon blue color, on hover turns into midnight blue, text color is white.
   * @param ruby - ruby color, on hover turns into light pink, text color is white
   *
   */
  transparent = "text-slate-700 hover:bg-slate-300 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-500",
  border = "border-2 bg-white dark:bg-slate-800 text-blue-700 border-blue-700 hover:text-pink-300 hover:border-pink-300",
  white = "",
  black = "",
  pink = "bg-pink-700 hover:bg-pink-500 text-white dark:bg-pink-700 dark:hover:bg-pink-900 dark:text-slate-100",
  mblue = "bg-blue-900 text-white hover:text-slate-100 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 focus-visible:outline-blue-700",
  cblue = "bg-blue-700 text-white hover:text-slate-100 hover:bg-blue-900 dark:bg-blue-900 dark:hover:bg-blue-700 focus-visible:outline-blue-700",
  red = "bg-red-500 text-slate-700 dark:text-white font-medium hover:bg-red-400",
}
