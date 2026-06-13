import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState(500);
  const [tone, setTone] = useState("Academic");
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEssay = async () => {
    if (!topic) return;

    setLoading(true);
    setEssay("");

    try {
      const res = await axios.post("https://aetherwrite-ai-production.up.railway.app/generate", {
        topic,
        length,
        tone,
      });

      setEssay(res.data.essay);
    } catch (err) {
      setEssay("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>AetherWrite AI</h1>
        <p style={styles.subtitle}>
          Write high-quality essays in seconds
        </p>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={styles.card}
      >

        <input
          style={styles.input}
          placeholder="Enter your topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <div style={styles.row}>
          <select
            style={styles.select}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          >
            <option value={250}>250 words</option>
            <option value={500}>500 words</option>
            <option value={800}>800 words</option>
          </select>

          <select
            style={styles.select}
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Academic</option>
            <option>Formal</option>
            <option>Simple</option>
          </select>
        </div>

        <button onClick={generateEssay} style={styles.button}>
          {loading ? "Generating..." : "Generate Essay"}
        </button>
      </motion.div>

      {/* OUTPUT */}
      <motion.div style={styles.outputCard}>
        {loading && <p>Generating high-quality essay...</p>}
        {!loading && essay && <p style={styles.output}>{essay}</p>}
        {!loading && !essay && (
          <p style={styles.placeholder}>
            Your essay will appear here
          </p>
        )}
      </motion.div>

      {/* FOOTER */}
      <div style={styles.footer}>
        Built with AI • AetherWrite
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    fontFamily: "Arial",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 20px",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "40px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "8px",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "14px",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  select: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  button: {
    padding: "12px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  outputCard: {
    marginTop: "25px",
    width: "100%",
    maxWidth: "520px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    minHeight: "150px",
  },

  output: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
    color: "#111827",
  },

  placeholder: {
    color: "#9ca3af",
  },

  footer: {
    marginTop: "40px",
    fontSize: "12px",
    color: "#9ca3af",
  },
};
