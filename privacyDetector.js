function displayTabPrivacyInfo(activeTabs) {
    let currentTab = activeTabs.pop();
    let fetchAllCookies = browser.cookies.getAll({ url: currentTab.url });
    
    fetchAllCookies.then((tabCookies) => {
        let tabUrlElement = document.getElementById('header-title');
        let tabInfoText = document.createTextNode("Cookies and Local Storage at: " + currentTab.title);
        
        tabUrlElement.appendChild(tabInfoText);
        
        let listElement = document.getElementById('cookie-list');
        let privacyScore = 0;
        
        if (tabCookies.length > 0) {
            tabCookies.forEach(cookie => {
                let cookieItem = document.createElement("li");
                let cookieInfo = document.createTextNode("Cookie: " + cookie.name + ": " + cookie.value);
                
                cookieItem.appendChild(cookieInfo);
                listElement.appendChild(cookieItem);
            });
            if (tabCookies.length > 5) {
                privacyScore -= 1;
            }
        } else {
            let noCookiesInfo = document.createElement("p");
            let noCookiesText = document.createTextNode("No cookies in this tab.");
            
            noCookiesInfo.appendChild(noCookiesText);
            listElement.parentNode.appendChild(noCookiesInfo);
        }

        // Fetch local storage information
        browser.tabs.sendMessage(
            currentTab.id,
            { command: "getLocalStorage" }
        ).then(response => {
            let localStorageItems = JSON.parse(response.localStorage);
            let localStorageCount = 0;
            
            for (let item in localStorageItems) {
                let localStorageInfo = document.createElement("li");
                let localStorageText = document.createTextNode("LocalStorage: " + item + ": " + localStorageItems[item]);
                
                localStorageInfo.appendChild(localStorageText);
                listElement.appendChild(localStorageInfo);
                localStorageCount++;
            }
            
            if (localStorageCount > 5) {
                privacyScore -= 1;
            }

            // Display privacy policy status
            let privacyPolicyStatus = document.createElement("p");
            let hasPrivacyPolicy = response.hasPrivacyPolicy;
            let policyStatusText = document.createTextNode("This site " + (hasPrivacyPolicy ? "has" : "does not have") + " a privacy policy.");
            
            privacyPolicyStatus.appendChild(policyStatusText);
            listElement.appendChild(privacyPolicyStatus);
            
            if (hasPrivacyPolicy) {
                privacyScore += 1;
            }

            // Display privacy score
            let privacyScoreInfo = document.createElement("p");
            let privacyScoreText = document.createTextNode("Privacy score for this site: " + privacyScore);
            
            privacyScoreInfo.appendChild(privacyScoreText);
            listElement.appendChild(privacyScoreInfo);

            // Display score legend
            let scoreLegend = document.createElement("p");
            let scoreDescription;
            
            switch (privacyScore) {
                case -2:
                    scoreDescription = document.createTextNode("Score -2: The site does not have a privacy policy and uses more than 5 cookies and/or more than 5 items in LocalStorage. This suggests intense tracking and lack of transparency.");
                    break;
                case -1:
                    scoreDescription = document.createTextNode("Score -1: The site has a privacy policy, but uses more than 5 cookies and/or more than 5 items in LocalStorage. This suggests some tracking, but at least a privacy policy is present.");
                    break;
                case 0:
                    scoreDescription = document.createTextNode("Score 0: The site has a privacy policy and uses 5 or fewer cookies and 5 or fewer items in LocalStorage. This suggests moderate respect for privacy.");
                    break;
                case 1:
                    scoreDescription = document.createTextNode("Score +1: The site has a privacy policy and does not use cookies or LocalStorage. This suggests a high respect for user privacy.");
                    break;
            }
            
            scoreLegend.appendChild(scoreDescription);
            listElement.appendChild(scoreLegend);
        });
    });
}

function fetchCurrentTab() {
    return browser.tabs.query({ currentWindow: true, active: true });
}

fetchCurrentTab().then(displayTabPrivacyInfo);
