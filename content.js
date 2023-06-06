browser.runtime.onMessage.addListener(request => {
    if (request.command === "getLocalStorage") {
        let localStorageData = JSON.stringify(localStorage);
        let hasPrivacyPolicy = false;
        let links = Array.from(document.links);
        links.forEach(link => {
            if (link.href.toLowerCase().includes("privacy")) {
                hasPrivacyPolicy = true;
            }
        });
        return Promise.resolve({localStorage: localStorageData, hasPrivacyPolicy: hasPrivacyPolicy});
    }
});
