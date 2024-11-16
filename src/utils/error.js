export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StoreAddError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class PreferenceSettingError extends Error {
  errorCode = "U002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StoreNotFoundError extends Error {
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyChallengedError extends Error {
  errorCode = "M001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
