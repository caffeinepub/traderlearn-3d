import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  let moduleProgress = Map.empty<Text, Bool>();

  public shared ({ caller }) func markModuleComplete(moduleId : Text) : async () {
    moduleProgress.add(moduleId, true);
  };

  public query ({ caller }) func isModuleComplete(moduleId : Text) : async Bool {
    switch (moduleProgress.get(moduleId)) {
      case (null) { false };
      case (?status) { status };
    };
  };

  public query ({ caller }) func getAllModuleProgress() : async [(Text, Bool)] {
    moduleProgress.toArray();
  };

  public shared ({ caller }) func resetModule(moduleId : Text) : async () {
    switch (moduleProgress.get(moduleId)) {
      case (null) { Runtime.trap("Module does not exist. ") };
      case (?_) {
        moduleProgress.add(moduleId, false);
      };
    };
  };
};
