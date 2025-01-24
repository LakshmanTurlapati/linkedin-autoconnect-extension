![LinkedIn AutoConnect Extension Logo](https://i.ibb.co/hMWt5Hx/logo.png)

# LinkedIn AutoConnect Extension 🚀

*Because who has time to craft every single LinkedIn connection request?* 😉 

Welcome to the **LinkedIn AutoConnect Extension**, your sidekick for expanding your professional network effortlessly, this Chrome extension is here to transform the way you connect on LinkedIn.

## 🌟 Features

- **Auto-Fill Connection Messages:** Wave goodbye to the tedious task of typing out each connection request! Our extension auto-fills your requests with your favorite preset templates.
  
- **Personalized Greetings:** It’s not just automation for the sake of it. The extension dynamically pulls the recipient's name to make each message feel uniquely personal. Because "Hi there" is so last century.
  
- **Seamless Integration:** Smooth as butter integration with LinkedIn’s interface ensures a hassle-free experience without any hiccups.
  
- **Customizable Templates:** Tailor your connection messages to match your unique style and professional tone. Future update coming soon: Upload your own `templates.json` for even more personalization!

- **Shuffle Template Widget:** Injects a handy shuffle icon into the message box, allowing you to effortlessly switch between different message templates with a single click.

## 📦 Installation

1. **Download the Extension:**
   [Add to Chrome](#) <!-- Replace this with your Chrome Web Store link -->

2. **Add to Chrome:**
   - Click on the downloaded file and follow the prompts to add the extension to your browser.

3. **Configure Your Templates:**
   - Open the extension settings and input your preset messages. Make them as charming or as direct as you like!

4. **Start Connecting:**
   - Navigate to LinkedIn, and let the magic happen. Watch your network grow without breaking a sweat.

## 🛠️ How It Works

Dive under the hood and see the magic behind the curtain:

1. **Manifest Configuration:**
   - Utilizes `manifest_version` 3 for the latest Chrome extension standards.
   - Defines necessary permissions like `activeTab` and `scripting` to interact with LinkedIn pages.

2. **Content Script (`content.js`):**
   - **Template Management:** Stores an array of predefined message templates with placeholders for dynamic content.
   - **Dynamic Population:** Replaces placeholders like `$name` and `$sender` with actual recipient and sender names using the `populateTemplate` function.
   - **Name Extraction:** Implements multiple methods to accurately extract the recipient's name from different parts of the LinkedIn page, ensuring reliability.
   - **Widget Injection:** Adds a stylish shuffle icon to the message box, allowing users to switch templates on the fly. This includes:
     - Injecting Font Awesome for iconography.
     - Styling the widget for optimal placement and aesthetics.
     - Adding event listeners for interactive functionality.
   - **Mutation Observer:** Monitors the DOM for the appearance of the connection request modal and triggers the message population and widget injection accordingly.

3. **Popup Script (`popup.js`):**
   - **Shuffle Functionality:** Listens for clicks on the shuffle button in the popup and executes a script in the active tab to shuffle the message template.
   - **User Feedback:** Provides real-time status updates to inform users of successful template shuffles.

4. **Future Enhancements:**
   - **Custom Template Uploads:** Upcoming feature allowing users to upload their own `templates.json` files for personalized messaging.
   - **Enhanced UI/UX:** Continuous improvements to the widget and popup interfaces for an even smoother user experience.

## 🤝 Contributing

We all thrive on collaboration! If you have suggestions, bug reports, or want to contribute, check out my [GitHub Repository](https://github.com/LakshmanTurlapati) and let's make this tool even better together.

### How to Contribute

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/YourFeature`)
3. **Commit Your Changes** (`git commit -m 'Add some feature'`)
4. **Push to the Branch** (`git push origin feature/YourFeature`)
5. **Open a Pull Request**


## About me

Got questions, feedback, or just want to say hi? Reach out to **Lakshman Turlapati** at [Audienclature](https://www.audienclature.com).

---

*Happy connecting! May your LinkedIn network be ever in your favor.* ✨