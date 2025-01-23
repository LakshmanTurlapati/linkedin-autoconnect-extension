// content.js

const templates = [
  {
    message: "Hi $name, I came across your work and was really impressed! I'd be glad if we could connect and I could learn more from you. :)",
    sender: "$sender"
  },
  {
    message: "Hello $name, as someone who shares a keen interest in innovative technology, I’d love to connect and learn from your experiences.",
    sender: "$sender"
  },
  {
    message: "Hey $name, I noticed your inspiring journey and would love to connect and stay in touch!",
    sender: "$sender"
  },
  {
    message: "Hi $name, your work in this field is truly inspiring. I’d appreciate the opportunity to connect and exchange insights.",
    sender: "$sender"
  },
  {
    message: "Hello $name, I admire your contributions in this industry. Looking forward to connecting and learning from your experience.",
    sender: "$sender"
  },
  {
    message: "Hey $name, I'm eager to expand my network with professionals like you. Would love to connect and share ideas!",
    sender: "$sender"
  },
  {
    message: "Hi $name, I’m always looking to connect with industry professionals and learn from their experiences. Let’s connect!",
    sender: "$sender"
  },
  {
    message: "Hello $name, I find your journey inspiring and would love to stay connected to learn and grow alongside professionals like you.",
    sender: "$sender"
  },
  {
    message: "Hey $name, your profile really caught my attention. I’d love to connect and discuss shared interests.",
    sender: "$sender"
  },
  {
    message: "Hi $name, I’m impressed by your achievements and would love to connect and learn from your journey.",
    sender: "$sender"
  }
];

// Function to replace placeholders with actual values
function populateTemplate(template, name, sender) {
  return template.message.replace('$name', name).replace('$sender', sender);
}

// Function to get sender's name (user's own name from LinkedIn profile)
function getSenderName() {
  const senderElement = document.querySelector('.top-card-layout__title, .text-heading-xlarge');
  return senderElement ? senderElement.innerText.trim() : 'Me';
}

// Function to extract recipient's name using multiple approaches with logs
// Function to extract and sanitize recipient's name
function getRecipientName() {
  console.log("Attempting to extract recipient's name...");

  // Method 1: Extract from the page title
  const pageTitle = document.title;
  console.log("Page title detected:", pageTitle);

  let nameFromTitle = pageTitle.match(/^(.+?)\s\|/);
  if (nameFromTitle && nameFromTitle[1]) {
    let cleanName = nameFromTitle[1].trim().replace(/^\(\d+\)\s*/, '');
    console.log("Name extracted from title:", cleanName);
    return cleanName;
  } else {
    console.log("Name not found in title.");
  }

  // Method 2: Extract from modal header (common in connection requests)
  const modalHeader = document.querySelector('.artdeco-modal__header h2');
  if (modalHeader && modalHeader.innerText.trim() !== '') {
    let cleanName = modalHeader.innerText.trim().replace(/^\(\d+\)\s*/, '');
    console.log("Name extracted from modal header:", cleanName);
    return cleanName;
  } else {
    console.log("Name not found in modal header.");
  }

  // Method 3: Extract from profile page section
  const profileHeader = document.querySelector('.pv-top-card--list li:first-child');
  if (profileHeader && profileHeader.innerText.trim() !== '') {
    let cleanName = profileHeader.innerText.trim().replace(/^\(\d+\)\s*/, '');
    console.log("Name extracted from profile header:", cleanName);
    return cleanName;
  } else {
    console.log("Name not found in profile header.");
  }

  console.warn("Failed to extract recipient name. Using fallback.");
  return 'there';  // Final fallback
}

// Function to inject the shuffle widget into the message box
function injectWidget(textArea, name, sender) {
  if (document.getElementById('linkedin-auto-connect-widget')) return;

  // Inject Font Awesome CDN if not already present
  if (!document.getElementById('font-awesome-cdn')) {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.id = 'font-awesome-cdn';
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'; // Latest verified version
    fontAwesomeLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesomeLink);
  }

  // Create widget container
  const widget = document.createElement('div');
  widget.id = 'linkedin-auto-connect-widget';
  widget.innerHTML = `
    <i class="fa fa-random shuffle-icon" title="Shuffle Template" aria-label="Shuffle Template"></i>
  `;

  // Style the widget to position the icon
  widget.style.position = 'absolute';
  widget.style.top = '38%';
  widget.style.right = '10px';
  widget.style.zIndex = '1000';

  // Append widget to the text area parent
  textArea.parentElement.style.position = 'relative'; // Ensure parent is positioned
  textArea.parentElement.appendChild(widget);

  // Style the shuffle icon
  const shuffleIcon = widget.querySelector('.shuffle-icon');
  shuffleIcon.style.fontSize = '20px';
  shuffleIcon.style.color = '#555555';  // Dark grey color
  shuffleIcon.style.cursor = 'pointer';
  shuffleIcon.style.transition = 'color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
  // shuffleIcon.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  shuffleIcon.style.borderRadius = '50%';
  shuffleIcon.style.padding = '5px';

  // Hover effect for shuffle icon
  shuffleIcon.addEventListener('mouseenter', () => {
    shuffleIcon.style.color = '#ff6600';  // Orange on hover
    // shuffleIcon.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  });

  shuffleIcon.addEventListener('mouseleave', () => {
    shuffleIcon.style.color = '#555555';  // Revert to dark grey
    // shuffleIcon.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  });

  // Shuffle icon event listener
  shuffleIcon.addEventListener('click', () => {
    const newTemplate = getRandomTemplate();
    const populatedMessage = populateTemplate(newTemplate, name, sender);
    textArea.value = populatedMessage;
  });

  console.log("Shuffle widget injected successfully.");
}

// Function to get a random template from the list
function getRandomTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

// Observe DOM changes to detect the connection request modal
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (node.nodeType === 1) {  // Ensure it's an element node
        const textArea = node.querySelector('textarea[name="message"]');
        if (textArea) {
          console.log("Message box detected. Proceeding to populate...");

          // Get recipient's name from multiple sources
          const recipientName = getRecipientName();
          const senderName = getSenderName();

          // Select a random template
          const template = getRandomTemplate();

          // Populate the message
          textArea.value = populateTemplate(template, recipientName, senderName);
          console.log(`Message populated with recipient name: ${recipientName}`);

          // Inject the widget
          injectWidget(textArea, recipientName, senderName);
        }
      }
    }
  }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });
console.log("Observer started, monitoring for connection request modal...");