import { useMutation } from "@tanstack/react-query";
import { ServiceType } from "../backend";
import { useActor } from "./useActor";

export function useBookAppointment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      patientName: string;
      phone: string;
      email: string;
      preferredDate: bigint;
      service: ServiceType;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bookAppointment(
        data.patientName,
        data.phone,
        data.email,
        data.preferredDate,
        data.service,
        data.message,
      );
    },
  });
}

export { ServiceType };
