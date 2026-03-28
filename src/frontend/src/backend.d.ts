import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AppointmentRequest {
    id: bigint;
    service: ServiceType;
    email: string;
    message: string;
    preferredDate: Time;
    timestamp: Time;
    patientName: string;
    phone: string;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export enum ServiceType {
    filling = "filling",
    braces = "braces",
    whitening = "whitening",
    cleaning = "cleaning",
    implants = "implants",
    extractions = "extractions",
    consultation = "consultation"
}
export interface backendInterface {
    bookAppointment(patientName: string, phone: string, email: string, preferredDate: Time, service: ServiceType, message: string): Promise<bigint>;
    getAllAppointments(): Promise<Array<AppointmentRequest>>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAppointment(id: bigint): Promise<AppointmentRequest>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
