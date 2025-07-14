import Array "mo:base/Array";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";

actor {
  public type ContentItem = { id: Text };

  public type Persona = ContentItem;

  public type Rubrics = ContentItem;

  public type Glossary = ContentItem;

  public type File = ContentItem;

  public type Scenario = ContentItem;

  public type Roleplay = ContentItem;

  public type ContentKind = {
    #Persona;
    #Rubrics;
    #Glossary;
    #File;
    #Scenario;
    #Roleplay;
  };

  public type User = {
    owner: Text;
    nickname: Text;
    personas: [Persona];
    rubrics: [Rubrics];
    glossaries: [Glossary];
    files: [File];
    scenarios: [Scenario];
    roleplays: [Roleplay];
  };

  var userHashMap: HashMap.HashMap<Principal, User> = HashMap.HashMap<Principal, User>(10, Principal.equal, Principal.hash);

  public func addNewUser(user: Principal) {
    if (Principal.isAnonymous(user)) {
      throw Error.reject("Anonymous principal not allowed");
    };

    for ((key, value) in userHashMap.entries()) {
      if (value.owner == Principal.toText(user)) {
        return;
      };
    };

    var newUser: User = {
      owner = Principal.toText(user);
      nickname = Principal.toText(user);
      personas = [];
      rubrics = [];
      glossaries = [];
      files = [];
      scenarios = [];
      roleplays = [];
    };

    userHashMap.put(user, newUser);
  };

  public shared func getUser(user: Principal): async ?User {
    return userHashMap.get(user);
  };

  public shared query func getUserNickname(userP: Principal): async ?Text {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.nickname;
      };
      case null {
        return null;
      };
    };
  };

  public func updateMyNickname(callerPrincipal: Principal, newNickname: Text): async () {
    let callerPrincipalText = Principal.toText(callerPrincipal);

    if (Text.size(newNickname) == 0) {
      throw Error.reject("Nickname cannot be empty.");
    };
    
    switch (userHashMap.get(callerPrincipal)) {
      case (?currentUserRecord) {
        if (currentUserRecord.owner != callerPrincipalText) {
          throw Error.reject("Unauthorized: You are not the owner of this user account.");
        };
        if (currentUserRecord.nickname != newNickname) {
          let updatedUser: User = {
            nickname = newNickname;
            owner = currentUserRecord.owner;
            personas = currentUserRecord.personas;
            rubrics = currentUserRecord.rubrics;
            glossaries = currentUserRecord.glossaries;
            files = currentUserRecord.files;
            scenarios = currentUserRecord.scenarios;
            roleplays = currentUserRecord.roleplays;
          };

          userHashMap.put(callerPrincipal, updatedUser);
        };
      };
      case null {
        throw Error.reject("User not found for the caller principal.");
      };
    };
  };

  public func addContentToUser(
    targetUserPrincipal: Principal,
    contentKind: ContentKind,
    contentId: Text
  ) : async () {
    let callerPrincipalText = Principal.toText(targetUserPrincipal);

    switch (userHashMap.get(targetUserPrincipal)) {
      case (?userRecord) {
        if (userRecord.owner != callerPrincipalText) {
          throw Error.reject("Unauthorized: You are not the owner of this user account.");
        };

        let newItem: ContentItem = { id = contentId };

        var currentUser = userRecord;

        switch (contentKind) {
          case (#Persona) {
            if (Array.find(currentUser.personas, func (p: Persona) : Bool { return p.id == contentId; }) != null) {
              throw Error.reject("Persona with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              personas = Array.append(currentUser.personas, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              rubrics = currentUser.rubrics;
              glossaries = currentUser.glossaries;
              files = currentUser.files;
              scenarios = currentUser.scenarios;
              roleplays = currentUser.roleplays;
            };
          };
          case (#Rubrics) {
            if (Array.find(currentUser.rubrics, func (r: Rubrics) : Bool { return r.id == contentId; }) != null) {
              throw Error.reject("Rubrics item with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              rubrics = Array.append(currentUser.rubrics, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              personas = currentUser.personas;
              glossaries = currentUser.glossaries;
              files = currentUser.files;
              scenarios = currentUser.scenarios;
              roleplays = currentUser.roleplays;
            };
          };
          case (#Glossary) {
            if (Array.find(currentUser.glossaries, func (g: Glossary) : Bool { return g.id == contentId; }) != null) {
              throw Error.reject("Glossary item with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              glossaries = Array.append(currentUser.glossaries, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              personas = currentUser.personas;
              rubrics = currentUser.rubrics;
              files = currentUser.files;
              scenarios = currentUser.scenarios;
              roleplays = currentUser.roleplays;
            };
          };
          case (#File) {
            if (Array.find(currentUser.files, func (f: File) : Bool { return f.id == contentId; }) != null) {
              throw Error.reject("File with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              files = Array.append(currentUser.files, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              personas = currentUser.personas;
              rubrics = currentUser.rubrics;
              glossaries = currentUser.glossaries;
              scenarios = currentUser.scenarios;
              roleplays = currentUser.roleplays;
            };
          };
          case (#Scenario) {
            if (Array.find(currentUser.scenarios, func (s: Scenario) : Bool { return s.id == contentId; }) != null) {
              throw Error.reject("Scenario with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              scenarios = Array.append(currentUser.scenarios, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              personas = currentUser.personas;
              rubrics = currentUser.rubrics;
              glossaries = currentUser.glossaries;
              files = currentUser.files;
              roleplays = currentUser.roleplays;
            };
          };
          case (#Roleplay) {
            if (Array.find(currentUser.roleplays, func (r: Roleplay) : Bool { return r.id == contentId; }) != null) {
              throw Error.reject("Roleplay with ID '" # contentId # "' already exists for this user.");
            };
            currentUser := {
              roleplays = Array.append(currentUser.roleplays, [newItem]);
              owner = currentUser.owner;
              nickname = currentUser.nickname;
              personas = currentUser.personas;
              rubrics = currentUser.rubrics;
              glossaries = currentUser.glossaries;
              files = currentUser.files;
              scenarios = currentUser.scenarios;
            };
          };
        };

        userHashMap.put(targetUserPrincipal, currentUser);
      };
      case null {
        throw Error.reject("User not found for the provided principal.");
      };
    };
  };

  public shared query func getUserPersonas(userP: Principal): async ?[Persona] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.personas;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func getUserRubrics(userP: Principal): async ?[Rubrics] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.rubrics;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func getUserGlossaries(userP: Principal): async ?[Glossary] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.glossaries;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func getUserFiles(userP: Principal): async ?[File] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.files;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func getUserScenarios(userP: Principal): async ?[Scenario] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.scenarios;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func roleplays(userP: Principal): async ?[Roleplay] {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        return ?userRecord.roleplays;
      };
      case null {
        return null;
      };
    };
  };

  public shared query func getContentItemById(userP: Principal, kind: ContentKind, itemId: Text): async ?ContentItem {
    switch (userHashMap.get(userP)) {
      case (?userRecord) {
        switch (kind) {
          case (#Persona) { return Array.find(userRecord.personas, func (p: Persona) : Bool { return p.id == itemId; }); };
          case (#Rubrics) { return Array.find(userRecord.rubrics, func (r: Rubrics) : Bool { return r.id == itemId; }); };
          case (#Glossary) { return Array.find(userRecord.glossaries, func (g: Glossary) : Bool { return g.id == itemId; }); };
          case (#File) { return Array.find(userRecord.files, func (f: File) : Bool { return f.id == itemId; }); };
          case (#Scenario) { return Array.find(userRecord.scenarios, func (s: Scenario) : Bool { return s.id == itemId; }); };
          case (#Roleplay) { return Array.find(userRecord.roleplays, func (r: Roleplay) : Bool { return r.id == itemId; }); };
        };
      };
      case null { }; 
    };
    return null;
  };
};
