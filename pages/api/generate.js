import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * 
 
Your insights will be crucial in co-creating a governance system that aligns with diverse perspectives. 
        Please provide detailed responses to each question. Your input will be used to generate a comprehensive autonomous 
        governance proposal for the community's collective decision-making. 
        The generated system will aim to balance progress, safety, and participation for the collective good.


 */

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // Extract relevant information from the request
  const {
    clientFirstName,
    clientLastName,
    comunicationChannel,
    preferredTone,
    clientContactInfo,
    clientIPS,
    painPoint,
    benefit,
    subject,
    concern,
    userEmail,
    userAffiliation,
    valuesPrinciples,
    decisionMakingProcess,
    challengesMitigations,
    preferenceAggregation,
    transparencyAccountability,
  } = req.body;

  // Validate input data
  const requiredFields = [
    { value: clientFirstName, field: 'clientFirstName' },
    { value: clientLastName, field: 'clientLastName' },
    { value: comunicationChannel, field: 'comunicationChannel' },
    { value: preferredTone, field: 'preferredTone' },
    { value: clientContactInfo, field: 'clientContactInfo' },
    { value: clientIPS, field: 'clientIPS' },
    { value: painPoint, field: 'painPoint' },
    { value: benefit, field: 'benefit' },
    { value: subject, field: 'subject' },
    { value: concern, field: 'concern' },
    { value: userEmail, field: 'userEmail' },
    { value: userAffiliation, field: 'userAffiliation' },
    { value: valuesPrinciples, field: 'valuesPrinciples' },
    { value: decisionMakingProcess, field: 'decisionMakingProcess' },
    { value: challengesMitigations, field: 'challengesMitigations' },
    { value: preferenceAggregation, field: 'preferenceAggregation' },
    { value: transparencyAccountability, field: 'transparencyAccountability' },
  ];

  for (const field of requiredFields) {
    if (field.value.trim().length === 0) {
      res.status(400).json({
        error: {
          message: `Please enter a valid input for ${field.field}`,
        }
      });
      return;
    }
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `

      1. Identity Information:
        - Full Name: ${clientFirstName}
        - Last Name: ${clientLastName}
        - Email Address: ${userEmail}
        - Organization/Community Affiliation: ${userAffiliation}
        - Contact Information: ${clientContactInfo}
        - Industry/Product/Service: ${clientIPS}
        - Pain Point: ${painPoint}
        - Benefit: ${benefit}
        - Subject Matter of the Call: ${subject}
        - Concerns: ${concern}
        - Preferred Tone of Voice: ${preferredTone}
        - Communication Channel: ${comunicationChannel}

        2. Values and Principles:
        - What values or principles do you believe are crucial for governing AI models in our community? 
        ${valuesPrinciples}
    

        3. Decision-Making Processes:
        - How do you envision decision-making processes within the autonomous governance system? 
        ${decisionMakingProcess}

        4. Challenges and Mitigations:
        - Identify potential challenges in implementing such a governance model and suggest mitigations. 
        ${challengesMitigations}

        5. Preference Aggregation:
        - Specify your preferred mechanisms for value elicitation and preference aggregation. 
        ${preferenceAggregation}

        6. Transparency and Accountability:
        - How would you promote transparency and accountability within the governance structure? 
        ${transparencyAccountability}
      
      
        

        Potential decisions that we need decisions for at zuzalu: 
        - How should we decide on future locations?
        - How should we decide on acceptance criteria for future members?
        - How should we decide on our norms and values?
        - How should we govern our spaces and run our volunteer programs?

        The AI should answer these questions using the users answers from the above question.
        
      `,
      temperature: 0.9,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
