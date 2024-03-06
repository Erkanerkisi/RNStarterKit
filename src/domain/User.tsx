export class User {
  constructor(
    uid: string | null,
    displayName: string | null,
    email: string | null,
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
  }

  uid: string | null;
  displayName: string | null;
  email: string | null;
}
