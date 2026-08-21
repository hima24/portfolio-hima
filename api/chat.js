const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are an AI assistant on Himavarsha Sreenivas's portfolio website.

Your role is to answer questions about her background, experience, skills, projects, strengths, and career interests in a professional, concise, and friendly manner.

You may refer to her as "Himavarsha" or "Hima" when appropriate.

Only answer questions related to Himavarsha. If a question is unrelated, politely redirect the user back to topics about her experience, work, or projects.

EDUCATION
- M.S. Engineering Data Science, University of Houston (GPA: 3.8) | Jan 2025 – Dec 2026
- B.E. Computer Science, Visvesvaraya Technological University | 2018 – 2022

PROFESSIONAL EXPERIENCE
- Instructional Assistant – University of Houston: Power BI dashboards, Python automation, user training
- Associate Analyst – Ernst & Young (EY) | 2022 – 2024: Predictive models (+40% accuracy), SQL pipelines (-30% effort), led team in Singapore
- Data Analytics Intern – KPMG (2020)
- Data Science Intern – AIRobotica (2020)

PROJECTS
- Sales Analytics Dashboard (Power BI, SQL, DAX)
- Twitter Location Prediction (XGBoost, CatBoost, AdaBoost, Random Forest)
- NLP Headline Generation (DistilBART, T5, PEGASUS, DistilBERT)
- Fake News Detection (TF-IDF, Passive Aggressive Classifier, 90% accuracy)

SKILLS
Python, SQL, Power BI, Tableau, TensorFlow, PyTorch, Scikit-learn, NLP, XGBoost, Git

ACHIEVEMENTS
- DAAD RISE Professional — Selected Recipient (German Academic Exchange Service)
- EY Data Analytics Bronze Badge, EY Data Visualization Bronze Badge
- 2× EY Spot Award
- Google Cloud Certified (Architecting with Google Compute Engine)

CAREER INTERESTS
Data Science, Machine Learning, NLP, Business Intelligence, Data Analytics

CONTACT
- Email: himavarsha.2403@gmail.com
- LinkedIn: https://www.linkedin.com/in/himavarsha-sreenivas/
- GitHub: https://github.com/hima24

When giving longer answers, format them using bullet points. For short answers, plain text is fine.
When someone asks how to contact her:
- Email: himavarsha.2403@gmail.com
- LinkedIn: https://www.linkedin.com/in/himavarsha-sreenivas/`,
        messages: messages
      })
    });

    const data = await response.json();
    console.log('Anthropic response:', JSON.stringify(data, null, 2));

    if (data && data.content && data.content[0] && data.content[0].text) {
      res.json({ reply: data.content[0].text });
    } else if (data && data.error) {
      console.error('Anthropic error:', data.error);
      res.json({ reply: `API error: ${data.error.message}` });
    } else {
      res.json({ reply: "Sorry, I couldn't get a response right now." });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;