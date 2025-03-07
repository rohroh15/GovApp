import React, { useState } from "react";

export default function GovBoard() {
  const [meetings, setMeetings] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [agendaItems, setAgendaItems] = useState([]);
  const [newAgendaItem, setNewAgendaItem] = useState("");
  const [votes, setVotes] = useState({});
  const [minutes, setMinutes] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  const addMeeting = () => {
    if (meetingTitle.trim()) {
      setMeetings([...meetings, { title: meetingTitle, agenda: [], votes: {} }]);
      setMeetingTitle("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GovBoard - Meeting Management</h1>
      <div style={{ marginBottom: "20px" }}>
        <input value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="Meeting Title" />
        <button onClick={addMeeting}>Add Meeting</button>
      </div>
    </div>
  );
}
