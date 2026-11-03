
const API_BASE_URL = "http://localhost:8080/api";
const ANALYZE_ENDPOINT = `${API_BASE_URL}/scams/analyze`;
const HISTORY_ENDPOINT = `${API_BASE_URL}/scams/history`;

let currentMode = "url";
let scanHistory = [];
let isLoadingHistory = false;

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
        fetchHistory();
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

    panel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

    // Refresh history from backend so new scan appears in scan history and recent activity
    fetchHistory();

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

            const errorData = await response.json().catch(() => ({}));

            throw new Error(
                errorData.error || errorData.message || "Backend request failed"
            );

        }


        const data = await response.json();

        showResult(data, content);


    } catch (error) {

        console.error("Analysis error:", error);

        showToast(error.message || "Something went wrong!");

        panel.classList.remove("hidden");

        panel.innerHTML = `

            <h3>Unable to complete scan</h3>

            <p>
               Backend request failed.
               Please check whether your backend server is running on port 8080.     
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




async function fetchHistory() {

    isLoadingHistory = true;

    renderHistoryLoading();

    try {

        const response = await fetch(HISTORY_ENDPOINT);

        if (!response.ok) {

            const errData = await response.json().catch(() => ({}));

            throw new Error(
                errData.message || `Server returned status ${response.status}`
            );

        }

        const data = await response.json();

        scanHistory = Array.isArray(data) ? data : [];

        renderHistory();

        renderRecent();

    } catch (error) {

        console.error("Error fetching scan history:", error);

        renderHistoryError(error.message);

    } finally {

        isLoadingHistory = false;

    }

}




function renderHistoryLoading() {

    const container = document.getElementById("historyList");

    if (container) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>Loading scan history...</h4>

                <p>Connecting to backend and fetching previous checks...</p>

            </div>

        `;

    }

}




function renderHistoryError(message) {

    const container = document.getElementById("historyList");

    if (container) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>Unable to load scan history</h4>

                <p>${safeText(message || "Please ensure the backend server is running on port 8080.")}</p>

                <button class="text-button" id="retryHistoryBtn" style="margin-top: 10px; cursor: pointer;">
                    Retry Connection ↻
                </button>

            </div>

        `;

        const retryBtn = document.getElementById("retryHistoryBtn");

        if (retryBtn) {

            retryBtn.addEventListener("click", () => fetchHistory());

        }

    }

}




function renderRecent() {

    const recent = scanHistory.slice(0, 3);

    const container = document.getElementById("recentList");

    if (!container) return;

    if (recent.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>No scans yet</h4>

                <p>Your recent checks will appear here.</p>

            </div>

        `;

        return;

    }


    container.innerHTML = recent.map(item => {

        const risk = item.riskLevel || item.risk || "Needs review";

        const typeClass = getRiskClass(risk);

        const typeLabel = getRiskLabel(risk);

        const scanType = (item.type || "SCAN").toUpperCase();

        const originalInput = item.content || item.preview || "";

        const dateStr = item.createdAt || item.date || "";

        const formattedDate = dateStr ? new Date(dateStr).toLocaleString() : "Recently";

        return `

            <div class="history-row">

                <div class="history-detail">

                    <div class="history-meta">
                        <span class="scan-type-badge">${safeText(scanType)}</span>
                        <small>${safeText(formattedDate)}</small>
                    </div>

                    <strong title="${safeText(originalInput)}">
                        ${safeText(originalInput)}
                    </strong>

                </div>

                <span class="history-status status-${typeClass}">
                    ${typeLabel}
                </span>

            </div>

        `;

    }).join("");

}




function renderHistory() {

    const container = document.getElementById("historyList");

    if (!container) return;

    if (scanHistory.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h4>No scan history yet</h4>

                <p>Your previous scans will appear here.</p>

            </div>

        `;

        return;

    }


    container.innerHTML = scanHistory.map(item => {

        const risk = item.riskLevel || item.risk || "Needs review";

        const typeClass = getRiskClass(risk);

        const typeLabel = getRiskLabel(risk);

        const scanType = (item.type || "SCAN").toUpperCase();

        const originalInput = item.content || item.preview || "";

        const detectionResult = item.explanation || item.summary || item.recommendation || "Analysis completed.";

        const dateStr = item.createdAt || item.date || "";

        const formattedDate = dateStr ? new Date(dateStr).toLocaleString() : "Recently";

        const id = item._id || item.id || "";

        return `

            <div class="history-row" data-id="${safeText(id)}">

                <div class="history-detail">

                    <div class="history-meta">
                        <span class="scan-type-badge">${safeText(scanType)}</span>
                        <small>${safeText(formattedDate)}</small>
                    </div>

                    <strong title="${safeText(originalInput)}">
                        ${safeText(originalInput)}
                    </strong>

                    <p class="history-explanation">
                        ${safeText(detectionResult)}
                    </p>

                </div>

                <div class="history-actions">

                    <span class="history-status status-${typeClass}">
                        ${typeLabel}
                    </span>

                    ${id ? `
                    <button class="delete-history-btn" data-id="${safeText(id)}" title="Delete this record" aria-label="Delete scan record">
                        ✕
                    </button>
                    ` : ""}

                </div>

            </div>

        `;

    }).join("");


    // Attach click listeners to individual delete buttons
    container.querySelectorAll(".delete-history-btn").forEach(button => {

        button.addEventListener("click", function(event) {

            event.stopPropagation();

            const recordId = this.dataset.id;

            deleteHistoryItem(recordId);

        });

    });

}




async function deleteHistoryItem(id) {

    if (!id) return;

    try {

        const response = await fetch(`${HISTORY_ENDPOINT}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {

            const errData = await response.json().catch(() => ({}));

            throw new Error(
                errData.message || "Failed to delete scan record"
            );

        }

        showToast("Scan deleted successfully");

        // Optimistically update local state and re-render
        scanHistory = scanHistory.filter(item => (item._id || item.id) !== id);

        renderHistory();

        renderRecent();

    } catch (error) {

        console.error("Delete history error:", error);

        showToast(error.message || "Could not delete record");

    }

}




document.getElementById("clearHistory").addEventListener("click", async () => {

    if (scanHistory.length === 0) {

        showToast("No history to clear!");

        return;

    }

    try {

        const response = await fetch(HISTORY_ENDPOINT, {
            method: "DELETE"
        });

        if (!response.ok) {

            if (response.status === 404 || response.status === 405) {
                showToast("Clear all history is not supported by backend.");
                return;
            }

            const errData = await response.json().catch(() => ({}));

            throw new Error(
                errData.message || "Failed to clear history"
            );

        }

        scanHistory = [];

        renderHistory();

        renderRecent();

        showToast("Scan history cleared successfully");

    } catch (error) {

        console.error("Clear all history error:", error);

        showToast(error.message || "Failed to clear history");

    }

});




// Initial load: fetch history from backend to populate Recent Activity and History
fetchHistory();
