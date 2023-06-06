# Privacy Detector

Privacy Detector is a Firefox extension aimed to help users understand how the websites they visit are handling their privacy. The extension provides detailed information about the use of cookies and local storage data (localStorage), and checks whether the visited site has a privacy policy.

By clicking on the extension's icon, the user will see a list of the cookies and localStorage data used by the site, as well as an indication of whether or not the site has a privacy policy. The extension also provides a privacy score for the site, based on these details.

## Features

- Lists all the site's cookies.
- Lists all the site's local storage (localStorage) data.
- Checks whether the site has a privacy policy.
- Provides a privacy score for the site.

## Privacy Score

The privacy score is calculated based on the following criteria:

- Score -2: The site does not have a privacy policy and uses more than 5 cookies and/or more than 5 items in LocalStorage. This suggests intense tracking and lack of transparency.
- Score -1: The site has a privacy policy, but uses more than 5 cookies and/or more than 5 items in LocalStorage. This suggests some tracking, but at least a privacy policy is present.
- Score 0: The site has a privacy policy and uses 5 or fewer cookies and 5 or fewer items in LocalStorage. This suggests moderate respect for privacy.
- Score +1: The site has a privacy policy and does not use cookies or LocalStorage. This suggests a high respect for user privacy.

## Development

The development of the extension is based on Firefox's WebExtensions API. The extension was developed using HTML, CSS, and JavaScript.

---

Please note that the extension is provided "as is", with no warranties of any kind. It is meant to inform users about potential privacy issues, but does not provide protection against such issues. To enhance your online privacy, we recommend using appropriate privacy settings, as well as tracker and ad blocking extensions.
