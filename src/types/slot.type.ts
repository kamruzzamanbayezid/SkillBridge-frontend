export type SlotStatus = "AVAILABLE" | "BOOKED" | "CANCELLED";

export interface ISlot {
  id: string;
  tutorProfileId: string;
  day: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  createdAt: string;
}
