import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    axios
      .get("https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/api/Fixtures") // adjust port if needed
      .then((res) => setFixtures(res.data))
      .catch((err) => console.error(err));
  }, []);

  const gold = "#c9a74a";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        color: gold,
        backgroundImage: "url('https://i.ibb.co/wFLGDxSs/Banner-1.png')", // <-- add your image URL here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "2px 2px 4px black",
        }}
      >
        MTN FIXTURES
      </h1>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)", // darker overlay for visibility
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: gold, color: "white" }}>
              <th style={{ padding: "12px" }}>DATE</th>
              <th style={{ padding: "12px" }}>TIME</th>
              <th style={{ padding: "12px" }}>HOME</th>
              <th style={{ padding: "12px" }}>AWAY</th>
              <th style={{ padding: "12px" }}>STADIUM</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((f) => (
              <tr
                key={f.id}
                style={{ textAlign: "center", borderBottom: `1px solid ${gold}` }}
              >
                <td style={{ padding: "12px" }}>
                  {new Date(f.date).toLocaleDateString()}
                </td>
                <td style={{ padding: "12px" }}>{f.time}</td>
                <td style={{ padding: "12px" }}>{f.home}</td>
                <td style={{ padding: "12px" }}>{f.away}</td>
                <td style={{ padding: "12px" }}>{f.stadium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
}
