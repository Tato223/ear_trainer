import { useState } from "react";
import * as tone from "tone";
import { LibraryEntry, LibraryMode } from "../library/library_types";
import LibrarySelector from "../library/library_selector";
import LibraryDetailCard from "../library/library_detail_card";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { noteLibrary, scaleLibrary} from "../library/library_data";
import {playScaleLibrary} from "../../audio_config";
import { orderedNotes } from "../../types";

export default function LibraryPage() {
  return (
    <>
      <Header />
      <LibraryContent />
      <Footer />
    </>
  );
}

export function LibraryContent() {
  const [mode, setMode] = useState<LibraryMode>("notes");
  const [selectedEntry, setSelectedEntry] = useState<LibraryEntry | null>(null);

  const entries: LibraryEntry[] = mode === "notes" ? noteLibrary : scaleLibrary;

  function handleModeChange(newMode: LibraryMode) {
    setMode(newMode);
    setSelectedEntry(null);
  }

  function playEntry(entry: LibraryEntry) {
    const synth = new tone.Synth().toDestination();

    if (entry.kind === "note") {
      synth.triggerAttackRelease(`${entry.note}4`, "2n");
    } else {
      playScaleLibrary(entry.scale);
    }

    // Dispose after the audio has had time to finish playing.
    // A scale of 8 notes at "8n" needs more lead time than a single "2n" note.
    const disposeDelayMs = entry.kind === "note" ? 1000 : 2000;
    setTimeout(() => synth.dispose(), disposeDelayMs);
  }

  return (
    <div className="content-container">
      {/* <h2 className="library-instructions">Note &amp; Scale Library</h2> */}


      <div className="library-body">

        <div className="library-mode-toggle">
          <button
            className={mode === "notes" ? "active" : ""}
            onClick={() => handleModeChange("notes")}
          >
            Notes
          </button>

          <div className="vertical-divider"></div>

          <button
            className={mode === "scales" ? "active" : ""}
            onClick={() => handleModeChange("scales")}
          >
            Scales
          </button>
      </div>

        <LibrarySelector
          entries={entries}
          selectedEntry={selectedEntry}
          onSelect={setSelectedEntry}
        />

        {selectedEntry && (
          <LibraryDetailCard entry={selectedEntry} onPlay={() => playEntry(selectedEntry)} />
        )}
      </div>
    </div>
  );
}

