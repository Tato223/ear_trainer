import { LibraryEntry } from "./library_types";

interface LibrarySelectorProps {
  entries: LibraryEntry[];
  selectedEntry: LibraryEntry | null;
  onSelect: (entry: LibraryEntry) => void;
}

export default function LibrarySelector({ entries, selectedEntry, onSelect }: LibrarySelectorProps) {
  return (
    <div className="library-selector">
      {entries.map((entry) => {
        const label = entry.kind === "note" ? entry.note : entry.scale.Name;
        const isSelected =
          selectedEntry !== null &&
          ((entry.kind === "note" && selectedEntry.kind === "note" && entry.note === selectedEntry.note) ||
            (entry.kind === "scale" &&
              selectedEntry.kind === "scale" &&
              entry.scale.Name === selectedEntry.scale.Name));

        return (
          <button
            key={label}
            className={`library-entry-btn ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(entry)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}