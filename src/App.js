import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function GovBoard() {
  const [meetings, setMeetings] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [agendaItems, setAgendaItems] = useState({});
  const [votes, setVotes] = useState({});
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    const savedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(savedMeetings);
  }, []);

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = () => {
    if (meetingTitle.trim()) {
      const newMeeting = { id: uuidv4(), title: meetingTitle, agenda: [], votes: {} };
      setMeetings([...meetings, newMeeting]);
      setMeetingTitle("");
    }
  };

  const deleteMeeting = (id) => {
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== id);
    setMeetings(updatedMeetings);
  };

  const addAgendaItem = (meetingId, item) => {
    const updatedMeetings = meetings.map((meeting) => {
      if (meeting.id === meetingId) {
        return {
          ...meeting,
          agenda: [...meeting.agenda, item],
          votes: { ...meeting.votes, [item]: { yes: 0, no: 0 } },
        };
      }
      return meeting;
    });
    setMeetings(updatedMeetings);
  };

  const vote = (meetingId, agendaItem, choice) => {
    const updatedMeetings = meetings.map((meeting) => {
      if (meeting.id === meetingId) {
        return {
          ...meeting,
          votes: {
            ...meeting.votes,
            [agendaItem]: {
              yes: choice === "Yes" ? (meeting.votes[agendaItem]?.yes || 0) + 1 : meeting.votes[agendaItem]?.yes || 0,
              no: choice === "No" ? (meeting.votes[agendaItem]?.no || 0) + 1 : meeting.votes[agendaItem]?.no || 0,
            },
          },
        };
      }
      return meeting;
    });
    setMeetings(updatedMeetings);
  };

  const generateAiSummary = () => {
    const summary = `Meeting Summary:\n${meetings
      .map(
        (meeting) =>
          `\nTitle: ${meeting.title}\nAgenda:\n${meeting.agenda
            .map((item) => `- ${item} (Yes: ${meeting.votes[item]?.yes || 0}, No: ${meeting.votes[item]?.no || 0})`)
            .join("\n")}`
      )
      .join("\n\n")}`;
    setAiSummary(summary);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#007BFF" }}>GovBoard - Meeting Management</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="Enter Meeting Title"
          style={{ padding: "10px", fontSize: "16px", width: "250px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={addMeeting}
          style={{ padding: "10px 15px", fontSize: "16px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Add Meeting
        </button>
      </div>

      {meetings.length > 0 && (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {meetings.map((meeting) => (
              <li key={meeting.id} style={{ padding: "10px", marginBottom: "5px", backgroundColor: "#f8f9fa", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "300px", margin: "0 auto" }}>
                {meeting.title}
                <button onClick={() => deleteMeeting(meeting.id)} style={{ backgroundColor: "#DC3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
