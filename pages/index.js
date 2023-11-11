'use client'
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [comunication, setComunication] = useState("")
  const [preferredTone, setPreferredTone] = useState("")
  const [clientContactInfo, setClientContactInfo] = useState("")
  const [clientIPS, setClientIPS] = useState("")
  const [painPoint, setPainPoint] = useState("")
  const [benefit, setBenefit] = useState("")
  const [subject, setSubject] = useState("")
  const [concern, setConcern] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userAffiliation, setUserAffiliation] = useState("")
  const [valuesPrinciples, setValuesPrinciples] = useState("")
  const [decisionMakingProcess, setDecisionMakingProcess] = useState("")
  const [challengesMitigations, setChallengesMitigations] = useState("")
  const [preferenceAggregation, setPreferenceAggregation] = useState("")
  const [transparencyAccountability, setTransparencyAccountability] = useState("")

  const [result, setResult] = useState();
  const [generatedAnswers, setGeneratedAnswers] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          clientFirstName: name, 
          clientLastName: lastname, 
          comunicationChannel: comunication, 
          preferredTone: preferredTone, 
          clientContactInfo: clientContactInfo, 
          clientIPS: clientIPS, 
          painPoint: painPoint, 
          benefit: benefit, 
          subject: subject, 
          concern: concern,
          userEmail: userEmail,
          userAffiliation: userAffiliation,
          valuesPrinciples: valuesPrinciples,
          decisionMakingProcess: decisionMakingProcess,
          challengesMitigations: challengesMitigations,
          preferenceAggregation: preferenceAggregation,
          transparencyAccountability: transparencyAccountability
        }),
      });
      console.log(response)

      

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      


      // Make a second request to OpenAI API for specific questions
      const answersResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response: data.result }),
      });

      const answersData = await answersResponse.json();
      if (answersResponse.status !== 200) {
        throw answersData.error || new Error(`Request failed with status ${answersResponse.status}`);
      }

      setGeneratedAnswers(answersData.result);


    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  // Date of the first convorsation

  return (
    <div>
      <Head>
        <title>AI app</title>
        <link rel="icon" href="/logo2.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.jpg" className={styles.icon} />
        <h3>Chat with HackAI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="clientName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="lastname"
            placeholder="clientLastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            name="comunication"
            placeholder="comunicationChannel"
            value={comunication}
            onChange={(e) => setComunication(e.target.value)}
          />
          <input
            type="text"
            name="preferredTone"
            placeholder="preferredTone"
            value={preferredTone}
            onChange={(e) => setPreferredTone(e.target.value)}
          />
          <input
            type="text"
            name="clientContactInfo"
            placeholder="clientContactInfo"
            value={clientContactInfo}
            onChange={(e) => setClientContactInfo(e.target.value)}
          />
          <input
            type="text"
            name="Industry/Product/Service"
            placeholder="Industry/Product/Service"
            value={clientIPS}
            onChange={(e) => setClientIPS(e.target.value)}
          />
          <input
            type="text"
            name="painPoint"
            placeholder="painPoint"
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
          />
          <input
            type="text"
            name="benefit"
            placeholder="benefit"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
          />
          <input
            type="text"
            name="subject"
            placeholder="subjectMatter"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            name="concern"
            placeholder="concern"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
          />

          <input
            type="text"
            name="email"
            placeholder="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <input
            type="text"
            name="Affiliation"
            placeholder="user Affiliation"
            value={userAffiliation}
            onChange={(e) => setUserAffiliation(e.target.value)}
          />

          <input
            type="text"
            name="valuesPrinciples"
            placeholder="values Principles"
            value={valuesPrinciples}
            onChange={(e) => setValuesPrinciples(e.target.value)}
          />

          <input
            type="text"
            name="decisionMakingProcess"
            placeholder="decision Making Process"
            value={ decisionMakingProcess}
            onChange={(e) => setDecisionMakingProcess(e.target.value)}
          />  

          <input
            type="text"
            name="challengesMitigations"
            placeholder="challenges Mitigations"
            value={challengesMitigations}
            onChange={(e) => setChallengesMitigations(e.target.value)}
          />

          <input
            type="text"
            name="preferenceAggregation"
            placeholder="preference Aggregation"
            value={preferenceAggregation}
            onChange={(e) => setPreferenceAggregation(e.target.value)}
          />

          <input
            type="text"
            name="name"
            placeholder="transparency Accountability"
            value={transparencyAccountability}
            onChange={(e) => setTransparencyAccountability(e.target.value)}
          />






          <input type="submit" value="Generate response" />
        </form>
        <div className={styles.result}>
          <p>Generated Response: {result}</p>
          <p>Generated Answers: {generatedAnswers}</p>
        </div>
      </main>
    </div>
  );
}
