import StaffDisplay from "./staff_display";
import { AccidentalNote } from "../types";
import { getEnharmonicEquivalent, toVexKey } from "../pages/library/staff_utils";

interface AccidentalStaffPairProps {
  note: AccidentalNote;
}

export default function AccidentalStaffPair({ note }: AccidentalStaffPairProps) {
  const sharpSpelling = note.includes("#") ? note : getEnharmonicEquivalent(note);
  const flatSpelling = note.includes("b") ? note : getEnharmonicEquivalent(note);

  return (
    <div className="accidental-staff-pair">
      <div className="staff-pair-item">
        <StaffDisplay vexKeys={[toVexKey(sharpSpelling, 4)]} width={160} />
        <p className="staff-pair-label">{sharpSpelling}</p>
      </div>
      <div className="staff-pair-item">
        <StaffDisplay vexKeys={[toVexKey(flatSpelling, 4)]} width={160} />
        <p className="staff-pair-label">{flatSpelling}</p>
      </div>
    </div>
  );
}