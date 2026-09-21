import StaffDisplay from "../../components/staff_display";
import AccidentalStaffPair from "../../components/accidental_staff_pair";
import {
  scaleToVexKeys,
  toVexKey,
  isAccidentalNote,
} from "../library/staff_utils";
import { LibraryEntry } from "../library/library_types";

interface LibraryDetailCardProps {
  entry: LibraryEntry;
  onPlay: () => void;
}

export default function LibraryDetailCard({
  entry,
  onPlay,
}: LibraryDetailCardProps) {
  const title =
    entry.kind === "note"
      ? (entry.displayName ?? entry.note)
      : entry.scale.Name;

  return (
    <div className="library-detail-card">
      <h3>{title}</h3>

      {entry.kind === "note" ? (
        isAccidentalNote(entry.note) ? (
          <AccidentalStaffPair note={entry.note} />
        ) : (
          <StaffDisplay vexKeys={[toVexKey(entry.note, 4)]} />
        )
      ) : (
        <StaffDisplay vexKeys={scaleToVexKeys(entry.scale)} />
      )}

      <p className="library-description">{entry.description}</p>

      {entry.kind === "note" && (
        <p className="library-frequency">
          Standard frequency: {entry.standardFrequencyHz} Hz
        </p>
      )}

      {entry.culturalReferences && entry.culturalReferences.length > 0 && (
        <ul className="library-references">
          {entry.culturalReferences.map((ref) => (
            <li key={ref}>{ref}</li>
          ))}
        </ul>
      )}

      <button className="library-play-btn" onClick={onPlay}>
        &#9658; Play
      </button>
    </div>
  );
}
