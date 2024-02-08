import React, { useState } from 'react';
import axios from 'axios';

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
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
            </label>
            <button onClick={handleShortenClick}>Shorten</button>
            {shortUrl && (
                <div>
                    <p>Your link now looks like this:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ShortenLinkForm;
