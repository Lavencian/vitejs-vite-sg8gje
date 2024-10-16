import React from 'react';

const Social: React.FC = () => {
  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/', logo: '🎥' },
    { name: 'Telegram', url: 'https://t.me/', logo: '✈️' },
    { name: 'Twitter (X)', url: 'https://twitter.com/', logo: '🐦' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/g/8etpk9Qfckm2n862/', logo: '👍' },
    { name: 'Instagram', url: 'https://www.instagram.com/', logo: '📷' },
  ];

  return (
    <div className="social">
      <h2>Follow Us</h2>
      <p>Stay connected with GOAL COIN on social media!</p>
      {socialLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-link"
        >
          <span className="social-logo">{link.logo}</span>
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default Social;