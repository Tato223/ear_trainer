import { LibraryEntry } from "./library_types";

interface LibraryDetailCardProps {
  entry: LibraryEntry;
  onPlay: () => void;
}

export default function LibraryDetailCard({ entry, onPlay }: LibraryDetailCardProps) {
  const title = entry.kind === "note" ? entry.note : entry.scale.Name;

  return (
    <div className="library-detail-card">
      <h3>{title}</h3>
      <p>{entry.description}</p>

      {entry.kind === "note" && (
        <p className="library-frequency">Standard frequency: {entry.standardFrequencyHz} Hz</p>
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