import React, { useState } from "react";

export default function GovBoard() {
  const [meetings, setMeetings] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState("");

  const addMeeting = () => {
    if (meetingTitle.trim()) {
      setMeetings([...meetings, { title: meetingTitle }]);
      setMeetingTitle("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GovApp - Meeting Management</h1>
      <div>
        <input
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="Meeting Title"
        />
        <button onClick={addMeeting}>Add Meeting</button>
      </div>

      <ul>
        {meetings.map((meeting, index) => (
          <li key={index}>{meeting.title}</li>
        ))}
      </ul>
    </div>
  );
}
