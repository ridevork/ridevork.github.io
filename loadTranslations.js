document.addEventListener('DOMContentLoaded', function () {
    let currentAudio = null; // Keep track of the current audio playing

    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('translations-container');
            data.forEach(item => {
                const translationDiv = document.createElement('div');
                translationDiv.classList.add('translation-item');
                
                if (item.color) {
                    translationDiv.classList.add(item.color); // Apply color class if specified
                }

                const audioButton = document.createElement('button');
                audioButton.classList.add('play-button');
                audioButton.innerHTML = '<img src="play-icon.svg" alt="Play Icon" class="play-icon">';
                audioButton.addEventListener('click', () => {
                    // If there's an audio currently playing, pause and reset it
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                        currentAudio = null; // Reset current audio
                    }
                    // Create a new audio instance and play it
                    currentAudio = new Audio(item.audio);
                    currentAudio.play();
                    // Reset currentAudio when the audio ends
                    currentAudio.addEventListener('ended', () => {
                        currentAudio = null;
                    });
                    // Reset currentAudio on error to ensure it can be replayed
                    currentAudio.addEventListener('error', () => {
                        currentAudio = null;
                    });
                });

                const textContainer = document.createElement('div');
                textContainer.classList.add('text-container');

                const japaneseText = document.createElement('p');
                japaneseText.textContent = `${item.japanese}`;
                
                const englishText = document.createElement('p');
                englishText.textContent = `${item.english}`;
                
                textContainer.appendChild(japaneseText);
                textContainer.appendChild(englishText);

                translationDiv.appendChild(audioButton);
                translationDiv.appendChild(textContainer);

                container.appendChild(translationDiv);
            });
        })
        .catch(error => console.error('Error fetching translations:', error));
});