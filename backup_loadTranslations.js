//document.body.style.backgroundColor = "blue";


document.addEventListener('DOMContentLoaded', function () {
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('translations-container');
            
            data.forEach(item => {
                // Create a div for each translation item
                const translationDiv = document.createElement('div');
                translationDiv.classList.add('translation-item');
                
                // Create elements for English text, Japanese text, and audio button
                const englishText = document.createElement('p');
                englishText.textContent = `English: ${item.english}`;
                
                const japaneseText = document.createElement('p');
                japaneseText.textContent = `Japanese: ${item.japanese}`;
                
                const audioButton = document.createElement('button');
                audioButton.textContent = 'Play Pronunciation';
                audioButton.addEventListener('click', () => {
                    const audio = new Audio(item.audio);
                    audio.play();
                });
                
                // Append elements to the translation div
                translationDiv.appendChild(englishText);
                translationDiv.appendChild(japaneseText);
                translationDiv.appendChild(audioButton);
                
                // Append the translation div to the container
                container.appendChild(translationDiv);
            });
        })
        .catch(error => console.error('Error fetching translations:', error));
});