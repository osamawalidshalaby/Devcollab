import React, { useState } from "react";

function VideoCall() {
  const [meetingId, setMeetingId] = useState(null);

  // 🟢 Token من Dashboard (JWT)
  const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN; 

  async function createMeeting() {
    try {
      const res = await fetch("https://api.videosdk.live/v2/rooms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VIDEOSDK_TOKEN}`, // ✅ هنا بنستخدم التوكن مش الـ API Key
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Created Room:", data);

      if (data.roomId || data.id) {
        setMeetingId(data.roomId || data.id);
      } else {
        console.error("Room creation failed:", data);
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  }

  return (
    <div>
      {!meetingId ? (
        <button onClick={createMeeting}>Start Call</button>
      ) : (
        <iframe
          title="VideoSDK Meeting"
          src={`https://embed.videosdk.live/rtc-js-prebuilt/room/${meetingId}?micEnabled=true&camEnabled=true`}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          style={{ width: "100%", height: "600px", border: "0" }}
        ></iframe>
      )}
    </div>
  );
}

export default VideoCall;


