const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

let chart; // global

generateBtn.addEventListener("click", async () => {

    const res = await fetch("http://localhost:5000/full-report", {
        credentials: "include"
    });

    const data = await res.json();

    document.getElementById("reportPreview").style.display = "block";

    // 📅 Date
    document.getElementById("reportDate").innerText =
        new Date().toLocaleDateString("en-IN");

    // 🧠 SUMMARY
    document.getElementById("reportSummary").innerText = `
Patient ${data.user.name}, age ${data.user.age}, shows ${
        getStatus(data.daily)
    } cognitive condition based on recent observations.
`;

    // 📊 METRICS
    document.getElementById("reportMetrics").innerHTML = `
        <div>Memory: ${avg(data.daily.map(d => scoreMemory(d.memory_issues)))}</div>
        <div>Mood: ${avg(data.daily.map(d => scoreMood(d.mood)))}</div>
        <div>Sleep: ${avg(data.daily.map(d => scoreSleep(d.sleep_quality)))}</div>
        <div>Mobility: ${avg(data.daily.map(d => scoreMobility(d.mobility)))}</div>
    `;

    // 💡 RECOMMENDATIONS
    document.getElementById("reportRecommendations").innerHTML = `
        <li>Maintain consistent sleep schedule</li>
        <li>Engage in cognitive exercises</li>
        <li>Stay socially active</li>
        <li>Monitor hydration and medication</li>
    `;

    // 📈 GRAPH
    const labels = data.daily.map(d =>
        new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
    );

    const memory = data.daily.map(d => scoreMemory(d.memory_issues));
    const mood = data.daily.map(d => scoreMood(d.mood));

    if (chart) chart.destroy();

    const ctx = document.getElementById("reportChart");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Memory",
                    data: memory,
                    borderColor: "#2E4BFF",
                    fill: true
                },
                {
                    label: "Mood",
                    data: mood,
                    borderColor: "#00C2FF",
                    fill: true
                }
            ]
        }
    });

    downloadBtn.disabled = false;
});

function scoreMemory(val) {
    return { None: 100, Mild: 75, Moderate: 50, Severe: 25 }[val] || 50;
}

function scoreMood(val) {
    return { Stable: 100, Anxious: 70, Depressed: 50, Aggressive: 40 }[val] || 60;
}

function scoreSleep(val) {
    return { Good: 100, Average: 70, Poor: 40 }[val] || 60;
}

function scoreMobility(val) {
    return { Normal: 100, Assisted: 60, Immobile: 30 }[val] || 50;
}

function avg(arr) {
    return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
}

function getStatus(daily) {
    const latest = daily[daily.length - 1];
    if (!latest) return "stable";

    if (latest.memory_issues === "Severe") return "critical";
    if (latest.memory_issues === "Moderate") return "declining";

    return "stable";
}