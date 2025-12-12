# Analytics Formulas & Equations Used in TPL Web

This document contains all the formulas and equations used for analytics, bar graphs, line charts, and future data predictions in the TPL Web application.

---

## 1. **PERCENTAGE CALCULATION** (Used throughout all pages)

### Formula:

```
Percentage = (Score / Total Questions) × 100
```

### Code Implementation:

```javascript
const percentage = Math.round((score.score / score.total_questions) * 100);
```

### Usage:

- Score display in tables
- Progress bars
- Color coding (Green ≥80%, Yellow 60-79%, Red <60%)

---

## 2. **AVERAGE SCORE CALCULATION** (Student & Teacher Dashboards)

### Formula:

```
Average Score = (Sum of All Percentages) / (Number of Quizzes)
```

### Code Implementation:

```javascript
// Student_Dashboard.html
const totalPercentage = allScores.reduce((sum, score) => {
  return sum + (score.score / score.total_questions) * 100;
}, 0);
const averagePercentage = Math.round(totalPercentage / allScores.length);

// Teacher_Dashboard.html
const averages = data.map((item) => (item.score / item.total_questions) * 100);
const average = averages.length
  ? (averages.reduce((sum, avg) => sum + avg, 0) / averages.length).toFixed(0)
  : 0;
```

---

## 3. **LINEAR REGRESSION FOR PREDICTIONS** (Teacher_Tracking.html)

### Formula:

```
Slope (m) = (n × Σ(xy) - Σ(x) × Σ(y)) / (n × Σ(x²) - (Σ(x))²)
Intercept (b) = (Σ(y) - m × Σ(x)) / n
```

Where:

- `n` = number of data points
- `x` = quiz attempt number (1, 2, 3, ...)
- `y` = score percentage for each attempt

### Code Implementation:

```javascript
function calculateLinearRegression(x, y) {
  const n = x.length;
  if (n === 0) return { slope: 0, intercept: 0 };

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
  const sumXX = x.reduce((s, xi) => s + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}
```

---

## 4. **FUTURE SCORE PREDICTION** (Teacher_Tracking.html)

### 🎯 **Simple Explanation:**

The prediction chart works like drawing a straight line through past quiz scores and extending it into the future to guess what scores might be.

**Think of it like this:**

- You have a student's quiz scores: 60%, 65%, 70%, 75%
- You draw a line that best fits these points (going upward)
- You extend that line forward to predict: 80%, 85%, 90%

### 📊 **Step-by-Step Process:**

1. **Collect Past Scores**: Get all the student's quiz scores (e.g., Quiz 1: 60%, Quiz 2: 65%, Quiz 3: 70%)

2. **Find the Trend Line**: Calculate a straight line that best fits these scores

   - If scores are going up → line slopes upward (positive slope)
   - If scores are going down → line slopes downward (negative slope)
   - If scores stay the same → line is flat (slope = 0)

3. **Extend the Line**: Continue the line forward for the next 3 weeks

4. **Get Predictions**: Read the predicted scores from where the line extends

### 🔢 **Simple Example:**

**Student's Past Scores:**

- Quiz 1: 50%
- Quiz 2: 55%
- Quiz 3: 60%
- Quiz 4: 65%

**The Pattern:** Scores are improving by 5% each quiz

**Predicted Future Scores:**

- Quiz 5 (Week 1): 70%
- Quiz 6 (Week 2): 75%
- Quiz 7 (Week 3): 80%

### 📐 **The Math (Simplified):**

The system uses **Linear Regression** to find the best-fit line:

```
y = mx + b
```

Where:

- `y` = predicted score percentage
- `m` = slope (how much scores change per quiz)
- `x` = quiz number (1, 2, 3, ...)
- `b` = starting point (intercept)

**Example Calculation:**

- If slope (m) = 5 and intercept (b) = 45
- For Quiz 5: y = (5 × 5) + 45 = 25 + 45 = 70%

### ⚠️ **Important Notes:**

1. **Minimum Data Required**: Needs at least 2 quiz scores to make predictions
2. **Safety Limits**: Predictions are clamped between 0% and 100% (can't go below 0 or above 100)
3. **Time Spacing**: Each prediction is spaced 7 days apart
4. **Visual Display**:
   - **Green solid line** = Past/Historical scores (real data)
   - **Yellow dashed line** = Future predictions (estimated)

### 🎨 **What You See on the Chart:**

```
Score %
100 |                                    ● (Predicted Week 3)
    |                               ● (Predicted Week 2)
 80 |                          ● (Predicted Week 1)
    |                     ● (Quiz 4 - 65%)
 60 |                ● (Quiz 3 - 60%)
    |           ● (Quiz 2 - 55%)
 40 |      ● (Quiz 1 - 50%)
    |________________________________________
      Quiz 1  Quiz 2  Quiz 3  Quiz 4  Week1  Week2  Week3
      (Past - Solid Line)    (Future - Dashed Line)
```

### Formula:

```
Predicted Score = Slope × (Last Quiz Number + Future Week Number) + Intercept
```

### Code Implementation:

```javascript
function predictScores(scores) {
  if (scores.length < 2) return { historical: [], predicted: [] };

  const x = scores.map((_, i) => i + 1); // Quiz attempt numbers
  const y = scores.map((s) => (s.score / s.total_questions) * 100); // Percentages

  const { slope, intercept } = calculateLinearRegression(x, y);

  const predicted = [];
  const lastDate = new Date(scores[scores.length - 1].taken_at);

  for (let i = 1; i <= 3; i++) {
    // Predict next 3 weeks
    const futureX = x.length + i;
    const predY = slope * futureX + intercept;

    // Clamp between 0 and 100
    const clampedY = Math.max(0, Math.min(100, predY));

    const futureDate = new Date(lastDate);
    futureDate.setDate(lastDate.getDate() + i * 7); // Add 7 days per prediction

    predicted.push({
      x: futureDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      y: clampedY,
    });
  }

  return { historical, predicted };
}
```

---

## 5. **TOPIC PERFORMANCE AVERAGE** (Student_Tracking.html - Polar Area Chart)

### Formula:

```
Topic Average = (Sum of All Scores for Topic) / (Number of Attempts for Topic)
```

### Code Implementation:

```javascript
const averages = topics.map((topic) => {
  const topicScores = allScores.filter(
    (s) => (s.quiz.topic || "Unknown") === topic
  );
  return topicScores.length
    ? topicScores.reduce(
        (sum, s) => sum + (s.score / s.total_questions) * 100,
        0
      ) / topicScores.length
    : 0;
});
```

---

## 6. **QUIZ COMPLETION BY SECTION** (Teacher_Dashboard.html - Bar Chart)

### Formula:

```
Completion % = (Total Quizzes Completed by Section) / (Students in Section × Total Active Quizzes) × 100
```

### Code Implementation:

```javascript
// Group by grade-section
const groups = {};
students.forEach((s) => {
  const sec = s.section?.trim().toLowerCase();
  if (!sec || !["gas1", "gas2"].includes(sec)) return;
  const key = `${s.grade_level}-${sec}`;
  groups[key] = groups[key] || { students: 0, completed: 0 };
  groups[key].students++;
  groups[key].completed += quizCounts[s.student_id] || 0;
});

// Calculate percentage
const pct = gData.students
  ? ((gData.completed / gData.students / totalQuizzes) * 100).toFixed(1)
  : 0;
```

---

## 7. **AVERAGE SCORE PER QUIZ** (Teacher_Dashboard.html & Teacher_Scores.html - Line/Bar Chart)

### Formula:

```
Quiz Average = (Sum of All Percentages for Quiz) / (Number of Attempts for Quiz)
```

### Code Implementation:

```javascript
// Teacher_Dashboard.html
const map = {};
results.forEach((r) => {
  if (!map[r.quiz_id]) map[r.quiz_id] = { sum: 0, cnt: 0 };
  const pct = (r.score / r.total_questions) * 100;
  map[r.quiz_id].sum += pct;
  map[r.quiz_id].cnt++;
});

const averages = quizIds.map((id) => {
  const s = map[id] || { sum: 0, cnt: 0 };
  return s.cnt ? (s.sum / s.cnt).toFixed(1) : null;
});

// Teacher_Scores.html
function calculateAverageScoresPerQuiz(scores) {
  let quizMap = new Map();
  scores.forEach((score) => {
    const quizId = score.quiz_id;
    const percentage = (score.score / score.total_questions) * 100;
    if (!quizMap.has(quizId)) {
      quizMap.set(quizId, { title: score.quiz.title, sum: 0, count: 0 });
    }
    let entry = quizMap.get(quizId);
    entry.sum += percentage;
    entry.count++;
  });

  let labels = [];
  let data = [];
  quizMap.forEach((val) => {
    labels.push(extractQuizNumber(val.title));
    data.push(Math.round(val.sum / val.count)); // Average
  });

  return { labels, data, fullTitles };
}
```

---

## 8. **SCORE DISTRIBUTION** (Teacher_Scores.html - Doughnut Chart)

### Formula:

```
Excellent (≥80%) = Count of scores where percentage ≥ 80
Good (60-79%) = Count of scores where 60 ≤ percentage < 80
Needs Improvement (<60%) = Count of scores where percentage < 60
```

### Code Implementation:

```javascript
function calculateScoreDistribution(scores) {
  let excellent = 0; // >= 80%
  let good = 0; // 60–79%
  let needsImprovement = 0; // < 60%

  scores.forEach((score) => {
    const percentage = Math.round((score.score / score.total_questions) * 100);
    if (percentage >= 80) {
      excellent++;
    } else if (percentage >= 60) {
      good++;
    } else {
      needsImprovement++;
    }
  });

  return {
    labels: ["Excellent (≥80%)", "Good (60–79%)", "Needs Improvement (<60%)"],
    data: [excellent, good, needsImprovement],
  };
}
```

---

## 9. **QUIZ READINESS SCORE** (Student_Dashboard.html - Radar Chart)

### Formula:

```
Readiness = Average of all quiz scores for a specific quiz title
```

### Code Implementation:

```javascript
function calculateReadiness(quizTitle, attempts) {
  const quizScores = attempts
    .filter((score) => score.quiz.title === quizTitle)
    .map((score) => (score.score / score.total_questions) * 100);

  const quizAvg = quizScores.length
    ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length
    : 0;

  return Math.round(quizAvg);
}
```

---

## 10. **WORST PERFORMING TOPIC** (Student_Tracking.html - Recommendations)

### Formula:

```
Topic Average = (Sum of Percentages for Topic) / (Count of Attempts for Topic)
Worst Topic = Topic with Lowest Average
```

### Code Implementation:

```javascript
const topicStats = {};
scores.forEach((s) => {
  const topic = s.quiz?.topic || "Unknown";
  const pct = (s.score / s.total_questions) * 100;
  if (!topicStats[topic]) topicStats[topic] = { sum: 0, cnt: 0 };
  topicStats[topic].sum += pct;
  topicStats[topic].cnt += 1;
});

let worstTopic = null,
  worstAvg = 101;
for (const [t, st] of Object.entries(topicStats)) {
  const avg = st.sum / st.cnt;
  if (avg < worstAvg) {
    worstAvg = avg;
    worstTopic = t;
  }
}
```

---

## 11. **STUDENT RANKING** (Leaderboard Calculations)

### Formula:

```
Rank = Position in sorted list based on:
- Ranking Score (default)
- Accuracy
- Best Time
```

### Code Implementation:

```javascript
// Student_Dashboard.html
const rank =
  allRanks.findIndex((entry) => entry.student_id === numericStudentId) + 1;
```

---

## 12. **QUIZ STATUS CALCULATION** (Teacher_Tracking.html - Student Overview)

### Formula:

```
Quiz Status = Average of all quiz percentages for student
Status = "Excellent" if avg ≥ 80, "Good" if 60 ≤ avg < 80, "Needs Improvement" if avg < 60
```

### Code Implementation:

```javascript
if (scores && scores.length > 0) {
  quizScore =
    scores.reduce((sum, s) => sum + (s.score / s.total_questions) * 100, 0) /
    scores.length;
  quizStatus =
    quizScore >= 80
      ? "Excellent"
      : quizScore >= 60
      ? "Good"
      : "Needs Improvement";
}
```

---

## 13. **QUEST PROGRESS CALCULATION** (Teacher_Tracking.html)

### Formula:

```
Quest Progress = Average of all quest progress percentages for student
Status = "Excellent" if avg ≥ 80, "Good" if 50 ≤ avg < 80, "Needs Improvement" if avg < 50
```

### Code Implementation:

```javascript
if (quests && quests.length > 0) {
  questProgress =
    quests.reduce((sum, q) => sum + q.progress, 0) / quests.length;
  questStatus =
    questProgress >= 80
      ? "Excellent"
      : questProgress >= 50
      ? "Good"
      : "Needs Improvement";
}
```

---

## Summary of Chart Types:

1. **Line Charts**: Score trends over time (historical + predicted)
2. **Bar Charts**: Average scores per quiz, completion by section
3. **Pie/Doughnut Charts**: Score distribution (Excellent/Good/Needs Improvement)
4. **Polar Area Charts**: Topic performance comparison
5. **Radar Charts**: Quiz readiness scores
6. **Prediction Charts**: Linear regression extrapolation for future performance

---

## Key Mathematical Concepts Used:

- **Linear Regression**: For predicting future scores
- **Arithmetic Mean**: For calculating averages
- **Percentage Calculation**: For score normalization
- **Statistical Aggregation**: Sum, count, average operations
- **Data Clamping**: Ensuring predictions stay within 0-100% range

---

_Last Updated: Based on code analysis from all HTML files in the TPL Web project_
