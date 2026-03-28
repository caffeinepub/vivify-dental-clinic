import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

actor {
  type ServiceType = {
    #cleaning;
    #filling;
    #whitening;
    #extractions;
    #implants;
    #braces;
    #consultation;
  };

  type AppointmentRequest = {
    id : Nat;
    patientName : Text;
    phone : Text;
    email : Text;
    preferredDate : Time.Time;
    service : ServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module AppointmentRequest {
    public func compare(a1 : AppointmentRequest, a2 : AppointmentRequest) : Order.Order {
      Nat.compare(a1.id, a2.id);
    };
  };

  var nextId = 1;
  let appointments = Map.empty<Nat, AppointmentRequest>();
  let contactForms = List.empty<ContactForm>();

  public shared ({ caller }) func bookAppointment(
    patientName : Text,
    phone : Text,
    email : Text,
    preferredDate : Time.Time,
    service : ServiceType,
    message : Text,
  ) : async Nat {
    let id = nextId;
    let appointment : AppointmentRequest = {
      id;
      patientName;
      phone;
      email;
      preferredDate;
      service;
      message;
      timestamp = Time.now();
    };
    appointments.add(id, appointment);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let contact : ContactForm = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactForms.add(contact);
  };

  public query ({ caller }) func getAppointment(id : Nat) : async AppointmentRequest {
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [AppointmentRequest] {
    appointments.values().toArray().sort();
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.toArray();
  };
};
