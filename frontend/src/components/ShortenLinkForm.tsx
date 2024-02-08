import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const ShortenLinkForm: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string | null>(null);

    const handleShortenClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/links', {
                originalUrl,
            });

            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error('Error shortening the link:', error);
        }
    };

    return (
        <div>
            <h1>Shorten your link!</h1>
            <label>
                Enter the link:
                <input className="input-field"
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
            </label>
            <button onClick={handleShortenClick}>Shorten</button>
            {shortUrl && (
                <div className="result-container">
                    <p>Your link now looks like this:</p>
                    <a className="link-result" href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ShortenLinkForm;
