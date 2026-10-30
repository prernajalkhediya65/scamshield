
const API_BASE_URL = "http://localhost:8080/api";
const ANALYZE_ENDPOINT = `${API_BASE_URL}/scams/analyze`;

let currentMode = "url";

const modes = {

    url: {
        label: "Paste the website URL",
        placeholder: "https://example.com",
        hint: "Include the complete link starting with https://"
    },

    message: {
        label: "Paste the suspicious message",
        placeholder: "Paste SMS, email or WhatsApp message...",
        hint: "Remove OTPs and private information first."
    },

    offer: {
        label: "Describe the online offer",
        placeholder: "Paste the suspicious offer here...",
        hint: "Include offer details and website link if available."
    }

};




function navigate(page) {

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.view === page
        );
    });

    document.getElementById("pageName").textContent =
        page.charAt(0).toUpperCase() + page.slice(1);

    document.getElementById("sidebar").classList.remove("open");

    if (page === "history") {
        renderHistory();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}




document.querySelectorAll("[data-view]").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        navigate(this.dataset.view);

    });

});




function setMode(mode) {

    currentMode = mode;

    const config = modes[mode];

    document.getElementById("inputLabel").textContent =
        config.label;

    document.getElementById("scanInput").placeholder =
        config.placeholder;

    document.getElementById("inputHint").textContent =
        config.hint;

    document.querySelectorAll(".scanner-tab").forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.mode === mode
        );

    });

    document.getElementById("resultPanel").classList.add("hidden");
}




document.querySelectorAll(".quick-card").forEach(card => {

    card.addEventListener("click", function() {

        navigate("scanner");

        setMode(this.dataset.mode);

    });

});




document.querySelectorAll(".scanner-tab").forEach(tab => {

    tab.addEventListener("click", function() {

        setMode(this.dataset.mode);

    });

});




document.getElementById("startScan").addEventListener("click", () => {

    navigate("scanner");

    setMode("url");

});




document.getElementById("menuToggle").addEventListener("click", () => {

    document.getElementById("sidebar").classList.toggle("open");

});




document.getElementById("scanInput").addEventListener("input", function() {

    document.getElementById("charCount").textContent =
        `${this.value.length} / 5000`;

});




function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}




function getHistory() {

    try {
        return JSON.parse(
            localStorage.getItem("scamshield_history") || "[]"
        );
    } catch {
        return [];
    }

}


function saveHistory(item) {

    let history = getHistory();

    history.unshift(item);

    history = history.slice(0, 30);

    localStorage.setItem(
        "scamshield_history",
        JSON.stringify(history)
    );

    renderRecent();

}




function safeText(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

    })[char]);

}




function getRiskClass(risk) {

    const value = String(risk || "").toLowerCase();

    if (value.includes("safe") || value.includes("low")) {
        return "safe";
    }

    if (
        value.includes("high") ||
        value.includes("danger") ||
        value.includes("malicious") ||
        value.includes("scam")
    ) {
        return "danger";
    }

    return "suspicious";

}


function getRiskLabel(risk) {

    const type = getRiskClass(risk);

    if (type === "safe") return "LOW RISK";

    if (type === "danger") return "HIGH RISK";

    return "NEEDS CAUTION";

}



function showResult(data, originalText) {

    const risk = data.riskLevel || data.risk || "Needs review";

    const type = getRiskClass(risk);

    const summary =
        data.summary ||
        data.explanation ||
        data.message ||
        "Analysis completed.";

    const reasons =
        data.reasons ||
        data.indicators ||
        [];

    const recommendation =
        data.recommendation ||
        data.advice ||
        "Verify independently before taking action.";

    const panel = document.getElementById("resultPanel");

    panel.classList.remove("hidden");

    panel.innerHTML = `

        <h3>Analysis Complete</h3>

        <p>
            <b>Risk Level:</b>
            <span class="history-status status-${type}">
                ${getRiskLabel(risk)}
            </span>
        </p>

        <p>${safeText(summary)}</p>

        <br>

        <b>Warning Signs:</b>

        <ul>
            ${reasons.map(reason =>
                `<li>${safeText(reason)}</li>`
            ).join("")}
        </ul>

        <br>

        <b>Recommendation:</b>

        <p>${safeText(recommendation)}</p>

    `;


    saveHistory({

        id: Date.now(),

        type: currentMode,

        preview: originalText.slice(0, 90),

        risk: risk,

        summary: summary,

        date: new Date().toISOString()

    });

    panel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}




async function analyzeContent(content) {

    const button = document.getElementById("analyzeBtn");

    button.disabled = true;

    button.textContent = "Analyzing...";

    const panel = document.getElementById("resultPanel");

    panel.classList.add("hidden");

    try {

        const response = await fetch(ANALYZE_ENDPOINT, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                type: currentMode.toUpperCase(),

                content: content

            })

        });


        if (!response.ok) {

            throw new Error("Backend request failed");

        }


        const data = await response.json();

        showResult(data, content);


    } catch (error) {

        console.error(error);

        showToast("Backend connection failed!");

        panel.classList.remove("hidden");

        panel.innerHTML = `

            <h3>Unable to complete scan</h3>

            <p>
                Backend is not reachable.
                Please check whether your Java backend is running.
            </p>

            <p>
                This is a connection error, not a safety result.
            </p>

        `;

    } finally {

        button.disabled = false;

        button.textContent = "Analyze with ScamShield →";

    }

}




document.getElementById("scanForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const input = document.getElementById("scanInput");

    const content = input.value.trim();

    if (!content) {

        showToast("Please enter something first!");

        return;

    }

    if (
        currentMode === "url" &&
        !/^https?:\/\//i.test(content)
    ) {

        showToast("Enter a valid URL starting with http:// or https://");

        return;

    }

    analyzeContent(content);

});



function renderRecent() {

    const history = getHistory().slice(0, 3);

    const container = document.getElementById("recentList");

    if (history.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>No scans yet</h4>

                <p>Your recent checks will appear here.</p>

            </div>

        `;

        return;

    }


    container.innerHTML = history.map(item => {

        const type = getRiskClass(item.risk);

        return `

            <div class="history-row">

                <div class="history-detail">

                    <strong>${safeText(item.preview)}</strong>

                    <small>
                        ${new Date(item.date).toLocaleString()}
                    </small>

                </div>

                <span class="history-status status-${type}">
                    ${getRiskLabel(item.risk)}
                </span>

            </div>

        `;

    }).join("");

}




function renderHistory() {

    const history = getHistory();

    const container = document.getElementById("historyList");

    if (history.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>No scan history yet</h4>

                <p>Your previous scans will appear here.</p>

            </div>

        `;

        return;

    }


    container.innerHTML = history.map(item => {

        const type = getRiskClass(item.risk);

        return `

            <div class="history-row">

                <div class="history-detail">

                    <strong>${safeText(item.preview)}</strong>

                    <small>
                        ${new Date(item.date).toLocaleString()}
                    </small>

                </div>

                <span class="history-status status-${type}">
                    ${getRiskLabel(item.risk)}
                </span>

            </div>

        `;

    }).join("");

}




document.getElementById("clearHistory").addEventListener("click", () => {

    if (getHistory().length === 0) {

        showToast("No history to clear!");

        return;

    }

    if (confirm("Are you sure you want to clear scan history?")) {

        localStorage.removeItem("scamshield_history");

        renderHistory();

        renderRecent();

        showToast("History cleared successfully!");

    }

});




renderRecent();
