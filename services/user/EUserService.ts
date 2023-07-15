export enum EAccountStatus {
  /**
   * This is the EAccountStatus Enum.
   *
   * @remarks
   * This Enum takes care over all the possible statusses a User can have.
   *
   * @param registered - User is registered
   * @param verified - Email address is verified
   * @param change_email - Requested a email reset
   *
   */
  registered = "registered",
  verified = "verified",
  change_email = "change_email",
}
